// Meteor.subscribe('fantasy_data');


Template.outpicker_hero.onCreated(function () {

    Meteor.call("getBan", Router.current().params.heroid, function (error, result) {
        if (result) {
            Session.set('ban', result);
        }
        else {
            console.log("On Create : getBan : nothing found ")
        }
    });

    Meteor.call("getFriend", Router.current().params.heroid, function (error, result) {
        if (result) {
            // console.log(result);
            Session.set('friend', result);
        }
        else {
            console.log("On Create : getFriend : nothing found ")
        }
    });

    Meteor.call("getCounterpick", Router.current().params.heroid, function (error, result) {
        if (result) {
            console.log(result);
            Session.set('counterpicks', result);
        }
        else {
            console.log("On Create : getCounterpick: nothing found ")
        }
    });

    Meteor.call("getPickcount", Router.current().params.heroid, function (error, result) {
        if (result) {
            if (result[0]) {
                Session.set('pickcount', result[0].count);
            }
            else {
                Session.set('pickcount', 0);
            }


        }
        else {
            console.log("On Create : getPickcount: nothing found ")
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
    friends: function () {
        if (Session.get('friend')) {
            console.log(Session.get('friend'));
            return Session.get('friend');
        }
    },
    counterpicks: function () {
        if (Session.get('counterpicks')) {
            return Session.get('counterpicks');
        }
    },
    pick_count: function () {
        if (Session.get('pickcount') >= 0) {
            return Session.get('pickcount');
        }
    }
});

Template.outpicker_hero.events({});

