jQuery(document).ready(function( $ ) {


//levels menu
  let isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return(isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows())}}

  let body = document.querySelector('body');


  if ( isMobile.any() ) {
    body.classList.add('touch');
    let arrow = document.querySelectorAll('.menu-arrow');
    arrow.forEach(function (item) {
      let thisLink = item.previousElementSibling;
      let subMenu = item.nextElementSibling;
      let thisArrow = item;

      thisLink.classList.add('parent');
      item.addEventListener('click', function () {      
        subMenu.classList.toggle('open');
        thisArrow.classList.toggle('active');
      });
    });
  }
  else {
    body.classList.add('mouse')
  }


  $('.gal__slider').slick({
    infinite: false,    
    speed: 600,
    slidesToScroll: 1,
    autoplay: false,    
    slidesToShow: 1,
    cssEase: 'linear',  
    autoplaySpeed: 0,  
    touchThreshold: 10,
    arrows: true,
    pauseOnHover: true,  
  });




/*  $('.houses__sl-big').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    cssEase: 'linear',
    asNavFor: '.houses__sl-min'
  });

  $('.houses__sl-min').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.houses__sl-big',
    dots: false,
    arrows: false,
    centerMode: false,
    focusOnSelect: true,
  });*/

  $('.houses__sl-min').each(function() {
    const childCount = $(this).children().length;
    $(this).addClass('_child_' + childCount);
  });



  $('.houses__item').each(function () {
    const $slider = $(this);
    const $bigImg = $slider.find('.houses__sl-big img');
    const $minImages = $slider.find('.houses__sl-min img');
    const $prevBtn = $slider.find('.slider-prev');
    const $nextBtn = $slider.find('.slider-next');

    let currentIndex = 0;

  // Инициализация: первая миниатюра активна
    $minImages.eq(currentIndex).addClass('active');

  // Клик по миниатюре
    $minImages.click(function() {
      const $clickedImg = $(this);
      currentIndex = $clickedImg.index();
      updateBigImage();
      updateActiveThumb();
    });

  // Клик по стрелке "Вперед"
    $nextBtn.click(function() {
      currentIndex = (currentIndex + 1) % $minImages.length;
      updateBigImage();
      updateActiveThumb();
    });

  // Клик по стрелке "Назад"
    $prevBtn.click(function() {
      currentIndex = (currentIndex - 1 + $minImages.length) % $minImages.length;
      updateBigImage();
      updateActiveThumb();
    });

  // Обновление большой картинки
    function updateBigImage() {
      const newSrc = $minImages.eq(currentIndex).attr('src');
      $bigImg.attr('src', newSrc);
    }

  // Обновление активной миниатюры
    function updateActiveThumb() {
      $minImages.removeClass('active');
      $minImages.eq(currentIndex).addClass('active');
    }
  });


/************************************/

/*  $('.wrapper').prepend('<span class="eye-3"></span>');
  const url = window.location.href;
  const match = url.match(/(\d+-?\d*)\.html$/);
  const pg = match[1];
  $('body').addClass('active').css('background-image', "url('../img/"+pg+".jpg')");
  $('body:not(.active)').css('background-image', "unset");

  $('.eye-3').click(function (e) {
    e.preventDefault();  
    $('body').toggleClass('active');    
    $('body.active').css('background-image', "url('../img/"+pg+".jpg')");
    $('body:not(.active)').css('background-image', "unset");
  });*/

/************************************/

  function popup(openLink, windowEl, closeEl) {  
    $(openLink).click(function(e) {
      e.preventDefault();
      $(windowEl).fadeIn();
      $('body').addClass('ohi');
    });
    $(closeEl).click(function(e) {
      e.preventDefault();
      $(windowEl).fadeOut();
      $('body').removeClass('ohi');
    });
    $('.modal-overlay').click(function () {
      $(this).fadeOut();
      $('body').removeClass('ohi');
    });
    $('.modal-form__block').click(function (e) {
      e.stopPropagation();  
    });
    
  }

  popup('.link2', '.modal-overlay_2', '.modal-close_2');
  popup('.link', '.modal-overlay_1', '.modal-close_1');


  $('a[href*=\\#]:not([href=\\#])').click(function () {
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 85}, 1100);
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
    $('select').each(function () {
      $(this).select2({
        minimumResultsForSearch: -1,
        dropdownParent: $(this).parent()
      });
    });
  }



  $('.accordion-header').toggleClass('inactive-header');
  $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
  $('.accordion-content').first().slideDown().toggleClass('open-content');
  $('.accordioon-content').first().slideDown().toggleClass('open-content');
  $('.accordion-header').click(function () {
    if($(this).is('.inactive-header')) {
      $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
      $(this).toggleClass('active-header').toggleClass('inactive-header');
      $(this).next().slideToggle().toggleClass('open-content');
    }

    else {
      $(this).toggleClass('active-header').toggleClass('inactive-header');
      $(this).next().slideToggle().toggleClass('open-content');
    }
  });

  return false;

}); //ready

