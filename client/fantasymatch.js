// Meteor.subscribe('fantasy_data');


Template.fantasymatch.onRendered(function () {
    // console.log(Router.current().params.matchid);
});

Template.fantasymatch.helpers({
    // selector() {
    //     return {matchid: parseInt(Router.current().params.matchid)}; // this could be pulled from a Session var or something that is reactive
    // },

    selector: function () {
        var selector = {matchid: parseInt(Router.current().params.matchid)};
        var roleValue = Session.get('role_value');
        if (roleValue && (roleValue !== 'All')) {
            selector = {matchid: parseInt(Router.current().params.matchid), role: roleValue};
        }
        return selector;
    }

});


Template.fantasymatch.events({
    'change #role_dropdown': function (evt) {
        var currentTarget = evt.currentTarget;
        var roleValue = currentTarget.options[currentTarget.selectedIndex].value;
        Session.set('role_value', roleValue);
    },
});






 





// http://jsfiddle.net/abhiklpm/ZEDR9/5/
//https://jsfiddle.net/erkaner/u12te5jb/
//https://stackoverflow.com/questions/34528868/bind-data-in-aldded-tabular-table-on-dropdown-change-event