// TODO <<Home page>> Sort team

Template.fantasyhome.helpers({

    tournamentlist: function () {

        ///////// PROBLEM : Unable to return result from method call because async

        /////////  SOLUTION 1     //////////) Use Reactive method from the packge
        return ReactiveMethod.call('getTournamentList');

        ////////   Solution 2     //////////) Store result in session variable and return it
        // Meteor.call("getTournamentList", function (error, results) {
        //     // console.log("RESULTS TYPE IS  " + typeof(results));
        //     Session.set('myMethodResult', results);
        // });
        // // console.log("SESSION TYPE IS  " + typeof(Session.get('myMethodResult')));
        // return Session.get('myMethodResult'); // "bar"


    },

    teamlist: function () {
        return ReactiveMethod.call('getTeamList');
    },

})

Template.fantasyhome.events({
    'click #testbutton': function (event) {

    },
});


