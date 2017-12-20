// TODO Fix Arteezy


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
        });
    },
    'click #initPlayerInfo': function (event) {
        Meteor.call("initPlayerData", function (error, results) {
        });
    },
    'click #initTI7Teams': function (event) {
        alert("CLICKED");
        Meteor.call("initTI7Teams", function (error, results) {
        });
    },


    'click #fetchleaguedata': function (event) {
        var league_id = $("#leaguedata_input").val();
        Meteor.call("getLeagueData", league_id, function (error, results) {
        });
    },
    'click #parsematchfantasy': function (event) {
        var match_id = $("#parsematchfantasy_input").val();        ///////////TO BE CHANGED TO LOOP LEAGUEINFO FOR MATCH ID
        Meteor.call("insertMatchFantasy", match_id, function (error, results) {
        });
    },
    'click #parseleaguefantasy': function (event) {
        var league_id = $("#parseleaguefantasy_input").val();        ///////////TO BE CHANGED TO LOOP LEAGUEINFO FOR MATCH ID
        Meteor.call("insertLeagueFantasy", league_id, function (error, results) {
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

});