// jshint devel:true
// $(function() {
  // Handler for .ready() called.

  var checkLength = function (thing,expected) {
    console.group('START checkLength (thing.length is less than '+expected+')');
    if (typeof thing === 'object') {
      console.log('object');
      if ( thing.length < expected ) {
        // console.log( 'true' );
        var out = true;
      } else {
        // console.log( 'false' );
        var out = false;
      }
    } else {
      console.log('not object');
      var out = true;
    }
    console.groupEnd();
    return out;
  };

  var checkValue = function (thing) {
    console.group('START checkValue (0, empty, null, undefined)');

    // console.log('thing: ', thing);
    // console.log('typeof thing: ', typeof thing);

    if (typeof thing !== 'undefined' && thing !== 0) {
      // console.log( 'false' );
      var out = false;
    } else {
      // console.log( 'true' );
      var out = true;
    }
    console.groupEnd();
    return out;
  };

  var compareValue = function (type,Things) {
    console.group('START compareValue (empty or same)');

    // for (var i = 0; i < Things.length; i++) {
    //   console.log('Things['+i+']: ', Things[i]);
    // };

    // console.log('Things.length: ', Things.length);
    // console.log('Things.isArray: ', Things.isArray);
    // console.log('typeof Things: ', typeof Things);
    // console.log('Things[0]: ', Things[0]);

    // if (Things.indexOf(Things[0]) > 0) {
    //   console.log('found it!');
    // };

    // if (thing1 && thing2) {
    //   console.log('thing1 && thing2');
    //   if (thing1.value==="" || thing2.value==="" || thing1.value===thing2.value) {
    //     console.log( 'true' );
    //     var out = true;
    //   } else {
    //     console.log( 'false' );
    //     var out = false;
    //   }
    //   return out;
    // } else if (thing1 && !thing2) {
    //   console.log('thing1 && !thing2');
    // } else if (!thing1 && thing2) {
    //   console.log('!thing1 && thing2');
    // } else {
    //   console.log('IDK');
    // }

    console.groupEnd();
  };

// });
