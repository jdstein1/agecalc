// jshint devel:true
$(function() {
  // Handler for .ready() called.

  var $header = $('#header');
  $header.load( "includes/header.html", function() {
    console.log( "header loaded..." );
  });

  var $footer = $('#footer');
  $footer.load( "includes/footer.html", function() {
    console.log( "footer loaded..." );
  });

  var $table = $('#table');
  $table.load( "includes/table.html", function() {
    console.log( "table loaded..." );
  });

  var $buttons = $('#buttons');
  // $buttons.load( "includes/buttons.html", function() {
  //   console.log( "buttons loaded..." );
  // });

  var $icon = $('#icon');
  $icon.load( "includes/icon.html", function() {
    console.log( "icon loaded..." );
  });

});
