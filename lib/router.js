Router.configure({
    // we use the  ApplicationLayout template to define the layout for the entire app
    layoutTemplate: 'ApplicationLayout',
});


Router.route('home', {
    path: '/',
    onBeforeAction: function () {
        Router.go("outpicker");
        // Router.go("preti8");
        // Router.go("TI7home");
        // Router.go("mainday");
    }
});


Router.route('recenttourny', {
    path: '/recentstats',
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

Router.route('preti8', {
    path: '/fantasy/preti8',
    yieldTemplates: {
        'preti8': {to: 'body'}
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
    },
    yieldTemplates: {
        'league': {to: 'body'}
    },
    subscriptions: function () {
        return Meteor.subscribe('league_info');
    },
});

Router.route('fantasy_league_stage_day', {
    path: '/fantasy/league/:leagueid/:stage/:day',
    waitOn: function () {
    },
    yieldTemplates: {
        'league': {to: 'body'}
    },
    subscriptions: function () {
        return Meteor.subscribe('league_info');
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
        return Meteor.subscribe('team_data');
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
        return [
            Meteor.subscribe('team_data'),
            Meteor.subscribe('league_info')
        ]
    },
});

Router.route('TI7home', {
    path: '/fantasy/league/5401'
});


Router.route('TI8home', {
    path: '/fantasy/league/9870'
});

Router.route('mainday', {
    path: '/fantasy/league/5401/main/4'
});
