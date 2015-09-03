import 'jquery'
import { globals } from 'globals.js';

import { DOMManipulationController } from './DOMManipulationController.js';

import { currentUserController } from './../userControllers/currentUserController.js';

import { imageController } from './../imageController.js'

var DOMEventHandlerController = (function ($) {

	function offSetTopPosition() {
		if ($(document).scrollTop() < ($('.header').height() / 2)) {
			DOMManipulationController.animateScrollToContent();
		}
	};

	function loadPartialView(partialViewPath, methodDelegates) {
		$('.container').load(partialViewPath, function () {
			if (methodDelegates) {
				globals.functions.executeMethodDelegates(methodDelegates);
			}

			return false;
		});
	};

	function scrollToTopButtonClick() {
		$('.btn__scroll').click(function () {
			$('body').animate({ scrollTop: 0 }, 400);
		});
	};

	function menuButtonClick(partialViewPath, methodDelegates) {
		loadPartialView(partialViewPath, methodDelegates);
		offSetTopPosition();
		scrollToTopButtonClick();
	};

	function redirectButtonClick(partialViewPath, methodDelegates) {
		loadPartialView(partialViewPath, methodDelegates);
		scrollToTopButtonClick();
	}

	function editImageButtonClick() {
		$('.profile__field__btn__edit').click(function (e) {
			$('.form__upload').toggleClass('form__upload-clicked');
		});
	};

	function uploadImageButtonClick() {
		$('.form__upload__input--type-file').change(function () {
			imageController.readImage(this);
		});
	};
	
	function messageboxCloseButtonClick($messagebox) {
		$messagebox.css({'opacity': 0,
						'display': 'none'});
	}

	function wantPaymentCheckboxChange() {
		$('#input--want-payment').change(function (e) {
			if ($(this).is(':checked')) {
				$('#input--typeof-payment').prop('disabled', false);
			} else {
				$('#input--typeof-payment').prop('disabled', true);
			}
		});
	};

	function unloadEventHandler() {

	}

	return {
		loadPartialView: loadPartialView,
		menuButtonClick: menuButtonClick,
		scrollToTopButtonClick: scrollToTopButtonClick,  
		redirectButtonClick: redirectButtonClick,
		editImageButtonClick: editImageButtonClick,
		uploadImageButtonClick: uploadImageButtonClick,
		messageboxCloseButtonClick: messageboxCloseButtonClick,
		wantPaymentCheckboxChange: wantPaymentCheckboxChange
	};
} (jQuery));

export {
	DOMEventHandlerController
}