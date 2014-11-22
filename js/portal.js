$(document)
  .ready(function() {

  var checkbox = $('.ui.checkbox');
  checkbox.checkbox();
  $('.sidebar')
      .sidebar('attach events', 'span')
    ;

    $('.dropdown').dropdown();


  })
;