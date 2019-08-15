import dataTableResponsive from 'datatables.net-responsive';

Template.league.onRendered(function () {
    // console.log(Router.current().params.matchid);
    // $('.table-striped').DataTable({
    //     responsive: true
    // });
});

Template.league.helpers({
    leaguename: function () {
        var leagueinfo = LeagueInfo.findOne({leagueid: parseInt(Router.current().params.leagueid)});
        return leagueinfo.name;
    },
    leagueteamlist: function () {
        return ReactiveMethod.call('getLeagueTeamList', parseInt(Router.current().params.leagueid), Router.current().params.stage, parseInt(Router.current().params.day));
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
    thisStage: function () {
        if (Router.current().params.stage == 'group') {
            return "| Group Stage";
        }
        else if (Router.current().params.stage == 'main') {
            return "| Main Event";
        }
    },
    thisDay: function () {
        if (Router.current().params.day == '1') {
            return "| Day 1";
        }
        else if (Router.current().params.day == '2') {
            return "| Day 2";
        }
        else if (Router.current().params.day == '3') {
            return "| Day 3";
        }
        else if (Router.current().params.day == '4') {
            return "| Day 4";
        }
        else if (Router.current().params.day == '5') {
            return "| Day 5";
        }
        else if (Router.current().params.day == '6') {
            return "| Day 6";
        }
    },
    selector: function () {
        var selector;

        if (Router.current().params.stage) { // Have Stage
            if (Router.current().params.day) { // Have Day
                selector = {
                    leagueid: parseInt(Router.current().params.leagueid),
                    day: parseInt(Router.current().params.day),
                    stage: Router.current().params.stage,

                };
            }
            else { //Have stage no day
                selector = {
                    leagueid: parseInt(Router.current().params.leagueid),
                    stage: Router.current().params.stage
                };
            }
        }
        else {
            selector = {leagueid: parseInt(Router.current().params.leagueid)};
        }


        return selector;
    },
    league_core_mvp: function () {
        return ReactiveMethod.call('getLeagueMVP', 'Core', parseInt(Router.current().params.leagueid), Router.current().params.stage, parseInt(Router.current().params.day));
    },
    league_support_mvp: function () {
        return ReactiveMethod.call('getLeagueMVP', 'Support', parseInt(Router.current().params.leagueid), Router.current().params.stage, parseInt(Router.current().params.day));
    },
    league_offlane_mvp: function () {
        return ReactiveMethod.call('getLeagueMVP', 'Offlane', parseInt(Router.current().params.leagueid), Router.current().params.stage, parseInt(Router.current().params.day));
    },
});


Template.league.events({
    'change #role_dropdown': function (evt) {
        var currentTarget = evt.currentTarget;
        var roleValue = currentTarget.options[currentTarget.selectedIndex].value;
        Session.set('role_value', roleValue);
    },
});

Template.MVP_table.helpers({
    league_core_mvp: function (role) {
        if(Router.current().params.leagueid == 10749){
            console.log(TI9MvpData.find().fetch());
            var result =TI9MvpData.find({role:role},{sort: {rank: 1}}).fetch();
            // console.log(result);
            return result
        }
        else{
            return ReactiveMethod.call('getLeagueMVP', role, parseInt(Router.current().params.leagueid), Router.current().params.stage, parseInt(Router.current().params.day));
        }
    },
    thisLeagueID: function () {
        return Router.current().params.leagueid;
    }
});
