// jshint devel:true
$(function() {
  // Handler for .ready() called.

  var t = 0, i = 1;

  var $header = $('#header');
  $header.load( "includes/header.html", function() {
    console.log( "header loaded..." );
  });

  var $footer = $('#footer');
  $footer.load( "includes/footer.html", function() {
    console.log( "footer loaded..." );
  });

  var $table = $('#table');
  $table.load( "includes/table.html", function() {
    console.log( "table loaded..." );
  });

  var $buttons = $('#buttons');
  // $buttons.load( "includes/buttons.html", function() {
  //   console.log( "buttons loaded..." );
  // });

  var $icon = $('#icon');
  $icon.load( "includes/icon.html", function() {
    console.log( "icon loaded..." );
  });

  var makeDateObj = function (d) {
    console.group( 'START makeDateObj d: ', d );
    // console.log( '(new Date(d)).toJSON(): ', (new Date(d)).toJSON() );
    var x = {};
    x['ms'] = Date.parse(d);
    // console.log( 'x.ms: ', x.ms );
    x['iso'] = (new Date(x.ms)).toJSON();
    // console.log( 'x.iso: ', x.iso );
    // console.log( 'x.iso.split(\'T\'): ', x.iso.split('T') );
    x['isodate'] = x.iso.slice(0,10);
    // console.log( 'x.isodate: ', x.isodate );
    x['isotime'] = x.iso.slice(11);
    // console.log( 'x.isotime: ', x.isotime );
    x['local'] = new Date(x.iso); // x.local time
    // console.log( 'x.local: ', x.local );
    // x['iso'] = x.local.toISOString();
    // console.log( 'x.iso: ', x.iso );
    x['utc'] = x.local.toUTCString();
    // console.log( 'x.utc: ', x.utc );
    // console.log( 'x: ', x );
    // console.log('end');
    console.groupEnd();
    return x;
  };

  // set up default dates
  // all formats allowed
  // makeDateObj func wil convert them

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
  msg['diff']['small'] = "Not much time betwen those dates...";

  var $intervals = $('.interval-box');
  console.log('$intervals.length: ', $intervals.length);
  console.log('$intervals.find(\'.interval\').length: ', $intervals.find('.interval').length);

  // inputs
  var $start = $('#time_start_0');
  var $end = $('#time_end_0');
  var $result = $('#result_0');
  var $resultiso = $('#resultiso_0');
  var $resultms = $('#resultms_0');

  // buttons
  var $btnAuto = $('.btn#auto');
  var $btnAdd = $('.btn#add');
  var $btnRemove = $('.btn#remove');
  $btnRemove.prop('disabled',true);
  var $btnReset = $('.btn#reset');
  var $btnClear = $('.btn#clear');
  var $btnCalc = $('.btn#calc');

  var ints = {}; // integer time span
  var abso = {}; // absolute time spans
  var rems = {}; // remainder time spans
  var divs = {
    ms:1,                          // 1 ms/ms
    s:1000,                        // 1000 ms/ses
    m:1000*60,                     // 60,000 ms/min
    h:1000*60*60,                  // 3,600,000 ms/hr
    d:1000*60*60*24,               // 86,400,000 ms/day
    w:1000*60*60*24*7,             // 604,800,000 ms/wk
    M:1000*60*60*24*(365.2425/12), // 2,628,000,000 ms/mo
    y:1000*60*60*24*365.2425       // 31,536,000,000 ms/yr
  }; // time span divisions
  var labs = {
    ms:"milliseconds",
    s:"seconds",
    m:"minutes",
    h:"hours",
    d:"days",
    w:"weeks",
    M:"months",
    y:"years"
  }; // time span labels

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

  var check = function () {
    if ( $intervals.find('.interval').length < 2 ) {
      $btnRemove.prop('disabled',true);
    } else {
      $btnRemove.prop('disabled',false);
    }
  };

  var elapsed = function (a, b, f) {
    // elapsed
    console.group( 'START elapsed' );

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
    // console.log( 't: ', t );

    ints['y'] = t/divs.y;
    abso['y'] = Math.trunc( ints.y );
    rems['y'] = t % divs.y;

    ints['M'] = rems.y/divs.M;
    abso['M'] = Math.trunc( ints.M );
    rems['M'] = rems.y % divs.M;

    ints['w'] = rems.M/divs.w;
    abso['w'] = Math.trunc( ints.w );
    rems['w'] = rems.M % divs.w;

    ints['d'] = rems.w/divs.d;
    abso['d'] = Math.trunc( ints.d );
    rems['d'] = rems.w % divs.d;

    ints['h'] = rems.d/divs.h;
    abso['h'] = Math.trunc( ints.d );
    rems['h'] = rems.d % divs.h;

    ints['m'] = rems.h/divs.m;
    abso['m'] = Math.trunc( ints.h );
    rems['m'] = rems.h % divs.m;

    ints['s'] = rems.m/divs.s;
    abso['s'] = Math.trunc( ints.m );
    rems['s'] = rems.m % divs.s;

    ints['ms'] = rems.s/divs.ms;
    abso['ms'] = Math.trunc( ints.s );
    rems['ms'] = rems.s % divs.ms;

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
    time['fancy'] = {};

    // console.log( 'abso: ', abso );
    // console.log( 'Object.keys(abso).length: ', Object.keys(abso).length );
    var holder = [];
    var holderRaw = {};
    var keys = Object.keys(abso);
    for (var i = 0; i < keys.length; i++) {

      // console.log('keys[i]: ', keys[i]);
      // console.log('abso: ', abso);
      // console.log('abso(keys[i]): ', abso(keys[i]));

      if (abso[keys[i]]>0) {
        if (keys[i]==='ms') {
          holder.push(zeroPad(abso[keys[i]],4)+' '+labs[keys[i]]+'');
          holderRaw[keys[i]] = zeroPad(abso[keys[i]],4);
          $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').html( zeroPad(abso[keys[i]],4) ).val( zeroPad(abso[keys[i]],4) );
        } else {
          holder.push(zeroPad(abso[keys[i]],2)+' '+labs[keys[i]]+' ');
          holderRaw[keys[i]] = zeroPad(abso[keys[i]],2);
          $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').html( zeroPad(abso[keys[i]],2) ).val( zeroPad(abso[keys[i]],2) );
        }
      } else {
        if (keys[i]==='ms') {
          // holder.push('0000'+keys[i]+'');
          // holderRaw[keys[i]] = 0000;
          $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').html('0000').val('0000');
          // $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').hide();
        } else {
          // holder.push('00'+keys[i]+'');
          // holderRaw[keys[i]] = 00;
          $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').html('00').val('00');
          // $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').hide();
        }
      }

      // console.log( 'Object.keys(abso)[i]', Object.keys(abso)[i] );
      // console.log( 'holder: ', holder );
      // console.log( 'holderRaw: ', holderRaw );

    }

    if (holder.length < 1) {
      // console.log( 'holder.length < 1' );
      time.pretty = msg.same;
      time.fancy = holderRaw;
    } else {
      // console.log( 'holder.length > 0' );
      time.pretty = holder.toString().replace(/,/g, ' ');
      time.fancy = holderRaw;
    }

    // time.pretty = +abso.y+'y '+
    //   +abso.M+'M '+
    //   +abso.w+'w '+
    //   +abso.d+'d '+
    //   +abso.h+'h '+
    //   +abso.m+'m '+
    //   +abso.s+'s '+
    //   +abso.ms+'ms' ;
    // console.log( 'time: ', time );
    // console.log( 'time.pretty: ', time.pretty );
    // console.log( 'time.ms: ', time.ms );

    $resultms.val(time.ms);
    $resultiso.val(time.iso);
    $result.val(time.pretty);
    // console.log('end');
    console.groupEnd();

    return time;

  };

  var reset = function (params) {
    // reset fields
    console.group( 'START reset' );

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
    // console.log('end');
    console.groupEnd();
    
    calc();

  };

  var clear = function () {
    // clear fields
    console.group( 'START clear' );

    reset([oDate0.isodate]);
    // console.log('end');
    console.groupEnd();

  };

  var autofill = function () {
    // autofill fields
    console.group( 'START autofill' );

    reset();

    $start.val(oDate1.isodate);
    $end.val(oDate2.isodate);
    calc();
    // console.log('end');
    console.groupEnd();

  };

  var remove = function () {
    // remove fields
    console.group( 'START remove' );

    $intervals.find('.interval.well').last().remove();
    i--;

    check();

    // console.log('end');
    console.groupEnd();

  };

  var add = function () {
    // add fields
    console.group( 'START add' );

    // console.log('$(#interval__0).find(.form-control): ',$('#interval__0').find('.form-control'));

    // var $intervalEndLast = $('.interval').find('.form-control');
    // console.log('$intervalEndLast: ',$intervalEndLast);
    // $('<div/>',{class:'col-sm-4 interval-end'});

    // var $intervalEndLast = $('#interval__'+(i-1)).find('.form-control');
    // console.log('$intervalEndLast: ',$intervalEndLast);

    // create new DOM objs

    var $intervalStart = $('<input/>',{
        class:'form-control',
        type:'date',
        placeholder:'From',
        name:'time_start_'+i,
        id:'time_start_'+i
      });

    var $intervalEnd = $('<input/>',{
        class:'form-control',
        type:'date',
        placeholder:'Until',
        name:'time_end_'+i,
        id:'time_end_'+i
      });

    var $addon = $('<span/>',{class:'input-group-addon text-muted'});

    var $intervalGroup = $('<div/>',{class:'input-group'});

    // var $colsm4 = $('<div/>',{
    //     class:'col-sm-4'})
    //   .html($intervalGroup);

    var $colsm3 = $('<div/>',{class:'col-sm-3'});
    var $colsm4 = $('<div/>',{class:'col-sm-4'});
    var $colsm6 = $('<div/>',{class:'col-sm-6'});
    var $colsm12 = $('<div/>',{class:'col-sm-12'});

    var $intervalColStart = $colsm4.clone().addClass('interval-start')
      .html($intervalGroup.clone()
        .html($intervalStart).prepend($addon.clone()
          .html('From'))
        );

    var $intervalColEnd = $colsm4.clone().addClass('interval-end')
      .html($intervalGroup.clone()
        .html($intervalEnd).prepend($addon.clone()
          .html('Until'))
        );

    var $intervalColTabs = $colsm4.clone().addClass('interval-tabs')
      .html('tabs');

    var $intervalColPretty = $colsm4.clone().addClass('interval-result')
      .html('pretty result');

    var $intervalColResult = $colsm12.clone().addClass('interval-result')
      .html('result');

    var $intervalDates = $('<div/>',{class:'row interval-dates'});

    var $intervalResults = $('<div/>',{class:'row interval-results'});

    var $intervalWell = $('<div/>',{class:'well well-sm interval',id:'interval__'+i});

    // var $interval = $('<div class="well well-sm interval" />').append($colsm4.append($intervalEndLast)).append($colsm4.append($intervalEndNew));

    var $interval = $intervalWell.addClass('batsignal').attr('id','interval__'+i)
      .append($intervalDates
        .append($intervalColStart)
        .append($intervalColEnd)
        .append($intervalColPretty)
      //   .append($intervalColTabs)
      // )
      // .append($intervalResults
      //   .append($intervalColResult)
    );

    $intervals.append($interval);
    // $interval.appendTo($intervals);
    // $('.input-group').append('<p>'+i+' added</p>'); //test

    i++;

    check();

    // console.log('end');
    console.groupEnd();

  };

  var calc = function () {
    // calculate
    console.group( 'START calc' );

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
    // console.log('end');
    console.groupEnd();

  };
  calc(); // immediately execute "calc" function.

  // button bindings
  $btnReset.on('click', reset);
  $btnClear.on('click', clear);
  $btnAuto.on('click', autofill);
  $btnAdd.on('click', add);
  $btnRemove.on('click', remove);
  $btnCalc.on('click', calc);

  // other event bindings
  $start.on('change', calc);
  $end.on('change', calc);

});
