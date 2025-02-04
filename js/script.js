document.addEventListener('DOMContentLoaded', () => {
   'use strict';

   addLoadedClass();

   const iconMenu = document.querySelector('.menu__icon');
   const menuBody = document.querySelector('.menu__body');
   if (iconMenu) {
      iconMenu.addEventListener('click', function () {
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');
         });
   }
   
   headerScroll();
   
   let imageSlider = new Swiper('.image-slider', {
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev'
      },
      keyboard: {
         enabled: true,
         onlyInViewport: true,
         pageUpDown: true,
      },
      watchOverflow: true,
      slideToClickedSlide: true,
      initialSlide: 0,
      breakpoints: {
         320: {
            slidesPerView: "auto"
         },
         479.98: {
            slidesPerView: 5,
            initialSlide: 2,
            centeredSlides: true,
         },
      },
   });

   let commentSlider = new Swiper('.comment-slider', {
      spaceBetween: 24,
      autoHeight: true,
      initialSlide: 0,
      slidesPerView: 1,
      breakpoints: {
         479.98: {
            initialSlide: 2,
         },
      },
   });
   imageSlider.controller.control = commentSlider;
   commentSlider.controller.control = imageSlider;


   const accordions = document.querySelectorAll('.accordion');
   accordions.forEach((el, index) => {
      el.addEventListener('click', (e) => {
         const self = e.currentTarget;//in arrow function this is not available
         const control = self.querySelector('.accordion__control');
         const content = self.querySelector('.accordion__content');

         self.classList.toggle('open');

         if (self.classList.contains('open')) {
            control.setAttribute('aria-expanded', true);
            content.setAttribute('aria-hidden', false);
            content.style.maxHeight = content.scrollHeight + 'px';
         } else {
            control.setAttribute('aria-expanded', false);
            content.setAttribute('aria-hidden', true);
            content.style.maxHeight = '0px';
         }
         removeOpen(index);
      });
   });

   function removeOpen(index1) {
      accordions.forEach((el, index2) => {
         if (index1 !== index2) {
            el.classList.remove('open');

            let content = el.querySelector('.accordion__content');
            content.style.maxHeight = '0px';
         }
      });
   }

   const animItems = document.querySelectorAll('._anim-items');
   
   if (animItems.length > 0) {
         window.addEventListener('scroll', animOnScroll);
         function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
               const animItem = animItems[index];
               const animItemHeight = animItem.offsetHeight;
               const animItemOffset = offset(animItem).top;
               const animStart = 4;
   
               let animItemPoint = window.innerHeight - animItemHeight / animStart;
               if (animItemHeight > window.innerHeight) {
                  animItemPoint = window.innerHeight - window.innerHeight / animStart;
               }
               if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                  animItem.classList.add('_active');
               } else {
                  if (!animItem.classList.contains('_anim-no-hide')) {
                     animItem.classList.remove('_active');
                  }
               }
            }
         }
         function offset(el) {
            const rect = el.getBoundingClientRect(),
               scrollLeft = window.scrollX || document.documentElement.scrollLeft,
               scrollTop = window.scrollY || document.documentElement.scrollTop;
            return {
               top: rect.top + scrollTop,
               left: rect.left + scrollLeft
            }
         }
         setTimeout(() => {
            animOnScroll();
         }, 300);
   }

   let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

   if(!isMobile.any()) {
      const mouseParallax = new MousePRLX();
   }
});
function addLoadedClass() {
	if (!document.documentElement.classList.contains('loading')) {
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.documentElement.classList.add('loaded');
			}, 0);
		});
	}
}
function headerScroll() {
   addWindowScrollEvent = true;
   const header = document.querySelector('header.header');
   const headerShow = header.hasAttribute('data-scroll-show');
   const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
   const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
   let scrollDirection = 0;
   let timer;
   document.addEventListener("scroll", function (e) {
      const scrollTop = window.scrollY;
      clearTimeout(timer);
      if (scrollTop >= startPoint) {
         !header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
         if (headerShow) {
            if (scrollTop > scrollDirection) {
               // downscroll code
               header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
            } else {
               // upscroll code
               !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
            }
            timer = setTimeout(() => {
               !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
            }, headerShowTimer);
         }
      } else {
         header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
         if (headerShow) {
            header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
         }
      }
      scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
   });
}
class MousePRLX {
   constructor(props, data = null) {
      let defaultConfig = {
         init: true,
         logging: true,
      }
      this.config = Object.assign(defaultConfig, props);
      if (this.config.init) {
         const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');
         if (paralaxMouse.length) {
            this.paralaxMouseInit(paralaxMouse);
         } else {
         }
      }
   }
   paralaxMouseInit(paralaxMouse) {
      paralaxMouse.forEach(el => {
         const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');

         const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
         const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
         const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
         const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
         const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;


         let positionX = 0, positionY = 0;
         let coordXprocent = 0, coordYprocent = 0;

         setMouseParallaxStyle();

         if (paralaxMouseWrapper) {
            mouseMoveParalax(paralaxMouseWrapper);
         } else {
            mouseMoveParalax();
         }

         function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;
            positionX = positionX + (distX * paramAnimation / 1000);
            positionY = positionY + (distY * paramAnimation / 1000);
            el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0) rotate(0.02deg);`;
            requestAnimationFrame(setMouseParallaxStyle);
         }
         function mouseMoveParalax(wrapper = window) {
            wrapper.addEventListener("mousemove", function (e) {
               const offsetTop = el.getBoundingClientRect().top + window.scrollY;
               if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
                  const parallaxWidth = window.innerWidth;
                  const parallaxHeight = window.innerHeight;
                  const coordX = e.clientX - parallaxWidth / 2;
                  const coordY = e.clientY - parallaxHeight / 2;
                  coordXprocent = coordX / parallaxWidth * 100;
                  coordYprocent = coordY / parallaxHeight * 100;
               }
            });
         }
      });
   }
}