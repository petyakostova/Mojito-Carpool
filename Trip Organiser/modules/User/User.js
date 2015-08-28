import 'jquery';

var user = (function(){
	function isValidName(value) {
		return /^[A-Za-z]{2,20}$/g.test(value)
	}
	
	function isValidPassword(value) {
		return /^[A-Za-z0-9]{8,30}$/g.test(value);
	}
	
	function isValidEmail(value) {
		return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
	}
	
	function isValidAge(value) {
		return +(value) >= 18 && +(value) <= 122;
	}
	
	function displayInvalidDataMessage($inputField, typeofData, range, typeofSymbols) {
		console.log('tuk');
		var $invalidDataAlert = $.parseHTML('div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning</strong></div>'),
			$invalidDataAlertMessege = typeofData + " must be between " + range[0] + " and " + range[1] + 
					" symbols and must contain " + typeofSymbols;
			
			$invalidDataAlert.text($invalidDataAlertMessege);
			$inputField.insertAfter($invalidDataAlert);
	}
	var user = {
		init: function(username, email, password, firstName, lastName, age, city) {
			this.username = username;
			this.email = email;
			this.password = password;
			this.firstName = firstName;
			this.lastName = lastName;
			this.age = age;
			this.city = city;
			
			return this;
		},
		createTrip: function() {
			
		}
	}
	
	Object.defineProperties(user, {
		username: {
			get: function() {
				return this._username;
			},
			set: function(value) {
				if(isValidName(value)) {
					this._username = value;
				}
			}
		},
		email: {
			get: function() {
				return this._email;
			},
			set: function(value) {
				if(isValidEmail) {
					this._email = value;
				} else {
					
				}
			}
		},
		password: {
			get: function() {
				return this._password;
			},
			set: function(value) {
				if(isValidPassword(value)) {
					this._password = value;
				} else {
					displayInvalidDataMessage("Password", [8,30],
											 [" characters", " numbers", " and/or special symbols (!@#$%^&*)"]);
				}
			}
		},
		firstName: {
			get: function() {
				return this._firstName;
			},
			set: function(value) {
				if(isValidName(value)) {
					this._firstName = value;
				} else {
					console.log('tuk31');
					displayInvalidDataMessage($('#firstNameInput'), "First name", [2,20], [" characters only"]);
				}
			}
		},
		lastName: {
			get: function() {
				return this._lastName;
			},
			set: function(value) {
				if(isValidName(value)) {
					this._lastName = value;
				} else {
					displayInvalidDataMessage("Last name", [2,20], [" characters only"])
				}
			}
		},
		age: {
			get: function() {
				return this._age;
			},
			set: function(value) {
				this._age = value;
			}
		},
		city: {
			get: function() {
				return this._city;
			},
			set: function(value) {
				this._city = value;
			}
		}
	});
	
	return user;
}());

export { user };