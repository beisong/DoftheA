Template.team.onRendered(function () {
    makeAllSortable();
});

Template.team.helpers({
    teamname: function () {
        var teaminfo = TeamData.findOne({teamid: parseInt(Router.current().params.teamid)});
        if(teaminfo){
            return teaminfo.teamname;
        }
        return '';
    },
    teamtournamentlist: function () {
        return ReactiveMethod.call('getTournamentList_team', parseInt(Router.current().params.teamid));
        // { "_id" : 5504, "nummatch" : 55, "leagueid" : 5504, "leaguename" : "2017 Mars Dota 2 League" }

    },
    teamdata: function (data) {
        var result = {
            teamid: Router.current().params.teamid,
            leagueid: data.leagueid,
            leaguename: data.leaguename,
        };
        return result
    },
    selector: function () {
        var selector = {teamid: parseInt(Router.current().params.teamid)};
        return selector;
    },
    team_ave: function () {
        //New table TeamAVGData
        var result =TeamAVGData.find({teamid:parseInt(Router.current().params.teamid)},{sort:{fantasy_point:-1}}).fetch();
        return result

        // Old Aggregate call to Fantasy Table
        // return ReactiveMethod.call('getLeagueTeamaverage', false, parseInt(Router.current().params.teamid));
    },

});


Template.team.events({});

Template.registerHelper('highlightCell', function(val) {
    if(val > 3){
        return "fontRed"
    }
    if(val > 2){
        return "fontGreen"
    }
    if(val > 1){
        return "fontBlue"
    }
    return "";
});
