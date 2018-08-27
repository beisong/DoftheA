/**
 * Created by weisong on 30/7/17.
 */
Template.navbar.helpers({
    teamlist: function () {
        return ReactiveMethod.call('getTeamList');
    },
    ti8teamlist: function () {
        return ReactiveMethod.call('getTI8TeamList');
    },
    leaguelist: function () {
        return ReactiveMethod.call('getDPCList');
    },
});
