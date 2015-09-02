import 'jquery';

import { DOMEventHandlerController } from './../DOMController/DOMEventHandlerController';
import { DOMManipulationController } from './../DOMController/DOMManipulationController';

import './../../modules/trip/tripModule.js';
import { dbController } from './../databaseController.js';

var tripController = (function($){
	var tripController = {};

	tripController.findTrips = function() {
		function displayTrips() {

		}

		function searchTrips() {

		}


		$('.btn__redirect').click(function(){
			DOMEventHandlerController.loadPartialView('../views/createTripView.html', [tripController.createTrip]);
		});

	};

	tripController.createTrip = function() {
		$('.create_input-submit').click(function() {

			dbController.addTo('Trip', {
				TypeOfPayment: 'ho'
			});
		});

		DOMEventHandlerController.wantPaymentChangeEventHandler();
	};


	return tripController;
}(jQuery));

export { tripController }
