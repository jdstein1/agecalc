# AgeCalc

An Age Calculator by Jeff Stein


## About

#### TL;DR

> AgeCalc uses over-simplified math to produce approximate lengths of time between two dates.

#### Long Version

Time:  what is it?  We cannot see it, but it is all around us.  We cannot touch it, yet it passes through us and we pass through it.

Is it a color our eyes cannot see?  Is it a medium our fingers cannot touch?  How do we know it is there?  How do we experience it or measure it?

Forget I asked.

Computers count time in milliseconds...starting at the year 1970!  Weird, I know.

JavaScript has methods to get the current date and time, but they return a number of milliseconds.  Which is fine, for a computer.  It is sub-optimal to ask a human to parse `1501204860904` into a time and date.

Even using basic math, an integer that represents a number of milliseconds cannot easily be translated into a date on the Gregorian Calendar.

* A year is usually 365 days, but is 366 days if: 
    * the year is divisible by 4, 
    * except when divisible by 100, 
    * but not divisible by 400.

* A month is usually 30 days: 
    * unless it is 31 days, 
    * but a single month is exactly four weeks long in three out of every four years, 
    * and don't forget that 1/4 of 1/12 of all months are 29 days long.

It's a bit of a headache.

I could use a third party library to compare dates and calculate time spans with pinpoint accuracy.  Instead, I will develop that functionality within AgeCalc myself over time.  At the moment it uses over-simplified math to produce approximate lengths of time between two dates.


## Getting Started

Once you have cloned this repo, run it locally with the following sequence of commands:

* `$ npm install` -- installs build tools
* `$ bower install` -- installs app dependencies
* `$ grunt serve` -- starts a local server



## Issues & Todo

* [_] Months - Currently I am just dividing the year by 12 to create month segments.  Not ideal.  But months suck.  Stupid Julian/Gregorian Calendar!
* [x] "Pretty" vs "Full" - these two dsiplay modes are kind of misnamed now.  Need to reverse them so that "pretty" refers to the fancy display...or rename "full" --> "fancy".
* [x] Add interval - Feature that adds a row of inputs to measure a new time interval, using the previous interval's end time as the new one's start time.
    * [x] Disable 'Add' if no intitial interval is set (if start or end are empty/null, or if start and end are equal).
* [x] Remove interval - Remove last added interval row.
    * [x] Disable 'Remove' if there's only one '.interval'.
* [_] New Interval - Not sure if a new interval row should have a simplified layout or a layout totally similar to the initial one.
    * [_] Simple layout - 1 row: start, end, result
    * [_] Complex layout - 2 rows: 1st row = start, end, tabs; 2nd row = tabbed result display
* [x] Calc Function - Dynamically calculate the time span of the current start and end.
    * [x] Pass current date input to function, then 
    * [x] get adjacent date input programmatically, then
    * [x] convert values to properly formatted dates, then
    * [x] pass those to elapsed function to produce resulting time span.
* [_] Reset result when one interval is cleared (change event).
* [_] Make dynamically added intervals produce a result.
* [_] "This Day in History" feature - provide link to a site that list notable events on this day in history (e.g., [http://www.historynet.com/today-in-history/december-09](http://www.historynet.com/today-in-history/december-09))
* [_] Alert messages for interval dates - add a tooltip for notable dates.



## Resources

* [https://en.wikipedia.org/wiki/Gregorian_calendar](https://en.wikipedia.org/wiki/Gregorian_calendar)
* [https://en.wikipedia.org/wiki/Julian_calendar](https://en.wikipedia.org/wiki/Julian_calendar)
* [https://zyxyvy.wordpress.com/2013/01/27/calendars-for-other-solar-system-planets/](https://zyxyvy.wordpress.com/2013/01/27/calendars-for-other-solar-system-planets/)

