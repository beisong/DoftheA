/**
 * Created by weisong on 16/12/17.
 */
Router.route('outpicker', {
    waitOn: function () {
        return Meteor.subscribe('heroes');
    },
    path: '/outpicker',
    yieldTemplates: {
        'outpicker': {to: 'body'}
    },
    onAfterAction: function() {
        document.title = 'Dota Outpicker - Counter Picker ';
    },
    subscriptions: function () {
        Meteor.subscribe('heroes');
    }
});

Router.route('outpicker_hero', {
    waitOn: function () {
        return Meteor.subscribe('heroes');
    },
    path: '/outpicker/:heroid',
    yieldTemplates: {
        'outpicker_hero': {to: 'body'}
    },
    subscriptions: function () {
        Meteor.subscribe('heroes');
    }
});
