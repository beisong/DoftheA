Router.configure({
    // we use the  ApplicationLayout template to define the layout for the entire app
    layoutTemplate: 'ApplicationLayout',
});


Router.route('home', {
    path: '/',
    onBeforeAction: function () {
        // Router.go("outpicker");
        // Router.go("dpc19");
        // Router.go("TI7home");
        //Router.go("dpc");
        // Router.go("TI10home");
        Router.go("mainday");
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


Router.route('dpc', {
    path: '/fantasy/dpc',
    yieldTemplates: {
        'dpc': {to: 'body'}
    },
    onAfterAction: function() {
        document.title = 'Dota Pro Circuit Fantasy Stats';
    },
    subscriptions: function () {
        return Meteor.subscribe('mvp_data');
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
    onAfterAction: function() {
        document.title = 'Dofthea - Dota TI Fantasy Stats';
    },
    subscriptions: function () {
        return [
            Meteor.subscribe('ti_mvp_data'),
            Meteor.subscribe('league_info')
        ];
    },
});

Router.route('fantasy_league_stage_day', {
    path: '/fantasy/league/:leagueid/:stage/:day',
    waitOn: function () {
    },
    yieldTemplates: {
        'league': {to: 'body'}
    },
    onAfterAction: function() {
        document.title = 'Dofthea - Dota TI Fantasy Stats';
    },
    subscriptions: function () {
        return [
            Meteor.subscribe('league_info'),
            Meteor.subscribe('ti_mvp_data')
        ];
    },
});


Router.route('team', {
    path: '/fantasy/team/:teamid',
    waitOn: function () {
         return [Meteor.subscribe('team_data')];
    },
    yieldTemplates: {
        'team': {to: 'body'}
    },
    subscriptions: function () {
        return [
            Meteor.subscribe('team_data'),
            Meteor.subscribe('team_avg_data')
        ]
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


Router.route('TI9home', {
    path: '/fantasy/league/10749'
});

Router.route('TI10home', {
    path: '/fantasy/league/13256'
});


var now= parseInt(new Date() / 1000);
var day = getDay(now);

var stageday, stage;
if (day <= 4) {
    stageday = day;
    stage = 'group';
} else {
    stageday = day - 4;
    stage = 'main';
}

Router.route('mainday', {
    path: '/fantasy/league/13256/'+stage+'/'+stageday
});
