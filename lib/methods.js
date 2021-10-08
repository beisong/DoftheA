getDay = function(time){
    console.log("TIME IS :" +  time);
    if(1633564800<time && time <1633675500){return 1;}
    else if(1633675500<time && time <1633737600){return 2;}
    else if(1633737600<time && time <1633824000){return 3;}
    else if(1633824000<time && time <1633910400){return 4;}
    else if(1566259200<time && time <1566345600){return 5;}
    else if(1566345600<time && time <1566432000){return 6;}
    else if(1566432000<time && time <1566518400){return 7;}
    else if(1566518400<time && time <1566604800){return 8;}
    else if(1566604800<time && time <1566691200){return 9;}
    else if(1566691200<time && time <1566777600){return 10;}
    else{ return 0;}
};
