/**
 * Created by weisong on 15/7/17.
 */

LeagueInfo = new Mongo.Collection('leagueinfo', {});
LeagueData = new Mongo.Collection('leaguedata', {});
FantasyData = new Mongo.Collection('fantasydata', {});
ProPlayerData = new Mongo.Collection('proplayerdata', {});
TeamData = new Mongo.Collection('teamdata', {});
MvpData= new Mongo.Collection('mvpdata', {});
TeamAVGData= new Mongo.Collection('teamavgdata', {});

//noinspection JSAnnotator
Counterpicker = new Mongo.Collection('counterpicker', {});
BanPick = new Mongo.Collection('bp', {});
Heroes = new Mongo.Collection('heroes', {});
