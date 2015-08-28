import 'jquery';

var user = (function($){
	
	function isValidUsername(value) {
		return /^[A-Za-z0-9]{4,30}$/g.test(value);
	}
	
	function isValidPassword(value) {
		return /^[A-Za-z0-9]{8,30}$/g.test(value);
	}
	
	function isValidEmail(value) {
		return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
	}
	
	function isValidName(value) {
		return /^[A-Za-z]{2,20}$/g.test(value)
	}
	
	function isValidAge(value) {
		return +(value) >= 16 && +(value) <= 122;
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
			
		},
		displayInvalidEmailMessege: function() {
			var $inputField = $('#emailInput'),
				$invalidDataAlertMessege = "Email must be a valid addres (example@mail.com).",
				$invalidDataAlert = $.parseHTML('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning!</strong> ' + $invalidDataAlertMessege + '</div>');
				
			$inputField.after($invalidDataAlert);
			setTimeout(function() {
				$('.alert').fadeOut(300);
			}, 5000);
		},
		displayInvalidAgeMessege: function() {
			var $inputField = $('#ageInput'),
				$invalidDataAlertMessege = "You must be over 16 to register for this site. And we know pretty damn well you're not older than 122, you joker.",
				$invalidDataAlert = $.parseHTML('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning!</strong> ' + $invalidDataAlertMessege + '</div>');
				
			$inputField.after($invalidDataAlert);
			setTimeout(function() {
				$('.alert').fadeOut(300);
			}, 5000);
		},
		displayInvalidDataMessage: function($inputField, typeofData, range, typeofSymbols) {
			var $invalidDataAlertMessege = typeofData + " must be between " + range[0] + " and " + range[1] + " symbols and must contain " + typeofSymbols,
				$invalidDataAlert = $.parseHTML('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning!</strong> ' + $invalidDataAlertMessege + '</div>');
				
			$inputField.after($invalidDataAlert);
			setTimeout(function() {
				$('.alert').fadeOut(300);
			}, 5000);
		}
	}
	
	Object.defineProperties(user, {
		username: {
			get: function() {
				return this._username;
			},
			set: function(value) {
				if(isValidUsername(value)) {
					this._username = value;
				} else {
					this.displayInvalidDataMessage($('#usernameInput'), "Username", [4,30], ['characters', ' numbers', ' or special symbols as !@#$%^&*.']);
				}
			}
		},
		email: {
			get: function() {
				return this._email;
			},
			set: function(value) {
				if(isValidEmail(value)) {
					this._email = value;
				} else {
					this.displayInvalidEmailMessege();
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
					this.displayInvalidDataMessage($('#passwordInput'), "Password", [8,30], ["characters", " numbers", " or special symbols !@#$%^&*."]);
					this.displayInvalidDataMessage($('#repeatPasswordInput'), "Password", [8,30], ["characters", " numbers", " or special symbols !@#$%^&*."]);
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
					this.displayInvalidDataMessage($('#firstNameInput'), "First name", [2,20], [" characters only."]);
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
					this.displayInvalidDataMessage($('#lastNameInput'), "Last name", [2,20], [" characters only."]);
				}
			}
		},
		age: {
			get: function() {
				return this._age;
			},
			set: function(value) {
				if(isValidAge(value)) {
					this._age = value;
				} else {
					this.displayInvalidAgeMessege();
				}
			}
		},
		city: {
			get: function() {
				return this._city;
			},
			set: function(value) {
				if(isValidName(value)){
					this._city = value;
				} else {
					this.displayInvalidDataMessage($('#cityInput'), "City ", [2,20], ["characters only."]);
				}
			}
		}
	});
	
	user.displayInvalidPasswordMessege = function($inputField) {
		var $invalidDataAlertMessege = "Passwords do not match. Please re-enter!",
			$invalidDataAlert = $.parseHTML('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning!</strong> ' + $invalidDataAlertMessege + '</div>');
			
		$inputField.after($invalidDataAlert);
		setTimeout(function() {
			$('.alert').fadeOut(300);
		}, 5000);
	}
	
	return user;
}(jQuery));

export { user };