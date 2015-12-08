# agecalc

An Age Calculator

by Jeff Stein


## About

Time.  What is it?  We cannot see it, but it is all around us.  Is it a color our eyes cannot see?  We cannot touch it, yet it passes through us and we pass through it.  Is it a medium like air or water that our finngers cannot feel?  How do we know it is there?  How do we experience it or measure it?

Computers count time in milliseconds, but they thing time began at the dawn of 1970 AD.  JavaScript has built-in methods to get the date and time that correspond to that number of milliseconds.  Translating milliseconds to a time span based upon the Gregorian Calendar is, however, not simple math.  A year is not 365 days: it is 365 days for three years and then 366 days (give or take some leap seconds).  A month is not 4 weeks, nor is it 30 days: it is exactly 4 weeks once a year in 3 out of 4 years, otherwise it is 30 days, sometimes 31 days, and 29 days 1/4 of 1/12 of the time.

AgeCalc could use a third party library to compare dates and calculate time spans with pinpoint accuracy.  Instead, AgeCalc will develop that functionality over time.  At the moment it uses over-simplified math to produce approximate time span lengths.  AgeCalc could use these approximate numbers to display human-friendly, natural-language descriptions for time spans.  This may be added in the future.


## Issues & Todo

* [] Months - Currently I am just dividing the year by 12 to create month segments.  Not ideal.  But months suck.  Stupid Julian/Gregorian Calendar!
* [X] "Pretty" vs "Full" - these two dsiplay modes are kind of misnamed now.  Need to reverse them so that "pretty" refers to the fancy display...or rename "full" --> "fancy".
* [] Add interval - Feature that adds a row of inputs to measure a new time interval, using the previous interval's end time as the new one's start time.
* [] Remove interval - Remove last added interval row.
* [] New Interval - Not sure if a new interval row should have a simplified layout or a layout totally similar to the initial one.
  * [] Simple layout - 1 row: start, end, result
  * [] Complex layout - 2 rows: 1st row = start, end, tabs; 2nd row = tabbed result display


## Resources

* [https://en.wikipedia.org/wiki/Gregorian_calendar](https://en.wikipedia.org/wiki/Gregorian_calendar)
* [https://en.wikipedia.org/wiki/Julian_calendar](https://en.wikipedia.org/wiki/Julian_calendar)
* [https://zyxyvy.wordpress.com/2013/01/27/calendars-for-other-solar-system-planets/](https://zyxyvy.wordpress.com/2013/01/27/calendars-for-other-solar-system-planets/)

