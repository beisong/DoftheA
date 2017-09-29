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
    scrollX: true,
    sScrollX: "100%",
    columns: [
        // {data: "leagueid", title: "League ID"},
        {data: "matchid", title: "Match ID"},
        // {data: "length", title: "length"},
        // {data: "starttime", title: "starttime"},
        // {data: "leaguename", title: "Leaguename"},
        {data: "team", title: "Team"},
        {data: "name", title: "Name"},
        {data: "gamewon", title: "Won/Lost"},
        {data: "length", title: "Duration"},
        {data: "role", title: "Role"},
        {data: "kills", title: "Kills"},
        {data: "deaths", title: "Deaths"},
        {data: "cs", title: "CS"},
        {data: "gpm", title: "GPM"},
        {data: "towerkill", title: "Tower"},
        {data: "roshankill", title: "Roshan"},
        {data: "teamfight", title: "Team fight"},
        {data: "wardsplaced", title: "Wards Planted"},
        {data: "campsstacked", title: "Camps Stacked"},
        {data: "runesgrabbed", title: "Runes Grabbed"},
        {data: "firstblood", title: "First Blood"},
        {data: "stuns", title: "Stuns"},
        {data: "fantasy_point", title: "Total Points"},
    ]
});