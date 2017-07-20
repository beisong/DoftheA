Template.fantasy.helpers({
    oneleaguedata: function () {
        return LeagueData.findOne();
    },
    leaguedata: function () {
        return LeagueData.find();
    },

})

Template.fantasy.events({
    'click #initAllLeague': function (event) {
        Meteor.call("initLeagueData", function (error, results) {
        });
    },
    'click #initPlayerInfo': function (event) {
        Meteor.call("initPlayerData", function (error, results) {
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

});