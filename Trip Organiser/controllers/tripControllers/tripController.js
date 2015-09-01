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
		
		
		$('#redirect_btn').click(function(){
			DOMEventHandlerController.buttonClickEventHandler('../views/createTripView.html', [tripController.createTrip]);
		});
	}
	
	tripController.createTrip = function() {
		DOMEventHandlerController.wantPaymentChangeEventHandler();
	}
	
	return tripController;
}(jQuery))

export { tripController }