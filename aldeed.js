import Tabular from 'meteor/aldeed:tabular';
// import { Template } from 'meteor/templating';
// import moment from 'moment';
// import { Meteor } from 'meteor/meteor';


TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);
//
TabularTables.Fantasy = new Tabular.Table({
    name: "Fantasy Data",
    collection: FantasyData,
    columns: [
        {data: "leagueid", title: "League ID"},
        {data: "matchid", title: "Match ID"},
        // {data: "length", title: "length"},
        // {data: "starttime", title: "starttime"},
        {data: "leaguename", title: "Leaguename"},
        {data: "role", title: "Role"},
        {data: "name", title: "Name"},
        {data: "team", title: "Team"},
        {data: "gamewon", title: "Won/Lost"},
        {data: "kills", title: "Kills"},
        {data: "deaths", title: "Deaths"},
        {data: "cs", title: "CS"},
        {data: "gpm", title: "GPM"},
        {data: "towerkill", title: "Towerkill"},
        {data: "roshankill", title: "Roshankill"},
        {data: "teamfight", title: "Teamfight"},
        {data: "wardsplaced", title: "Wardsplaced"},
        {data: "campsstacked", title: "Campsstacked"},
        {data: "runesgrabbed", title: "Runesgrabbed"},
        {data: "firstblood", title: "Firstblood"},
        {data: "stuns", title: "Stuns"},
        {data: "fantasy_point", title: "Total Points"},
    ]
});