Router.configure({
    // we use the  ApplicationLayout template to define the layout for the entire app
    layoutTemplate: 'ApplicationLayout',
});

Router.route('home', {
    path: '/',
    yieldTemplates: {
        'fantasyhome': {to: 'body'}
    },
});

Router.route('fantasyhome', {
    path: '/fantasy',
    yieldTemplates: {
        'fantasyhome': {to: 'body'}
    },
});

Router.route('admin', {
    path: '/wsadmin',
    waitOn: function () {
        return Meteor.subscribe('league_data');
    },
    yieldTemplates: {
        'admin': {to: 'body'}
    },

});


Router.route('fantasy_match', {
    path: '/fantasy/match/:matchid',
    waitOn: function () {
        // return [Meteor.subscribe("roles")];
    },
    yieldTemplates: {
        'fantasymatch': {to: 'body'}
    },
    subscriptions: function () {
        return Meteor.subscribe('fantasy_data');
    },
});

Router.route('fantasy_league', {
    path: '/fantasy/league/:leagueid',
    waitOn: function () {
        // return [Meteor.subscribe("roles")];
    },
    yieldTemplates: {
        'league': {to: 'body'}
    },
    subscriptions: function () {
        return Meteor.subscribe('fantasy_data');
    },
});


Router.route('team', {
    path: '/fantasy/team/:teamid',
    waitOn: function () {
        // return [Meteor.subscribe("roles")];
    },
    yieldTemplates: {
        'team': {to: 'body'}
    },
    subscriptions: function () {
        // return Meteor.subscribe('fantasy_team_data', this.param.teamid);
    },
});


Router.route('fantasy_league_team', {
    path: '/fantasy/leagueteam/:leagueid/:teamid',
    waitOn: function () {
        // return [Meteor.subscribe("roles")];
    },
    yieldTemplates: {
        'fantasyleagueteam': {to: 'body'}
    },
    subscriptions: function () {
        return Meteor.subscribe('fantasy_data');
    },
});