jQuery(document).ready(function( $ ) {

  $(".burger-w").click(function() {    
    $(".div-top-menu > ul").slideToggle(100);
    return false;
  });

  $('.close-mnu').click(function () {    
      $(".div-top-menu > ul").fadeOut();    
  });


}); //ready

