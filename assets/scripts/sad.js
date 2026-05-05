$(function() {


  // Open external links in new tabs. From:
  // http://css-tricks.com/snippets/jquery/open-external-links-in-new-window/
  $('a').each(function() {
   var a = new RegExp('/' + window.location.host + '/');
   if(!a.test(this.href) && !$(this).hasClass('.tocNav')) {
       $(this).click(function(event) {
           event.preventDefault();
           event.stopPropagation();
           window.open(this.href, '_blank');
       });
     }
  });


  //-------- HOME PAGE ----------//

  $('header a[href="#work"]').click(function() {
    $('body').animate({scrollTop: $('#work').offset().top+60})
  })


  // Nostalgia Button
  var aquaFlag = false

  $('.oldButton').click(function() {

    var oldThings = [
      "bgcolor",
      "colspan",
      "&lt;blink&gt;",
      "&lt;i&gt;",
      "&lt;b&gt;",
      "&lt;marquee&gt;",
      "DHTML",
      "&lt;applet&gt;",
      "colspan",
      "under construction",
      "&lt;frameset&gt;",
      "&lt;noframes&gt;",
      "image-map",
      "inline styles"
      ]

    var nostalgia = oldThings[Math.floor(Math.random()*oldThings.length)];

    var nope = $("<div class='nope'>" + nostalgia + "</div>")

    nope.appendTo($(this)).animate({
      top:100,
      left:(Math.random() * (300) -150),
      opacity: 0
    }, { complete: function() {
        nope.remove()
      }
    })
  })

  // Delight

  var delight = $('.delight'),
      delightCount = 0,
      delightSingleFlag = false,
      delightEasterEggFlag = false

  delight.hover(delightBounce)
  delight.click(delightBounce)

  function delightBounce() {

    if (!delight.hasClass('animating')) {
      delight.addClass('animating')
      setTimeout(function() {
        delight.removeClass('animating')
      }, 1200)
      delightCount++;
    }

    if (delightCount > 2) {

      setTimeout(function() {
        $('section.delight p').addClass('shown')
      }, 500)
    }
  }

  //-------- :VISITED WORKAROUND --------//


  // Old implementation:
  // localStorage.setItem($('body').data('id'),'seen');

  // var seenAll = true

  // $('.postList li a').each(function() {
  //   var id = $(this).data('id')
  //   if (localStorage.getItem(id) == "seen") {
  //     $(this).addClass('seen')
  //   } else {
  //     seenAll = false
  //   }
  // })

  // if (seenAll == true && localStorage.getItem('seenFlag') != "true") {
  //   clicky.log("Visited all work pages")
  //   localStorage.setItem('seenFlag', true)
  // }


  //New implementation:
  localStorage.setItem('visited-'+window.location.pathname,true);
  var links = document.getElementsByTagName('a');
  for (i=0;i<links.length;i++) {
    var link = links[i];
    if (link.host == window.location.host
    && localStorage.getItem('visited-'+link.pathname)
    || localStorage.getItem('visited-'+link.pathname + '/')) {
      link.dataset.visited = true;
    }
  }


  //-------- POST PAGES --------//

  // Grow images on click within pages

  $('.grow').click(function() {
    $(this).toggleClass('grown')
  })

if ($('nav').length) {
  /* scroll-up-bar v0.2.0 (https://github.com/eduardomb/scroll-up-bar) */
  !function(a){"use strict";a.fn.scrollupbar=function(){var b,c=a(window),d=a(document),e=this,f=c.scrollTop(),g=/(iPad|iPhone|iPod)/g.test(navigator.userAgent);return g?(a(document).on("touchstart",function(){f=c.scrollTop()}),a(document).on("touchend",function(){var a=c.scrollTop();f>a||a<e.outerHeight()?e.slideDown():a>f&&e.slideUp(),f=a})):c.scroll(function(){var a=c.scrollTop(),g=e.outerHeight(),h=e.offset().top+g,i=a>=h&&a>=g;0>a||a>d.height()-c.height()||(b&&clearTimeout(b),f>a?(i&&a>=f-g&&e.css("top",f-g),e.offset().top>=a&&e.css({position:"fixed",top:0}),b=setTimeout(function(){a>e.offset().top&&(e.css({position:"fixed",top:e.offset().top-a}),e.animate({top:0},100))},400)):a>f&&("fixed"==e.css("position")&&e.css({position:"absolute",top:f}),b=setTimeout(function(){!i&&a>g&&e.animate({top:a-g},100)},400)),f=a)}),this}}(jQuery);


  if ($('body').hasClass('page')) {
   $('nav').scrollupbar();
  }
}



  $('.toc').click(function(e) {
    e.preventDefault()
    var $this = $(this)
    if (! $this.hasClass('tocOn')) {
      openTOC()
    }
  })

  $('.toc ol a').click(function(e){
    closeTOC()
    e.preventDefault()
    var $this = $(this)
    var target = $this.attr('href')
    var targetTop = $(target).offset().top
    $('body').animate({scrollTop: targetTop - 50}, 1)
  })

  $('body').click(function(e){
    if($(e.target).closest('.toc').length === 0){
      closeTOC()
    }
  });

  function closeTOC() {
    $('.toc').removeClass('tocOn')
  }

  function openTOC() {
    $('.toc').addClass('tocOn')
  }


  //------ PAGE SPECIFIC -------//

  // Add crypt game

  if ($(window).width() > 950) {
    $('p.playNow').show()
    $('p.playLater').hide()
    $('div.game').html('<iframe src="http://Viz38.github.io/crypt"></iframe>')
  }

})
