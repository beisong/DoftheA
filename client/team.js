Template.team.onRendered(function () {
    makeAllSortable();
});

Template.team.helpers({
    teamname: function () {
        var teaminfo = TeamData.findOne({teamid: parseInt(Router.current().params.teamid)});
        return teaminfo.teamname
    },
    teamtournamentlist: function () {
        return ReactiveMethod.call('getTournamentList_team', parseInt(Router.current().params.teamid));
        // { "_id" : 5504, "nummatch" : 55, "leagueid" : 5504, "leaguename" : "2017 Mars Dota 2 League" }

    },
    teamdata: function (data) {
        var result = {
            teamid: Router.current().params.teamid,
            leagueid: data.leagueid,
            leaguename: data.leaguename,
        };
        return result
    },
    selector: function () {
        var selector = {teamid: parseInt(Router.current().params.teamid)};
        return selector;
    },
    team_ave: function () {
        return ReactiveMethod.call('getLeagueTeamaverage', false, parseInt(Router.current().params.teamid));
    },

});


Template.team.events({});


