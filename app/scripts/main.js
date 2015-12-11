// jshint devel:true
$(function() {
  // Handler for .ready() called.

/* --------------------------------- */
/* VARIABLES ++++++++++++ */
/* --------------------------------- */

  var time = {}, alertmsg = {}, t = 0, i = 1, rev = null;
      time['ms'] = 0;
      time['pretty'] = '';
      time['fancy'] = {};
      alertmsg['global'] = '';
      alertmsg['local'] = '';

  var abso_default = {
    M: 0,
    d: 0,
    h: 0,
    m: 0,
    ms: 0,
    s: 0,
    w: 0,
    y: 0
  };

  var makeDateObj = function (d) {
    // console.group( 'START makeDateObj d: ', d );
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
    // console.groupEnd();
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
  msg['err'] = {};
  msg.err['none'] = "No dates given!";
  msg.err['start'] = "No start date given!";
  msg.err['end'] = "No end date given!";
  msg['same'] = "The dates are the same!";
  msg['judg'] = "Judgement Day approaches...";
  msg['diff'] = {};
  msg.diff['big'] = "Those dates are pretty far apart...";
  msg.diff['small'] = "Not much time betwen those dates...";

  var $intervals = $('.interval-box');

  // inputs
  var $start0 = $('#time_start_0');
  var $end0 = $('#time_end_0');
  var $result0 = $('#result_0');
  var $resultms0 = $('#resultms_0');

  // buttons
  var $btnAuto = $('.btn#auto');
  var $btnAdd = $('.btn#add');
  $btnAdd.prop('disabled',true).hide();
  var $btnRemove = $('.btn#remove');
  $btnRemove.prop('disabled',true).hide();
  var $btnReset = $('.btn#reset');
  var $btnClear = $('.btn#clear');
  var $btnCalc = $('.btn#calc');
  $btnCalc.prop('disabled',true).hide();

  // other
  var $alerts = $('.alert');
  console.log('$alerts: ', $alerts);
  // $alerts.hide();
  var $alertsLocal = $('.alert.local');
  console.log('$alertsLocal: ', $alertsLocal);
  var $alertGlobal = $('.alert.global').eq(0);
  console.log('$alertGlobal: ', $alertGlobal);
  // $alertsGlobal.hide();
  // if ( $('#td--div').hasClass() ) {
  //   var myClass = $('#td--div').attr('class');
  //   var truClass = myClass;
  // }

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

/* --------------------------------- */
/* ZERO-PADDING FUNCTION ++++++++++++ */
/* http://stackoverflow.com/questions/1267283/how-can-i-create-a-zerofilled-value-using-javascript */
/* --------------------------------- */

  function zeroPad (num, numZeros) {
    var an = Math.abs (num);
    var digitCount = 1 + Math.floor (Math.log (an) / Math.LN10);
    if (digitCount >= numZeros) {
      return num;
    }
    var zeroString = Math.pow (10, numZeros - digitCount).toString ().substr (1);
    return num < 0 ? '-' + zeroString + an : zeroString + an;
  }

/* --------------------------------- */
/* CREATE TIME OBJECT FUNCTION ++++++++++++ */
/* --------------------------------- */

  var fCreateTime = function (t) {
    // create time object
    console.log( 'START fCreateTime' );

    // create result
    if (t==='null') {
      console.log('t null');
      time.ms = null;
      // time.pretty = msg.err.none;
      time.fancy = null;
      fCreateResult(abso_default);

    } else {
      console.log('t NOT null');

      time.ms = ''+t+'';

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
      abso['h'] = Math.trunc( ints.h );
      rems['h'] = rems.d % divs.h;

      ints['m'] = rems.h/divs.m;
      abso['m'] = Math.trunc( ints.m );
      rems['m'] = rems.h % divs.m;

      ints['s'] = rems.m/divs.s;
      abso['s'] = Math.trunc( ints.s );
      rems['s'] = rems.m % divs.s;

      ints['ms'] = rems.s/divs.ms;
      abso['ms'] = Math.trunc( ints.ms );
      rems['ms'] = rems.s % divs.ms;

      // console.log( 'ints: ', ints );
      // console.log( 'abso: ', abso );
      // console.log( 'rems: ', rems );

      fCreateResult(abso);
    }

    $resultms0.val(time.ms);
    $result0.val(time.pretty);

  };

/* --------------------------------- */
/* CREATE TIME SPAN RESULT FUNCTION ++++++++++++ */
/* --------------------------------- */

  var fCreateResult = function (abso) {
    // create pretty & fancy time messages
    console.group( 'START fCreateResult' );
    console.log( 'abso: ', abso );

    var holder = [];
    var holderRaw = {};

    var keys = Object.keys(abso);
    for (var i = 0; i < keys.length; i++) {
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
          $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').html('0000').val('0000');
          // $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').hide();
        } else {
          $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').html('00').val('00');
          // $('.datetime-display.fancy').find('.'+keys[i]).find('.ac-val').hide();
        }
      }
    }

    console.log( 'holder: ', holder );
    console.log( 'holderRaw: ', holderRaw );

    // check if there is a pretty time span to display
    if (holder.length < 1) {
      // no items in holder array 
      console.log( 'holder.length < 1: ', holder.length );
      // time.pretty = msg.same;
    } else {
      // some items in holder array 
      console.log( 'holder.length > 1: ', holder.length );
      time.pretty = holder.toString().replace(/,/g, ' ');
      // time.fancy = holderRaw;
    }

    console.groupEnd();

  };

/* --------------------------------- */
/* ELAPSED FUNCTION ++++++++++++ */
/* --------------------------------- */

  var elapsed = function (a, b) {
    // elapsed
    console.log( 'START elapsed' );
    console.log( 'a: ', a );
    console.log( 'b: ', b );
      time.pretty = msg.err.none;

    if (a!==null && b!==null) {
      if (a===b) {
        console.log( 'same date, no time elapsed' );
        t = 0;
        rev = null;
        time.pretty = msg.same;
        alertmsg.global = msg.same;
      } else if (a>b) {
        console.log( 'since b, X time elapsed until a' );
        t = a-b;
        rev = false;
      } else {
        console.log( 'since a, X time elapsed until b' );
        t = b-a;
        rev = true;
      }
      $btnAdd.prop('disabled',checkValue(t));
      var remainder = t % 1000;

    } else {
      console.log( 'a and/or b is null' );
      t = 'null';
      rev = null;
      if (a===null && b!==null) {
        time.pretty = msg.err.start;
        alertmsg.global = msg.err.start;
      } else if (a!==null && b===null) {
        time.pretty = msg.err.end;
        alertmsg.global = msg.err.end;
      }

    }

    // if (alert.global!=="") {
    //   alert('global alert!');
    //   $alertGlobal.find('p').html(alertmsg.global).fadeIn(1000).fadeOut(2000);
    // }

    fCreateTime(t);

    // console.groupEnd();
  };


/* --------------------------------- */
/* ADD FUNCTION ++++++++++++ */
/* --------------------------------- */

  var add = function () {
    // add fields
    // console.group( 'START add' );

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

    var $intervalResultMS = $('<input/>',{
        class:'form-control text-center',
        type:'text',
        name:'resultms_'+i,
        id:'resultms_'+i
      });

    var $intervalResult = $('<input/>',{
        class:'form-control text-center',
        type:'text',
        name:'result_'+i,
        id:'result_'+i
      });

    var $addon = $('<span/>',{class:'input-group-addon text-muted'});

    var $intervalGroup = $('<div/>',{class:'input-group'});

    var $colsm3 = $('<div/>',{class:'col-sm-3'});
    var $colsm4 = $('<div/>',{class:'col-sm-4'});
    var $colsm6 = $('<div/>',{class:'col-sm-6'});
    var $colsm12 = $('<div/>',{class:'col-sm-12'});

    var $intervalColStart = $colsm4.clone().addClass('interval-start')
      .html($intervalGroup.clone()
        .html($intervalStart.val(oDate0.isodate)).prepend($addon.clone()
          .html('From'))
        );

    var $intervalColEnd = $colsm4.clone().addClass('interval-end')
      .html($intervalGroup.clone()
        .html($intervalEnd).prepend($addon.clone()
          .html('Until'))
        );

    var $intervalColTabs = $colsm4.clone().addClass('interval-tabs')
      .html('tabs');

    var $intervalColResultPretty = $colsm4.clone().addClass('interval-result')
      .html($intervalResult);

    var $intervalColResultMS = $colsm4.clone().addClass('interval-result')
      .html($intervalGroup.append($intervalResultMS).append('<span class="input-group-addon">ms</span>'));

    var $intervalDates = $('<div/>',{class:'row interval-dates'});

    var $intervalResults = $('<div/>',{class:'row interval-results'});

    var $intervalWell = $('<div/>',{class:'well well-sm interval',id:'interval__'+i});

    // var $interval = $('<div class="well well-sm interval" />').append($colsm4.append($intervalEndLast)).append($colsm4.append($intervalEndNew));

    var $interval = $intervalWell
      // .addClass('batsignal')
      .attr('id','interval__'+i)
      .append($intervalDates
        .append($intervalColStart)
        .append($intervalColEnd)
        .append($intervalColResultMS)
        // .append($intervalColResultPretty)
      //   .append($intervalColTabs)
      // )
      // .append($intervalResults
      //   .append($intervalColResultMS)
    );
    $intervals.append($interval);
    // $interval.appendTo($intervals);
    // $('.input-group').append('<p>'+i+' added</p>'); //test
    i++;
    $btnRemove.prop( 'disabled', checkLength($intervals.find('.interval.well'),2) );
    // console.groupEnd();
  };

/* --------------------------------- */
/* REMOVE FUNCTION ++++++++++++ */
/* --------------------------------- */

  var remove = function () {
    // remove fields
    console.group( 'START remove' );
    $intervals.find('.interval.well').last().remove();
    i--;
    $btnRemove.prop( 'disabled', checkLength($intervals.find('.interval.well'),2) );
    console.groupEnd();
  };

/* --------------------------------- */
/* CALC FUNCTION ++++++++++++ */
/* --------------------------------- */

  var calc = function (target) {
    // calculate
    console.group( 'START calc' );
    // target.val('8734-06-26');
    // console.log( 'target: ', target );
    // console.log( 'target.val(): ', target.val() );
    // console.log( 'date inputs: ', $(target).closest('.interval-dates').find('.input-group input[type=date]') );

    var $inputs = $(target).closest('.interval-dates').find('.input-group input[type=date]');
    // console.log( '$inputs: ', $inputs );
    var $input1 = $inputs.eq(0);
    // console.log( '$input1: ', $input1 );
    var $input2 = $inputs.eq(1);
    // console.log( '$input2: ', $input2 );

    // compareValue('date',$inputs);

    if ( $input1.val() ) {
      // console.log( '$input1: ', $input1.val() );
      var startTime = new Date( $input1.val() ).getTime();
      // $input1.closest('.interval-start').find('.alert').show();
      // console.log( 'startTime: ', startTime );

      if ( $input2.val() ) {
        // console.log( '$input2: ', $input2.val() );
        var endTime = new Date( $input2.val() ).getTime();
        // $input2.closest('.interval-end').find('.alert').show();
        // console.log( 'endTime: ', endTime );

        console.log('yup start, yup end');
        // elapsed(startTime, endTime);

      } else {
        // don't calc if no end time yet/anymore
        console.log('yup start, noop end');
        var endTime = null;
        // elapsed(startTime, null);
      }

    } else if ( $input2.val() ) {
      console.log('noop start, yup end');
      var startTime = null;
      var endTime = new Date( $input2.val() ).getTime();
      // elapsed(null, endTime);

    } else {
      console.log('noop start, noop end');
      var startTime = null;
      var endTime = null;
      // elapsed(null, null);
    }
    console.groupEnd();
    elapsed(startTime, endTime);
  };

/* --------------------------------- */
/* RESET FUNCTION ++++++++++++ */
/* --------------------------------- */

  var reset = function (params) {
    // reset fields
    console.group( 'START reset' );
    if (!params || params.target) {
      // if optional params is undefined or an event target
      // set 'params' to default dates
      params = [oDate0.isodate,oNow.isodate];
    } else if ( params === [null] ) {
      params = [0,0];
    } else {
      // if optional params are passed
      // set 'params' to 'params'
      params = params;
      // check length of params
      // console.log( 'params.length: ', params.length );
      if (params.length < 2) {
        // if only one param is passed, add second param equal to first
        params[1] = params[0];
      }
    }
    console.log( 'params: ', params );
    $start0.val( params[0] );
    $end0.val( params[1] );
    calc($start0);
    console.groupEnd();
  };

/* --------------------------------- */
/* CLEAR FUNCTION ++++++++++++ */
/* --------------------------------- */

  var clear = function () {
    // clear fields
    console.group( 'START clear' );
    reset([null]);
    console.groupEnd();
  };

/* --------------------------------- */
/* AUTOFILL FUNCTION ++++++++++++ */
/* --------------------------------- */

  var autofill = function () {
    // autofill fields
    console.group( 'START autofill' );
    reset([null]);
    $start0.val(oDate1.isodate);
    $end0.val(oDate2.isodate);
    calc($start0);
    console.groupEnd();
  };

  // calc($start0); // immediately execute "calc" function.

/* --------------------------------- */
/* EVENT BINDINGS ++++++++++++ */
/* --------------------------------- */

  // button event bindings
  $btnReset.bind('click', reset);
  $btnClear.bind('click', clear);
  $btnAuto.bind('click', autofill);
  $btnAdd.bind('click', add);
  $btnRemove.bind('click', remove);
  $btnCalc.bind('click', calc($start0));

  // interval event bindings
  $('.interval-start input[type=date]').bind('change', function (e) {
    console.group('START interval start change');
    calc(e.target);
    console.groupEnd();
  });
  $('.interval-end input[type=date]').bind('change', function (e) {
    console.group('START interval end change');
    calc(e.target);
    console.groupEnd();
  });

  // change style of fancy display
  $('select.flavors').bind('change', function (e) {
    console.group('START flavor change');
    // console.log('this: ', this);
    // console.log('fancy: ', $(this).closest('.well').find('#fancy table').attr('class'));
    // console.log('e.target.value: ', e.target.value);
    // console.log('e.target: ', e.target);
    $(this).closest('.well').find('#fancy table').attr('class','flavor--'+e.target.value);
    console.groupEnd();
  });
  // $('select.flavors option[value=oblivion]').prop('selected','selected');

  // Add fake test element
  var k = 1;
  $('#add_input_date').bind('click', function (e) {
    console.group('START add test INPUT/DATE element');
    // console.log('$(e.target).closest(\'table\'): ', $(e.target).closest('table').find('tbody td').html());
    var $input = $('input').attr({'class':'test-binding','type':'date'}).last();
    console.log('$input: ',$input);
    var $cell = $(e.target).closest('table').find('tbody td.test-date');
    $input.clone().attr({'id':'test_date_'+k}).appendTo($cell);
    k++;
    $input = null;
    console.groupEnd();
  });
  var j = 1;
  $('#add_input_select').bind('click', function (e) {
    console.group('START add test SELECT/OPTION element');
    // console.log('$(e.target).closest(\'table\'): ', $(e.target).closest('table').find('tbody td').html());
    var $input = $('select').attr({'class':'test-binding'}).last();
    console.log('$input: ',$input);
    var $cell = $(e.target).closest('table').find('tbody td.test-select');
    $input.clone().attr({'id':'test_select_'+j}).appendTo($cell);
    j++;
    $input = null;
    console.groupEnd();
  });

  // test event bindings
  $('.input-events').on('change','.test-binding',function (e) {
    console.log('test on/changed', e.target.value);
  });
  $('.input-events').bind('change','.test-binding',function (e) {
    console.log('test bind/changed', e.target.value);
  });
  $('.test-binding').change(function (e) {
    console.log('test changed', e.target.value);
  });

});
