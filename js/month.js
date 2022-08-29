import { MyDate } from './calendar.js';

export class MyMonth {
    constructor (date) {
        let numbersOfDayInMonth = new Date(date.year, date.month + 1, 0).getDate(); //We go to the first day of the next month and go back one day
        this.month = [];
        
        for (let i = 0; i < numbersOfDayInMonth; i++) {
            this.month.push(MyDate.createMyDate((i + 1), date.month, date.year));
        }
    }

}

export function show(display) {
    let dLength = display.month.length || 1;
    console.log(display)
    document.getElementById("calendar").innerText = "";

    for (let i = 0; i < dLength; i++) {
        let a = document.createElement('a');
        a.innerText = display.month[i].dayName + " " + display.month[i].day;
        document.getElementById("calendar").appendChild(a);
        a.addEventListener('click', () => {
            //console.log(display.month[i].dayName + " " + display.month[i].day);
            show(display.month[i]);
        });
    }
}

// function getFirstDayOfMonth(date) {
//     let myDay = (date.myDay - date.myDayOfTheWeek + 7) % 7 + 1;
//     return MyDate.createMyDate(date.myDay, date.month, date.year);
// }

// export function showMonth(date) {
//     let firstDayInMonth = getFirstDayOfMonth(date);
//     let numbersOfDayInMonth = new Date(firstDayInMonth.year, firstDayInMonth.month + 1, 0).getDate(); //We go to the first day of the next month and go back one day
//     for (let i = 0; i < numbersOfDayInMonth; i++) {
//         let day = MyDate.createMyDate((i + 1), date.month, date.year);
//         let a = document.createElement("a");
//         a.innerText = day.dayName + " " + day.day
//         document.body.appendChild(a);
//         a.addEventListener('click', () => {
//             console.log(i);
//         })
//     }
// }

