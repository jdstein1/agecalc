// jshint devel:true
$(function() {
  // Handler for .ready() called.

/* --------------------------------- */
/* VARIABLES ++++++++++++ */
/* --------------------------------- */

  var sampleText = document.createTextNode('SAMPLE TEXT');

  var $intervalBox = $('.interval-box');
  var intervalBox = document.getElementsByClassName('interval-box');
  console.log('intervalBox: ', intervalBox);

  var newInterval = document.createElement('div');
  newInterval.classList.add('well','well-sm','interval');

  var newIntervalRow = document.createElement('div');
  newIntervalRow.classList.add('row','interval-dates');
  newIntervalRow.appendChild(sampleText);
  document.body.appendChild(newIntervalRow);
  // document.intervalBox.appendChild(newIntervalRow);
  $intervalBox.append($(newIntervalRow));

  var loadDates = function (obj) {
    console.log(obj);

    for (var i = 0; i < obj.length; i++) {
      console.log(obj[i]);
    };

  };

  $('#robin').bind('click', function () {
    loadDates(dates.robin)
  });
  // $('#robin').on('click', function () {
  //   loadDates(dates.robin);
  // });
  $('#susan').bind('click', function () {
    loadDates(dates.susan)
  });
  // $('#susan').on('click', function () {
  //   loadDates(dates.susan)
  // });

});

