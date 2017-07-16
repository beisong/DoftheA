/**
 * Created by weisong on 15/7/17.
 */

Meteor.publish('league_info', function () {
    return LeagueInfo.find({});
});

Meteor.publish('league_data', function () {
    return LeagueData.find({});
});

Meteor.publish('fantasy_data', function () {
    return FantasyData.find({});
});
