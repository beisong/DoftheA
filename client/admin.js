// TODO Fix Arteezy
Template.admin.onCreated(function () {
    // TODO : poll_for_update not done
    // var success = setInterval(poll_for_update, 180000);
});

Template.admin.helpers({
    oneleaguedata: function () {
        return LeagueData.findOne();
    },
    leaguedata: function () {
        return LeagueData.find();
    },

})

Template.admin.events({
    'click #initAllLeague': function (event) {
        Meteor.call("initLeagueData", function (error, results) {
            alert(results);
        });
    },
    'click #initPlayerInfo': function (event) {
        Meteor.call("initPlayerData", function (error, results) {
            alert(results);
        });
    },
    'click #initTITeams': function (event) {
        Meteor.call("initTI10Teams", function (error, results) {
            alert(results);
        });
    },
    'click #updateDPCmvp': function (event) {
        Meteor.call("UpdateDPCMVP", function (error, results) {
            // console.log(results);
        });
    },
    'click #updateTImvp': function (event) {
        Meteor.call("UpdateTI10MVP", function (error, results) {
            // console.log(results);
        });
    },
    'click #updateTeams': function (event) {
        Meteor.call("UpdateTeamsAVG", function (error, results) {
            // console.log(results);
        });
    },
    'click #fetchleaguedata': function (event) {
        var league_id = $("#leaguedata_input").val();
        Meteor.call("getLeagueData", league_id, function (error, results) {
            alert(results + " matches fetched");
        });
    },
    'click #fetchparseleague': function (event) {
        var league_id = $("#fetch_parse_league_input").val();
        Meteor.call("fetchParseLeague", league_id, function (error, results) {
            alert(results + " matches fetched");
        });
    },
    'click #parsematchfantasy': function (event) {
        var match_id = $("#parsematchfantasy_input").val();
        Meteor.call("insertMatchFantasy", match_id, function (error, results) {
        });
    },
    'click #parseleaguefantasy': function (event) {
        var league_id = $("#parseleaguefantasy_input").val();
        Meteor.call("insertLeagueFantasy", league_id, function (error, results) {
            alert(results + " matches parsed");
        });
    },
    'click #fetch_ti9': function (event) {
        var selectValue = parseInt($("#fetch_ti9_day").val());
        console.log(selectValue);
        Meteor.call("insertTI9Fantasy", selectValue, function (error, results) {
        });
    },


    /////BP
    'click #initHeroes': function (event) {
        Meteor.call("initHeroes", function (error, results) {
            if (error) {
                console.log(error);
            }
        });
    },

    /////BP
    'click #initBP': function (event) {
        Meteor.call("initBP", function (error, results) {
            if (error) {
                console.log(error);
            }
        });
    },
    'click #testbut': function (event) {
        Meteor.call("getTITeams", function (error, results) {
            if (error) {
                console.log(error);
            }
            console.log(results);
        });
    },
    'click #parsematchbp': function (event) {
        var match_id = $("#parsematchbp_input").val();        ///////////TO BE CHANGED TO LOOP LEAGUEINFO FOR MATCH ID
        console.log(match_id);
        Meteor.call("insertMatchBP", match_id, function (error, results) {
        });
    },

    'click #parseleaguebp': function (event) {
        var league_id = $("#parseleaguebp_input").val();        ///////////TO BE CHANGED TO LOOP LEAGUEINFO FOR MATCH ID
        Meteor.call("insertLeagueBP", league_id, function (error, results) {
        });
    },

    'click #parsematchbp2': function (event) {
        var match_id = $("#parsematchbp2_input").val();        ///////////TO BE CHANGED TO LOOP LEAGUEINFO FOR MATCH ID
        console.log(match_id);
        Meteor.call("insertMatchBP2", match_id, function (error, results) {
        });
    },


    'click #parseleaguebp2': function (event) {
        var league_id = $("#parseleaguebp2_input").val();        ///////////TO BE CHANGED TO LOOP LEAGUEINFO FOR MATCH ID

        Meteor.call("insertLeagueBP2", league_id, function (error, results) {
        });
    },

});


poll_for_update = function () {
    Meteor.call("insertTI8Fantasy", 3, function (error, results) {
        console.log("Match parsed:" + results);
    });
};
