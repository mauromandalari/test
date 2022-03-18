//Swup
const options = {
  animateHistoryBrowsing: true,
  animationSelector: '[class*="transition"]',
  plugins: [new SwupBodyClassPlugin(), new SwupHeadPlugin(), new SwupDebugPlugin()],
  containers: ["#swup"],
  cache: true,
  linkSelector:
  'a[href^="' +
  window.location.origin +
  '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
  skipPopStateHandling: function(event) {
    if (event.state && event.state.source == "swup") {
      return false;
    }
    return true;
  }
};
const swup = new Swup(options); // only this line when included with script tag


const scroll = new LocomotiveScroll({
  el: document.querySelector("#container-scroll"),
  smooth: true,
});

function scrollDetect() {

  scroll_pos = 0;
  body_el = document.body;

  // scroll event
  scroll.on('scroll', func => {

    if(scroll.scroll.instance.scroll != null){
      scroll_pos = scroll.scroll.instance.scroll.y;
      setInterval(function() {
        /* add class on scroll */
        body_el = document.body;
        if(scroll_pos > 400) {
          body_el.classList.add('scrolled-down');
        } else {
          body_el.classList.remove('scrolled-down');
        }
      }, 350);
    }

  });

}

scrollDetect();

document.addEventListener('swup:willReplaceContent', event => {
  scroll.destroy();
});

document.addEventListener('swup:contentReplaced', event => {
  $(".hamburger-icon").removeClass("hamburger-icon--open");
  $(".header__nav").removeClass("header__nav--open");
});

document.addEventListener('swup:transitionEnd', event => {

  scroll.init();
  scrollDetect();

});


$( document ).ready(function() {

  //onload
  $(window).load(function() {
    $('.preloader').fadeOut('slow');
    $('.header,.social-icons a,.bottom-icons, .svg-container').addClass('is-inview');
  });


  /* Open Panel */
  $( ".header__hamburger" ).on('click', function() {
    $(".hamburger-icon").toggleClass("hamburger-icon--open");
    $(".header__nav").toggleClass("header__nav--open");
  });

  /* Toggle Dark Mode */
  $( ".darkmode" ).on('click', function() {
    $("body").toggleClass("dark");
  });

  // open submenu mobile
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $(".menu-item-has-children > a" ).on('click', function(e) {
      e.preventDefault();
      $(this).next().toggleClass("open");
    });
  }

  // morphing svg
  let selected = 'M111.3,-168.7C128.6,-140.7,116.1,-87.2,115.3,-47.5C114.4,-7.7,125.2,18.2,122.1,43.4C119.1,68.6,102.2,92.9,79.5,114.7C56.8,136.5,28.4,155.8,-3.1,160.1C-34.7,164.4,-69.4,153.8,-97.6,133.8C-125.8,113.8,-147.5,84.4,-177.4,45.2C-207.3,6,-245.4,-43.1,-230.4,-70.4C-215.4,-97.8,-147.4,-103.5,-100.1,-121.8C-52.9,-140.1,-26.5,-171.1,10.3,-185.2C47,-199.4,94,-196.8,111.3,-168.7Z';

  function shape_morphing(selected){
    var morphing = anime({
      targets: '#path',
      d: selected,
      easing: 'easeOutQuad',
      duration: 1200,
      loop: false
    });
  }


  // Navigation morphing
  $("#menu a").click( function() {

    $id = $(this).attr("data-id");

    if($id == 1 ){
      selected = 'M111.3,-168.7C128.6,-140.7,116.1,-87.2,115.3,-47.5C114.4,-7.7,125.2,18.2,122.1,43.4C119.1,68.6,102.2,92.9,79.5,114.7C56.8,136.5,28.4,155.8,-3.1,160.1C-34.7,164.4,-69.4,153.8,-97.6,133.8C-125.8,113.8,-147.5,84.4,-177.4,45.2C-207.3,6,-245.4,-43.1,-230.4,-70.4C-215.4,-97.8,-147.4,-103.5,-100.1,-121.8C-52.9,-140.1,-26.5,-171.1,10.3,-185.2C47,-199.4,94,-196.8,111.3,-168.7Z';
    } else if ($id == 2 ){
      selected = 'M106.1,-148.2C148.8,-115.1,202.3,-99.1,227,-64.1C251.7,-29,247.6,25,217.4,56C187.2,87,130.9,94.9,90.3,106.2C49.8,117.5,24.9,132.2,-11.3,147.8C-47.4,163.3,-94.8,179.5,-117.7,162.4C-140.5,145.4,-138.7,94.9,-148.8,51.3C-158.8,7.7,-180.7,-29,-185.3,-74.2C-189.9,-119.4,-177.2,-173,-143.5,-209C-109.7,-245,-54.9,-263.5,-11.6,-247.6C31.7,-231.7,63.5,-181.4,106.1,-148.2Z';
    } else if ($id == 3 ){
      selected = 'M89.7,-94.3C136.3,-89.6,208,-90.2,234,-63.5C260,-36.7,240.3,17.5,215,61.9C189.6,106.3,158.6,140.9,121.8,164.5C85,188,42.5,200.5,-2.4,203.8C-47.2,207,-94.4,201,-132.6,177.9C-170.8,154.8,-200,114.6,-204.8,72.9C-209.5,31.2,-189.9,-12.1,-181,-64.8C-172.1,-117.5,-173.9,-179.7,-145.5,-190.3C-117.2,-200.9,-58.6,-160,-18.5,-134.5C21.6,-109,43.1,-99,89.7,-94.3Z';
    }

    shape_morphing(selected);

  });

  shape_morphing(selected);


  // anime line animation
  var verticalLine = anime.timeline({
    loop: true
  });

  verticalLine.add({
    targets: document.querySelector('.line-center'),
    transformOrigin: ['0 100%', '0 100%'],
    scaleY: [1, 0],
    easing: 'easeInOutSine',
    loop: true,
    duration: 1000
  }).add({
    targets: document.querySelector('.line-center'),
    transformOrigin: ['0 0', '0 0'],
    scaleY: [0, 1],
    easing: 'easeInOutSine',
    loop: true,
    duration: 1000
  });


  $(window).on('mousemove',function(e){
    var width=$(window).width(),
    height=$(window).height(),
    offsetX=0.5-e.pageX/width,
    offsetY=0.5-e.pageY/height,
    $parallaxItem=$('.parallax');

    $parallaxItem.each(function(i,el){
      var offset=parseInt($(el).data('offset')), translate="translate3d("+Math.round(offsetX*offset)+"px,"+Math.round(offsetY*offset)+"px,0px)";
      $(el).css({
        '-webkit-transform':translate,
        'transform':translate,
        '-moz-transform':translate
      });
    });
  });

  //     var currentX = '';
  // var currentY = '';
  // var movementConstant = .015;
  // $(document).mousemove(function(e) {
  //   if(currentX == '') currentX = e.pageX;
  //   var xdiff = e.pageX - currentX;
  //   currentX = e.pageX;
  //    if(currentY == '') currentY = e.pageY;
  //   var ydiff = e.pageY - currentY;
  //   currentY = e.pageY;
  //   $('.parallax').each(function(i, el) {
  //       var movement = (i + 1) * (xdiff * movementConstant);
  // 	  var movementy = (i + 1) * (ydiff * movementConstant);
  //       var newX = $(el).position().left + movement;
  // 	  var newY = $(el).position().top + movementy;
  //
  //       $(el).css('left', Math.round(newX) + 'px');
  // 	  $(el).css('top', Math.round(newY) + 'px');
  //   });
  // });



});
