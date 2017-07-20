Meteor.methods({
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
    getLeagueData: function (leagueid) {
        this.unblock();
        console.log("LEAGUE ID IS :" + leagueid);
        var result = Meteor.http.call("GET", "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=" + leagueid + "&key=" + Meteor.settings.steamKey);
        var leaguedata = result.data;
        var leaguematches = leaguedata.result.matches;
        var leagueinfo = LeagueInfo.findOne({leagueid: parseInt(leagueid)});
        var leaguename = leagueinfo.name;
        leaguematches.forEach(function (oneMatch) {
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
        // console.log(results);

        var fantasydata = {};

        var matchdata = results.data;
        var matchid = matchdata.match_id;
        var playerdata = matchdata.players;

        fantasydata.leagueid = matchdata.leagueid;
        fantasydata.matchid = matchid;
        fantasydata.length = matchdata.duration;

        //convert date to javascript date object
        var matchstarttime = new Date(0); // The 0 there is the key, which sets the date to the epoch
        matchstarttime.setUTCSeconds(matchdata.start_time);
        fantasydata.starttime = matchstarttime;

        //get league name
        var leagueresult = LeagueInfo.findOne({leagueid: matchdata.leagueid});
        fantasydata.leaguename = leagueresult.name;

        playerdata.forEach(function (onePlayer) {
                //Get role for player
                var playerresult = ProPlayerData.findOne({account_id: onePlayer.account_id});
                // switch role;
                if (playerresult) {
                    if (playerresult.fantasy_role >= 0) {
                        switch (playerresult.fantasy_role) {
                            case 0:
                                fantasydata.role = 'Unknown';
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
                                fantasydata.role = '';
                        }
                    }
                    else {
                        fantasydata.role = '';
                        console.log(" /////////  ERROR  /////  Match:: " + matchid + " Fantasy Role Not found for player id: " + onePlayer.account_id);
                        console.log(playerresult);
                    }
                    fantasydata.name = playerresult.name;
                    fantasydata.team = playerresult.team_name;
                    fantasydata.teamid = playerresult.team_id;

                }
                else {
                    console.log(" /////////  ERROR /////  Match:: " + matchid + " Player ID not found in db: " + onePlayer.account_id);
                    fantasydata.name = "NA";
                    fantasydata.team = "NA";
                    fantasydata.teamid = "NA";
                }
                fantasydata.accountid = onePlayer.account_id;

                var gamewon;
                if ((onePlayer.isRadiant && onePlayer.radiant_win) || (!onePlayer.isRadiant && !onePlayer.radiant_win)) {
                    fantasydata.gamewon = 'Won';
                }
                else {
                    fantasydata.gamewon = 'Lost';
                }

                fantasydata.kills = roundToTwoDecimal(0.3 * onePlayer.kills);
                fantasydata.deaths = roundToTwoDecimal(3 - 0.3 * onePlayer.deaths);
                fantasydata.cs = roundToTwoDecimal(0.003 * (onePlayer.last_hits + onePlayer.denies));
                fantasydata.gpm = roundToTwoDecimal(0.002 * onePlayer.gold_per_min);
                fantasydata.towerkill = roundToTwoDecimal(onePlayer.towers_killed);
                fantasydata.roshankill = roundToTwoDecimal(onePlayer.roshans_killed);
                fantasydata.teamfight = roundToTwoDecimal(3 * onePlayer.teamfight_participation);
                fantasydata.wardsplaced = roundToTwoDecimal(0.5 * onePlayer.obs_placed);
                fantasydata.campsstacked = roundToTwoDecimal(0.5 * onePlayer.camps_stacked);
                fantasydata.runesgrabbed = roundToTwoDecimal(0.25 * onePlayer.rune_pickups);
                fantasydata.firstblood = roundToTwoDecimal(4 * onePlayer.firstblood_claimed);
                fantasydata.stuns = roundToTwoDecimal(0.05 * onePlayer.stuns);

                //Sum of all Points
                fantasydata.fantasy_point = roundToOneDecimal(fantasydata.kills +
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

                FantasyData.insert(
                    fantasydata
                );
                playercount++
            }
        );
        console.log("MATCH ID IS ::" + matchid + "  Players :" + playercount);

    },

});

roundToOneDecimal = function (input) {
    return Math.round(input * 10) / 10;
}
roundToTwoDecimal = function (input) {
    return Math.round(input * 100) / 100;
}