/**
 * Created by weisong on 16/12/17.
 */
Template.registerHelper('getHeroesName', function (heroid) {
    if (heroid) {
        var res = Heroes.findOne({id: +heroid});
        if (res) {
            return res.cdn_name;
        }
    }
});
Template.registerHelper('getHeroesLocalizedName', function (heroid) {
    if (heroid) {
        var res = Heroes.findOne({id: +heroid});
        if (res) {
            return res.localized_name;
        }
    }
});

Template.registerHelper('getPickRate', function (heroid) {
    if (heroid) {
        let pickRate = localStorage.getItem('pickRate_' + heroid);
        // console.log(pickRate);
        return pickRate;
    }
});

Template.registerHelper('dayParamExist', function () {
    if (Router.current().params.day) {
        return true;
    }
    return false;
});

Template.registerHelper('setTitle', function () {
    var title = "";
    for (var i = 0; i < arguments.length - 1; ++i) {
    title += arguments[i]+' ';
    }
    document.title = title;
});

Template.registerHelper('shortname', function(val) {
    let shortname = val.replace(/(.{8})..+/, "$1..");
    return shortname;
});
