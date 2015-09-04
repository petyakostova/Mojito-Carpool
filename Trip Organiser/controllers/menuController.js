import 'jquery';

import { authenticationController } from "./userControllers/authenticationController";
import { currentUserController } from "./userControllers/currentUserController";

import { DOMEventHandlerController } from "./DOMController/DOMEventHandlerController";
import { DOMManipulationController } from "./DOMController/DOMManipulationController";

import { tripController } from "./tripControllers/tripController";


function menuController() {
	
	$('.menu__list__item').each(function(){
		$(this).click(function(e){
			var partialViewPath = '../../views/' + ($(this).attr('view')) + 'View.html';
			e.preventDefault();
			
			switch($(this).attr('view')) {
				case ('home'): DOMEventHandlerController.menuButtonClick(partialViewPath, [DOMManipulationController.displayLatestTrips]); break;
				case ('register'): DOMEventHandlerController.menuButtonClick(partialViewPath, [authenticationController.register]); break;
				case ('logIn'): DOMEventHandlerController.menuButtonClick(partialViewPath, [authenticationController.logIn]); break;
				case ('logOut'): DOMEventHandlerController.menuButtonClick('../../views/homeView.html', [authenticationController.logOut, DOMManipulationController.displayLatestTrips]); break;
				case ('findTrips'): DOMEventHandlerController.menuButtonClick(partialViewPath, [tripController.findTrips]); break;
				case ('myProfile'): DOMEventHandlerController.menuButtonClick(partialViewPath, [DOMManipulationController.displayCurrentUserProfile]);	
			}
		});
	});
};


export { menuController }