var t = new Date();
var currHour = t.getHours();
var currMinute = t.getMinutes();
var currSecond = t.getSeconds();
var tmpl = document.querySelector('#tmpl2');

function setTime()
{
  if (currHour > 12)
  {
    tmpl.hour = currHour - 12;
    tmpl.ampm = "PM";
  }
  else
  {
    tmpl.hour = currHour;
    tmpl.ampm = "AM";
  }
  if (currMinute < 10 && currMinute.length != 2)
    tmpl.minute = "0" + currMinute;
  else
    tmpl.minute = currMinute;
  if (currSecond < 10 && currMinute.length != 2)
    tmpl.second = "0" + currSecond;
  else
    tmpl.second = currSecond;
}

setTime();

var blink = setInterval(function () {
    var ele = document.getElementById('blink');
    ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
}, 500);

var blink2 = setInterval(function () {
    var ele2 = document.getElementById('blink2');
    ele2.style.visibility = (ele2.style.visibility == 'hidden' ? '' : 'hidden');
}, 500);

var ampm = document.getElementById('ampm');
function switchampm()
{
  if (tmpl.ampm == "AM")
    tmpl.ampm = "PM";
  else
    tmpl.ampm = "AM";
}

function addHour()
{
  if (tmpl.hour == 11)
    switchampm();
  tmpl.hour = (parseInt(tmpl.hour) + 1) % 12;
  if (tmpl.hour == 0)
    tmpl.hour = 12;
}

function subHour()
{
  if (tmpl.hour == 12)
    switchampm();
  tmpl.hour = (parseInt(tmpl.hour) + 11) % 12;
  if (tmpl.hour == 0)
    tmpl.hour = 12;
}

function addMinute()
{
  if (tmpl.minute == 59)
    addHour();
  tmpl.minute = (parseInt(tmpl.minute) + 1) % 60;
  if (tmpl.minute < 10)
    tmpl.minute = "0" + tmpl.minute;
}

function subMinute()
{
  if (tmpl.minute == 0)
    subHour();
  tmpl.minute = (parseInt(tmpl.minute) + 59) % 60;
  if (tmpl.minute < 10)
    tmpl.minute = "0" + tmpl.minute;
}

function addSecond()
{
  if (tmpl.second == 59)
    addMinute();
  tmpl.second = (parseInt(tmpl.second) + 1) % 60;
  if (tmpl.second < 10)
    tmpl.second = "0" + tmpl.second;
}

function subSecond()
{
  if (tmpl.second == 0)
    subMinute();
  tmpl.second = (parseInt(tmpl.second) + 59) % 60;
  if (tmpl.second < 10)
    tmpl.second = "0" + tmpl.second;
}

ampm.addEventListener('click', function() {
  switchampm();
});

var hourUp = document.getElementById('hourUp');
hourUp.addEventListener('click', function() {
  addHour();
});

var minuteUp = document.getElementById('minuteUp');
minuteUp.addEventListener('click', function() {
  addMinute();
});

var hourDown = document.getElementById('hourDown');
hourDown.addEventListener('click', function() {
  subHour();
});

var minuteDown = document.getElementById('minuteDown');
minuteDown.addEventListener('click', function() {
  subMinute();
});

var secondUp = document.getElementById('secondUp');
secondUp.addEventListener('click', function() {
  addSecond();
});

var secondDown = document.getElementById('secondDown');
secondDown.addEventListener('click', function() {
  subSecond();
});

var ampmUp = document.getElementById('ampmUp');
ampmUp.addEventListener('click', function() {
  switchampm();
});

var ampmDown = document.getElementById('ampmDown');
ampmDown.addEventListener('click', function() {
  switchampm();
});

var reset = document.getElementById('reset');
reset.addEventListener('click', function() {
  currHour = new Date().getHours();
  currMinute = new Date().getMinutes();
  currSecond = new Date().getSeconds();
  setTime();
});

var hour = document.getElementById('hour');
hour.addEventListener('keydown', function(e) {
  if (e.keyCode == 13 && !hour.invalid)
    hour.click();
});

var minute = document.getElementById('minute');
minute.addEventListener('keydown', function(e) {
  if (e.keyCode == 13 && !minute.invalid)
    minute.click();
});

var second = document.getElementById('second');
second.addEventListener('keydown', function(e) {
  if (e.keyCode == 13 && !second.invalid)
    second.click();
});
