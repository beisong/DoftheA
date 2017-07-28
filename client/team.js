// TODO Average points

Template.team.onRendered(function () {
    // console.log(Router.current().params.matchid);
});

Template.team.helpers({
    teamtournamentlist: function () {
        return ReactiveMethod.call('getTournamentList_team', parseInt(Router.current().params.teamid));
        // { "_id" : 5504, "nummatch" : 55, "leagueid" : 5504, "leaguename" : "2017 Mars Dota 2 League" }

    },
    teamid: function (data) {

        var result = {
            path: Router.current().params.teamid,
            leagueid: data.leagueid,
            leaguename: data.leaguename,
        };

        return result
    }
    // teamid: {
    //     path: Router.current().params.matchid
    // },

});


Template.team.events({});
//https://stackoverflow.com/questions/34528868/bind-data-in-aldded-tabular-table-on-dropdown-change-event


