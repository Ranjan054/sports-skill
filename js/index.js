const body = document.getElementById("body");
const animateImgWrapper = document.getElementById("animate-img-wrapper");
const phoneImg = document.getElementById("phone-img");
const mobileMenu = document.getElementById("mobile-menu");
const hamburger = document.getElementById("hamburger");
const sliderRightWrapper = document.getElementById("slider-right-wrapper");
const cards = document.getElementsByClassName("cards");
const slideRightTextWrapper = document.getElementsByClassName("slide-right-text-wrapper");


let slideIndex = 0;
let activateSliderId;
let flag = true; 
let deviceWidth;
let scrollPostion = window.scrollY;

// const bodyObserver = new ResizeObserver((entries) => {
//   deviceWidth = entries[0].contentRect.width
// });
// bodyObserver.observe(body);

// const topSectionObserver = new IntersectionObserver((entries) => {
//   console.log(entries[0].isIntersecting, entries[0].intersectionRatio, window.scrollY);
//   // console.log((entries[0].intersectionRatio && window.scrollY > 300), "condtion");
//   if (entries[0].isIntersecting && window.scrollY > 300) {
//     runSlider("start")
//   } else {
//     // runSlider("stop")
//   }
// },
// {
//   threshold: 0.5,
// });
// topSectionObserver.observe(sliderRight);
// const pageScroll = (e) => {
//   console.log(window.scrollY, "body ");
// }


const addAnimateClasses = (requiredScPosition) => {
   scrollPostion = window.scrollY;

  if (scrollPostion > requiredScPosition) {
    animateImgWrapper.classList.add("img-wrapper-animate-bottom");
    animateImgWrapper.classList.remove("img-wrapper-animate-top");
    sliderRightWrapper.style.visibility = "visible";
  } else {
    animateImgWrapper.classList.remove("img-wrapper-animate-bottom")
    animateImgWrapper.classList.add("img-wrapper-animate-top")
    sliderRightWrapper.style.visibility = "hidden";
  }
}
 
document.addEventListener("scroll", function(e) {
  const deviceWidth = window.screen.width;

  if (deviceWidth > 870) {
    addAnimateClasses(300)
  }

  if (deviceWidth < 870) {
    addAnimateClasses(220)
  }
  
}); 


const activateSlider = (isCardClicked, index) => {
  if (isCardClicked) {
    slideIndex = index;
    clearTimeout(activateSliderId);
  }
  for (let i = 0; i < slideRightTextWrapper.length; i++) {
    slideRightTextWrapper[i].style.display = "none"; 
    cards[i].classList.remove("tab-card-active"); 
  };

  slideIndex++;
  if (slideIndex > slideRightTextWrapper.length) {slideIndex = 1};
  phoneImg.src = `images/phoneimg-${slideIndex}.png`
  slideRightTextWrapper[slideIndex-1].style.display = "block";  
  cards[slideIndex-1].classList.add("tab-card-active");
  activateSliderId = setTimeout(activateSlider, 2000);
}

activateSlider();

const addEventListenerToCard = (i) => {
  cards[i].addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    activateSlider("cardClicked", i);
  });
}

const runSlider = () => {
  for(let i = 0; i < cards.length; i++) {
    addEventListenerToCard(i)
  }
}

runSlider();

hamburger.addEventListener("click", () => {
  if(flag) {
    mobileMenu.style.display = "flex";
    flag = false;
    return;
  } else {
    mobileMenu.style.display = "none";
    flag = true;
    return
  }
})

$(document).ready(function(){
  $('.sports-slide').slick({
    dots: true,
    // infinite: true,
    // speed: 300,
    autoplay: true,
    autoplaySpeed: 1400,
  });
});




// gsap.registerPlugin(ScrollTrigger);

// const a = gsap.timeline();

// // Check if the window width is greater than 768px before animating
// if ($(window).width() > 768) {
//   gsap.to('.phone-img', {
//     scrollTrigger: {
//       trigger: ".bannerWrap",
//       animation: a,
//       start: "top 0%",
//       scrub: 0.5,
//       end: "center center",
//       ease: "power1.out"
//     },
//     scale: 0,
//     ease: "power1.out",
//     duration: 0.5,
//     xPercent: -120,
//     yPercent: 120,
//     rotation: -0.5
//   });

//   gsap.to('.card3', {
//     scrollTrigger: {
//       trigger: ".bannerWrap",
//       animation: a,
//       start: "top 0%",
//       scrub: 0.5,
//       end: "center center",
//       ease: "power1.out"
//     },
//     ease: "power1.out",
//     scale: 1,
//     duration: 0.5,
//     xPercent: -230,
//     yPercent: 330
//   });

//   gsap.to('.card2', {
//     scrollTrigger: {
//       trigger: ".bannerWrap",
//       animation: a,
//       start: "top 0%",
//       scrub: 0.5,
//       end: "center center",
//     },
//     ease: "power1.out",
//     scale: 1,
//     duration: 0.5,
//     xPercent: -265,
//     yPercent: 390,
//     rotation: 0.3
//   });

//   gsap.to('.card1', {
//     scrollTrigger: {
//       trigger: ".bannerWrap",
//       animation: a,
//       scrub: 0.5,
//       start: "top 0%",
//       end: "center center",
//       ease: "power1.out"
//     },
//     ease: "power1.out",
//     scale: 1,
//     duration: 0.5,
//     xPercent: -245,
//     yPercent: 390
//   });

//   gsap.to('.tab-content', {
//     scrollTrigger: {
//       trigger: ".bannerWrap",
//       animation: a,
//       start: "top 0%",
//       scrub: 0.5,
//       end: "center center",
//       ease: "power1.out"
//     },
//     opacity: 1,
//     xPercent: -65,
//     yPercent: -50,
//     duration: 1
//   });
// }

// $(document).ready(function() {
//   $(".menuIcon").click(function() {
//     $(".menuItems").slideToggle();
//   });

//   var contentSwitchIndex = 0; // Index to keep track of the current content switch

//   // Array of content selectors and corresponding phone images to switch
//   var contentSelectors = [
//     {
//       selector: '#v-pills-profile',
//       phoneImg: 'images/Academy Player - Match Play - Ladder.png'
//     },
//     {
//       selector: '#v-pills-messages',
//       phoneImg: 'images/Academy Coach - Home – 1.png'
//     },
//     {
//       selector: '#v-pills-home',
//       phoneImg: 'images/Academy Player - Drill List.png'
//     }
//   ];

//   setInterval(function() {
//     var currentContent = contentSelectors[contentSwitchIndex];
  
//     // Switch content
//     $('.tab-pane').removeClass('active in');
//     $(currentContent.selector).addClass('active in');
  
//     // Switch phone image with fade animation
//     var phoneImgSrc = $(currentContent.selector).find('img').attr('src');
//     $('.phone-img img').fadeOut(5000, function() {
//       $(this).attr('src', phoneImgSrc);
//       $(this).fadeIn(5000);
//     });
  
//     contentSwitchIndex = (contentSwitchIndex + 1) % contentSelectors.length;
//   }, 2000);
  
//   // Add this code after the setInterval function
//   $(window).scroll(function() {
//     if ($(window).scrollTop() + $(window).height() === $(document).height()) {
//       // Reached the end of the page, hide phone image
//       $('.phone-img img').fadeOut(5000);
//     } else {
//       // Not at the end of the page, show phone image
//       $('.phone-img img').fadeIn(5000);
//     }
//   });
  
  
// });
