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
// console.log(date.toString()); // Wed Jan 12 2011 12:42:46 GMT-0800 (PST)

var elDatetimes = document.getElementsByClassName('input-datetime');
var elDates = document.getElementsByClassName('input-date');
var elTimes = document.getElementsByClassName('input-time');

var elResults = document.getElementsByClassName("result");
// console.log('elResults: ', elResults);

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

/* LIFE EVENTS */
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

/** fCalcInterval function -- Calculate and return elapsed milliseconds.
params...
  a: start date & time
  b: end date & time
*/
var fCalcInterval = function (a, b) {
  console.group('START fCalcInterval function...');
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
  if (t!==NaN) {
    console.log('return t: ',t)
    console.groupEnd();
    return t;
  } else {
    console.log('return false')
    console.groupEnd();
    return false;
  }
};

/** fCalcPretty function -- Use elapsed milliseconds to generate a display of the elapsed time in a pretty format (according to the Julian/Gregorian calendar).  Return a JS object of time interval values.
params...
  t: time elapsed (ms)
*/
var fCalcPretty = function (t) {
  console.group('START fCalcPretty function...');
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

  console.groupEnd();

  return abso;

  // console.log('ints: ', ints);
  // console.log('abso: ', abso);
  // console.log('rems: ', rems);
  // console.log('remainder: ', remainder);
  // console.log('****************************');

};

/** fElapsed function
params...
  a: start date & time
  b: end date & time
  f: date & time format (optional)
*/
var fElapsed = function (a,b,f) {
  console.group('START fElapsed function, format: ',f);
  var t = fCalcInterval(a,b);
  // console.log('abso: ', abso);
  var format = {};

  if (t===NaN) {
    console.log('t is NaN');
    console.groupEnd();
    return false;
  } else {
    var abso = fCalcPretty(t);
    console.log('t is:', t);
    if (reverse) {
      var rev = '-';
    } else {
      var rev = '+';
    }
    switch (f) {
      case 'ms':
        console.log('case MS');
        format['ms'] = '<dl><dt>ms</dt><dd class="time elapsed ms">'+rev+t+'</dd></dl>';
        // console.log('format: ', format);
        console.groupEnd();
        return format.ms;
        break;
      case 'abso':
        console.log('case ABSO');
        format['abso'] = JSON.stringify(abso,false,false);
        // console.log('format: ', format);
        console.groupEnd();
        return format.abso;
        break;
      case 'pretty':
        console.log('case PRETTY');
        format['pretty'] = '<dl><dt>full</dt><dd class="time elapsed ms"><ul class="time elapsed pretty">'+
          '<li>'+rev+abso.yy+' years</li>'+
          '<li>'+abso.mo+' months</li>'+
          '<li>'+abso.wk+' weeks</li>'+
          '<li>'+abso.dd+' days</li>'+
          '<li>'+abso.hh+' hrs</li>'+
          '<li>'+abso.mm+' min</li>'+
          '<li>'+abso.ss+' sec</li>'+
          '<li>'+abso.ms+' ms</li>'+
          '</ul></dd></dl>';
        // console.log('format: ', format);
        console.groupEnd();
        return format.pretty;
        break;
      default:
        console.log('case NO FORMAT');
        console.groupEnd();
        return t;
        break;
    }
  }

};

/** fChange function -- Respond to date/time input change events.
params...
  a: start date & time
  b: end date & time
  f: date & time format (optional)
  t: time elapsed
*/
var fChange = function (event,type) {
  console.group('START fChange');

  // console.log( 'event.target.value: ', event.target.value );
  // console.log( 'document.getElementById(\"start_0\").value: ', document.getElementById("start_0").value );

    // console.log('yes START value');
    // explicitly finding start & end inputs by ID
      switch (type) {
        case 'date':
          var elStart = document.getElementById("start_date_0");
          var elEnd = document.getElementById("end_date_0");
          var myStart = new Date(elStart.value);
          var myEnd = new Date(elEnd.value);
          break;
        case 'time':
          var elStart = document.getElementById("start_time_0");
          var elEnd = document.getElementById("end_time_0");
          var myStart = elStart.value;
          var myEnd = elEnd.value;
          break;
        default:
          var elStart = document.getElementById("start_0");
          var elEnd = document.getElementById("end_0");
          var myStart = new Date(elStart.value);
          var myEnd = new Date(elEnd.value);
          break;
      }
    // i could use this method but that would involve checking whether it's really the start input or the end input, then traversing the DOM for the matching end/start input:
    // var myStart = new Date(event.target.value);
    console.log('elStart.value: ', elStart.value);
    console.log('elEnd.value: ', elEnd.value);
    console.log('myStart: ', Object.prototype.toString.call(myStart));
    console.log('myEnd: ', Object.prototype.toString.call(myEnd));

    if (elStart.value && elEnd.value) {
        console.log('yes START && END values');

        var result = fElapsed(myStart,myEnd,'ms');
        // console.log('result: ', result);
        // if (result) {
          document.getElementById("result_0").innerHTML = result;
        // }

        var result_raw = fElapsed(myStart,myEnd);
        // console.log('result_raw: ', result_raw);
        // if (result_raw) {
          document.getElementById("result_raw_0").value = result_raw;
        // }

        var result_abso = fElapsed(myStart,myEnd,'abso');
        // console.log('result_abso: ', result_abso);
        // if (result_abso) {
          document.getElementById("result_abso_0").value = result_abso;
        // }

        var result_pretty = fElapsed(myStart,myEnd,'pretty');
        // console.log('result_pretty: ', result_pretty);
        // if (result_pretty) {
          document.getElementById("result_pretty_0").innerHTML = result_pretty;
        // }

      } else {
        console.log('no START && END values');
        // clear result
        for (var i = 0; i < elResults.length; i++) {
          elResults[i].value = null;
          elResults[i].innerHTML = null;
        };
      }

  console.groupEnd();
};

var fAutofill = function (type) {
  console.group('START fAutofill');
  // console.log( 'document.getElementById(\"start_0\"): ', document.getElementById("start_0") );
  document.getElementById("start_0").value = '1970-01-01';
  // console.log( 'document.getElementById(\"end_0\"): ', document.getElementById("end_0") );
  document.getElementById("end_0").value = '1971-01-01';
  // fChange(event);
  console.groupEnd();
};

var fClear = function (type) {
  console.group('START fClear');
  // console.log( 'document.getElementById(\"start_0\"): ', document.getElementById("start_0") );
  document.getElementById("start_0").value = null;
  // console.log( 'document.getElementById(\"end_0\"): ', document.getElementById("end_0") );
  document.getElementById("end_0").value = null;
  console.groupEnd();
};

var fAdd = function (type) {
  console.group('START fAdd');
  console.groupEnd();
};

var fSettings = function (type) {
  console.group('START fSettings');
    fLoopElements(elDatetimes,'style','display','none');
    fLoopElements(elDates,'style','display','none');
    fLoopElements(elTimes,'style','display','none');
  switch (type) {
    case 'datetime':
      fLoopElements(elDatetimes,'style','display','block');
      break;
    case 'date':
      fLoopElements(elDates,'style','display','block');
      break;
    case 'time':
      fLoopElements(elTimes,'style','display','block');
      break;
    default:
      break;
  }
  console.groupEnd();
};

var fLoopElements = function (el,prop,effect,value) {
  console.group('START fLoopElements of ',el[0].className +' // '+ prop +'|'+ effect +':'+ value);
  for (var i = 0; i < el.length; i++) {
    console.log('el[i][\'value\']: ',el[i]['value']);
    console.log('el[i][prop][effect]: ',el[i][prop][effect]);
    el[i]['value'] = null;
    document.getElementById("results").reset();
    el[i][prop][effect] = value;
  };
  console.groupEnd();
};
