// jshint devel:true
$(function() {
  // Handler for .ready() called.
  console.log('\'Allo \'Allo!');


  var $start = $('#time_start');
  var $end = $('#time_end');
  var $result = $('#result');

  var reset = function () {
    // reset fields

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

        var result = end - start;
        console.log( 'result: ', result );

        $result.val(result);

      }
      
    }

  };
  calc();

  $start.on('change', calc);
  $end.on('change', calc);




});
