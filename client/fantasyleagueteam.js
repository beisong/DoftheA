// Meteor.subscribe('fantasy_data');


Template.fantasyleagueteam.onRendered(function () {
    // console.log(Router.current().params.matchid);
});

Template.fantasyleagueteam.helpers({
    selector: function () {
        var selector = {
            leagueid: parseInt(Router.current().params.leagueid),
            teamid: parseInt(Router.current().params.teamid)
        };
        return selector;
    }
});


Template.fantasyleagueteam.events({});
