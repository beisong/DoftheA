Router.configure({
    // we use the  ApplicationLayout template to define the layout for the entire app
    layoutTemplate: 'ApplicationLayout',
});

Router.route('home', {
    path: '/',
    yieldTemplates: {
        'hello': {to: 'body'}
    }
});

Router.route('fantasy', {
    path: '/fantasy',
    waitOn: function () {
        return Meteor.subscribe('league_data');
    },
    yieldTemplates: {
        'fantasy': {to: 'body'}
    },

});

Router.route('fantasy_league_page', {
    path: '/fantasy/league/:leagueid',
    waitOn: function () {
        // return [Meteor.subscribe("roles")];
    },
    data: function () {
        return {
            fantasyleaguedata: FantasyData.find({leagueid: parseInt(this.params.leagueid)})
        };
    },
    yieldTemplates: {
        'fantasyleague': {to: 'body'}
    }
});


Router.route('fantasy_match_page', {
    path: '/fantasy/match/:matchid',
    waitOn: function () {
        // return [Meteor.subscribe("roles")];
    },
    data: function () {
        return {
            fantasyleaguedata: FantasyData.find({matchid: parseInt(this.params.matchid)})
        };
    },
    yieldTemplates: {
        'fantasyleague': {to: 'body'}
    }
});

Router.route('fantasy_aldeed_match', {
    path: '/fantasy/aldeed/match/:matchid',
    waitOn: function () {
        // return [Meteor.subscribe("roles")];
    },
    yieldTemplates: {
        'fantasyaldeedmatch': {to: 'body'}
    },
    subscriptions: function () {
        return Meteor.subscribe('fantasy_data');
    },
});

Router.route('fantasy_aldeed_league', {
    path: '/fantasy/aldeed/league/:leagueid',
    waitOn: function () {
        // return [Meteor.subscribe("roles")];
    },
    yieldTemplates: {
        'fantasyaldeedleague': {to: 'body'}
    },
    subscriptions: function () {
        return Meteor.subscribe('fantasy_data');
    },
});