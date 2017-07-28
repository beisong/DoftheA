
Template.league.onRendered(function () {
    // console.log(Router.current().params.matchid);
});

Template.league.helpers({
    leagueteamlist: function () {
        return ReactiveMethod.call('getLeagueTeamList', parseInt(Router.current().params.leagueid));
    },

    selector: function () {
        var selector = {};
        var roleValue = Session.get('role_value');
        if (roleValue && (roleValue !== 'All')) {
            selector = {leagueid: parseInt(Router.current().params.leagueid), role: roleValue};
        }
        else {
            selector = {leagueid: parseInt(Router.current().params.leagueid)};
        }
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