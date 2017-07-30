Meteor.methods({
    getTournamentList: function () {
        var pipeline = [
            {
                "$group": {
                    "_id": "$leagueid",
                    "nummatch": {"$sum": 1},
                    "leagueid": {"$first": "$leagueid"},
                    "leaguename": {"$first": "$leaguename"}
                }
            }
        ];

        return FantasyData.aggregate(
            pipeline
        );
        // return FantasyData.find().fetch();

    },
    getTeamList: function () {
//-----------------------------------//
//          OLD METHOD THAT QUERY FANTASY DATA FOR AGGREGATED UNIQUE TEAM NAME
//-----------------------------------//

        // var pipeline = [
        //     {
        //         "$group": {
        //             "_id": "$teamid",
        //             "nummatch": {"$sum": 1},
        //             "teamid": {"$first": "$teamid"},
        //             "teamname": {"$first": "$team"}
        //         }
        //     }
        // ];
        // return FantasyData.aggregate(
        //     pipeline
        // );

//-----------------------------------//
//     NEW METHOD query from TeamData
//-----------------------------------//
        return TeamData.find({}).fetch();
    },
    getLeagueTeamList: function (leagueid) {
        var pipeline = [
            {
                "$match": {
                    "leagueid": leagueid
                }
            },
            {
                "$group": {
                    "_id": "$teamid",
                    "nummatch": {"$sum": 1},
                    "teamid": {"$first": "$teamid"},
                    "teamname": {"$first": "$team"}
                }
            }
        ];
        return FantasyData.aggregate(
            pipeline
        );
    },

    getTournamentList_team: function (team_id) {
        var pipeline = [
            {
                "$match": {
                    'teamid': team_id
                }
            },
            {
                "$group": {
                    "_id": "$leagueid",
                    "nummatch": {"$sum": 1},
                    "leagueid": {"$first": "$leagueid"},
                    "leaguename": {"$first": "$leaguename"}
                }
            }
        ];

        return FantasyData.aggregate(
            pipeline
        );
        // return FantasyData.find().fetch();

    },
    initLeagueData: function () {
        this.unblock();
        var result = Meteor.http.call("GET", "https://api.opendota.com/api/leagues");
        var allleaguedata = result.data;
        allleaguedata.forEach(function (oneLeague) {
            LeagueInfo.insert({
                leagueid: oneLeague.leagueid,
                name: oneLeague.name,
                tier: oneLeague.tier,
                banner: oneLeague.banner,
                ticket: oneLeague.ticket,
            });
        });
    },
    initPlayerData: function () {
        this.unblock();
        var result = Meteor.http.call("GET", "https://api.opendota.com/api/proPlayers");
        var allPlayerData = result.data;
        allPlayerData.forEach(function (onePlayer) {
            ProPlayerData.insert(onePlayer);
        });
    },
    initTI7Teams: function () {
        this.unblock();
        TeamData.insert({teamid: 2586976, teamname: 'OG Dota2', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 39, teamname: 'Evil Geniuses', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 5, teamname: 'Invictus Gaming', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 15, teamname: 'LGD Gaming', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 1883502, teamname: 'Virtus Pro', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 2163, teamname: 'Team Liquid', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 1375614, teamname: 'Newbee', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 1838315, teamname: 'Team Secret', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 1846548, teamname: 'HellRaisers', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 46, teamname: 'Team Empire', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 2640025, teamname: 'iG.Vitality', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 3331948, teamname: 'LGD.Forever Young', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 2108395, teamname: 'TNC Pro Team', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 350190, teamname: 'Fnatic', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 2581813, teamname: 'Execration', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 2512249, teamname: 'Digital Chaos', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 2672298, teamname: 'Infamous', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 1333179, teamname: 'Cloud9', leaguename: 'The International 2017'});

    },
    getLeagueData: function (leagueid) {
        this.unblock();
        console.log("LEAGUE ID IS :" + leagueid);
        var result = Meteor.http.call("GET", "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=" + leagueid + "&key=" + Meteor.settings.steamKey);
        var leaguedata = result.data;
        var leaguematches = leaguedata.result.matches;
        var leagueinfo = LeagueInfo.findOne({leagueid: parseInt(leagueid)});
        var leaguename = leagueinfo.name;

        var TI7teams = TeamData.find({leaguename: 'The International 2017'})
            .map(function (team) {
                return team.teamid;
            });

        leaguematches.forEach(function (oneMatch) {
//          Compare radient dire team belongs to ti7 teams before adding to db
                if (TI7teams.includes(oneMatch.radiant_team_id) || TI7teams.includes(oneMatch.dire_team_id)) {
                    console.log("Inserting match_id: " + oneMatch.match_id);
                    LeagueData.insert({
                        league_id: leagueid,
                        league_name: leaguename,
                        match_id: oneMatch.match_id,
                        start_time: oneMatch.start_time,
                        series_type: oneMatch.series_type,
                        series_id: oneMatch.series_id,
                        match_seq_num: oneMatch.match_seq_num,
                        lobby_type: oneMatch.lobby_type,
                        radiant_team_id: oneMatch.radiant_team_id,
                        dire_team_id: oneMatch.dire_team_id,
                        players: oneMatch.players,
                    });
                }
            }
        );
    },
    insertLeagueFantasy: function (leagueid) {
        this.unblock();
        var matchcount = 0;
        var leagueMatchesResult = LeagueData.find({league_id: leagueid});
        leagueMatchesResult.forEach(function (oneMatch) {
            Meteor.call("insertMatchFantasy", oneMatch.match_id, function (error, results) {
            });
            matchcount++;
            console.log(" ///  " + matchcount + " ///  MatchID : " + oneMatch.match_id);
        });
    },
    insertMatchFantasy: function (matchid) {       // Match ID to be changed to league id
        this.unblock();

        var playercount = 0;
        var results = Meteor.http.call("GET", "https://api.opendota.com/api/matches/" + matchid);

        var fantasydata = {};

        var matchdata = results.data;
        var playerdata = matchdata.players;
        fantasydata.matchid = matchdata.match_id;
        fantasydata.leagueid = matchdata.league.leagueid;
        fantasydata.leaguename = matchdata.league.name;
        fantasydata.length = matchdata.duration;

        //convert date to javascript date object
        var matchstarttime = new Date(0); // The 0 there is the key, which sets the date to the epoch
        matchstarttime.setUTCSeconds(matchdata.start_time);
        fantasydata.starttime = matchstarttime;

        //TI 7 TEAM
        var TI7teams = TeamData.find({leaguename: 'The International 2017'})
            .map(function (team) {
                return team.teamid;
            });

        playerdata.forEach(function (onePlayer) {
                //Get role for player
                var playerresult = ProPlayerData.findOne({account_id: onePlayer.account_id});
                var toinsert = true;


                fantasydata.name = onePlayer.name;
                fantasydata.accountid = onePlayer.account_id;
                if (onePlayer.isRadiant) {
                    fantasydata.team = matchdata.radiant_team.name;
                    fantasydata.teamid = parseInt(matchdata.radiant_team.team_id);
                }
                else {
                    fantasydata.team = matchdata.dire_team.name;
                    fantasydata.teamid = parseInt(matchdata.dire_team.team_id);
                }

                if (TI7teams.includes(fantasydata.teamid) || TI7teams.includes(fantasydata.teamid)) {
                    if (ValidFantasy(onePlayer, matchdata) && playerresult) {

                        // switch role;
                        if (playerresult) {
                            if (playerresult.fantasy_role >= 0) {
                                switch (playerresult.fantasy_role) {
                                    case 0:
                                        fantasydata.role = 'NA';
                                        break;
                                    case 1:
                                        fantasydata.role = 'Core';
                                        break;
                                    case 2:
                                        fantasydata.role = 'Support';
                                        break;
                                    case 3:
                                        fantasydata.role = 'Offlane';
                                        break;
                                    default:
                                        fantasydata.role = 'NA';
                                }
                            }
                            else {
                                fantasydata.role = 'NA';
                                console.log(" /////////  ERROR  /////  Match:: " + matchid + " Fantasy Role Not found for player id: " + onePlayer.account_id);
                            }

                        }
                        else {
                            console.log(" /////////  ERROR /////  Match:: " + matchid + " Player ID not found in db: " + onePlayer.account_id);
                        }


                        var gamewon;
                        if ((onePlayer.isRadiant && onePlayer.radiant_win) || (!onePlayer.isRadiant && !onePlayer.radiant_win)) {
                            fantasydata.gamewon = 'Won';
                        }
                        else {
                            fantasydata.gamewon = 'Lost';
                        }

                        fantasydata.teamfight = getTeamFight(onePlayer, matchdata);
                        fantasydata.firstblood = getFirstBlood(onePlayer, matchdata);

                        fantasydata.kills = roundToTwoDecimal(0.3 * onePlayer.kills);
                        fantasydata.deaths = roundToTwoDecimal(3 - 0.3 * onePlayer.deaths);
                        fantasydata.cs = roundToTwoDecimal(0.003 * (onePlayer.last_hits + onePlayer.denies));
                        fantasydata.gpm = roundToTwoDecimal(0.002 * onePlayer.gold_per_min);
                        fantasydata.towerkill = roundToTwoDecimal(onePlayer.tower_kills);
                        fantasydata.roshankill = roundToTwoDecimal(onePlayer.roshan_kills);
                        fantasydata.wardsplaced = roundToTwoDecimal(0.5 * onePlayer.obs_placed);
                        fantasydata.campsstacked = roundToTwoDecimal(0.5 * onePlayer.camps_stacked);
                        fantasydata.runesgrabbed = roundToTwoDecimal(0.25 * onePlayer.rune_pickups);
                        fantasydata.stuns = roundToTwoDecimal(0.05 * onePlayer.stuns);

                        //Sum of all Points
                        fantasydata.fantasy_point = roundToOneDecimal(
                            fantasydata.kills +
                            fantasydata.deaths +
                            fantasydata.cs +
                            fantasydata.gpm +
                            fantasydata.towerkill +
                            fantasydata.roshankill +
                            fantasydata.teamfight +
                            fantasydata.wardsplaced +
                            fantasydata.campsstacked +
                            fantasydata.runesgrabbed +
                            fantasydata.firstblood +
                            fantasydata.stuns
                        );

                        if (onePlayer.tower_kills == null) {
                            fantasydata.towerkill = 'NA';
                        }
                        if (onePlayer.roshan_kills == null) {
                            fantasydata.roshankill = 'NA';
                        }
                        if (onePlayer.kills == null || onePlayer.assists == null) {
                            fantasydata.teamfight = 'NA';
                        }
                        if (onePlayer.kills_log == null || matchdata.first_blood_time == null) {
                            fantasydata.firstblood = 'NA';
                        }

                        FantasyData.insert(
                            fantasydata
                        );
                        playercount++
                    }
                    else {
                        console.log("Some Fantasy score missing");
                    }

                }
                else {
                    // console.log("Team not in TI7");
                }
            }
        );
        console.log("MATCH ID IS ::" + matchid + "  Players :" + playercount);
    },
});

roundToOneDecimal = function (input) {
    return Math.round(input * 10) / 10;
};
roundToTwoDecimal = function (input) {
    return Math.round(input * 100) / 100;
};

getLeagueName = function (leagueid) {
    var result = LeagueInfo.findOne({leagueid: leagueid});
    return result.name;
};

ValidFantasy = function (onePlayer, matchdata) {
    var valid = true;
    if (onePlayer.kills == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + "has null KILLS");
    }
    if (onePlayer.deaths == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + "has null DEATHS");
        valid = false;
    }
    if (onePlayer.last_hits == null || onePlayer.denies == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null LAST HIT, DENIES");
    }
    if (onePlayer.gold_per_min == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null GPM");
    }
    if (onePlayer.tower_kills == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null TOWER KILLED");
    }
    if (onePlayer.roshan_kills == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null Roshan KILLS");
    }
    if (onePlayer.assists == null || onePlayer.kills == null) {
        // valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null TEAMFIGHT");
    }
    if (onePlayer.obs_placed == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null WARDS");
    }
    if (onePlayer.camps_stacked == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null CAMPS STACK");
    }
    if (onePlayer.rune_pickups == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null RUNES");
    }
    if (onePlayer.kills_log == null) {
        // valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null FB");
    }
    if (onePlayer.stuns == null) {
        valid = false;
        console.log("Player : " + onePlayer.account_id + " from Match : " + matchdata.match_id + " has null STUNS");
    }
    return valid;
};

getTeamFight = function (onePlayer, matchdata) {
    // var teamkills =
    var isRadiant = onePlayer.isRadiant;
    var teamkills;
    if (onePlayer.isRadiant) {
        teamkills = parseInt(matchdata.radiant_score);
    }
    else {
        teamkills = parseInt(matchdata.dire_score);
    }
    var teamfight = (onePlayer.kills + onePlayer.assists) / teamkills;
    return roundToTwoDecimal(teamfight * 3.0);
};

getFirstBlood = function (onePlayer, matchdata) {
    var firstBlood = false;

    var firstBloodTime = parseInt(matchdata.first_blood_time);
    var firstKillTime = parseInt(onePlayer.kills_log[0].time);
    if (Math.abs(firstBloodTime - firstKillTime) < 2) {
        firstBlood = true;
    }
    if (firstBlood) {
        return roundToTwoDecimal(4);
    }
    else {
        return roundToTwoDecimal(0);
    }
};