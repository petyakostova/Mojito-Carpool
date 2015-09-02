import 'jquery';

import { DOMEventHandlerController } from './../DOMController/DOMEventHandlerController';
import { DOMManipulationController } from './../DOMController/DOMManipulationController';
var tripController = (function($){
	var tripController = {};
	
	tripController.findTrips = function() {
		function displayTrips() {
			
		}
		
		function searchTrips() {
			
		}
		
		
		$('.btn__redirect').click(function(){
			DOMEventHandlerController.redirectButtonClick('../views/createTripView.html', [tripController.createTrip]);
		});
	}
	
	tripController.createTrip = function() {
		DOMEventHandlerController.wantPaymentChangeEventHandler();
	}
	
	return tripController;
}(jQuery))

export { tripController }