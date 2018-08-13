import dataTableResponsive from 'datatables.net-responsive';


var TI8teams =
    [2586976, 39, 5, 15, 1883502, 2163, 1375614, 1838315, 2108395, 350190, 67, 543897, 726228, 5021898, 5026801, 5027210, 5228654, 5229127];

Template.preti8.onRendered(function () {
    // console.log(Router.current().params.matchid);
    // $('.table-striped').DataTable({
    //     responsive: true
    // });
});

Template.preti8.helpers({
    leagueteamlist: function () {
        var res = ReactiveMethod.call('getTI8TeamList');
        return res;
    },
    leaguedata: function (data) {
        var result = {
            leagueid: Router.current().params.leagueid,
            teamid: data.teamid,
            teamname: data.teamname,
        };

        return result;
    },
    thisLeagueid: function () {
        return Router.current().params.leagueid;
    },
    selector: function () {
        var selector;

        selector = {
            teamid: {"$in": TI8teams},
            starttime: {"$gt": new Date("2017-09-01T00:00:00.000Z")}
        };

        return selector;
    },
    // league_core_mvp: function () {
    //     return ReactiveMethod.call('getLeagueMVP', 'Core', parseInt(Router.current().params.leagueid), Router.current().params.stage, parseInt(Router.current().params.day));
    // },
    // league_support_mvp: function () {
    //     return ReactiveMethod.call('getLeagueMVP', 'Support', parseInt(Router.current().params.leagueid), Router.current().params.stage, parseInt(Router.current().params.day));
    // },
    // league_offlane_mvp: function () {
    //     return ReactiveMethod.call('getLeagueMVP', 'Offlane', parseInt(Router.current().params.leagueid), Router.current().params.stage, parseInt(Router.current().params.day));
    // },
});


Template.preti8.events({
    'change #role_dropdown': function (evt) {
        var currentTarget = evt.currentTarget;
        var roleValue = currentTarget.options[currentTarget.selectedIndex].value;
        Session.set('role_value', roleValue);
    },
});


Template.preti8_MVP_table.helpers({
    league_core_mvp: function (role) {
        return ReactiveMethod.call(
            'getpreti8MVP',
            role,
            parseInt(Router.current().params.leagueid),
            Router.current().params.stage,
            parseInt(Router.current().params.day));
    }
});
