jQuery(document).ready(function( $ ) {




 if($('.mbanner__slider').length) {
  var swiper = new Swiper(".mbanner__slider", {
    slidesPerView: 1,    
    loop: true,
    speed: 800,
    autoplay: {
      delay: 10000,
    },
    navigation: {
      nextEl: ".slider-arrow.next",
      prevEl: ".slider-arrow.prev",
    },

  });
}





}); //ready

