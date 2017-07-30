// Meteor.subscribe('fantasy_data');


Template.fantasyleagueteam.onRendered(function () {
    // console.log(Router.current().params.matchid);
});

Template.fantasyleagueteam.helpers({
    leaguename: function () {
        var leagueinfo = LeagueInfo.findOne({leagueid: parseInt(Router.current().params.leagueid)});
        return leagueinfo.name;
    },
    teamname: function () {
        var teaminfo = TeamData.findOne({teamid: parseInt(Router.current().params.teamid)});
        return teaminfo.teamname
    },
    selector: function () {
        var selector = {
            leagueid: parseInt(Router.current().params.leagueid),
            teamid: parseInt(Router.current().params.teamid)
        };
        return selector;
    }
});


Template.fantasyleagueteam.events({});
