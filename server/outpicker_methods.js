/**
 * Created by weisong on 16/12/17.
 */
Meteor.methods({
    initHeroes: function () {
        var result = Meteor.http.call("GET",
            "https://api.opendota.com/api/heroes");

        heroesdata = result.data;
        for (var i = 0; i < heroesdata.length; i++) {

            var cdn_name = heroesdata[i].name.substring(14);
            heroesdata[i].cdn_name = cdn_name;
            Heroes.insert(
                heroesdata[i]
            );
        }
        console.log(heroesdata.length + "  Heroes inserted");
    },
    initBP: function () {
        let result = Heroes.find().fetch();
        let heroes_count = result.length;

        for (let i = 0; i < heroes_count; i++) {
            for (let j = 0; j < heroes_count; j++) {
                if (i !== j) {
                    BP.insert(
                        {"hero": result[i].id, "counter": result[j].id, count: 0}
                    );
                }
            }
        }
        console.log("BP Init");
    },
    insertMatchBP: function (matchid) {
        this.unblock();

        // console.log("https://api.opendota.com/api/matches/" + matchid);
        var results = Meteor.http.call("GET", "https://api.opendota.com/api/matches/" + matchid);
        var matchdata = results.data;
        var playerdata = matchdata.players;
        var playerlen = matchdata.players.length;

        var bp_obj = {};
        bp_obj.matchid = matchdata.match_id;

        if (matchdata.league) {                     // Some matches league is missing
            bp_obj.leagueid = matchdata.league.leagueid;
            bp_obj.leaguename = matchdata.league.name;
        }
        else if (matchdata.leagueid) {
            bp_obj.leagueid = matchdata.leagueid;
        }

        bp_obj.version = matchdata.version;
        bp_obj.date = matchdata.start_time;

        if (matchdata.picks_bans) {          // Some matches picks_ban is null
            var bp_arr = matchdata.picks_bans;
            for (var i = 0; i < bp_arr.length; i++) {    //Loop thru BP
                if (bp_arr[i].is_pick) {                 //if is pick
                    var this_bp_obj = bp_obj;
                    this_bp_obj.heroid = bp_arr[i].hero_id;
                    this_bp_obj.pickorder = bp_arr[i].order;
                    this_bp_obj.ban = [];
                    this_bp_obj.counterpick = [];
                    this_bp_obj.friends = [];

                    //find player id and name
                    for (var q = 0; q < playerlen; q++) {
                        if (playerdata[q].hero_id == this_bp_obj.heroid) {
                            this_bp_obj.playerid = playerdata[q].account_id;
                            this_bp_obj.playername = playerdata[q].name;
                            break;
                        }
                    }
                    //find teamid and name
                    var thisteam = bp_arr[i].team;
                    if (thisteam == 1) {        //Dire team
                        if (matchdata.dire_team) {   //Check if team have id
                            this_bp_obj.teamid = matchdata.dire_team.team_id;
                            this_bp_obj.teamname = matchdata.dire_team.name;
                        }
                        else {
                            this_bp_obj.teamid = 'NA';
                            this_bp_obj.teamname = 'NA';
                        }
                        this_bp_obj.won = !matchdata.radiant_win;
                    }
                    else if (thisteam == 0) {   //Radient Team
                        if (matchdata.radiant_team) {   //Check if team have id
                            this_bp_obj.teamid = matchdata.radiant_team.team_id;
                            this_bp_obj.teamname = matchdata.radiant_team.name;
                        }
                        else {
                            this_bp_obj.teamid = 'NA';
                            this_bp_obj.teamname = 'NA';
                        }
                        this_bp_obj.won = matchdata.radiant_win;
                    }

                    for (var j = i + 1; j < bp_arr.length; j++) {
                        if (bp_arr[j].team == thisteam) {   // if same team, check ban
                            if (!bp_arr[j].is_pick) {
                                // this_bp_obj.ban.push(bp_arr[j].hero_id);  //bp_arr[j].hero_id    //add to array
                                this_bp_obj.counterpick.push(bp_arr[j].hero_id);  //bp_arr[j].hero_id    //add to array
                            }
                        }
                        else {                              // if diff team, check pick: add to counter
                            if (bp_arr[j].is_pick) {
                                this_bp_obj.counterpick.push(bp_arr[j].hero_id);
                            }
                            if (!bp_arr[j].is_pick) {         // if diff team, check ban: add friends
                                this_bp_obj.friends.push(bp_arr[j].hero_id);
                            }
                        }
                    }

                    for (var k = 0; k < bp_arr.length; k++) {
                        if (bp_arr[k].team == thisteam) {
                            if (bp_arr[k].hero_id !== this_bp_obj.heroid) {         // Not yourself
                                if (bp_arr[k].is_pick) {                            // Not Ban
                                    this_bp_obj.friends.push(bp_arr[k].hero_id);    // Add friends
                                }
                            }
                        }
                    }
                    Counterpicker.insert(
                        this_bp_obj
                    );
                }
            }
        }
    },
    insertMatchBP2: function (matchid) {
        this.unblock();

        var results = Meteor.http.call("GET", "https://api.opendota.com/api/matches/" + matchid);
        var matchdata = results.data;

        if (matchdata.picks_bans) {          // Some matches picks_ban is null
            var bp_arr = matchdata.picks_bans;
            for (var i = 0; i < bp_arr.length; i++) {    //Loop thru BP
                if (bp_arr[i].is_pick) {                 //if is pick
                    var thisteam = bp_arr[i].team;
                    for (var j = i + 1; j < bp_arr.length; j++) {
                        if (bp_arr[j].team == thisteam) {   // if same team, check ban
                            if (!bp_arr[j].is_pick) {
                                BP.update(
                                    {hero: bp_arr[i].hero_id, counter: bp_arr[j].hero_id},
                                    {'$inc': {"count": 1}}
                                );
                            }
                        }
                        else {                              // if diff team, check pick: add to counter
                            if (bp_arr[j].is_pick) {
                                BP.update(
                                    {hero: bp_arr[i].hero_id, counter: bp_arr[j].hero_id},
                                    {'$inc': {"count": 1}}
                                );
                            }
                        }
                    }
                }
            }
        }
        console.log("Parsed BP: " + matchid);
    },

    insertLeagueBP: function (leaguestring) {
        console.log(leaguestring);
        var league_arr = leaguestring.split(",");
        for (var i = 0; i < league_arr.length; i++) {
            var result = Meteor.http.call("GET", "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=" + league_arr[i] + "&key=" + Meteor.settings.steamKey);
            var leaguedata = result.data;
            var leaguematches = leaguedata.result.matches;

            console.log('Inserting league : ' + league_arr[i] + ', num matches : ' + leaguematches.length);
            var matchcount = 0;
            var t0 = Date.now();
            var totalexcutime;
            leaguematches.forEach(function (oneMatch) {
                Meteor.call("insertMatchBP", oneMatch.match_id, function (error, results) {
                    var t1 = Date.now();
                    var executionms = t1 - t0;

                    if (executionms < 1000) {    // make sure each api call at least 1 sec ; 60 call / min
                        var sleeptime = 1000 - executionms;
                        sleep(sleeptime);
                    }
                    totalexcutime = Date.now() - t0;
                    t0 = Date.now();
                    if (error) {
                        console.log(oneMatch.match_id);
                        console.log(error);
                    }
                });
                matchcount++;
                console.log(" Outpicker ///  " + matchcount + " ///  MatchID : " + oneMatch.match_id + " in " + totalexcutime + "ms");
            });
            console.log('Finished');
        }
    },

    insertLeagueBP2: function (leaguestring) {
        console.log(leaguestring);
        var league_arr = leaguestring.split(",");
        for (var i = 0; i < league_arr.length; i++) {
            let callstring = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=" + league_arr[i] + "&key=" + Meteor.settings.steamKey;
            console.log(callstring);
            var result = Meteor.http.call("GET", "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=" + league_arr[i] + "&key=" + Meteor.settings.steamKey);
            var leaguedata = result.data;
            var leaguematches = leaguedata.result.matches;

            console.log('Inserting league : ' + league_arr[i] + ', num matches : ' + leaguematches.length);
            var matchcount = 0;
            var t0 = Date.now();
            var totalexcutime;
            leaguematches.forEach(function (oneMatch) {
                Meteor.call("insertMatchBP2", oneMatch.match_id, function (error, results) {
                    var t1 = Date.now();
                    var executionms = t1 - t0;

                    if (executionms < 1000) {    // make sure each api call at least 1 sec ; 60 call / min
                        var sleeptime = 1000 - executionms;
                        sleep(sleeptime);
                    }
                    totalexcutime = Date.now() - t0;
                    t0 = Date.now();
                    if (error) {
                        console.log("Error Fetching :" + oneMatch.match_id);
                        console.log(error.response.statusCode);
                        if (error.response.statusCode === 429) {
                            console.log("Error 429 rate limit exceeded : Sleeping 20s");
                            sleep(20000);
                        }
                    }
                });
                matchcount++;
                console.log(" Outpicker ///  " + matchcount + " ///  MatchID : " + oneMatch.match_id + " in " + totalexcutime + "ms");
            });
            console.log('Finished');
        }
    },

    getBan: function (heroid) {
        var pipeline = [
                {
                    $match: {heroid: +heroid}
                },
                {
                    $unwind: '$ban'
                },
                {
                    $group: {
                        _id: {
                            heroid: '$heroid',
                            ban: '$ban'
                        },
                        ban: {$first: '$ban'},
                        count: {$sum: 1}
                    }
                },
                {
                    $sort: {count: -1}
                },
                {$limit: 32},
                {
                    $project: {
                        _id: 0,
                        ban: 1,
                        count: 1
                    }
                }
            ]
        ;
        var res = Counterpicker.aggregate(
            pipeline
        );
        return res;
    },
    getFriend: function (heroid) {
        var pipeline = [
                {
                    $match: {heroid: +heroid}
                },
                {
                    $unwind: '$friends'
                },
                {
                    $group: {
                        _id: {
                            heroid: '$heroid',
                            friend: '$friends'
                        },
                        friend: {$first: '$friends'},
                        count: {$sum: 1}
                    }
                },
                {
                    $sort: {count: -1}
                },
                {$limit: 32},
                {
                    $project: {
                        _id: 0,
                        friend: 1,
                        count: 1
                    }
                }
            ]
        ;
        var res = Counterpicker.aggregate(
            pipeline
        );
        return res;
    },
    getCounterpick: function (heroid) {
        var pipeline = [
            {
                $match: {heroid: +heroid}
            },
            {
                $unwind: '$counterpick'
            },
            {
                $group: {
                    _id: {
                        heroid: '$heroid',
                        counterpick: '$counterpick'
                    },
                    counterpick: {$first: '$counterpick'},
                    count: {$sum: 1}
                }
            },
            {
                $sort: {count: -1}
            },
            {$limit: 32},
            {
                $project: {
                    _id: 0,
                    counterpick: 1,
                    count: 1
                }
            }
        ];

        var pipeline2 = [
            {
                $match: {hero: +heroid}
            },
            {
                $sort: {count: -1}
            },
            {$limit: 32},
        ];


        return BP.aggregate(
            pipeline2
        );
    },
    getPickcount: function (heroid) {
        var pipeline = [
            {
                $match: {heroid: +heroid}
            },
            {
                $group: {
                    _id: {
                        heroid: '$heroid',
                        matchid: '$matchid'
                    },
                    count: {$sum: 1}
                },
                $group: {
                    _id: {
                        heroid: '$heroid',
                    },
                    count: {$sum: 1}
                }
            },
        ];
        return Counterpicker.aggregate(
            pipeline
        );
    }
});
