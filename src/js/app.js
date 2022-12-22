import * as flsFunctions from "./modules/functions.js";
import { spoilers } from "./modules/spoilers.js";
import Swiper, { Navigation, Pagination } from 'swiper';

flsFunctions.isWebp();
spoilers();

// init Swiper:
const swiper = new Swiper('.swiper', {
	// configure Swiper to use modules
	modules: [Navigation, Pagination],
});

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