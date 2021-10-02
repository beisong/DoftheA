import dataTableResponsive from 'datatables.net-responsive';


var TIteams = [726228, 1883502, 39, 15, 350190, 2586976, 111474, 7390454, 5,8214850, 6209166, 8254400, 7391077, 8260983, 8255756, 7119388, 8204512, 1838315];
// var TI9teams = [1838315, 1883502, 726228, 39, 2163, 15, 350190, 6214973, 2108395,2586976, 111474, 2626685, 6214538, 2672298, 6666989, 36, 6209804, 543897];
// = [2586976, 39, 5, 15, 1883502, 2163, 1375614, 1838315, 2108395, 350190, 67, 543897, 726228, 5021898, 5026801, 5027210, 5228654, 5229127];

Template.dpc.onRendered(function () {
    // console.log(Router.current().params.matchid);
    // $('.table-striped').DataTable({
    //     responsive: true
    // });
});

Template.dpc.helpers({
    leagueteamlist: function () {
        var res = ReactiveMethod.call('getTITeamList');
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
            teamid: {"$in": TIteams},
            starttime: {"$gt": new Date("2018-09-01T00:00:00.000Z")}
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


Template.dpc.events({
    'change #role_dropdown': function (evt) {
        var currentTarget = evt.currentTarget;
        var roleValue = currentTarget.options[currentTarget.selectedIndex].value;
        Session.set('role_value', roleValue);
    },
});


Template.dpc_MVP_table.helpers({
    league_core_mvp: function (role) {
        var result =MvpData.find({role:role},{sort: {rank: 1}}).fetch();
        // console.log(result);
        return result
    }
});
