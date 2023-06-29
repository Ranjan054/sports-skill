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
    // autoplay: true,
    autoplaySpeed: 1400,
  });
});
