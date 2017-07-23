// Meteor.subscribe('fantasy_data');


Template.fantasyaldeedleague.onRendered(function () {
    // console.log(Router.current().params.matchid);
});

Template.fantasyaldeedleague.helpers({
    // selector() {
    //     return {matchid: parseInt(Router.current().params.matchid)}; // this could be pulled from a Session var or something that is reactive
    // },

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


Template.fantasyaldeedleague.events({
    'change #role_dropdown': function (evt) {
        var currentTarget = evt.currentTarget;
        var roleValue = currentTarget.options[currentTarget.selectedIndex].value;
        Session.set('role_value', roleValue);
    },
});


// TODO Fix Arteezy
// TODO Create Dropdown filter    //Half done  --- Create auto generated select options

//TODO Generate Average

// http://jsfiddle.net/abhiklpm/ZEDR9/5/
//https://jsfiddle.net/erkaner/u12te5jb/
//https://stackoverflow.com/questions/34528868/bind-data-in-aldded-tabular-table-on-dropdown-change-event