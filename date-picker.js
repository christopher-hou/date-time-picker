var d = new Date();

var currYear = d.getFullYear();
var currMonth = d.getMonth();

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function generalInfo()
{
  var tmpl = document.querySelector('#tmpl');
  tmpl.mm = currMonth;
  tmpl.yy = currYear;
}

function februaryTest()
{
  if ((currYear % 4 == 0 && currYear % 100 != 0) || currYear % 400 == 0)
    daysPerMonth[1] = 29;
  else
    daysPerMonth[1] = 28;
}

var monthSwitched = false;
var newDate;

function assignClick(e)
{
  clearID();
  e.target.id = "clicked";
  e.target.style = "width:46px;height:56px;font-weight:bold;background-color:#808080;border-style:dotted;border-width:2px";
  if (e.target.name == (currMonth + 11) % 12)
  {
    monthSwitched = true;
    newDate = e.target.innerHTML;
    shiftLeft();
  }
  else if (e.target.name == (currMonth + 1) % 12)
  {
    monthSwitched = true;
    newDate = e.target.innerHTML;
    shiftRight();
  }
}

function displayCalendarMonth()
{
  var tmpl = document.querySelector('#tmpl');
  tmpl.desc = monthNames[currMonth] + " " + currYear;
  var firstDay = new Date(currYear, currMonth, 1).getDay();
  var firstSunday = 9999;
  if (firstDay != 0)
    firstSunday = daysPerMonth[(currMonth + 11) % 12] - firstDay + 1;
  var lastDay = new Date(currYear, currMonth, daysPerMonth[currMonth]).getDay();
  var lastSaturday = 9999;
  if (lastDay != 6)
    lastSaturday = 6 - lastDay;
  firstDay = 1;
  var nextMonthDay = 1;
  var ln = document.createElement('div');
  for (var a = 0; a < 7; a++)
  {
    ln.className = "layout horizontal date-picker";
    ln.id = "outer";
    var dt = document.createElement('paper-item');
    dt.innerHTML = dayNames[a];
    dt.disabled = true;
    dt.style = "pointer-events:none;font-weight:bold;width:50px;color:blue";
    if (a == 0)
      dt.style['margin-left'] = "auto";
    else if (a == 6)
      dt.style['margin-right'] = "auto";
    ln.appendChild(dt);
  }
  document.getElementById("calendar").appendChild(ln);
  for (var i = 0; i < 6; i++)
  {
    var line = document.createElement('div');
    line.className = "layout horizontal date-picker";
    line.id = "outer";
    for (var j = 0; j < 7; j++)
    {
      var date = document.createElement('paper-item');
      date.addEventListener('click', assignClick, true);
      if (firstSunday <= daysPerMonth[(currMonth + 11) % 12])
      {
        date.innerHTML = firstSunday;
        date.style = "width:50px;height:60px;color:grey";
        date.name = (currMonth + 11) % 12;
        firstSunday++;
      }
      else if (firstDay <= daysPerMonth[currMonth])
      {
        date.innerHTML = firstDay;
        date.style = "width:50px;height:60px;font-weight:bold";
        date.name = currMonth;
        if (monthSwitched && firstDay == newDate)
        {
          monthSwitched = false;
          date.click();
        }
        if (firstDay == d.getDate() && currMonth == d.getMonth() && currYear == d.getFullYear())
        {
          date.id = "clicked";
          date.name = "today";
          date.style = "width:48px;height:58px;font-weight:bold;background-color:#b3b3b3;border-style:dotted;border-width:1px";
        }
        firstDay++;
      }
      else if (nextMonthDay <= lastSaturday)
      {
        date.innerHTML = nextMonthDay;
        date.style = "width:50px;height:60px;color:grey;weight:bold";
        date.name = (currMonth + 1) % 12;
        nextMonthDay++;
      }
      else
      {
        date.disabled = true;
        date.style = "width:50px;height:60px;pointer-events:none";
        date.removeEventListener('click', assignClick, true);
      }
      if (j == 0)
        date.style['margin-left'] = "auto";
      else if (j == 6)
        date.style['margin-right'] = "auto";
      line.appendChild(date);
    }
    document.getElementById("calendar").appendChild(line);
  }
}

function displayCalendarYear()
{
  var tmpl = document.querySelector('#tmpl');
  tmpl.desc = currYear;
  for (var i = 0; i < 3; i++)
  {
    var line = document.createElement('div');
    line.className = "layout horizontal date-picker";
    line.id = "outer";
    for (var j = 0; j < 4; j++)
    {
      var year = document.createElement('paper-item');
      year.addEventListener('click', function(e) {
        currMonth = monthNames.indexOf(e.target.innerHTML);
        clearCalendar();
        generalInfo();
        februaryTest();
        displayCalendarMonth();
      }, true);
      year.innerHTML = monthNames[4 * i + j];
      year.style = "width:110px;height:130px;font-weight:bold";
      if (4 * i + j == d.getMonth() && currYear == d.getFullYear())
        year.style = "width:108px;height:128px;font-weight:bold;background-color:#b3b3b3;border-style:dotted;border-width:1px";
      if (j == 0)
        year.style['margin-left'] = "auto";
      else if (j == 3)
        year.style['margin-right'] = "auto";
      line.appendChild(year);
    }
    document.getElementById("calendar").appendChild(line);
  }
}

var decadeBegin = Math.floor(currYear / 10) * 10;

function displayCalendarDecade()
{
  var tmpl = document.querySelector('#tmpl');
  tmpl.desc = decadeBegin + " - " + (decadeBegin + 9);
  for (var i = 0; i < 2; i++)
  {
    var line = document.createElement('div');
    line.className = "layout horizontal date-picker";
    line.id = "outer";
    for (var j = 0; j < 5; j++)
    {
      var decade = document.createElement('paper-item');
      decade.addEventListener('click', function(e) {
        currYear = e.target.innerHTML;
        clearCalendar();
        generalInfo();
        februaryTest();
        displayCalendarYear();
      }, true);
      decade.innerHTML = decadeBegin + 5 * i + j;
      decade.style = "width:90px;height:150px;font-weight:bold";
      if (decadeBegin + 5 * i + j == d.getFullYear())
        decade.style = "width:88px;height:148px;font-weight:bold;background-color:#b3b3b3;border-style:dotted;border-width:1px";
      if (j == 0)
        decade.style['margin-left'] = "auto";
      else if (j == 4)
        decade.style['margin-right'] = "auto";
      line.appendChild(decade);
    }
    document.getElementById("calendar").appendChild(line);
  }
}

var description = document.getElementById('description');
description.addEventListener('click', function() {
  if (description.innerHTML.trim().split(" ").length == 2)
  {
    clearCalendar();
    generalInfo();
    februaryTest();
    displayCalendarYear();
  }
  else if (description.innerHTML.trim().split(" ").length == 1)
  {
    clearCalendar();
    generalInfo();
    februaryTest();
    displayCalendarDecade();
  }
});

function clearCalendar()
{
  var cal = document.getElementById("calendar");
  cal.innerHTML = "";
}

function clearID()
{
  var clicked = document.getElementById("clicked");
  if (clicked != null)
  {
    clicked.id = "";
    if (clicked.name != "today")
      clicked.style = "width:50px;height:60px;font-weight:bold";
    else
      clicked.style = "width:48px;height:58px;font-weight:bold;background-color:#b3b3b3;border-style:dotted;border-width:1px";
  }
}

generalInfo();
februaryTest();
displayCalendarMonth();

//  0   1   2   3   4   5   6
// Sun Mon Tue Wed Thu Fri Sat
// 28  29  30  31   1   2   3
// 25  26  27  28  29  30   1

//    0  1  2  3
// 0  0  1  2  3
// 1  4  5  6  7
// 2  8  9 10 11

function shiftLeft()
{
  clearCalendar();
  generalInfo();
  februaryTest();
  var description = document.getElementById('description');
  if (description.innerHTML.trim().split(" ").length == 2)
  {
    if (currMonth == 0)
    {
      currMonth = 11;
      currYear--;
    }
    else
      currMonth--;
    displayCalendarMonth();
  }
  else if (description.innerHTML.trim().split(" ").length == 1)
  {
    currYear--;
    displayCalendarYear();
  }
  else if (description.innerHTML.trim().split(" ").length == 3)
  {
    decadeBegin -= 10;
    displayCalendarDecade();
  }
}

function shiftRight()
{
  clearCalendar();
  generalInfo();
  februaryTest();
  var description = document.getElementById('description');
  if (description.innerHTML.trim().split(" ").length == 2)
  {
    if (currMonth == 11)
    {
      currMonth = 0;
      currYear++;
    }
    else
      currMonth++;
    displayCalendarMonth();
  }
  else if (description.innerHTML.trim().split(" ").length == 1)
  {
    currYear++;
    displayCalendarYear();
  }
  else if (description.innerHTML.trim().split(" ").length == 3)
  {
    decadeBegin += 10;
    displayCalendarDecade();
  }
}

var left = document.getElementById('left');
left.addEventListener('click', shiftLeft, true);

var right = document.getElementById('right');
right.addEventListener('click', shiftRight, true);

var reset = document.getElementById('reset');
reset.addEventListener('click', function() {
  currYear = new Date().getFullYear();
  currMonth = new Date().getMonth();
  clearCalendar();
  generalInfo();
  februaryTest();
  displayCalendarMonth();
});
