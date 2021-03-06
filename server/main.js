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

    // fiveMinLoopInterval();
    // threeHrLoopInterval();
    // Meteor.setInterval(fiveMinLoopInterval, 300000)
    // Meteor.setInterval(threeHrLoopInterval, 108000000)

});

function fiveMinLoopInterval() {
    Meteor.call("autoInsertTI9Fantasy", function (error, results) {
        Meteor.call("UpdateTI19MVP", function (error, results) {});
    })
}

function threeHrLoopInterval(){
    console.log("UPDATING TI9 LEAGUE MVP");
    Meteor.call("UpdateTI19LEAGUEMVP", function (error, results) {});
}
