// Meteor.subscribe('fantasy_data');


Template.fantasyleagueteam.onRendered(function () {
    makeAllSortable();
});

Template.fantasyleagueteam.helpers({
    leaguename: function () {
        var leagueinfo = LeagueInfo.findOne({leagueid: parseInt(Router.current().params.leagueid)});
        return leagueinfo.name;
    },
    teamname: function () {
        var teaminfo = TeamData.findOne({teamid: parseInt(Router.current().params.teamid)});
        return teaminfo.teamname;
    },
    leagueteam_ave: function () {
        return ReactiveMethod.call('getLeagueTeamaverage', parseInt(Router.current().params.leagueid), parseInt(Router.current().params.teamid));
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
