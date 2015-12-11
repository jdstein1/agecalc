// jshint devel:true
$(function() {
  // Handler for .ready() called.

/* --------------------------------- */
/* VARIABLES ++++++++++++ */
/* --------------------------------- */

  var susan = {};
  susan['life'] = new Date('October 4, 1946 12:34:56');
  susan.life['begin'] = new Date('October 4, 1946 12:34:56');
  // console.log('susan.begin: ', susan.begin);
  susan.life['end'] = undefined;

  susan['chris'] = {};
  susan.chris['begin'] = new Date('September 16, 1967 12:34:56');
  console.log('susan.chris.begin: ', susan.chris.begin);
  susan.chris['end'] = new Date('September 20, 1979 12:34:56');
  console.log('susan.chris.end: ', susan.chris.end);

  susan['tim'] = {};
  // susan.tim['begin'] = 'jdfshgkjh';
  susan.tim['begin'] = new Date('1988','05','30','12','34','56');
  // susan.tim['begin'] = new Date(1988,05,30,12,34,56);
  console.log('susan.tim.begin: ', susan.tim.begin);
  // susan.tim['end'] = new Date(2009,05,30,12,34,56);
  // console.log('susan.tim.end: ', susan.tim.end);

  var robin = {};
  robin['life'] = {};
  robin.life['begin'] = new Date('1951-07-21');
  console.log('robin.life.begin: ', robin.life.begin);
  robin.life['end'] = new Date('2014-08-11');
  console.log('robin.life.end: ', robin.life.end);

  var loadDates = function (obj) {
    for (var i = 0; i < obj.length; i++) {
      console.log(obj[i]);
    };

  };


  $('.btn.load#robin').bind('click', loadDates(robin));
  $('.btn.load#susan').bind('click', loadDates(susan));

});

