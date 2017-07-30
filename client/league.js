Template.league.onRendered(function () {
    // console.log(Router.current().params.matchid);
});

Template.league.helpers({
    leaguename: function () {
        var leagueinfo = LeagueInfo.findOne({leagueid: parseInt(Router.current().params.leagueid)});
        return leagueinfo.name;
    },
    leagueteamlist: function () {
        return ReactiveMethod.call('getLeagueTeamList', parseInt(Router.current().params.leagueid));
    },
    leaguedata: function (data) {
        var result = {
            leagueid: Router.current().params.leagueid,
            teamid: data.teamid,
            teamname: data.teamname,
        };

        return result;
    },
    selector: function () {
        var selector = {leagueid: parseInt(Router.current().params.leagueid)};
        return selector;
    }
});


Template.league.events({
    'change #role_dropdown': function (evt) {
        var currentTarget = evt.currentTarget;
        var roleValue = currentTarget.options[currentTarget.selectedIndex].value;
        Session.set('role_value', roleValue);
    },
});


// http://jsfiddle.net/abhiklpm/ZEDR9/5/
//https://jsfiddle.net/erkaner/u12te5jb/
//https://stackoverflow.com/questions/34528868/bind-data-in-aldded-tabular-table-on-dropdown-change-event