import 'jquery';

import { authenticationController } from "./userControllers/authenticationController";
import { currentUserController } from "./userControllers/currentUserController";

import { DOMEventHandlerController } from "./DOMController/DOMEventHandlerController";


function menuController() {
	$('#navigation_btn-home').click(function(e) {
		e.preventDefault();
		DOMEventHandlerController.buttonClickEventHandler('../../views/home.html .wrapper');
		DOMEventHandlerController.unloadEventHandler();
	});
	$('#navigation_btn-register').click(function(e) {
		e.preventDefault();
		DOMEventHandlerController.buttonClickEventHandler('../../views/registerView.html .wrapper', [authenticationController.register]);
		DOMEventHandlerController.unloadEventHandler();
	});
	$('#navigation_btn-log-in-out').click(function(e){
		e.preventDefault();
		if($('#link-log-in-out').attr('data-info') === 'log-in') {
			DOMEventHandlerController.buttonClickEventHandler('../../views/logInView.html .wrapper', [authenticationController.logIn]);	
		} else {
			DOMEventHandlerController.buttonClickEventHandler('../../views/home.html', [authenticationController.logOut]);
		}
	});
	$('#navigation_btn-find-trips').click(function(e){
		e.preventDefault();
		DOMEventHandlerController.buttonClickEventHandler('../../views/findTripsView.html .wrapper');
	});
};


export { menuController }