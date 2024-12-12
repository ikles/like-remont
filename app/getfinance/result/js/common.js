jQuery(document).ready(function( $ ) {

  $(".toggle-mnu").click(function() {
    $(this).toggleClass("on");
    $(".top-mnu").slideToggle();
    return false;
  });

  $('body').click(function () {
    if( $(".toggle-mnu").hasClass("on") ){
      $(".toggle-mnu").removeClass("on");
      $(".top-mnu").fadeOut();
    }
  });


  $(".top-mnu").click(function (e) {
    e.stopPropagation();
  });



$('.close2').click(function () {
  $('.header__content').removeClass('open');
});

$('.burger').click(function () {
  $('.header__content').addClass('open');
});





/*$('.top__slider').slick({
  infinite: true,    
  speed: 6000,
  slidesToScroll: 1,
  autoplay: false,    
  slidesToShow: 1,
  cssEase: 'linear',  
  autoplaySpeed: 0,  
  arrows: true,
  pauseOnHover: true,  
});*/




/************************************/

/*$('.wrapper').prepend('<span class="eye-3"></span>');
let pg = parseInt(document.location.pathname.match(/\d+/))
$('body').addClass('active').css('background-image', "url('../img/"+pg+".jpg')");
$('body:not(.active)').css('background-image', "unset");

$('.eye-3').click(function (e) {
  e.preventDefault();  
  $('body').toggleClass('active');
  let pg = parseInt(document.location.pathname.match(/\d+/));
  $('body.active').css('background-image', "url('../img/"+pg+".jpg')");
  $('body:not(.active)').css('background-image', "unset");
});*/

/************************************/



  $('.trust__num > div').each(function () {
    const text = $(this).text();
    const tag_i = $(this).find('i');
    tag_i.text(text);
  });

  $('.trust__num > span').each(function () {
    const text = $(this).text();
    const tag_i = $(this).find('i');
    tag_i.text(text);
  });


  $(".phone").mask("+7 (999) 999-99-99");


  function popup(openLink, windowEl, closeEl) {  
    $(openLink).click(function(e) {
      e.preventDefault();
      $(windowEl).fadeIn();
      $('body').addClass('ohi');
    });
    $(closeEl).click(function(e) {
      e.preventDefault();
      $(windowEl).hide();
      $('body').removeClass('ohi');
    });
    $('.modal-overlay').click(function () {
      $(this).hide();
      $('body').removeClass('ohi');
    });
    $('.modal-form__block').click(function (e) {
      e.stopPropagation();  
    });

  }
  
  popup('.header__btn', '.modal-overlay_1', '.modal-close_1');
  popup('.hero__btn', '.modal-overlay_1', '.modal-close_1');




  $('a[href*=\\#]:not([href=\\#])').click(function () {
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination + 50}, 1100);
    return false;
  });


  $(window).scroll(function(){
    var wt = $(window).scrollTop();  
    var wh = $(window).height();    
    if (wt > 600) {
      $('.serv-arr-up').show(400);
    }
    else {
     $('.serv-arr-up').hide();
   }
 });

  if($('select').length) {
    $('select').select2({
      minimumResultsForSearch: -1
    });
  }

}); //ready

