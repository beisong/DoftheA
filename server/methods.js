import { HTTP } from "meteor/http";
import { TIleagueId } from "./../lib/methods";
import {Meteor} from "meteor/meteor";


//WED, August 15, 2018 6:00:00 PM GMT+08:00                 1534327200
//ThUR, August 16, 2018 6:00:00 PM GMT+08:00                1534413600
//FRI, August 17, 2018 6:00:00 PM GMT+08:00                 1534500000
//SAT, August 18, 2018 6:00:00 PM GMT+08:00                 1534586400
//SUN, August 19, 2018 6:00:00 PM GMT+08:00                 1534672800
//MON, August 20, 2018 6:00:00 PM GMT+08:00                 1534759200
//TUE, August 21, 2018 6:00:00 PM GMT+08:00                 1534845600
//WED, August 21, 2018 6:00:00 PM GMT+08:00                 1534932000
//THUR, August 21, 2018 6:00:00 PM GMT+08:00                1535018400
//FRI, August 21, 2018 6:00:00 PM GMT+08:00                 1535104800
//SAT, August 21, 2018 6:00:00 PM GMT+08:00                 1535191200
//SUN, August 21, 2018 6:00:00 PM GMT+08:00                 1535277600


//FRI, August 17, 2018 6:00:00 PM GMT+08:00                 1534525200

//TI 7 TEAM
var TI7teams = TeamData.find({leaguename: 'The International 2017'})
    .map(function (team) {
        return team.teamid;
    });
//TI 8 TEAM
var TI8teams = TeamData.find({leaguename: 'The International 2018'})
    .map(function (team) {
        return team.teamid;
    });

// var TI8teams =
//     [2586976, 39, 5, 15, 1883502, 2163, 1375614, 1838315, 2108395, 350190, 67, 543897, 726228, 5066616, 5026801, 5027210, 5228654, 5229127];


// TI TEAMS
// var TIteams = TeamData.find({leaguename: 'The International 2021'})
//     .map(function (team) {
//         return team.teamid;
//     });


var TIteams = [726228, 1883502, 39, 15, 350190, 2586976, 111474, 7390454, 5,8214850, 6209166, 8254400, 7391077, 8260983, 8255756, 7119388, 8204512, 1838315];

var TeamList = TIteams;


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

    }, getDPCList: function () {
        var pipeline = [
            {'$match': {'leagueid': {'$nin': [9870, 5401]}}},
            {
                "$group": {
                    "_id": "$leagueid",
                    "nummatch": {"$sum": 1},
                    "leagueid": {"$first": "$leagueid"},
                    "leaguename": {"$first": "$leaguename"}
                }
            },
            {
                "$sort": {
                    "leagueid": -1
                }
            }
        ];

        return FantasyData.aggregate(
            pipeline
        );
        // return FantasyData.find().fetch();

    },
    getTeamList: function () {
        return TeamData.find({}).fetch();
    },
    getLeagueTeamList: function (leagueid, stage, day) {
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
        if (stage) {
            pipeline[0].$match =
            {
                "leagueid": leagueid,
                "stage": stage,

            };
            if (day) {
                pipeline[0].$match =
                {
                    "leagueid": leagueid,
                    "stage": stage,
                    "day": day,

                };
            }
        }
        return FantasyData.aggregate(
            pipeline
        );
    },

    //  ----------     PRETI8
    getTI8TeamList: function () {
        var pipeline = [
            {
                "$match": {
                    "teamid": {"$in": TI8teams}
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
    //  ----------     PRETI8

    //  ----------     DPC19
    getTITeamList: function () {
        var pipeline = [
            {
                "$match": {
                    "teamid": {"$in": TIteams}
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
    //  ----------     PRETI8

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

    getLeagueTeamaverage: function (leagueid, teamid) {
        var pipeline = [
            {
                "$match": {
                    "teamid": teamid
                }
            },
            {
                $group: {
                    _id: "$name",
                    kills: {$avg: "$kills"},
                    deaths: {$avg: "$deaths"},
                    cs: {$avg: "$cs"},
                    gpm: {$avg: "$gpm"},
                    towerkill: {$avg: "$towerkill"},
                    roshankill: {$avg: "$roshankill"},
                    teamfight: {$avg: "$teamfight"},
                    wardsplaced: {$avg: "$wardsplaced"},
                    campsstacked: {$avg: "$campsstacked"},
                    runesgrabbed: {$avg: "$runesgrabbed"},
                    firstblood: {$avg: "$firstblood"},
                    stuns: {$avg: "$stuns"},
                    fantasy_point: {$avg: "$fantasy_point"},
                    role: {$first: "$role"}
                }
            },
            {
                $project: {
                    kills: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$kills', 100]},
                                    {$mod: [{$multiply: ['$kills', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    deaths: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$deaths', 100]},
                                    {$mod: [{$multiply: ['$deaths', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    cs: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$cs', 100]},
                                    {$mod: [{$multiply: ['$cs', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    gpm: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$gpm', 100]},
                                    {$mod: [{$multiply: ['$gpm', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    towerkill: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$towerkill', 100]},
                                    {$mod: [{$multiply: ['$towerkill', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    roshankill: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$roshankill', 100]},
                                    {$mod: [{$multiply: ['$roshankill', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    teamfight: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$teamfight', 100]},
                                    {$mod: [{$multiply: ['$teamfight', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    wardsplaced: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$wardsplaced', 100]},
                                    {$mod: [{$multiply: ['$wardsplaced', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    campsstacked: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$campsstacked', 100]},
                                    {$mod: [{$multiply: ['$campsstacked', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    runesgrabbed: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$runesgrabbed', 100]},
                                    {$mod: [{$multiply: ['$runesgrabbed', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    firstblood: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$firstblood', 100]},
                                    {$mod: [{$multiply: ['$firstblood', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    stuns: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$stuns', 100]},
                                    {$mod: [{$multiply: ['$stuns', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    fantasy_point: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$fantasy_point', 100]},
                                    {$mod: [{$multiply: ['$fantasy_point', 100]}, 1]}
                                ]
                            },
                            100]
                    },
                    role: 1
                }
            },
            {$sort:
                {
                    fantasy_point:-1
                }
            }
        ];


        if (leagueid) {
            pipeline[0].$match = {
                "leagueid": leagueid,
                "teamid": teamid
            };
        }
        return FantasyData.aggregate(
            pipeline
        );
    },
    getLeagueMVP: function (role, leagueid, stage, day) {
        var pipeline = [
                {
                    $match: {
                        "role": role
                    }
                },
                {
                    $group: {
                        _id: "$name",
                        team: {$first: "$team"},
                        teamid: {$first: "$teamid"},
                        fantasy_point: {$avg: "$fantasy_point"},
                        match_played: {$sum: 1},
                        match_won: {
                            $sum: {
                                $cond: [
                                    {"$eq": ["$gamewon", "Won"]}, 1, 0
                                ]
                            }
                        }

                    }
                },
                {
                    $sort: {
                        fantasy_point: -1
                    }
                }
                ,
                {
                    $project: {
                        fantasy_point: {
                            $divide: [
                                {
                                    $subtract: [
                                        {$multiply: ['$fantasy_point', 100]},
                                        {$mod: [{$multiply: ['$fantasy_point', 100]}, 1]}
                                    ]
                                },
                                100]
                        }
                        ,
                        team: 1,
                        teamid: 1,
                        match_played: 1,
                        winrate: {
                            $trunc: {
                                $multiply: [
                                    {
                                        $divide: ['$match_won', '$match_played']
                                    }, 100]
                            }
                        }

                    }
                }
                ,
                {
                    $limit: 18
                }
            ]
            ;

        if (leagueid) {
            if (stage) {
                pipeline[0].$match =
                {
                    "leagueid": leagueid,
                    "role": role,
                    "stage": stage,

                };
                if (day) {
                    pipeline[0].$match =
                    {
                        "leagueid": leagueid,
                        "role": role,
                        "stage": stage,
                        "day": day,

                    };
                }
            }
            else {
                pipeline[0].$match =
                {
                    "leagueid": leagueid,
                    "role": role
                };
            }
        }

        console.log(pipeline);
        return FantasyData.aggregate(
            pipeline
        );

    },
    getpreti8MVP: function (role) {
        var pipeline = [
            {
                $match: {
                    "role": role,
                    "teamid": {"$in": TI8teams},
                    "starttime": {"$gt": new Date("2017-09-01T00:00:00.000Z")}

                    //time later than last year
                }
            },
            {
                $group: {
                    _id: "$name",
                    team: {$first: "$team"},
                    teamid: {$first: "$teamid"},
                    fantasy_point: {$avg: "$fantasy_point"},
                    match_played: {$sum: 1},
                    match_won: {
                        $sum: {
                            $cond: [
                                {"$eq": ["$gamewon", "Won"]}, 1, 0
                            ]
                        }
                    }

                }
            },
            {
                $sort: {
                    fantasy_point: -1
                }
            }
            ,
            {
                $project: {
                    fantasy_point: {
                        $divide: [
                            {
                                $subtract: [
                                    {$multiply: ['$fantasy_point', 100]},
                                    {$mod: [{$multiply: ['$fantasy_point', 100]}, 1]}
                                ]
                            },
                            100]
                    }
                    ,
                    team: 1,
                    teamid: 1,
                    match_played: 1,
                    winrate: {
                        $trunc: {
                            $multiply: [
                                {
                                    $divide: ['$match_won', '$match_played']
                                }, 100]
                        }
                    }

                }
            }
            ,
            {$limit: 18}
        ];

        return FantasyData.aggregate(
            pipeline
        );

    },UpdateDPCMVP: function () {
        MvpData.rawCollection().drop();
        aggregateMVP  ('Core');
        aggregateMVP  ('Support');
        aggregateMVP  ('Mid');
    },
    UpdateTIMVP: function (day) {
        if(day){
            TIMvpData.remove({day:day});
            aggregateTIMVP  ('Core', day);
            aggregateTIMVP  ('Support',day);
            aggregateTIMVP  ('Mid', day);
        }
        else{
            for ( let i =1; i<=10; i++){
                TIMvpData.remove({day:i});
                aggregateTIMVP  ('Core', i);
                aggregateTIMVP  ('Support',i);
                aggregateTIMVP  ('Mid', i);
            }
        }
    },
    UpdateTILEAGUEMVP: function () {
        TIMvpData.remove({league:true});
        aggregateTILEAGUEMVP  ('Core');
        aggregateTILEAGUEMVP  ('Support');
        aggregateTILEAGUEMVP  ('Mid');
    },
    UpdateTeamsAVG: function () {   // db.fantasydata.remove({teamid:39, name:'gpk~'})
        TeamAVGData.rawCollection().drop();
        // TeamList.forEach(function(oneTeam){
        //     aggregateTeam (oneTeam);
        // })
        TIteams.forEach(function(oneTeam){
            aggregateTeam (oneTeam);
        })
        // aggregateTeam (1883502);

    },
    initLeagueData: function () {
        this.unblock();
        var result = HTTP.call("GET", "https://api.opendota.com/api/leagues");
        var allleaguedata = result.data;
        // console.log(allleaguedata);
        allleaguedata.forEach(function (oneLeague) {
            LeagueInfo.update(
                {leagueid: oneLeague.leagueid},
                {
                    $setOnInsert: {
                        name: oneLeague.name,
                        tier: oneLeague.tier,
                        banner: oneLeague.banner,
                        ticket: oneLeague.ticket,
                    }
                },
                {upsert: true}
            );

            // LeagueInfo.insert({
            //     leagueid: oneLeague.leagueid,
            //     name: oneLeague.name,
            //     tier: oneLeague.tier,
            //     banner: oneLeague.banner,
            //     ticket: oneLeague.ticket,
            // });
        });
        return 'initLeagueData done';
    }
    ,
    initPlayerData: function () {
        this.unblock();
        var result = HTTP.call("GET", "https://api.opendota.com/api/proPlayers");
        var allPlayerData = result.data;
        allPlayerData.forEach(function (onePlayer) {
            ProPlayerData.insert(onePlayer);
        });

        console.log(allPlayerData.length + "  Proplayer inserted");
        return 'initPlayerData done';
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
        TeamData.insert({teamid: 4593831, teamname: 'PlanetDog', leaguename: 'The International 2017'});
        TeamData.insert({teamid: 3214108, teamname: 'Team NP', leaguename: 'The International 2017'});
        return 'initTI7Teams done';
    },
    initTI8Teams: function () {
        this.unblock();
        TeamData.insert({teamid: 2586976, teamname: 'OG', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 39, teamname: 'Evil Geniuses', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 5, teamname: 'Invictus Gaming', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 15, teamname: 'LGD Gaming', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 1883502, teamname: 'Virtus Pro', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 2163, teamname: 'Team Liquid', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 1375614, teamname: 'Newbee', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 1838315, teamname: 'Team Secret', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 2108395, teamname: 'TNC', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 350190, teamname: 'Fnatic', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 67, teamname: 'Pain Gaming', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 543897, teamname: 'Mineski', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 726228, teamname: 'Vici Gaming', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 5021898, teamname: 'Team Serenity', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 5026801, teamname: 'Optic Gaming', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 5027210, teamname: 'VGJ Thunder', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 5228654, teamname: 'VGJ Storm', leaguename: 'The International 2018'});
        TeamData.insert({teamid: 5229127, teamname: 'Winstrike', leaguename: 'The International 2018'});
        return 'initTI8Teams done';

    },
    initTI10Teams: function () {
        this.unblock();
        TeamData.insert({teamid: 1838315, teamname: 'Team Secret', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 1883502, teamname: 'Virtus Pro', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 726228, teamname: 'Vici Gaming', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 39, teamname: 'Evil Geniuses', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 15, teamname: 'PSG.LGD', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 350190, teamname: 'Fnatic', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 2586976, teamname: 'OG', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 111474, teamname: 'Alliance', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 7390454, teamname: 'Quincy Crew', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 5, teamname: 'Invictus Gaming', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 8214850, teamname: 'T1', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 6209166, teamname: 'Team Aster', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 8254400, teamname: 'Beastcoast', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 7391077, teamname: 'Thunder Predator', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 8260983, teamname: 'Team Undying', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 8255756, teamname: 'SG esports', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 7119388, teamname: 'Team Spirit', leaguename: 'The International 2021'});
        TeamData.insert({teamid: 8204512, teamname: 'Elephant', leaguename: 'The International 2021'});
        console.log("TI10 Teams inserted");
        return 'initTI10Teams done';

    },
    updateDPCmvp: function(){
       console.log("Updating DPC MVP");
    },
    getLeagueData: function (leagueid) {
        this.unblock();
        console.log("LEAGUE ID IS :" + leagueid);
        var apistring = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=" + leagueid + "&key=" + Meteor.settings.steamKey

        console.log(apistring);
        var result = HTTP.call("GET", apistring);
        // console.log(result.data);
        // console.log("apistring : " + apistring);
        var leaguedata = result.data;
        var leaguematches = leaguedata.result.matches;
        var leagueinfo = LeagueInfo.findOne({leagueid: parseInt(leagueid)});
        var leaguename = leagueinfo.name;

        var count = 0;

        leaguematches.forEach(function (oneMatch) {
//          Compare radient dire team belongs to ti7 teams before adding to db
                if (TeamList.includes(oneMatch.radiant_team_id) || TeamList.includes(oneMatch.dire_team_id)) {
                    count++;
                    console.log("/" + count + "/ Inserting match_id: " + oneMatch.match_id);
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
        return count;
    },
    fetchParseLeague: function (leagueid) {
        this.unblock();
        console.log("LEAGUE ID IS :" + leagueid);
        var apistring = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=" + leagueid + "&key=" + Meteor.settings.steamKey

        console.log(apistring);
        var result = HTTP.call("GET", apistring);
        var leaguedata = result.data;
        var leaguematches = leaguedata.result.matches;
        // var leagueinfo = LeagueInfo.findOne({leagueid: parseInt(leagueid)});
        // var leaguename = leagueinfo.name;
        var t0 = Date.now();
        var totalexcutime;
        var count = 0;
        var rollingcount=0;

        leaguematches.forEach(function (oneMatch) {
            rollingcount++;
//          Compare radient dire team belongs to ti7 teams before adding to db
            if (TeamList.includes(oneMatch.radiant_team_id) || TeamList.includes(oneMatch.dire_team_id)) {
                Meteor.call("insertMatchFantasy", oneMatch.match_id, function (error, results) {
                        var t1 = Date.now();
                        var executionms = t1 - t0;

                        if (executionms < 1000) {    // make sure each api call at least 1 sec ; 60 call / min
                            var sleeptime = 1000 - executionms;
                            sleep(sleeptime);
                        }
                        totalexcutime = Date.now() - t0;
                        t0 = Date.now();
                    });
                    count++;
                    console.log(rollingcount+" / "+leaguematches.length+" -- "+count+" MatchID : " + oneMatch.match_id + " in " + totalexcutime + "ms");
            }
            else{
                    console.log(rollingcount+"/ "+leaguematches.length);
            }

        });
        return count;
    },
    insertLeagueFantasy: function (leagueid) {
        this.unblock();
        var t0 = Date.now();
        var totalexcutime;
        var matchcount = 0;
        var leagueMatchesResult = LeagueData.find({league_id: leagueid});
        leagueMatchesResult.forEach(function (oneMatch) {
            Meteor.call("insertMatchFantasy", oneMatch.match_id, function (error, results) {
                var t1 = Date.now();
                var executionms = t1 - t0;

                if (executionms < 1000) {    // make sure each api call at least 1 sec ; 60 call / min
                    var sleeptime = 1000 - executionms;
                    sleep(sleeptime);
                }
                totalexcutime = Date.now() - t0;
                t0 = Date.now();
            });
            matchcount++;
            console.log(" ///  " + matchcount + " ///  MatchID : " + oneMatch.match_id + " in " + totalexcutime + "ms");
        });
        return matchcount;
    }, insertTI8Fantasy: function (day) {
        this.unblock();

//MON, August 20, 2018 6:00:00 PM GMT+08:00                 1534759200
//TUE, August 21, 2018 6:00:00 PM GMT+08:00                 1534845600
//WED, August 21, 2018 6:00:00 PM GMT+08:00                 1534932000
//THUR, August 21, 2018 6:00:00 PM GMT+08:00                1535018400
//FRI, August 21, 2018 6:00:00 PM GMT+08:00                 1535104800
//SAT, August 21, 2018 6:00:00 PM GMT+08:00                 1535191200
//SUN, August 21, 2018 6:00:00 PM GMT+08:00                 1535277600


        var startime, endtime;
        console.log(day);
        switch (day) {
            case 1:
                startime = 1534327200;
                endtime = 1534413600;
                break;
            case 2:
                startime = 1534413600;
                endtime = 1534500000;
                break;
            case 3:
                startime = 1534500000;
                endtime = 1534586400;
                break;
            case 4:
                startime = 1534586400;
                endtime = 1534672800;
                break;
            case 5:
                startime = 1534759200;
                endtime = 1534845600;
                break;
                break;
            case 6:
                startime = 1534845600;
                endtime = 1534932000;
                break;
                break;
            case 7:
                startime = 1534932000;
                endtime = 1535018400;
                break;
                break;
            case 8:
                startime = 1535018400;
                endtime = 1535104800;
                break;
                break;
            case 9:
                startime = 1535104800;
                endtime = 1535191200;
                break;
            case 10:
                startime = 1535191200;
                endtime = 1535277600;
                break;
            default:
        }

        var apistring = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=9870&key=" + Meteor.settings.steamKey
        console.log(apistring);
        var result = HTTP.call("GET", apistring);
        // console.log(result.data);
        var leaguedata = result.data;
        var leaguematches = leaguedata.result.matches;
        var matchcount = 0;
        leaguematches.forEach(function (oneMatch) {
            if (oneMatch.start_time > startime && endtime > oneMatch.start_time) {
                var t0 = Date.now();
                var totalexcutime = 0;
                Meteor.call("insertMatchFantasy", oneMatch.match_id, day, function (error, results) {
                    var t1 = Date.now();
                    var executionms = t1 - t0;
                    if (executionms < 1000) {    // make sure each api call at least 1 sec ; 60 call / min
                        var sleeptime = 1000 - executionms;
                        sleep(sleeptime);
                    }
                    totalexcutime = Date.now() - t0;
                    t0 = Date.now();
                    console.log(" ///  " + matchcount + " ///  MatchID : " + oneMatch.match_id + " in " + totalexcutime + "ms");
                });
                matchcount++;

            }
            return matchcount;

        });
    },
    insertTIFantasy: function (day) {
        this.unblock();
        var startime, endtime;
        console.log(day);
        switch (day) {
            case 1:
                startime = getDayStartEpoch(1);
                endtime = getDayStartEpoch(2);
                break;
            case 2:
                startime = getDayStartEpoch(2);
                endtime = getDayStartEpoch(3);
                break;
            case 3:
                startime = getDayStartEpoch(3);
                endtime = getDayStartEpoch(4);
                break;
            case 4:
                startime = getDayStartEpoch(4);
                endtime = getDayStartEpoch(5);
                break;
            case 5:
                startime = getDayStartEpoch(5);
                endtime = getDayStartEpoch(6);
                break;
            case 6:
                startime = getDayStartEpoch(6);
                endtime = getDayStartEpoch(7);
                break;
            case 7:
                startime = getDayStartEpoch(7);
                endtime = getDayStartEpoch(8);
                break;
            case 8:
                startime = getDayStartEpoch(8);
                endtime = getDayStartEpoch(9);
                break;
            case 9:
                startime = getDayStartEpoch(9);
                endtime = getDayStartEpoch(10);
                break;
            case 10:
                startime = getDayStartEpoch(10);
                endtime = getDayStartEpoch(11);
                break;
            default:
        }

        var apistring = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id="+ TIleagueId +"&key=" + Meteor.settings.steamKey
        console.log(apistring);
        var result = HTTP.call("GET", apistring);
        // console.log(result.data);
        var leaguedata = result.data;
        var leaguematches = leaguedata.result.matches;
        var matchcount = 0;
        leaguematches.forEach(function (oneMatch) {
            if (oneMatch.start_time > startime && endtime > oneMatch.start_time) {
                var t0 = Date.now();
                var totalexcutime = 0;
                Meteor.call("insertMatchFantasy", oneMatch.match_id, day, function (error, results) {
                    var t1 = Date.now();
                    var executionms = t1 - t0;
                    if (executionms < 1000) {    // make sure each api call at least 1 sec ; 60 call / min
                        var sleeptime = 1000 - executionms;
                        sleep(sleeptime);
                    }
                    totalexcutime = Date.now() - t0;
                    t0 = Date.now();
                    console.log(" ///  " + matchcount + " ///  MatchID : " + oneMatch.match_id + " in " + totalexcutime + "ms");
                });
                matchcount++;

            }
            return matchcount;

        });
    },
        autoInsertTIFantasy: function () {
        this.unblock();
        console.log("Auto Inserting");
        var latestMatchInDB = LeagueInfo.find({TI9latestmatch:true}).fetch()[0].data;
        console.log("Latest Match Time in DB :            " + latestMatchInDB);

        var apistring = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=13256&key=" + Meteor.settings.steamKey
        var result = HTTP.call("GET", apistring);
        var leaguedata = result.data;
        var leaguematches = leaguedata.result.matches;
        var matchcount = 0;


        let now= parseInt(new Date() / 1000);
        let day = getDay(now);
        // console.log("day is : " + day);

        // var ti9start = 1633564800;
        // var ti9end = 1633910400;
        let daystart = getDayStartEpoch(10);
        let dayend = getDayStartEpoch(11);

        var logfirstmatch = true;
        leaguematches.forEach(function (oneMatch) {
            if(logfirstmatch){
                console.log("Latest MatchID fetch    : "+oneMatch.match_id);
                logfirstmatch = false;
            }
            if(oneMatch.start_time < daystart || dayend < oneMatch.start_time){
                return;
            }
            if (oneMatch.start_time > (latestMatchInDB - 600)) { // if within 10 min of latestMatchInDB parse
                latestMatchInDB = oneMatch.start_time;
                LeagueInfo.update(
                    {TI9latestmatch:true},
                    {$set:
                        {data:oneMatch.start_time}
                    },
                    {upsert: true}
                    );

                var t0 = Date.now();
                var totalexcutime = 0;
                Meteor.call("insertMatchFantasy", oneMatch.match_id, day, function (error, results) {
                    var t1 = Date.now();
                    var executionms = t1 - t0;
                    if (executionms < 1000) {    // make sure each api call at least 1 sec ; 60 call / min
                        var sleeptime = 1000 - executionms;
                        sleep(sleeptime);
                    }
                    totalexcutime = Date.now() - t0;
                    t0 = Date.now();
                    console.log(" ///  " + matchcount + " ///  MatchID : " + oneMatch.match_id + " in " + totalexcutime + "ms");
                });
                matchcount++;
            }
            return matchcount;
        });
    },
    insertMatchFantasy: function (matchid, day) {       // Match ID to be changed to league id
        this.unblock();

        var playercount = 0;
        var results = HTTP.call("GET", "https://api.opendota.com/api/matches/" + matchid);

        var fantasydata = {};

        var matchdata = results.data;
        var playerdata = matchdata.players;
        if (day) {
            if (day <= 4) {
                fantasydata.day = day;
                fantasydata.stage = 'group';
            } else {
                fantasydata.day = day - 4;
                fantasydata.stage = 'main';
            }
        }

        fantasydata.matchid = matchdata.match_id;
        fantasydata.leagueid = matchdata.league.leagueid;
        fantasydata.leaguename = matchdata.league.name;
        fantasydata.length = matchdata.duration;

        //convert date to javascript date object
        var matchstarttime = new Date(0); // The 0 there is the key, which sets the date to the epoch
        matchstarttime.setUTCSeconds(matchdata.start_time);
        fantasydata.starttime = matchstarttime;


        playerdata.forEach(function (onePlayer) {
                //Get role for player
                var playerresult = ProPlayerData.findOne({account_id: onePlayer.account_id});
                var toinsert = true;


                fantasydata.name = onePlayer.name;
                fantasydata.accountid = onePlayer.account_id;
                // console.log(onePlayer.name);
                if (matchdata.hasOwnProperty('radiant_team') && onePlayer.isRadiant) {
                    // console.log("RAD TEAM");
                    fantasydata.team = matchdata.radiant_team.name;
                    fantasydata.teamid = parseInt(matchdata.radiant_team.team_id);
                }
                else if (matchdata.hasOwnProperty('dire_team') && !onePlayer.isRadiant) {
                    // console.log("DIRE TEAM");
                    fantasydata.team = matchdata.dire_team.name;
                    fantasydata.teamid = parseInt(matchdata.dire_team.team_id);
                }
                else {
                    // console.log("returning");
                    return;
                }

                if (TeamList.includes(fantasydata.teamid) || TeamList.includes(fantasydata.teamid)) {
                    // console.log(fantasydata.team + ":" + fantasydata.teamid);
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
                                    case 4:
                                        fantasydata.role = 'Mid';
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

                        // fantasydata.teamfight = getTeamFight(onePlayer, matchdata);
                        fantasydata.teamfight = roundToTwoDecimal(3 * onePlayer.teamfight_participation);
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
                        //
                        // FantasyData.insert(
                        //     fantasydata
                        // );
                        FantasyData.update(
                            {
                                leagueid: matchdata.league.leagueid,
                                matchid: matchdata.match_id,
                                accountid: fantasydata.accountid,
                            },
                            {
                                $setOnInsert: {
                                    day: fantasydata.day,
                                    stage: fantasydata.stage,
                                    matchid: fantasydata.matchid,
                                    leagueid: fantasydata.leagueid,
                                    leaguename: fantasydata.leaguename,
                                    length: fantasydata.length,
                                    starttime: fantasydata.starttime,
                                    name: fantasydata.name,
                                    accountid: fantasydata.accountid,
                                    team: fantasydata.team,
                                    teamid: fantasydata.teamid,
                                    role: fantasydata.role,
                                    gamewon: fantasydata.gamewon,
                                    teamfight: fantasydata.teamfight,
                                    firstblood: fantasydata.firstblood,
                                    kills: fantasydata.kills,
                                    deaths: fantasydata.deaths,
                                    cs: fantasydata.cs,
                                    gpm: fantasydata.gpm,
                                    towerkill: fantasydata.towerkill,
                                    roshankill: fantasydata.roshankill,
                                    wardsplaced: fantasydata.wardsplaced,
                                    campsstacked: fantasydata.campsstacked,
                                    runesgrabbed: fantasydata.runesgrabbed,
                                    stuns: fantasydata.stuns,
                                    fantasy_point: fantasydata.fantasy_point,
                                }
                            },
                            {upsert: true}
                        );

                        playercount++
                    }
                    else {
                        console.log("Some Fantasy score missing");
                    }
                }
                else {
                    console.log("Team not in TI");
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
    if (onePlayer.firstblood_claimed > 0) {
        firstBlood = true;
    }
    if (firstBlood) {
        return roundToTwoDecimal(4);
    }
    else {
        return roundToTwoDecimal(0);
    }
    // var firstBloodTime = parseInt(matchdata.first_blood_time);
    // if (onePlayer.kills_log[0]) {
    //     var firstKillTime = parseInt(onePlayer.kills_log[0].time);
    //     if (Math.abs(firstBloodTime - firstKillTime) < 2) {
    //         firstBlood = true;
    //     }
    //     if (firstBlood) {
    //         return roundToTwoDecimal(4);
    //     }
    //     else {
    //         return roundToTwoDecimal(0);
    //     }
    // }
    // else {
    //     return roundToTwoDecimal(0);
    // }
};


sleep = function (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

aggregateMVP = function (role){
    var pipeline = [
        {
            $match: {
                "role": role,
                "teamid": {"$in": TIteams},
                "starttime": {"$gt": new Date("2020-09-01T00:00:00.000Z")}

                //time later than last year
            }
        },
        {
            $group: {
                _id: "$name",
                team: {$first: "$team"},
                teamid: {$first: "$teamid"},
                fantasy_point: {$avg: "$fantasy_point"},
                match_played: {$sum: 1},
                match_won: {
                    $sum: {
                        $cond: [
                            {"$eq": ["$gamewon", "Won"]}, 1, 0
                        ]
                    }
                }

            }
        },
        {
            $sort: {
                fantasy_point: -1
            }
        }
        ,
        {
            $project: {
                fantasy_point: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$fantasy_point', 100]},
                                {$mod: [{$multiply: ['$fantasy_point', 100]}, 1]}
                            ]
                        },
                        100]
                }
                ,
                role:1,
                team: 1,
                teamid: 1,
                match_played: 1,
                winrate: {
                    $trunc: {
                        $multiply: [
                            {
                                $divide: ['$match_won', '$match_played']
                            }, 100]
                    }
                }

            }
        }
        ,
        {$limit: 18}
    ]
    var result = FantasyData.aggregate(
        pipeline
    );

    let rank = 0;

    result.forEach(function (oneMVP) {
        rank ++;
        oneMVP.rank = rank;
        oneMVP.role = role;
        MvpData.insert(oneMVP);
    });

    console.log(role + "MVP Parsed");
}

aggregateTIMVP = function (role, day){
    var stageday ,stage;
    if (day <= 4) {
        stageday = day;
        stage = 'group';
    } else {
        stageday = day - 4;
        stage = 'main';
    }
    var pipeline = [
        {
            $match: {
                "role": role,
                "teamid": {"$in": TIteams},
                "leagueid": TIleagueId,
                "stage": stage,
                "day": stageday
            }
        },
        {
            $group: {
                // _id: new Meteor.Collection.ObjectID()._str,
                _id: {
                    name:"$name",
                    // stage:"$stage",
                    day:"$day"
                    },
                name: {$first:"$name"},
                team: {$first: "$team"},
                teamid: {$first: "$teamid"},
                fantasy_point: {$avg: "$fantasy_point"},
                match_played: {$sum: 1},
                match_won: {
                    $sum: {
                        $cond: [
                            {"$eq": ["$gamewon", "Won"]}, 1, 0
                        ]
                    }
                }
            }
        },
        {
            $project: {
                name:1,
                fantasy_point:1,
                total: {
                    $multiply: ['$match_played', '$fantasy_point']
                },
                role:1,
                team: 1,
                teamid: 1,
                match_played: 1,
                winrate: {
                    $trunc: {
                        $multiply: [
                            {
                                $divide: ['$match_won', '$match_played']
                            }, 100]
                    }
                }
            }
        },
        {
            $sort: {
                total: -1
            }
        }
        ,
        {$limit: 18}
    ]
    var result = FantasyData.aggregate(
        pipeline
    );
    
    let rank = 0;

    result.forEach(function (oneMVP) {
        rank++;
        oneMVP.rank = rank;
        oneMVP.role = role;
        oneMVP.day = day;
        oneMVP._id = new Mongo.ObjectID()._str;
        TIMvpData.insert(oneMVP);
    });

    console.log("DAY "+ day + " : " + role + " Parsed");
}
aggregateTILEAGUEMVP = function (role){
    // console.log("aggregateTILEAGUEMVP");
    var pipeline = [
        {
            $match: {
                "role": role,
                "teamid": {"$in": TIteams},
                "leagueid": TIleagueId,
            }
        },
        {
            $group: {
                _id: "$name",
                name:{$first:  "$name"},
                team: {$first: "$team"},
                teamid: {$first: "$teamid"},
                fantasy_point: {$avg: "$fantasy_point"},
                match_played: {$sum: 1},
                match_won: {
                    $sum: {
                        $cond: [
                            {"$eq": ["$gamewon", "Won"]}, 1, 0
                        ]
                    }
                }

            }
        },
        {
            $project: {
                name:1,
                fantasy_point:1,
                total: {
                    $multiply: ['$match_played', '$fantasy_point']
                },
                role:1,
                team: 1,
                teamid: 1,
                match_played: 1,
                winrate: {
                    $trunc: {
                        $multiply: [
                            {
                                $divide: ['$match_won', '$match_played']
                            }, 100]
                    }
                }

            }
        },
        {
            $sort: {
                fantasy_point: -1
            }
        }
        ,
        {$limit: 18}
    ]
    var result = FantasyData.aggregate(
        pipeline
    );

    let rank = 0;

    result.forEach(function (oneMVP) {
        oneMVP._id = new Mongo.ObjectID()._str;
        rank++;
        oneMVP.rank = rank;
        oneMVP.role = role;
        oneMVP.league = true;
        TIMvpData.insert(oneMVP);
    });

    console.log("TI10   : "+role + " Parsed");
}

aggregateTeam = function (teamid){
    var pipeline = [
        {
            "$match": {
                "teamid": teamid
            }
        },
        {
            $group: {
                _id: "$name",
                kills: {$avg: "$kills"},
                deaths: {$avg: "$deaths"},
                cs: {$avg: "$cs"},
                gpm: {$avg: "$gpm"},
                towerkill: {$avg: "$towerkill"},
                roshankill: {$avg: "$roshankill"},
                teamfight: {$avg: "$teamfight"},
                wardsplaced: {$avg: "$wardsplaced"},
                campsstacked: {$avg: "$campsstacked"},
                runesgrabbed: {$avg: "$runesgrabbed"},
                firstblood: {$avg: "$firstblood"},
                stuns: {$avg: "$stuns"},
                fantasy_point: {$avg: "$fantasy_point"},
                role: {$first: "$role"}
            }
        },
        {
            $project: {
                kills: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$kills', 100]},
                                {$mod: [{$multiply: ['$kills', 100]}, 1]}
                            ]
                        },
                        100]
                },
                deaths: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$deaths', 100]},
                                {$mod: [{$multiply: ['$deaths', 100]}, 1]}
                            ]
                        },
                        100]
                },
                cs: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$cs', 100]},
                                {$mod: [{$multiply: ['$cs', 100]}, 1]}
                            ]
                        },
                        100]
                },
                gpm: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$gpm', 100]},
                                {$mod: [{$multiply: ['$gpm', 100]}, 1]}
                            ]
                        },
                        100]
                },
                towerkill: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$towerkill', 100]},
                                {$mod: [{$multiply: ['$towerkill', 100]}, 1]}
                            ]
                        },
                        100]
                },
                roshankill: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$roshankill', 100]},
                                {$mod: [{$multiply: ['$roshankill', 100]}, 1]}
                            ]
                        },
                        100]
                },
                teamfight: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$teamfight', 100]},
                                {$mod: [{$multiply: ['$teamfight', 100]}, 1]}
                            ]
                        },
                        100]
                },
                wardsplaced: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$wardsplaced', 100]},
                                {$mod: [{$multiply: ['$wardsplaced', 100]}, 1]}
                            ]
                        },
                        100]
                },
                campsstacked: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$campsstacked', 100]},
                                {$mod: [{$multiply: ['$campsstacked', 100]}, 1]}
                            ]
                        },
                        100]
                },
                runesgrabbed: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$runesgrabbed', 100]},
                                {$mod: [{$multiply: ['$runesgrabbed', 100]}, 1]}
                            ]
                        },
                        100]
                },
                firstblood: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$firstblood', 100]},
                                {$mod: [{$multiply: ['$firstblood', 100]}, 1]}
                            ]
                        },
                        100]
                },
                stuns: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$stuns', 100]},
                                {$mod: [{$multiply: ['$stuns', 100]}, 1]}
                            ]
                        },
                        100]
                },
                fantasy_point: {
                    $divide: [
                        {
                            $subtract: [
                                {$multiply: ['$fantasy_point', 100]},
                                {$mod: [{$multiply: ['$fantasy_point', 100]}, 1]}
                            ]
                        },
                        100]
                },
                role: 1
            }
        }
    ];


    var result = FantasyData.aggregate(
        pipeline
    );

    result.forEach(function (onePlayer) {
        onePlayer.teamid = teamid;
        TeamAVGData.insert(onePlayer);
    });

    console.log("Team : " + teamid + "Parsed");
}
