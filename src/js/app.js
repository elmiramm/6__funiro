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
	new Swiper('.slider-main__body', {
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
	});
}
if (document.querySelector('.slider-rooms__body')) {
	new Swiper('.slider-rooms__body', {
		observer: true,
		observeParents: true,
		slidesPerView: "auto",
		// loopedSlides: 5,
		spaceBetween: 24,
		speed: 800,
		loop: true,
		watchOverflow: true,
		loopAdditionalSlides: 5,
		preloadImage: false,
		parallax: true,
		pagination: {
			el: '.slider-rooms__dots',
			clickable: true,
		},
		navigation: {
			nextEl: '.slider-rooms .slider-arrow--next',
			prevEl: '.slider-rooms .slider-arrow--prev',
		},
	});
}
if (document.querySelector('.slider-tips__body')) {
	new Swiper('.slider-tips__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 32,
		speed: 800,
		loop: true,
		watchOverflow: true,
		pagination: {
			el: '.slider-tips__dots',
			clickable: true,
		},
		navigation: {
			nextEl: '.slider-tips .slider-arrow--next',
			prevEl: '.slider-tips .slider-arrow--prev',
		},
		breakpoints: {
			279: {
				slidesPerView: 1.1,
				spaceBetween: 15,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
		}
	});
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
		}
		if (targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			e.preventDefault();
		}
		if (targetElement.classList.contains('actions-product__button')) {
			const productId = targetElement.closest('.item-product').dataset.pid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}
		if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-header').classList.toggle('_active');
			}
			e.preventDefault();
		} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
			document.querySelector('.cart-header').classList.remove('_active');
		}

		if (targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest(".cart-list__item").dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}
	}

	//Header 
	const headerElement = document.querySelector('.header');
	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove('_scroll');
		} else {
			headerElement.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);

	//Load More Products 
	async function getProducts(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			const file = "json/products.json";
			let response = await fetch(file, {
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadProducts(result);
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert("Error");
			}
		}
	}

	function loadProducts(data) {
		const productsItems = document.querySelector('.products__items');

		data.products.forEach(item => {
			const productId = item.id;
			const productUrl = item.url;
			const productImage = item.image;
			const productTitle = item.title;
			const productText = item.text;
			const productPrice = item.price;
			const productOldPrice = item.priceOld;
			const productShareUrl = item.shareUrl;
			const productLikeUrl = item.likeUrl;
			const productLabels = item.labels;

			let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = '';
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				productLabels.forEach(labelItem => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label--${labelItem.type}">${labelItem.value}</div>`
				});
				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `<a href="${productUrl}" class="item-product__image ibg">
					<img src="img/products/${productImage}" alt="${productTitle}">
				</a>`;

			let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTenlplateBodyContent = `<div class="item-product__content">
			<h4 class="item-product__title">${productTitle}</h4>
			<p class="item-product__text">${productText}</p></div>`;
			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
			let productTemplatePriceOld = `<div class="item-product__price item-product__price--old">Rp ${productOldPrice}</div>`;
			let productTemplatePricesEnd = '</div>';

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePriceOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="#" class="actions-product__button btn btn--white">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link icon-share">Share</a>
				<a href="${productLikeUrl}" class="actions-product__link icon-heart">Like</a>
			</div> </div>`;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTenlplateBodyContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;

			productsItems.insertAdjacentHTML('beforeend', productTemplate);

			const lastChildEl = productsItems.lastElementChild;
			let ibg = lastChildEl.querySelector('.ibg');

			if (ibg) {
				if (ibg.querySelector('img')) {
					ibg.style.backgroundImage = 'url(' + ibg.querySelector('img').getAttribute('src') + ')';
				}
			}

		})
	}

	// Add to Cart 

	function addToCart(productButton, productId) {
		if (!productButton.classList.contains('_hold')) {
			productButton.classList.add('_hold');
			productButton.classList.add('_fly');

			const cart = document.querySelector('.cart-header__icon');
			const product = document.querySelector(`[data-pid="${productId}"]`);
			const productImage = product.querySelector('.item-product__image');

			const productImageFly = productImage.cloneNode(true);

			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;

			productImageFly.setAttribute('class', '_flyImage ibg');

			let ibg = productImageFly;

			productImageFly.style.cssText =
				`
			left: ${productImageFlyLeft}px;
			top: ${productImageFlyTop}px; 
			width: ${productImageFlyWidth}px; 
			height: ${productImageFlyHeight}px;
			`;

			document.body.append(productImageFly);

			const cartFlyLeft = cart.getBoundingClientRect().left;
			const cartFlyTop = cart.getBoundingClientRect().top;

			productImageFly.style.cssText = `left: ${cartFlyLeft}px; top: ${cartFlyTop}px; width: 0px; height: 0px; opacity: 0`;

			if (ibg) {
				if (ibg.querySelector('img')) {
					ibg.style.backgroundImage = 'url(' + ibg.querySelector('img').getAttribute('src') + ')';
				}
			}

			productImageFly.addEventListener("transitionend", function () {
				if (productButton.classList.contains('_fly')) {
					productImageFly.remove();
					updateCart(productButton, productId);
					productButton.classList.remove('_fly');
				}
			})
		}
	}

	// Update Cart 

	function updateCart(productButton, productId, productAdd = true) {
		const cart = document.querySelector('.cart-header');
		const cartIcon = cart.querySelector('.cart-header__icon');
		const cartQuantity = cartIcon.querySelector('span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		const cartList = document.querySelector('.cart-list');
		if (productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
			}
			if (!cartProduct) {
				const product = document.querySelector(`[data-pid="${productId}"]`);
				const cartProductImage = product.querySelector('.item-product__image').innerHTML;
				const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
				const cartProductContent = `
				<a href="#" class="cart-list__image ibg">${cartProductImage}</a>
				<div class = "cart-list__body">
					<a href = "#" class = "cart-list__title">${cartProductTitle}</a>
					<div class = "cart-list__quantity">Quantity: <span>1</span></div>
					<a href = "#" class = "cart-list__delete">Delete</a>
				</div>
				`;
				cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid = "${productId}" class = "cart-list__item">${cartProductContent}</li>`);
				const cartListImgForIbg = document.querySelector(`[data-cart-pid = "${productId}"]`);
				let ibg = cartListImgForIbg.querySelector('.ibg');

				if (ibg) {
					if (ibg.querySelector('img')) {
						ibg.style.backgroundImage = 'url(' + ibg.querySelector('img').getAttribute('src') + ')';
					}
				}
			} else {
				const cartProductQuantity = cartProduct.querySelector(`.cart-list__quantity span`);
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			}
			productButton.classList.remove('_hold');

		} else {
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
				cartProduct.remove();
			}
			const cartQuantityValue = --cartQuantity.innerHTML;
			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove('_active');
			}
		}
	}
}

