let buttonOption = 'month';
let today = new Date();
let myDay = today;
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();

let monthName = ["Jan", "Feb", "Mar", "Avr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let dayName = ["Sun", "Mon", "Thu", "Wed", "Tur", "Fri", "Sat"];

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

let currentWeek = today.getWeek();


// let year = currentYear;
// let month = currentMonth;

function showMonth(month, year) {
    let firstDayInMonth = new Date(year, month).getDay();
    console.log(firstDayInMonth);
    let daysInMonth = new Date(year, month + 1, 0).getDate(); //We go to the first day of the next month and go back one day
    document.getElementById("calendar").innerHTML = "";
    document.getElementById("year").innerHTML = "<h3>" + monthName[month] + " " + year + "</h3>";

    for (i = 0; i < daysInMonth; i++) {
        currentWeek = new Date(year, month, i+1).getWeek();
        let week = document.getElementById("week"+currentWeek);

        if (week === null) {
            week = document.createElement("div");
            week.setAttribute("id", "week" + currentWeek);
            document.getElementById("calendar").appendChild(week);
            document.getElementById("week" + currentWeek).addEventListener('click', (() => {showWeek(currentWeek, year);}), true);
        }
        week.innerHTML += "<a id=" + (i + 1)+"/"+ month +"/" + year + ">" + dayName[(firstDayInMonth + i) % 7] + " " + (i + 1) +"</a><br/>";
        if ((firstDayInMonth + i) % 7 == 0)
           document.getElementById("calendar").appendChild(document.createElement("hr"));
    }
    for (let i = 0; i < daysInMonth; i++) {
        document.getElementById("" + (i + 1) + "/" + month + "/" + year).addEventListener("click", () => {
            showDay(i+1, month, year)
        });
    }
}

function showDay(day, month, year) {
    myDay = new Date(year, month, day);
    let displayDay = document.getElementById("calendar");
    currentWeek = myDay.getWeek();

    document.getElementById("year").innerHTML = "<h3>" + monthName[month] + " " + year + "</h3>";
    changeButtonOption("Day");
    displayDay.innerHTML = "";
    displayDay.innerHTML = dayName[myDay.getDay() % 7] + " " + myDay.getDate();
}

function showWeek(week, year) {
    let displayWeek = document.getElementById("calendar");
    let day = new Date(year, 0, week * 7);
    
    currentWeek = week;
    currentYear = year;
    currentDay = day.getDate() - 4;
    currentMonth = day.getMonth();
    displayWeek.innerHTML = "";
    changeButtonOption("Week");
    document.getElementById("calendar").appendChild(document.createElement("hr"));
    for (i = 0; i < 7; i++) {
        let currentDay = new Date(year, day.getMonth(), day.getDate() - 4 + i);
        document.getElementById("year").innerHTML = "<h3>" + monthName[day.getMonth()] + " " + year + "</h3>" + "<i>Week " + week + "</i>";
        displayWeek.innerHTML += "<a id=" + currentDay.getDate() +"/"+ currentDay.getMonth() +"/" + currentDay.getFullYear() + ">" + dayName[(i + 1) % 7] + " " + currentDay.getDate() + "</a><br/>";
    }
    document.getElementById("calendar").appendChild(document.createElement("hr"));
    for (let i = 0; i < 7; i++) {
        let currentDay = new Date(year, day.getMonth(), day.getDate() - 4 + i);
        document.getElementById("" + currentDay.getDate() +"/"+ currentDay.getMonth() +"/" + currentDay.getFullYear()).addEventListener("click", () => {
            showDay(currentDay.getDate(), currentDay.getMonth(), currentDay.getFullYear())
        });
    }
}

function nextDay() {
    showDay(myDay.getDate() + 1, myDay.getMonth(), myDay.getFullYear());
}

function previousDay() {
    showDay(myDay.getDate() - 1, myDay.getMonth(), myDay.getFullYear());
}

function nextWeek() {
    currentYear = (currentWeek === 53) ? currentYear + 1 : currentYear;
    currentWeek = ((currentWeek) % 52) + 1;
    
    showWeek(currentWeek, currentYear);
}

function previousWeek() {
    currentYear = (currentWeek === 1) ? currentYear - 1 : currentYear;
    currentWeek = (currentWeek === 1) ? 52: currentWeek - 1;
    showWeek(currentWeek, currentYear);
}

function nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showMonth(currentMonth, currentYear);
}

function previousMonth() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showMonth(currentMonth, currentYear);
}

function changeButtonOption(opt) {
    let previous = document.getElementById("previous");
    let next = document.getElementById("next");

    previous.removeEventListener('click', previousDay);
    previous.removeEventListener('click', previousWeek);
    previous.removeEventListener('click', previousMonth);
    next.removeEventListener('click', nextDay);
    next.removeEventListener('click', nextWeek);
    next.removeEventListener('click', nextMonth);

    previous.addEventListener('click', window["previous"+opt]);
    next.addEventListener('click', window["next"+opt]);
}

document.getElementById("previous").addEventListener('click', previousMonth);
document.getElementById("next").addEventListener('click', nextMonth);
document.getElementById("month").addEventListener('click', () => {
    showMonth(currentMonth, currentYear);
    changeButtonOption("Month");
});
document.getElementById("week").addEventListener('click', () => {
    showWeek(currentWeek, currentYear);
    changeButtonOption("Week");
});
document.getElementById("day").addEventListener('click', () => {
    showDay(currentDay, currentMonth, currentYear);
    changeButtonOption("Day");
});

showMonth(currentMonth, currentYear);