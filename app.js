var readonly = false;

var date = document.getElementById('date');
var time = document.getElementById('time');
var datetime = document.getElementById('date-time');
var datepicker = document.getElementById('date-picker');
var timepicker = document.getElementById('time-picker');

var displaydate = document.getElementById('displaydate');
var displaytime = document.getElementById('displaytime');

var dateClicked = false, timeClicked = false, datetimeClicked = false;

function displayDate()
{
  var monthyear = document.getElementById('monthyear').innerHTML;
  var month = parseInt(monthyear.split(" ")[0]) + 1;
  var year = parseInt(monthyear.split(" ")[1]);
  var date = document.getElementById('clicked').innerHTML;
  displaydate.innerHTML = month + "/" + date + "/" + year;
}

function displayTime()
{
  var hour = document.getElementById('hour');
  var minute = document.getElementById('minute');
  var second = document.getElementById('second');
  var ampm = document.getElementById('ampm');
  if (parseInt(minute.value) < 10 && minute.value.length != 2)
    minute.value = "0" + minute.value;
  if (parseInt(second.value) < 10 && second.value.length != 2)
    second.value = "0" + second.value;
  displaytime.innerHTML = hour.value + ":" + minute.value + ":" + second.value + " " + Polymer.dom(ampm).innerHTML.trim() + " " + new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2];
}

date.addEventListener('click', function() {
  dateClicked = true;
  timeClicked = false;
  datetimeClicked = false;
  datepicker.style.display = "block";
  timepicker.style.display = "none";
  displaydate.style.display = "block";
  displaytime.style.display = "none";
  displaydate.style['margin-right'] = "auto";
  displayDate();
});
time.addEventListener('click', function() {
  dateClicked = false;
  timeClicked = true;
  datetimeClicked = false;
  datepicker.style.display = "none";
  timepicker.style.display = "block";
  displaydate.style.display = "none";
  displaytime.style.display = "block";
  displaytime.style['margin-left'] = "auto";
  displayTime();
});
datetime.addEventListener('click', function() {
  dateClicked = false;
  timeClicked = false;
  datetimeClicked = true;
  datepicker.style.display = "block";
  timepicker.style.display = "block";
  displaydate.style.display = "block";
  displaytime.style.display = "block";
  displaydate.style['margin-right'] = 0;
  displaytime.style['margin-left'] = 0;
  displayDate();
  displayTime();
});

function invalid()
{
  var all = document.getElementsByTagName("*");
  for (var i = 0; i < all.length; i++)
    if (all[i].invalid)
      return true;
}

document.addEventListener("click", function() {
  if (document.getElementById('clicked') != null && !invalid())
  {
    if (dateClicked)
      date.click();
    else if (timeClicked)
      time.click();
    else if (datetimeClicked)
      datetime.click();
  }
});

var menu = document.getElementById('menu');
menu.addEventListener("click", function() {
  var drawerPanel = document.getElementById('drawerPanel');
  drawerPanel.openDrawer();
});

var close = document.getElementById('close');
close.addEventListener("click", function() {
  var drawerPanel = document.getElementById('drawerPanel');
  drawerPanel.closeDrawer();
});

if (readonly)
{
  var all = document.getElementsByTagName("*");
  for (var i = 0; i < all.length; i++)
    if (all[i].id == "date-picker" || all[i].id == "time-picker" || all[i].id == "reset")
      all[i].style['pointer-events'] = "none";
}

var drawer = document.getElementById('drawer');
drawer.style = "width:100%;background-color:rgba(0,0,0,0.5);transition:1s";
