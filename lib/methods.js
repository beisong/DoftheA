getDay = function(time){
    console.log("TIME IS :" +  time);
    if(1565827200<time && time <1565913600){return 1;}
    else if(1565913600<time && time <1566000000){return 2;}
    else if(1566000000<time && time <1566086400){return 3;}
    else if(1566086400<time && time <1566259200){return 4;}
    else if(1566259200<time && time <1566345600){return 5;}
    else if(1566345600<time && time <1566432000){return 6;}
    else if(1566432000<time && time <1566518400){return 7;}
    else if(1566518400<time && time <1566604800){return 8;}
    else if(1566604800<time && time <1566691200){return 9;}
    else if(1566691200<time && time <1566777600){return 10;}
    else{ return 0;}
};