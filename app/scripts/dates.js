// jshint devel:true
// $(function() {
  // Handler for .ready() called.

/* --------------------------------- */
/* DATES ++++++++++++ */
/* --------------------------------- */

  var dates = {};

  // important dates in history
  dates['jul4'] = ['1776-07-04']; // USA is born
  dates['zero'] = ['1970-01-01']; // computer time starts
  dates['terminator'] = ['1984-10-26','1991-07-03','2003-07-02','2009-05-21','2015-07-01']; // Terminator movie release dates
  dates['judg'] = ['1997-08-29']; // various dates for Judgement Day

  // important dates in the life of a famous person
  dates['susan'] = {};
  dates.susan['life'] = {};
  dates.susan.life['begin'] = new Date('October 4, 1946 12:34:56');
  // console.log('susan.begin: ', susan.begin);
  dates.susan.life['end'] = undefined;
  dates.susan['chris'] = {};
  dates.susan.chris['begin'] = new Date('September 16, 1967 12:34:56');
  // console.log('susan.chris.begin: ', susan.chris.begin);
  dates.susan.chris['end'] = new Date('September 20, 1979 12:34:56');
  // console.log('susan.chris.end: ', susan.chris.end);
  dates.susan['tim'] = {};
  // susan.tim['begin'] = 'jdfshgkjh';
  dates.susan.tim['begin'] = new Date('1988','05','30','12','34','56');
  // console.log('susan.tim.begin: ', susan.tim.begin);
  dates.susan.tim['end'] = new Date('2009','05','30','12','34','56');
  // console.log('dates.susan.tim.end: ', dates.susan.tim.end);

  // important dates in the life of a famous person
  dates['robin'] = {};
  dates.robin['life'] = {};
  dates.robin.life['begin'] = new Date('1951-07-21');
  // console.log('robin.life.begin: ', robin.life.begin);
  dates.robin.life['end'] = new Date('2014-08-11');
  // console.log('robin.life.end: ', robin.life.end);

// });