let day1start = 1633586400; // 7oct 2pm     1633586400
let day2start = 1633672800; // 8oct 2pm     1633672800
let day3start = 1633759200; // 9oct 2pm     1633759200
let day4start = 1633845600; // 10oct 2pm    1633845600
let day4end= 1633932000;    // 11oct 2pm    1633932000
let day5start = 1634018400; // 12oct 2pm    1634018400
let day6start = 1634104800; // 13oct 2pm    1634104800
let day7start = 1634191200; // 14oct 2pm    1634191200
let day8start = 1634277600; // 15oct 2pm    1634277600
let day9start = 1634364000; // 16oct 2pm    1634364000
let day10start = 1634450400;// 17oct 2pm    1634450400
let day10end = 1634536800;  // 18oct 2pm    1634536800

getDay = function(time){
    console.log("TIME IS :" +  time);
    if(day1start < time && time < day2start){return 1;}
    else if(day2start < time && time < day3start){return 2;}
    else if(day3start < time && time < day4start){return 3;}
    else if(day4start < time && time < day4end){return 4;}
    else if(day5start < time && time < day6start){return 5;}
    else if(day6start < time && time < day7start){return 6;}
    else if(day7start < time && time < day8start){return 7;}
    else if(day8start < time && time < day9start){return 8;}
    else if(day9start < time && time < day10start){return 9;}
    else if(day10start < time && time < day10end){return 10;}
    else{ return 0;}
};

getDayStartEpoch = function(day){
    switch(day) {
      case 1:
          return day1start;
        break;
      case 2:
          return day2start;
        break;
      case 3:
          return day3start;
        break;
      case 4:
          return day4start;
        break;
      case 5:
          return day5start;
        break;
      case 6:
          return day6start;
        break;
      case 7:
          return day7start;
        break;
      case 8:
          return day8start;
        break;
      case 9:
          return day9start;
        break;
      case 10:
          return day10start;
        break;
      case 11:
          return day10end;
        break;
      default:
          return 0;
    }
}

export let TIleagueId = 13256;