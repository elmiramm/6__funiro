import * as flsFunctions from "./modules/functions.js";
import { spoilers } from "./modules/spoilers.js";
import Swiper, { Navigation, Pagination, Parallax } from 'swiper';
import { DynamicAdapt } from "./modules/dynamic-adapt.js";

DynamicAdapt();


flsFunctions.isWebp();
flsFunctions.ibg();
spoilers();


// init Swiper:
Swiper.use([Navigation, Pagination, Parallax]);
if (document.querySelector('.slider-main__body')) {
	const swiper = new Swiper('.slider-main__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImage: false,
		parallax: true,
		pagination: {
			el: '.controls-slider-main__dots',
			clickable: true,
		},
		navigation: {
			nextEl: '.slider-main .slider-arrow--next',
			prevEl: '.slider-main .slider-arrow--prev',
		},
	})
}

window.onload = function () {
	document.addEventListener('click', documentActions);

	//Действия при кликах
	function documentActions(e) {
		const targetElement = e.target;

		if (window.innerWidth > 768 && flsFunctions.isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			if (!targetElement.closest('.menu__item') && document.querySelectorAll(".menu__item._hover").length > 0) {

				document.querySelectorAll(".menu__item._hover").forEach(function (elem) {
					elem.classList.remove('_hover');
				})
			}
		}
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form.active')) {
			document.querySelector('.search-form').classList.remove('active');
		}

		if (targetElement.classList.contains('icon-menu') || targetElement.closest('.icon-menu')) {

			const elem = targetElement.classList.contains('icon-menu') ? targetElement : targetElement.closest('.icon-menu');
			elem.classList.toggle('_active');

			const menuBody = document.querySelector('.menu__body');
			menuBody.classList.toggle('_active');
			console.log(menuBody);
		}
	}

}