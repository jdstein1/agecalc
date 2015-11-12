    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    var now = new Date(), life = [], elapsed = [], nowMs = now.getTime(), t = 0;
    // console.log('now: ', now);
    // console.log('nowMs: ', nowMs);

    var when = new Date();
    // console.log('when: ', when);
    var time = new Date().getTime();
    // console.log('time: ', time);
    var date = new Date(time);
    // console.log('date: ', date);
    console.log(date.toString()); // Wed Jan 12 2011 12:42:46 GMT-0800 (PST)

    life.birth = new Date('October 4, 1946 12:34:56');
    // console.log('life.birth: ', life.birth);

    life.chris = {};
    life.chris.married = new Date('September 16, 1967 12:34:56');
    // console.log('life.chris.married: ', life.chris.married);
    life.chris.divorced = new Date('September 20, 1979 12:34:56');
    // console.log('life.chris.divorced: ', life.chris.divorced);

    life.tim = {};
    life.tim.begin = new Date(1988,05,30,12,34,56);
    // console.log('life.tim.begin: ', life.tim.begin);
    life.tim.end = new Date(2009,05,30,12,34,56);
    // console.log('life.tim.end: ', life.tim.end);

    var dateFormat = {};
    dateFormat.masks = {
        "default":      "ddd mmm dd yyyy HH:MM:ss",
        shortDate:      "m/d/yy",
        mediumDate:     "mmm d, yyyy",
        longDate:       "mmmm d, yyyy",
        fullDate:       "dddd, mmmm d, yyyy",
        shortTime:      "h:MM TT",
        mediumTime:     "h:MM:ss TT",
        longTime:       "h:MM:ss TT Z",
        isoDate:        "yyyy-mm-dd",
        isoTime:        "HH:MM:ss",
        isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };
    // console.log('dateFormat: ', dateFormat);
    var f = dateFormat.masks.isoDateTime; // set default date/time format
    // console.log('f: ', f);

    /** fDate function
    params...
    a: start date & time
    f: date & time format (optional)
    */
    var fDate = function (a, f) {
      // console.log('START fDate function...');
      if (f==='ms') {
        return new Date(a).getTime();
      } else if (f==='iso') {
        return new Date(a).toISOString();
      } else {
        return new Date(a);
      }
    };

    /** fElapsed function
    params...
    a: start date & time
    b: end date & time
    f: date & time format (optional)
    t: time elapsed
    */
    var fElapsed = function (a, b, f) {
      // console.log('START fElapsed function...');
      if (a===b) {
        // console.log('same date, no time elapsed');
        t = 0;
      } else if (a>b) {
        // console.log('since b, X time elapsed until a');
        t = a-b;
      } else {
        // console.log('since a, X time elapsed until b');
        t = b-a;
      }
      console.log('t: ', t);



      if (f==='ms') {
        return t;
      } else if (f==='iso') {
        return new Date(t).toISOString();
      } else {
        return new Date(t);
      }

    };
