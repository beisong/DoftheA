import Tabular from 'meteor/aldeed:tabular';
// import { Template } from 'meteor/templating';
// import moment from 'moment';
// import { Meteor } from 'meteor/meteor';


TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);
//
TabularTables.Books = new Tabular.Table({
    name: "Fantasy Data",
    collection: FantasyData,
    columns: [
        {data: "leagueid", title: "League ID"},
        {data: "matchid", title: "Match ID"},
        // {data: "length", title: "length"},
        // {data: "starttime", title: "starttime"},
        {data: "leaguename", title: "leaguename"},
        {data: "role", title: "role"},
        {data: "name", title: "Name"},
        {data: "team", title: "team"},
        {data: "gamewon", title: "Won/Lost"},
        {data: "kills", title: "kills"},
        {data: "deaths", title: "deaths"},
        {data: "cs", title: "cs"},
        {data: "gpm", title: "gpm"},
        {data: "towerkill", title: "towerkill"},
        {data: "roshankill", title: "roshankill"},
        {data: "teamfight", title: "teamfight"},
        {data: "wardsplaced", title: "wardsplaced"},
        {data: "campsstacked", title: "campsstacked"},
        {data: "runesgrabbed", title: "runesgrabbed"},
        {data: "firstblood", title: "firstblood"},
        {data: "stuns", title: "stuns"},
        {data: "fantasy_point", title: "Total Points"},
    ]
});