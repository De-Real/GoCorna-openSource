import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

/*
import Swiper, { Navigation, Pagination } from 'swiper';
const swiper = new Swiper();
*/


//burger menu
function showMenu() {
	const menuBody = document.querySelector('.menu__body');
	document.body.classList.toggle('_lock');
	iconMenu.classList.toggle('_active');
	menuBody.classList.toggle('_active');
}

const iconMenu = document.querySelector('.menu__icon');
if (iconMenu) {
	iconMenu.addEventListener('click', showMenu)
}
// scroll to the video 

const videoLink = document.querySelector('.video-scroll');
const video = document.querySelector('.experts-video');

function scrollToVideo(event) {
	document.body.classList.toggle('_lock');
	let videoCoords = video.getBoundingClientRect().top + video.clientHeight / 2 - document.documentElement.clientHeight / 2 + document.documentElement.scrollTop;
	window.scrollTo({
		top: videoCoords,
		behavior: "smooth"
	});
	event.preventDefault();
	document.body.classList.toggle('_lock');
}

videoLink.addEventListener('click', scrollToVideo);

const phoneLinks = document.querySelectorAll('.button');
for (let link of phoneLinks) {
	if (link.dataset.phone === 'link') {
		const androidLink = 'https://play.google.com/store/apps/details?id=de.rki.coronawarnapp';
		const iosLink = 'https://apps.apple.com/ua/app/corona-warn-app/id1512595757?l=ua';
	
		if(/iPhone|iPod|iPad/i.test(navigator.userAgent)){
			console.log('The user has entered with iOS')
			link.href = iosLink;	
		} else{
			link.href = androidLink;
		}
	}
}

//popups

const popupLinks = document.querySelectorAll('.popup-link');	// добавляется в ссылку, с которой открывается поп-ап
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");	//этот класс следует добавить всем фиксированным обьектам

let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector(".popup.open");
		if (popupActive) {
			popupClose(popupActive, false);	// Если открывается ещё один попап внутри открытого попапа, то передаётся false, означающий не нужность сначало убирать отступ справа, а потом добавлять
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	console.log("Check5");
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	console.log("lock work");
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + "px";
	console.log(lockPaddingValue);
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('_lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	console.log("Check7");
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('_lock');
	}, timeout)


	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);

}

document.addEventListener("keydown", function(e){
	if(e.which === 27){
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function(){
	if(!Element.prototype.closest){
		Element.prototype.closest = function (css){
			var node = this;
			while(node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function (){
	if(!Element.prototype.matches){
		Element.prototype.matches = Element.prototype.matchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector;
	}
})();