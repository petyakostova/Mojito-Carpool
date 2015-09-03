import 'jquery'
import { globals } from 'globals.js'

import { DOMEventHandlerController } from './DOMEventHandlerController'

import { currentUserController } from './../userControllers/currentUserController' 
var DOMManipulationController = (function($){
	
	function blurWrapper() {
		$('.wrapper').css({
                            'filter': 'blur(10px) drop-shadow(16px 16px 10px rgba(0,0,0,0.9))',
                            '-webkit-filter': 'blur(10px) drop-shadow(16px 16px 10px rgba(0,0,0,0.9))',
                            '-moz-filter': 'blur(10px)',
                            '-o-filter': 'blur(10px)',
                            '-ms-filter': 'blur(10px)'
                        });
	};
	
	function unblurWrapper() {
		$('.wrapper').css({
			'filter': 'none',
			'-webkit-filter': 'none',
			'-moz-filter': 'none',
			'-o-filter': 'none',
			'-ms-filter': 'none'
		})
	}
	
	function disableSubmitButton($button) {
		$button.css('pointer-events', 'none');
	}
	
	function displayStatusMessage(status, methodDelegates) {
		if(status === 'success') {
			$('.messagebox--state-error').css('display', 'none');
			$('.messagebox--state-success').css({'display': 'block',
												'opacity': 1});
			disableSubmitButton($('.form__field__input--type-submit'));
			blurWrapper();
			$('.messagebox--state-success__btn__close').click(function(){
				$('.messagebox--state-success').css({'opaicty': 0,
													'display': 'none'});
				unblurWrapper();
			});
			if(methodDelegates) {
				globals.functions.executeMethodDelegates(methodDelegates);
			}
		} else if (status === 'error') {
			$('.messagebox--state-success').css('display', 'none');
			$('.messagebox--state-error').css({'display': 'block',
												'opacity': 1});
			blurWrapper();	
			$('.messagebox--state-error__btn__close').click(function(){
				$('.messagebox--state-error').css({'opaicty': 0,
													'display': 'none'});
				unblurWrapper();
			});
			
		}
	}
	
	function compileHandlebarsTemplate(template) {
		var templateHTML = template,
			templateAsDOMElement = Handlebars.compile(templateHTML);
			
		return templateAsDOMElement;
	};
	
	function displayCurrentUserInMenu() {
		globals.everlive.Users.currentUser()
			.then(function (user) {
				return user.result.DisplayName;
			})
			.then(function (name) {
					var template = '<li class="menu__list__item" view="myProfile"><a href="#" class="menu__list__item__link">{{name}}</a></li>',
						templateAsDOMElement = compileHandlebarsTemplate(template)	
						
					$('.navbar-right').append(templateAsDOMElement({ name: name}));
					displayLogInOrLogOutCTA('Log out');
					$('.menu__list__item[view="register"]').css('display', 'none');
					
					$('.menu__list__item[view="myProfile"]').click(function(e) {
						e.preventDefault();
						DOMEventHandlerController.menuButtonClick('../../views/myProfileView.html', [displayCurrentUserProfile]);
					});
			});
	}
	
	function displayCurrentUserProfile() {
		globals.everlive.Users.currentUser()
			.then(function(user) {
				return user.result
			})
			.then(function(currentUser) {
				var profileTemplateHTML = $('#profile-template').html(),
					profileTemplate = compileHandlebarsTemplate(profileTemplateHTML);
				globals.everlive.Files.getById(currentUser.Image)
					.then(function(data){
						return data.result;
					})
					.then(function(image){
						$('.profile').append(profileTemplate({
							name: currentUser.DisplayName,
							email: currentUser.Email,
							age: currentUser.Age,
							city: currentUser.City,
							image: image.Uri
						}));
					})
					.then(function(){
						DOMEventHandlerController.editImageButtonClick();
						DOMEventHandlerController.uploadImageButtonClick();
					});
			});
	};
	
	function removeCurrentUserFromMenu () {
		$('.menu__list__item[view="myProfile"]').remove();
		displayLogInOrLogOutCTA('Log in');
		$('.menu__list__item[view="register"]').css('display', 'block');
	}
	
	 function displayLogInOrLogOutCTA(cta) {
		if(cta === "Log in") {
			$('#menu__list__item__log-in').css('display', 'block');
			$('#menu__list__item__log-out').css('display', 'none');
		} else if (cta === "Log out") {
			$('#menu__list__item__log-out').css('display', 'block');
			$('#menu__list__item__log-in').css('display', 'none');
		}
	}
	
	function animateScrollToContent() {
		$('body').animate({scrollTop: $('.header').height()}, 400);
	}
	
	return {
		disableSubmitButton: disableSubmitButton,
		displayStatusMessage: displayStatusMessage,
		compileHandlebarsTemplate: compileHandlebarsTemplate,
		displayCurrentUserInMenu: displayCurrentUserInMenu,
		displayCurrentUserProfile: displayCurrentUserProfile,
		removeCurrentUserFromMenu: removeCurrentUserFromMenu,
		displayLogInOrLogOutCTA: displayLogInOrLogOutCTA,
		animateScrollToContent: animateScrollToContent
	};
}(jQuery))

export {
	DOMManipulationController
}