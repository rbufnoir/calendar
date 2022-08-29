import { MyDate } from './calendar.js';
import { MyMonth, show } from './month.js';

//Extending Date function with a week getter

Date.prototype.getWeek = function () {
    // Create a copy of the current date, we don't want to mutate the original
    const date = new Date(this.getTime());
  
    // Find Thursday of this week starting on Monday
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const thursday = date.getTime();
  
    // Find January 1st
    date.setMonth(0); // January
    date.setDate(1);  // 1st
    const jan1st = date.getTime();
  
    // Round the amount of days to compensate for daylight saving time
    const days = Math.round((thursday - jan1st) / 86400000); // 1 day = 86400000 ms
    return Math.floor(days / 7) + 1;
};

let today = new MyDate(new Date(2022, 8, 1));
let month = new MyMonth(today);
show(month);