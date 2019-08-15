import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    if (Heroes.find().count() === 0) {
        Meteor.call("initHeroes", function (error, results) {
            if (error) {
                console.log(error);
            }
        });
    }

    if (BanPick.find().count() === 0) {
        Meteor.call("initBP", function (error, results) {
            if (error) {
                console.log(error);
            }
        });
    }

    if (LeagueInfo.find({TI9latestmatch:true}).count() === 0) {
        console.log("Setting Latest Match = 0");
        LeagueInfo.insert({TI9latestmatch:true, data:0});
    }

    callbackInterval();
    Meteor.setInterval(callbackInterval, 300000)

});
function callbackInterval() {
    Meteor.call("autoInsertTI9Fantasy", function (error, results) {
        console.log("UPDATING TI9 MVP");
        Meteor.call("UpdateTI19MVP", function (error, results) {});
    })

}
