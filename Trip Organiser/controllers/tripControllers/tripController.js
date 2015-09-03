import 'jquery';

import { DOMEventHandlerController } from './../DOMController/DOMEventHandlerController';
import { DOMManipulationController } from './../DOMController/DOMManipulationController';

import { globals } from 'globals.js';

import { trip } from './../../modules/trip/tripModule.js';
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
		DOMEventHandlerController.wantPaymentCheckboxChange();
		
		$('.form__field__input--type-submit').click(function(e) {
			var startingPoint = $('#input--starting-point').val(),
				startingPointGeoLocationLng = +($('#input--starting-point-coords').val().split(',').pop()),
				startingPointGeoLocationLat = +($('#input--starting-point-coords').val().split(',').shift()),
				startingPointGeoLocation = {"latitude" : startingPointGeoLocationLat, "longitude" : startingPointGeoLocationLng },
				endingPoint = $('#input--ending-point').val(),
				endingPointGeoLocationLng = +($('#input--ending-point-coords').val().split(',').pop()),
				endingPointGeoLocationLat = +($('#input--ending-point-coords').val().split(',').shift()),
				endingPointGeoLocation = {"latitude": endingPointGeoLocationLat, "longitude" : endingPointGeoLocationLng },
				date = $('#input--date').val(),
				wantPayment = $('#input--want-payment').is(':checked'),
				typeOfPayment = $('#input--typeof-payment').val(),
				numberOfSeats = $('#input--numberof-seats').val(),
				additionalInformation = $('#input--additional-info').val();
			
			var newTrip = Object.create(trip).init(startingPoint, startingPointGeoLocation, endingPoint, endingPointGeoLocation,
								date, wantPayment, typeOfPayment, numberOfSeats, additionalInformation);
			e.preventDefault();
			console.log(newTrip);
			dbController.addDataType('Trip', 
				{
					StartingPoint: newTrip.startingPoint,
					StartingPointLocation: startingPointGeoLocation,
					EndingPoint: newTrip.endingPoint,
					EndingPointLocation: endingPointGeoLocation,
					Date: newTrip.date,
					WantPayment: newTrip.wantPayment,
					TypeOfPayment: newTrip.typeOfPayment,
					FreeSeats: newTrip.numberOfSeats,
					AdditionalInformation: newTrip.additionalInfromation
				}, function(data){
					console.log(JSON.stringify(data));
				});
		});
	};


	return tripController;
}(jQuery));

export { tripController }
