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
    if (LeagueInfo.find().count() === 0) {
        Meteor.call("initLeagueData", function (error, results) {
            if (error) {
                console.log(error);
            }
            else{console.log(results);}
        });
    }
    if (ProPlayerData.find().count() === 0) {
        Meteor.call("initPlayerData", function (error, results) {
            if (error) {
                console.log(error);
            }
        });
    }
    if (TeamData.find().count() === 0) {
        Meteor.call("initTI10Teams", function (error, results) {
            if (error) {
                console.log(error);
            }
        });
    }

    if (LeagueInfo.find({TI9latestmatch:true}).count() === 0) {
        console.log("Setting Latest Match = 0");
        LeagueInfo.insert({TI9latestmatch:true, data:0});
    }

    fiveMinLoopInterval();
    threeHrLoopInterval();
    // Meteor.setInterval(fiveMinLoopInterval, 300000)//changed to 5min
    Meteor.setInterval(fiveMinLoopInterval, 150000)//changed to 2.5min
    Meteor.setInterval(threeHrLoopInterval, 108000000)

});

function fiveMinLoopInterval() {
    let now= parseInt(new Date() / 1000);
    let day = getDay(now);
    Meteor.call("autoInsertTIFantasy", function (error, results) {
        Meteor.call("UpdateTIMVP", day,  function (error, results) {});
    })
}

function threeHrLoopInterval(){
    // console.log("UPDATING TI LEAGUE MVP");
    Meteor.call("UpdateTILEAGUEMVP", function (error, results) {});
}
