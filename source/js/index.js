$(function(){
   //loading
   var h = $(window).height();

   $('#wrap').css('display','none');
   $('#js-loaderbg ,#js-loader').height(h).css('display','block');

   $(window).load(function () { //全ての読み込みが完了したら実行
     $('#js-loaderbg').delay(900).fadeOut(900);
     $('#js-loader').delay(600).fadeOut(400);
     $('#wrap').css('display', 'block');
   });

   var stopload = function() {
      console.log('stopload!!');
      $('#wrap').css('display','block');
      $('#js-loaderbg').delay(900).fadeOut(900);
      $('#js-loader').delay(600).fadeOut(400);
   }

   //10秒たったら強制的にロード画面を非表示
   setTimeout(stopload,10000);

   //MENU
   $(".menu-trigger").click(function () {
      $(this).toggleClass("active");
      $("nav").fadeToggle();
   });

   //svg未対応対策
   if (!Modernizr.svg) {
      $("img[src$='.svg']").each(function(){
         $(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
      });
   }

   //スムーズスクロール
   $('a[href^=#]').click(function() {
      var speed = 400;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });

   //TEXT fade
   function init() {
      var fade  = 600;
      // スクロールのイベントハンドラを登録
      window.addEventListener('scroll', function(e){
         var scroll = $(window).scrollTop();
         // 変化するポイントまでスクロールしたらクラスを追加
         if ( scroll > fade ) {
            $("#js-fadeText").fadeOut("normal");
         // 変化するポイント以前であればクラスを削除
         } else {
            $("#js-fadeText").fadeIn("normal");
         }
      });
   }
   window.onload = init();

   //.js-fadeIn
   if(!navigator.userAgent.match(/(iPhone|android|iPad)/)){
      $(window).scroll(function (){
         $('.js-fadeIn').each(function(){
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight + 100){
               $(this).addClass('js-scrollIn');
            }
         });
      });
   }

   //Isotope
   var $container = $('.filter-contents');
   $('#filters a').click(function(){
      $('#filters .current').removeClass('current');
      $(this).addClass('current');
      var selector = $(this).attr('data-filter');
      $container.isotope({
         filter: selector,
         animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
         }
      });
   return false;
   });

});
