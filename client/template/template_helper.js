/**
 * Created by weisong on 16/12/17.
 */
Template.registerHelper('getHeroesName', function (heroid) {
    var res = Heroes.findOne({id: +heroid});
    // console.log(Session.get('heroesinfo'));
    return res.cdn_name;
});