// jshint devel:true
$(function() {
  // Handler for .ready() called.

  var t = 0;
  var date0 = new Date(t);
  console.log('date0: ', date0);

  var makeISODate = function (d) {
    console.log('d: ', d);
    var jhdf = d.toISOString().slice(0,10);
    return jhdf;
  };
  var isoDate0 = makeISODate(date0);

  // var date1 = '1983-11-06';
  // console.log('date1: ', date1);
  // var isoDate1 = makeISODate(date1);
  // console.log('isoDate1: ', isoDate1);

  // var date2 = '2011-05-24';
  // console.log('date2: ', date2);
  // var isoDate2 = makeISODate(date2);
  // console.log('isoDate2: ', isoDate2);

  var $lorem = $('<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore molestias amet nihil saepe, molestiae, aliquid recusandae in eaque facilis nobis minima fuga voluptate architecto corporis ullam autem est, quia incidunt!</p>');

  $('div.lorem').append($lorem);

  var $start = $('#time_start');
  var $end = $('#time_end');
  var $result = $('#result');
  var $resultms = $('#resultms');
  var $test = $('#test');
  var $reset = $('#reset');
  var $calculate = $('#calculate');

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

  var elapsed = function (a, b, f) {
    // elapsed
    console.log('START elapsed function...');
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
    console.log('time.ms: ', time.ms);

    time['pretty'] = '';

    console.log('abso: ', abso);
    console.log('Object.keys(abso).length: ', Object.keys(abso).length);
    var holder = [];
    var keys = Object.keys(abso);
    for (var i = 0; i < keys.length; i++) {

      if (abso[keys[i]]>0) {
        holder.push(abso[keys[i]]+'-'+keys[i]);
      }
      // console.log('Object.keys(abso)[i]', Object.keys(abso)[i]);
      // console.log('holder: ', holder);
    };
    time.pretty = holder.toString().replace(/,/g, ': ');
    // time.pretty = +abso.yy+'y '+
    //   +abso.mo+'M '+
    //   +abso.wk+'w '+
    //   +abso.dd+'d '+
    //   +abso.hh+'h '+
    //   +abso.mm+'m '+
    //   +abso.ss+'s '+
    //   +abso.ms+'ms' ;
    console.log('time: ', time);
    console.log('time.pretty: ', time.pretty);
    console.log('time.ms: ', time.ms);

    $test.html(time.pretty);
    $resultms.val(time.ms);
    $result.val(time.pretty);

    return time;

  };

  var reset = function () {
    // reset fields
    $start.val(isoDate0);
    $end.val(isoDate0);
    $resultms.val(0);
    $result.val(0);

  };
  $reset.on('click', reset);

  var autofill = function () {
    // autofill fields

    reset();

    $start.val(date1ISO);
    $end.val(date2ISO);

  };

  var calc = function () {
    console.log('START calc');
    // calculate

    if ($start.val()) {
      console.log( '$start: ', $start.val() );
      var start = new Date( $start.val() ).getTime();
      console.log( 'start: ', start );

      if ($end.val()) {
        console.log( '$end: ', $end.val() );
        var end = new Date( $end.val() ).getTime();
        console.log( 'end: ', end );

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
  calc();
  $calculate.on('click', calc);

  // $start.on('change', calc);
  // $end.on('change', calc);

});
