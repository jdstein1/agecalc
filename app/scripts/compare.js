// jshint devel:true
// $(function() {
  // Handler for .ready() called.

/* --------------------------------- */
/* VARIABLES ++++++++++++ */
/* --------------------------------- */

  var sampleText = document.createTextNode('SAMPLE TEXT');

  var intervalBox = document.getElementsByClassName('interval-box');
  // console.log('intervalBox: ', intervalBox);

  var newInterval = document.createElement('div');
  newInterval.classList.add('well','well-sm','interval');

  var newIntervalRow = document.createElement('div');
  newIntervalRow.classList.add('row','interval-dates');
  newIntervalRow.appendChild(sampleText);
  // document.body.appendChild(newIntervalRow);
  // $intervalBox.append($(newIntervalRow));
  // intervalBox[0].appendChild(newIntervalRow);

  // static function to 
  // traverse JSON objects to get data...
  var loadDates = function (obj) {
    console.group('START loadDates');
    console.log('obj: ',obj);
    var objKeysI = Object.keys(obj);

    if (objKeysI.length > 0) {
      console.log('objKeysI: ',objKeysI);
      console.log('objKeysI.length: ',objKeysI.length);

      for (var i = 0; i < objKeysI.length; i++) {
        console.group('obj['+objKeysI[i]+']: ',obj[objKeysI[i]]);
        var objKeysJ = Object.keys(obj[objKeysI[i]]);

        if (objKeysJ.length > 0) {
          console.log('objKeysJ: ',objKeysJ);
          console.log('objKeysJ.length: ',objKeysJ.length);

          for (var j = 0; j < objKeysJ.length; j++) {
            if (obj[objKeysI[i]][objKeysJ[j]]) {
              console.group('obj['+objKeysI[i]+']['+objKeysJ[j]+']: ',obj[objKeysI[i]][objKeysJ[j]]);
              var objKeysK = Object.keys(obj[objKeysI[i]][objKeysJ[j]]);

              if (objKeysK.length > 0) {
                console.log('objKeysK: ',objKeysK);
                console.log('objKeysK.length: ',objKeysK.length);
                for (var k = 0; k < objKeysK.length; k++) {
                  if (obj[objKeysI[i]][objKeysJ[j]][objKeysK[k]]) {
                    console.group('obj['+objKeysI[i]+']['+objKeysJ[j]+']['+objKeysK[k]+']: ',obj[objKeysI[i]][objKeysJ[j]][objKeysK[k]]);
                  }
                };
              }
    
              console.groupEnd();

            }
  
          };

        }

        console.groupEnd();

      };

    }

    console.groupEnd();

  };

  // recursive function to 
  // traverse JSON objects to get data...
  var traverse = function (keys,obj) {
    console.group('START traverse')
    if (keys.length > 0) {
      console.log('obj: ',obj);
      console.log('keys: ',keys);
      // console.log('keys.length: ',keys.length);
      for (var i = 0; i < keys.length; i++) {
        if (obj[keys[i]]) {
          console.group('obj['+keys[i]+']: ',obj[keys[i]]);
          var innerobj = obj[keys[i]];
          var innerkeys = Object.keys(innerobj);
          if (innerkeys.length > 0) {
            traverse(innerkeys,innerobj);
          }
          console.groupEnd();
        }
      };
    }
    console.groupEnd();
  };

  var loadDatesRecurse = function (obj) {
    console.group('START loadDatesRecurse');
    console.log('obj: ',obj);
    var keys = Object.keys(obj);
    traverse(keys,obj);
    console.groupEnd();
  };

  $('#robin').bind('click', function () {
    loadDatesRecurse(dates.robin);
  });

  $('#susan').bind('click', function () {
    loadDatesRecurse(dates.susan);
  });

// });

