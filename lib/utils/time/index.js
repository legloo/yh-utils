export const getDateDiff =(time)=> {
    let nowTime = new Date();
    let day = nowTime.getDate();
    let hours = nowTime.getHours();
    let minutes = nowTime.getMinutes();
    // 传来time 2018-05-25 18:14:02 分解
    let timeday = time.substring(8, 10);
    let timehours = parseInt(time.substring(11, 13));
    let timeminutes = time.substring(14, 16);
    let d_day = Math.abs(day - timeday);
    let d_hours = hours - timehours;
    let d_minutes = Math.abs(minutes - timeminutes);
    if (d_day <= 1) {
      switch (d_day) {
        case 0:
          if (d_hours == 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
          } else if (d_hours == 0 && d_minutes == 0) {
            return "1分钟前";
          } else {
            return d_hours + "小时前";
          }
          break;
        case 1:
          if (d_hours < 0) {
            return 24 + d_hours + "小时前";
          } else {
            return d_day + "天前";
          }
          break;
      }
    } else if (d_day > 1 && d_day < 10) {
      return d_day + "天前";
    } else {
      return time;
    }
  }
