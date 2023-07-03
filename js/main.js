// Checks if any particular element is in viewport
$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementTop < viewportBottom && elementBottom > viewportTop;
};

var counters_triggered = false;

console.log(document.documentElement, "html");

function openModal(mod_name, popupname) {
    let modal = document.getElementById(mod_name);
    let popup = document.getElementById(popupname);
  
    // Add open class to make visible and trigger animation
    modal.classList.add('open');
    popup.classList.add('open');
    setTimeout(function(){
      document.documentElement.classList.add('hideOverflowY');
      $('body').addClass('hideOverflowY');
    },100)
  }
  
  function closeModal(mod_name) {
    let modal = document.getElementById(mod_name);
    // Remove open class to hide and trigger animation
    modal.classList.remove('open');
    // popup.classList.remove('open');
    $('.popupContent').removeClass('open')
    $('body').removeClass('hideOverflowY');
    document.documentElement.classList.remove('hideOverflowY');
  }

$(document).ready(function() {
    window.scrollTo(0, 0);
})

// Animate numbers when scrolled into view
$(window).scroll(function (e) {
    e.stopPropagation();
    e.preventDefault();
    if ($('.counterSection').isInViewport() && !counters_triggered) {
        counters_triggered = true;

        $('.counter span').counterUp({
            delay: 10,
            time: 2000
        });
        $('.counter span').addClass('animated fadeInDownBig');
        $('.mainCounterWrap b').addClass('animated fadeIn');
    }

    if ($(window).width() > 1128) {
      if ($('.about-one').isInViewport()) {
        $(".about-one").animate({ "left": "586px" }, 2000).addClass('visible');
      }
      if ($('.about-two').isInViewport()) {
          $(".about-two").animate({ "right": "0" }, 2000).addClass('visible');
      }
      if ($('.about-three').isInViewport()) {
          $(".about-three").animate({ "left": "592" }, 2000).addClass('visible');
      }
    }

    if ($(window).width() >= 750 && $(window).width() <= 1128) {
      if ($('.about-one').isInViewport()) {
        $(".about-one").animate({ "left": "52" }, 800).addClass('visible');
      }
      if ($('.about-two').isInViewport()) {
          $(".about-two").animate({ "right": "20" }, 900).addClass('visible');
      }
      if ($('.about-three').isInViewport()) {
          $(".about-three").animate({ "left": "52" }, 800).addClass('visible');
      }
    }


    if ($(window).width() < 750) {
      if ($('.about-one').isInViewport()) {
        $(".about-one").animate({ "left": "-40px" }, 500).addClass('visible');
      }
      if ($('.about-two').isInViewport()) {
          $(".about-two").animate({ "right": "0" }, 600).addClass('visible');
      }
      if ($('.about-three').isInViewport()) {
          $(".about-three").animate({ "left": "-40px" }, 500).addClass('visible');
      }
    }
});


$("document").ready(function() {
  // Arrange blocks in a circle
  var block = $("#rotator div").get(),
      increase = Math.PI * 2 / block.length,
      x = 0,
      y = 0,
      angle = 0;

  for (var i = 0; i < block.length; i++) {
    var elem = block[i];
    if ($(window).width() > 1128) {
    x = 250 * Math.cos(angle) + 150;
    y = 250 * Math.sin(angle) + 150;
    }
    if ($(window).width() >= 750 && $(window).width() <= 1128) {
      x = 115 * Math.cos(angle) + 83;
      y = 115 * Math.sin(angle) + 83;
    }
    if ($(window).width() < 750) {
      // x = 120 * Math.cos(angle) + 120;
      // y = 120 * Math.sin(angle) + 120;
      x = 115 * Math.cos(angle) + 83;
      y = 115 * Math.sin(angle) + 83;
    }
    elem.style.position = 'absolute';
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
    // var rot = -90 + (i * (360 / block.length)); // Use '-' instead of '+'
    var rot = -90 + (i * (360 / block.length)); // Use '-' instead of '+'
    elem.style.transform = 'rotate(' + rot + 'deg)';
    angle += increase;
  }

  // Update opacity based on rotation
  var maxOpacity = 1.0;
  var minOpacity = 0.2;
  var currentIndex = block.length - 1; // Start with the last index

  function updateOpacity() {
  var currentTopIndices = getTopIndices(currentIndex,6);
  currentTopIndices.reverse(); // Reverse the array to achieve anticlockwise order

  var opacityStep = (maxOpacity - minOpacity) / (block.length - 4); // Calculate opacity step for non-top images
  var currentOpacity = maxOpacity; // Set initial opacity for non-top images

  for (var i = 0; i < block.length; i++) {
    var elem = block[i];
    var opacity;

    if (currentTopIndices.includes(i)) {
      opacity = maxOpacity; // Set highest opacity for top images
    } else {
      opacity = minOpacity; // Set current opacity for non-top images
       // Decrement opacity for each non-top image
    }

    elem.style.transition = 'opacity 1s'; // Add fade transition
    elem.style.opacity = opacity;
  }

  currentIndex = (currentIndex + 1) % block.length; // Update the current index in anticlockwise direction

  setTimeout(updateOpacity, 1000); // Call updateOpacity after 2 seconds
}


  // Get the indices of the top four images based on their vertical position
// Get the indices of the top three images based on their vertical position
function getTopIndices(currentIndex, numIndices) {
  var topIndices = [];
  var positions = [];

  for (var i = 0; i < block.length; i++) {
    var elem = block[i];
    var position = getPositionY(elem);
    positions.push({ index: i, position: position });
  }

  positions.sort(function(a, b) {
    return a.position - b.position;
  });

  for (var i = 0; i < numIndices; i++) {
    topIndices.push(positions[i].index);
  }

  return topIndices;
}


  // Get the vertical position of an element
  function getPositionY(elem) {
    var rect = elem.getBoundingClientRect();
    return rect.top + rect.height / 6;
  }

  // Call updateOpacity on page load
  updateOpacity();
});








  
