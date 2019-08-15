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

    if (TI9MvpData.find({latestmatch:true}).count() === 0) {
        TI9MvpData.insert({latestmatch:true, data:0});
    }

    callbackInterval();
    Meteor.setInterval(callbackInterval, 300000)

});
function callbackInterval() {
    console.log("INSIDE CALLBACK INTERVAL'");
    Meteor.call("autoInsertTI9Fantasy", function (error, results) {
        console.log("UPDATING TI9 MVP");
        Meteor.call("UpdateTI19MVP", function (error, results) {});
    })

}
