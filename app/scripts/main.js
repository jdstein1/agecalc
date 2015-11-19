// jshint devel:true
$(function() {
  // Handler for .ready() called.

  var t = 0;

  var makeISODate = function (d) {
    console.log('START makeISODate d: ', d);
    var jhdf = new Date(d);
    console.log('jhdf: ', jhdf);
    var ergv = jhdf.toISOString().slice(0,10);
    console.log('ergv: ', ergv);
    return ergv;
  };

  var now = new Date();
  console.log('now: ', now);
  var isoNow = makeISODate(now);
  console.log('isoNow: ', isoNow);

  var date0 = new Date(t); // The Computer Age begins
  // console.log('date0: ', date0);
  var isoDate0 = makeISODate(date0);
  // console.log('isoDate0: ', isoDate0);

  var date1 = '1984-10-26'; // Terminator released
  // console.log('date1: ', date1);
  var isoDate1 = makeISODate(date1);
  // console.log('isoDate1: ', isoDate1);

  var date2 = 'Aug 29 1997'; // Judgment Day
  // console.log('date2: ', date2);
  var isoDate2 = makeISODate(date2);
  // console.log('isoDate2: ', isoDate2);

  var date3 = 'July 3, 1991'; // Terminator 2: Judgment Day released
  // console.log('date3: ', date3);
  var isoDate3 = makeISODate(date3);
  // console.log('isoDate3: ', isoDate3);

  var $lorem = $('<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore molestias amet nihil saepe, molestiae, aliquid recusandae in eaque facilis nobis minima fuga voluptate architecto corporis ullam autem est, quia incidunt!</p>');

  $('div.lorem').append($lorem);

  var msg = {};
  msg['same'] = "The dates are the same!";
  msg['judg'] = "Judgement Day approaches...";
  msg['diff'] = {};
  msg['diff']['big'] = "Those dates are pretty far apart...";
  msg['diff']['small'] = "Not much time betwen those dats...";

  var $header = $('#header');
  $header.load( "includes/header.html", function() {
    console.log( "header loaded..." );
  });

  var $footer = $('#footer');
  $footer.load( "includes/footer.html", function() {
    console.log( "footer loaded..." );
  });

  // inputs
  var $start = $('#time_start');
  var $end = $('#time_end');
  var $result = $('#result');
  var $resultms = $('#resultms');

  // buttons
  var $btnAuto = $('.btn#auto');
  var $btnAdd = $('.btn#add');
  var $btnReset = $('.btn#reset');
  var $btnClear = $('.btn#clear');
  var $btnCalc = $('.btn#calc');

  $('#calendar_time_start').hide();
  $('#help_time_start').hide();
  $('#calendar_time_end').hide();
  $('#help_time_end').hide();

  var ints = {};
  var abso = {};
  var rems = {};
  var divs = {
    ms:1,                      // 1 ms/ms
    ss:1000,                   // 1000 ms/ses
    mm:1000*60,                // 60,000 ms/min
    hh:1000*60*60,             // 3,600,000 ms/hr
    dd:1000*60*60*24,          // 86,400,000 ms/day
    wk:1000*60*60*24*7,        // 604,800,000 ms/wk
    mo:1000*60*60*24*(365/12), // 2,628,000,000 ms/mo
    yy:1000*60*60*24*365       // 31,536,000,000 ms/yr
  };

// http://stackoverflow.com/questions/1267283/how-can-i-create-a-zerofilled-value-using-javascript
function zeroPad (num, numZeros) {
    var an = Math.abs (num);
    var digitCount = 1 + Math.floor (Math.log (an) / Math.LN10);
    if (digitCount >= numZeros) {
        return num;
    }
    var zeroString = Math.pow (10, numZeros - digitCount).toString ().substr (1);
    return num < 0 ? '-' + zeroString + an : zeroString + an;
}

  var elapsed = function (a, b, f) {
    // elapsed
    console.log('START elapsed');

    if (a===b) {
      console.log('same date, no time elapsed');
      t = 0;
    } else if (a>b) {
      console.log('since b, X time elapsed until a');
      t = a-b;
    } else {
      console.log('since a, X time elapsed until b');
      t = b-a;
    }
    console.log('t: ', t);

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
    abso['hh'] = Math.trunc( ints.dd );
    rems['hh'] = rems.dd % divs.hh;

    ints['mm'] = rems.hh/divs.mm;
    abso['mm'] = Math.trunc( ints.hh );
    rems['mm'] = rems.hh % divs.mm;

    ints['ss'] = rems.mm/divs.ss;
    abso['ss'] = Math.trunc( ints.mm );
    rems['ss'] = rems.mm % divs.ss;

    ints['ms'] = rems.ss/divs.ms;
    abso['ms'] = Math.trunc( ints.ss );
    rems['ms'] = rems.ss % divs.ms;

    var remainder = t % 1000;

    // console.log('ints: ', ints);
    // console.log('abso: ', abso);
    // console.log('rems: ', rems);
    // console.log('remainder: ', remainder);
    // console.log('****************************');

    var time = {};

    time['ms'] = ''+t+'';
    // console.log('time.ms: ', time.ms);

    time['pretty'] = '';
    time['raw'] = {};

    // console.log('abso: ', abso);
    // console.log('Object.keys(abso).length: ', Object.keys(abso).length);
    var holder = [];
    var holderRaw = {};
    var keys = Object.keys(abso);
    for (var i = 0; i < keys.length; i++) {

      if (abso[keys[i]]>0) {
        holder.push(zeroPad(abso[keys[i]],2)+''+keys[i]);
        holderRaw[keys[i]] = zeroPad(abso[keys[i]],2);
        $('.datetime-display.raw').find('#result'+keys[i]).val( zeroPad(abso[keys[i]],2) );
      } else {
        $('.datetime-display.raw').find('#result'+keys[i]).val('00');
        // $('.datetime-display.raw').find('#result'+keys[i]).hide();
      }
      // console.log('Object.keys(abso)[i]', Object.keys(abso)[i]);
      // console.log('holder: ', holder);
      // console.log('holderRaw: ', holderRaw);
    };
    if (holder.length < 1) {
      // console.log('holder.length < 1');
      time.pretty = msg.same;
      time.raw = msg.same;
    } else {
      // console.log('holder.length > 0');
      time.pretty = holder.toString().replace(/,/g, ' ');
      time.raw = holderRaw;
    }
    // time.pretty = +abso.yy+'y '+
    //   +abso.mo+'M '+
    //   +abso.wk+'w '+
    //   +abso.dd+'d '+
    //   +abso.hh+'h '+
    //   +abso.mm+'m '+
    //   +abso.ss+'s '+
    //   +abso.ms+'ms' ;
    console.log('time: ', time);
    // console.log('time.pretty: ', time.pretty);
    // console.log('time.ms: ', time.ms);

    $resultms.val(time.ms);
    $result.val(time.pretty);

    return time;

  };

  var reset = function (params) {
    // reset fields
    console.log('START reset');

    if (!params || params.target) {
      // if optional params is undefined or an event target
      params = [isoDate0,isoNow];
    } else {
      // if optional params are passed
      params = params;
      console.log('params.length: ', params.length);
      if (params.length < 2) {
        params[1] = params[0];
      }
    }
    console.log('params: ', params);

    $start.val( params[0] );
    $end.val( params[1] );
    
    calc();
    console.log('######################');

  };

  var clear = function () {
    // clear fields
    console.log('START clear');

    reset([isoDate0]);

  };

  var autofill = function () {
    // autofill fields
    console.log('START autofill');

    reset();

    $start.val(isoDate1);
    $end.val(isoDate2);
    calc();

  };

  var add = function () {
    // add fields
    console.log('START add');

  };

  var calc = function () {
    // calculate
    console.log('START calc');

    if ($start.val()) {
      // console.log( '$start: ', $start.val() );
      var start = new Date( $start.val() ).getTime();
      // console.log( 'start: ', start );

      if ($end.val()) {
        // console.log( '$end: ', $end.val() );
        var end = new Date( $end.val() ).getTime();
        // console.log( 'end: ', end );

        // var resultms = end - start;
        // console.log( 'resultms: ', resultms );
        // $resultms.val(resultms);

        elapsed(start, end, null);

        // var result = end - start;
        // console.log( 'result: ', result );
        // $result.val(result);

      }
      
    }

  };
  calc(); // immediately execute "calc" function.

  // button bindings
  $btnReset.on('click', reset);
  $btnClear.on('click', clear);
  $btnAuto.on('click', autofill);
  $btnAdd.on('click', add);
  $btnCalc.on('click', calc);

  // $start.on('change', calc);
  // $end.on('change', calc);

});
