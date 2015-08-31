var trip = (function(){
	var trip = {
		init: function(startingPoint, startingPointLocation, endingPoint, endingPointLocation,
			date, wantPayment, typeOfPayemnt) {
				this.startingPoint = startingPoint;
				this.startingPointLocation = startingPointLocation;
				this.endingPoint = endingPoint;
				this.endingPointLocation = endingPointLocation;
				this.date = date;
				this.wantPayment = wantPayment || false;
				this.typeOfPayment = typeOfPayemnt || 'None';
				
				return this;
			}
	}
	Object.defineProperties(trip, {
		startingPoint: {
			get: function() {
				return this._startingPoint;
			},
			set: function(value) {
				this._startingPoint = value;
			}
		},
		startingPointLocation: {
			get: function() {
				return this._startingPointLocation;
			},
			set: function(value) {
				this._startingPointLocation = value;
			}
		},
		endingPoint: {
			get: function() {
				return this._endingPoint;
			},
			set: function(value) {
				this._endingPoint = value;
			}
		},
		endingPointLocation: {
			get: function() {
				return this._endingPointLocation;
			},
			set: function(value) {
				this._endingPointLocation = value;
			}
		},
		date: {
			get: function() {
				return this._date;
			},
			set: function(value) {
				this._date = value;
			}
		},
		wantPayment:{
			get: function() {
				return this._wantPayemnt;
			},
			set: function(value) {
				this._wantPayment = value;
			} 
		},
		typeOfPayment: {
			get: function() {
				return this._typeOfPayment;
			},
			set: function(value) {
				this._typeOfPayment = value;
			}
		}
	});
	
	return trip;
}());

export { trip }