// jshint devel:true
$(function() {
  // Handler for .ready() called.

  var t = 0;

  var makeDateObj = function (d) {
    console.log( 'START makeDateObj d: ', d );
    // console.log( '(new Date(d)).toJSON(): ', (new Date(d)).toJSON() );
    var t = {};
    t['ms'] = Date.parse(d);
    // console.log( 't.ms: ', t.ms );
    t['iso'] = (new Date(t.ms)).toJSON();
    // console.log( 't.iso: ', t.iso );
    // console.log( 't.iso.split(\'T\'): ', t.iso.split('T') );
    t['isodate'] = t.iso.slice(0,10);
    // console.log( 't.isodate: ', t.isodate );
    t['isotime'] = t.iso.slice(11);
    // console.log( 't.isotime: ', t.isotime );
    t['local'] = new Date(t.iso); // t.local time
    // console.log( 't.local: ', t.local );
    // t['iso'] = t.local.toISOString();
    // console.log( 't.iso: ', t.iso );
    t['utc'] = t.local.toUTCString();
    // console.log( 't.utc: ', t.utc );
    console.log( 't: ', t );
    return t;
  };

  var now = new Date();
  var oNow = makeDateObj(now);

  var date0 = new Date(t); // The Computer Age begins
  var oDate0 = makeDateObj(date0);

  var date1 = '1984-10-26'; // Terminator released
  var oDate1 = makeDateObj(date1);

  var date2 = 'Aug 29 1997'; // Judgment Day
  var oDate2 = makeDateObj(date2);

  var date3 = 'July 3, 1991'; // Terminator 2: Judgment Day released
  var oDate3 = makeDateObj(date3);

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

  var ints = {};
  var abso = {};
  var rems = {};
  var divs = {
    ms:1,                           // 1 ms/ms
    ss:1000,                        // 1000 ms/ses
    mm:1000*60,                     // 60,000 ms/min
    hh:1000*60*60,                  // 3,600,000 ms/hr
    dd:1000*60*60*24,               // 86,400,000 ms/day
    wk:1000*60*60*24*7,             // 604,800,000 ms/wk
    mo:1000*60*60*24*(365.2425/12), // 2,628,000,000 ms/mo
    yy:1000*60*60*24*365.2425       // 31,536,000,000 ms/yr
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
    console.log( 'START elapsed' );

    if (a===b) {
      console.log( 'same date, no time elapsed' );
      t = 0;
    } else if (a>b) {
      console.log( 'since b, X time elapsed until a' );
      t = a-b;
    } else {
      console.log( 'since a, X time elapsed until b' );
      t = b-a;
    }
    console.log( 't: ', t );

    ints['yy'] = t/divs.yy;
    abso['yy'] = Math.trunc( ints.yy );
    rems['yy'] = t % divs.yy;
    // console.log( 'ints.yy: ', ints.yy );
    // console.log( 'abso.yy: ', abso.yy );
    // console.log( 'rems.yy: ', rems.yy );

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

    // console.log( 'ints: ', ints );
    // console.log( 'abso: ', abso );
    // console.log( 'rems: ', rems );
    // console.log( 'remainder: ', remainder );
    // console.log( '****************************' );

    var time = {};

    time['ms'] = ''+t+'';
    // console.log( 'time.ms: ', time.ms );

    time['pretty'] = '';
    time['raw'] = {};

    // console.log( 'abso: ', abso );
    // console.log( 'Object.keys(abso).length: ', Object.keys(abso).length );
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
      // console.log( 'Object.keys(abso)[i]', Object.keys(abso)[i] );
      // console.log( 'holder: ', holder );
      // console.log( 'holderRaw: ', holderRaw );
    };
    if (holder.length < 1) {
      // console.log( 'holder.length < 1' );
      time.pretty = msg.same;
      time.raw = msg.same;
    } else {
      // console.log( 'holder.length > 0' );
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
    console.log( 'time: ', time );
    // console.log( 'time.pretty: ', time.pretty );
    // console.log( 'time.ms: ', time.ms );

    $resultms.val(time.ms);
    $result.val(time.pretty);

    return time;

  };

  var reset = function (params) {
    // reset fields
    console.log( 'START reset' );

    if (!params || params.target) {
      // if optional params is undefined or an event target
      params = [oDate0.isodate,oNow.isodate];
    } else {
      // if optional params are passed
      params = params;
      console.log( 'params.length: ', params.length );
      if (params.length < 2) {
        params[1] = params[0];
      }
    }
    console.log( 'params: ', params );

    $start.val( params[0] );
    $end.val( params[1] );
    
    calc();
    console.log( '######################' );

  };

  var clear = function () {
    // clear fields
    console.log( 'START clear' );

    reset([oDate0.isodate]);

  };

  var autofill = function () {
    // autofill fields
    console.log( 'START autofill' );

    reset();

    $start.val(oDate1.isodate);
    $end.val(oDate2.isodate);
    calc();

  };

  var add = function () {
    // add fields
    console.log( 'START add' );

  };

  var calc = function () {
    // calculate
    console.log( 'START calc' );

    if ($start.val()) {
      // console.log( '$start: ', $start.val() );
      var start = new Date( $start.val() ).getTime();
      // console.log( 'start: ', start );

      if ($end.val()) {
        // console.log( '$end: ', $end.val() );
        var end = new Date( $end.val() ).getTime();

        elapsed(start, end, null);

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
