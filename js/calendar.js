import { monthName, dayName } from './variable.js';


export class MyDate {

    constructor(date) {
        this.myDay = date.getDate();
        this.myDayOfTheWeek = date.getDay();
        this.myWeek = date.getWeek();
        this.myMonth = date.getMonth();
        this.myYear = date.getFullYear();
    }

    static createMyDate(myDay, myMonth, myYear) {
        return new MyDate(new Date(myYear, myMonth, myDay));
    }

    get day() {
        return this.myDay;
    }

    get dayOfTheWeek() {
        return this.myDayOfTheWeek;
    }

    get dayName() {
        return dayName[this.myDayOfTheWeek];
    }

    get week() {
        return this.myWeek;
    }

    get month() {
        return this.myMonth;
    }

    get monthName() {
        return monthName[this.myMonth];
    }

    get year() {
        return this.myYear;
    }
}