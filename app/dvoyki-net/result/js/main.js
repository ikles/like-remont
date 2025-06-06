jQuery(document).ready(function( $ ) {
  function res() {
    var t = $(window).width() + "x" + $(window).height();
    $(".resolution-marker").text(t)
  }
  $(".faq-item-content-item").each(function() {
    $(this).index();
    var t = $(this);
    $(".faq-item-content-item-title", t).on("click", function() {
      $(this).hasClass("active") ? ($(".faq-item-content-item-text", t).removeClass("active"), $(".faq-item-content-item-title", t).removeClass("active")) : ($(".faq-item-content-item-text", t).addClass("active"), $(".faq-item-content-item-title", t).addClass("active"))
    })
  }), $(".faq-item").each(function() {
    $(this).index();
    var t = $(this);
    $(".faq-item-title", t).on("click", function() {
      $(this).hasClass("active") ? ($(".faq-item-content", t).removeClass("active"), $(".faq-item-title", t).removeClass("active")) : ($(".faq-item-content", t).addClass("active"), $(".faq-item-title", t).addClass("active"))
    })
  }), $(document).ready(function() {
    res()
  }), $(window).on("resize", function() {
    res()
  });

  $('.tr-open').click(function () {
    $(this).next('.tr-hidden').toggleClass('op');
  });

}); //ready


$(document).ready(function(){
  $('.bar').click(function(){
    $('nav').toggle();
  });

    $('.faq-item').click(function(){
        $(this).find('.faq-body').slideToggle();
    });
});
$(document).mouseup(function (e) {
    // событие клика по веб-документу
    var div = $("nav"); // тут указываем ID элемента
    if (
        !div.is(e.target) && // если клик был не по нашему блоку
        div.has(e.target).length === 0
    ) {
        // и не по его дочерним элементам
        div.hide(); // скрываем его
    }
});

$(document).ready(function(){
    $('.selected').click(function(){
        $(this).parents('.selects').find('.selects_body').slideToggle();
    });


    $(".in1").change(function (e) {
        let text = $(this).find('input').val();
        $(this).parents('.selects').find('.selected p').text(text);
        $(this).parents('.selects').find('.selects_body').slideUp();

    });
    $(".in2").change(function (e) {
        let text = $(this).find('input').val();
        $(this).parents('.selects').find('.selected p').text(text);
        $(this).parents('.selects').find('.selects_body').slideUp();

    });
    $(".in3").change(function (e) {
        let text = $(this).find('input').val();
        $(this).parents('.selects').find('.selected p').text(text);
        $(this).parents('.selects').find('.selects_body').slideUp();

    });
    
    /* input mask 
    ====================================*/
    $('.js-mask').inputmask("+7 (999) 999-99 99");

});

