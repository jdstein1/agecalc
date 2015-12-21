/*
Reference

JS Date API
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

Moment.js

Countdown.js
http://countdownjs.org/demo.html

*/

var reverse = false; // is the elapsed time counting forwards or backwards?

var now = new Date(), life = [], elapsed = [], nowMs = now.getTime(), t = 0;
// console.log('now: ', now);
// console.log('nowMs: ', nowMs);

var when = new Date();
// console.log('when: ', when);
var time = new Date().getTime();
// console.log('time: ', time);
var date = new Date(time);
// console.log('date: ', date);
console.log(date.toString()); // Wed Jan 12 2011 12:42:46 GMT-0800 (PST)

life.birth = new Date('October 4, 1946 12:00:00');
// console.log('life.birth: ', life.birth);

life.chris = {};
life.chris.married = new Date('September 16, 1967 12:00:01');
// console.log('life.chris.married: ', life.chris.married);
life.chris.divorced = new Date('September 20, 1979 12:00:02');
// console.log('life.chris.divorced: ', life.chris.divorced);

life.tim = {};
life.tim.begin = new Date(1988,05,30,12,00,03);
// console.log('life.tim.begin: ', life.tim.begin);
life.tim.end = new Date(2009,05,30,12,00,04);
// console.log('life.tim.end: ', life.tim.end);

var dateFormat = {};
dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
// console.log('dateFormat: ', dateFormat);
var f = dateFormat.masks.isoDateTime; // set default date/time format
// console.log('f: ', f);

/** fDate function
params...
a: start date & time
f: date & time format (optional)
*/
var fDate = function (a, f) {
  // console.log('START fDate function...');
  if (f==='ms') {
    return new Date(a).getTime();
  } else if (f==='iso') {
    return new Date(a).toISOString();
  } else {
    return new Date(a);
  }
};

/** fCalc function -- Calculate MS
params...
a: start date & time
b: end date & time
f: date & time format (optional)
t: time elapsed
*/
var fCalc = function (a, b) {
  console.log('START fCalc function...');
  if (a===b) {
    // console.log('same date, no time elapsed');
    t = 0;
  } else if (a>b) {
    // console.log('since b, X time elapsed until a');
    t = a-b;
    reverse = true;
  } else {
    // console.log('since a, X time elapsed until b');
    t = b-a;
    reverse = false;
  }
  console.log('t: ', t);
  return t;
};

/** fCalcPretty function -- Calculate MS
params...
a: start date & time
b: end date & time
f: date & time format (optional)
t: time elapsed
*/
var fCalcPretty = function (t) {
  console.log('START fCalcPretty function...');
  var remainder = t % 1000;
  var ints = {};
  var abso = {};
  var rems = {};
  var divs = {
    yy:1000*60*60*24*365, // 31,536,000,000
    mo:1000*60*60*24*(365/12), // 
    wk:1000*60*60*24*7, // 604,800,000
    dd:1000*60*60*24, // 86,400,000
    hh:1000*60*60, // 3,600,000
    mm:1000*60, // 60,000
    ss:1000, // 1000
    ms:1 // 1000
  };

  ints['yy'] = t/divs.yy;
  abso['yy'] = Math.trunc( ints.yy );
  rems['yy'] = t % divs.yy;
  // console.log('ints.yy: ', ints.yy);
  // console.log('abso.yy: ', abso.yy);
  // console.log('rems.yy: ', rems.yy);

  ints['mo'] = rems.yy/divs.mo;
  abso['mo'] = Math.trunc( ints.mo );
  rems['mo'] = rems.yy % divs.mo;

  ints['wk'] = rems.mo/divs.wk;
  abso['wk'] = Math.trunc( ints.wk );
  rems['wk'] = rems.mo % divs.wk;

  ints['dd'] = rems.wk/divs.dd;
  abso['dd'] = Math.trunc( ints.dd );
  rems['dd'] = rems.wk % divs.dd;

  ints['hh'] = rems.dd/divs.hh;
  abso['hh'] = Math.trunc( ints.hh );
  rems['hh'] = rems.dd % divs.hh;

  ints['mm'] = rems.hh/divs.mm;
  abso['mm'] = Math.trunc( ints.mm );
  rems['mm'] = rems.hh % divs.mm;

  ints['ss'] = rems.mm/divs.ss;
  abso['ss'] = Math.trunc( ints.ss );
  rems['ss'] = rems.mm % divs.ss;

  ints['ms'] = rems.ss/divs.ms;
  abso['ms'] = Math.trunc( ints.ms );
  rems['ms'] = rems.ss % divs.ms;

  return abso;

  // console.log('ints: ', ints);
  // console.log('abso: ', abso);
  // console.log('rems: ', rems);
  // console.log('remainder: ', remainder);
  // console.log('****************************');

};

/** fElapsed function
params...
t: time elapsed
*/
var fElapsed = function (a,b,f) {
  console.log('START fElapsed function, format: ',f);
  fCalc(a,b);
  var format = {};

  switch (f) {
    case 'ms':
      console.log('case MS');
      format.ms = '<dl><dt>ms</dt><dd class="time elapsed ms">'+t+'</dd></dl>';
      console.log('format: ', format);
      return format.ms;
    case 'pretty':
      console.log('case PRETTY');
      var abso = fCalcPretty(t);
      format.pretty = '<dl><dt>full</dt><dd class="time elapsed ms"><ul class="time elapsed pretty">'+
        // '<li>t:'+t+'</li>'+
        '<li>'+abso.yy+' years</li>'+
        '<li>'+abso.mo+' months</li>'+
        '<li>'+abso.wk+' weeks</li>'+
        '<li>'+abso.dd+' days</li>'+
        '<li>'+abso.hh+' hrs</li>'+
        '<li>'+abso.mm+' min</li>'+
        '<li>'+abso.ss+' sec</li>'+
        '<li>'+abso.ms+' ms</li>'+
        '</ul></dd></dl>';
      console.log('format: ', format);
      return format.pretty;
    default:
      console.log('case NO FORMAT');
      return t;
      break;
    }

};

var fChangeDatetime = function (event) {
  console.group('START fChangeDatetime');
  // console.log('type: ', type)
  // console.log('event: ', event);
  // console.log('event.target.id: ', event.target.id);
  // console.log('event.target.value: ', event.target.value);
  var myStart = new Date(document.getElementById('start_0').value);
  console.log('myStart: ', myStart);
  var myEnd = new Date(document.getElementById('end_0').value);
  console.log('myEnd: ', myEnd);
  var result = fElapsed(myStart,myEnd);
  console.log(result);
  document.getElementById('result_0').value = result;
  console.groupEnd();
};

var fChangeDate = function (event) {
  console.group('START fChangeDate');
  // console.log('type: ', type)
  // console.log('event: ', event);
  // console.log('event.target.id: ', event.target.id);
  // console.log('event.target.value: ', event.target.value);
  console.groupEnd();
};

var fChangeTime = function (event) {
  console.group('START fChangeTime');
  // console.log('type: ', type)
  // console.log('event: ', event);
  // console.log('event.target.id: ', event.target.id);
  // console.log('event.target.value: ', event.target.value);
  console.groupEnd();
};
