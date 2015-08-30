import 'jquery';
import { authenticationController } from "./userControllers/authenticationController"
import { DOMEventHandlerController } from "./DOMController/DOMEventHandlerController";


function menuController() {
	$('#home').click(function(e) {
		e.preventDefault();
		DOMEventHandlerController.buttonClickEventHandler('../../views/home.html .wrapper');
		DOMEventHandlerController.unloadEventHandler();
	});
	$('#register').click(function(e) {
		e.preventDefault();
		DOMEventHandlerController.buttonClickEventHandler('../../views/registerView.html .wrapper', [authenticationController.register]);
		DOMEventHandlerController.unloadEventHandler();
	});
	$('#log-in').click(function(e){
		e.preventDefault();
		DOMEventHandlerController.buttonClickEventHandler('../../views/logInView.html .wrapper', [authenticationController.logIn]);
		
	});
};


export { menuController }