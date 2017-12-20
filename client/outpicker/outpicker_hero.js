// Meteor.subscribe('fantasy_data');


Template.outpicker_hero.onCreated(function () {

    Meteor.call("getBan", Router.current().params.heroid, function (error, result) {
        if (result) {
            // console.log(result);
            Session.set('ban', result);
        } else {
            console.log("On Create : getBan : nothing found ")
        }
    });

    Meteor.call("getCounterpick", Router.current().params.heroid, function (error, result) {
        if (result) {
            // console.log(result);
            Session.set('counterpicks', result);
        } else {
            console.log("On Create : getCounterpick: nothing found ")
        }
    });
});

Template.outpicker_hero.helpers({
    heroname: function () {
        return Router.current().params.heroid;
    },
    bans: function () {
        if (Session.get('ban')) {
            return Session.get('ban');
        }
    },
    counterpicks: function () {
        if (Session.get('counterpicks')) {
            return Session.get('counterpicks');
        }
    },
});

Template.outpicker_hero.events({});

