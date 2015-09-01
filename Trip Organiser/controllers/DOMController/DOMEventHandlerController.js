import 'jquery'
import { globals } from 'globals.js';

import { DOMManipulationController } from './DOMManipulationController.js'

import { currentUserController } from './../userControllers/currentUserController.js'

var DOMEventHandlerController = (function($){
	var DOMEventHandlerController = {};
	
	DOMEventHandlerController.buttonClickEventHandler = function(viewPath, methodDelegates) {
		function scrollToTopEventListener() {
			$('.scroll').click(function(){
				$('body').animate({scrollTop: 0}, 400);
			})
		}
		var $container = $('.container');
		
		if($(document).scrollTop() < ($('.header').height() / 2)) {
			DOMManipulationController.scrollToContent();
		}
		
		$container.load(viewPath, function(){
			if(methodDelegates) {
				for(var m in methodDelegates) {
					methodDelegates[m]();
				}
			}
			
			return false;
		});
	}
	
	DOMEventHandlerController.editImageButtonClickEventHandler = function() {
		$('.profile__image__edit').click(function(e){
			$('.profile_upload-image').toggleClass('profile_upload-image-clicked');
		});
	}
	
	DOMEventHandlerController.uploadImageButtonClickEventHandler = function() {
		$('input[type="file"]').change(function(){
			readImage(this);
		});
		
		function readImage(input) {
			var fileType,
				fileReaderResult, fileBase64,
				fileReader = new FileReader();
			
			if (input.files && input.files[0]) {
				fileReader.onload = function(e) {
					fileReaderResult = fileReader.result;
					fileBase64 = fileReaderResult.split(',').pop();				
					fileType = input.files[0].type;
					uploadFile(fileType, fileBase64)
				};
				
				fileReader.readAsDataURL( input.files[0] );
			}
		}
		
		function uploadFile(fileType, fileBase64) {
			var fileName = $('input[type=file]').val().replace(/C:\\fakepath\\/i, ''),
				file = {
					"Filename": fileName,
					"ContentType": fileType,
					"base64": fileBase64
				}
			
			$('.profile_upload-image').submit(function(e){
				e.preventDefault();
				$.ajax({
					type: "POST",
					url: 'https://api.everlive.com/v1/FzvrWJlpUwPSsEBL/Files',
					contentType: "application/json",
					data: JSON.stringify(file),
					success: function(){
						DOMManipulationController.displayUploadMessage('success');
						
						var query = new Everlive.Query();
						
						query.select('Filename', fileName);
						globals.everlive.Files.get(query)
							.then(function(data){
								return data.result;
							})
							.then(function(images){
								for(var i in images) {
									if(images[i].Filename === fileName) {
										return images[i].Id;
									};
								}
							})
							.then(function(imageId) {
								currentUserController.uploadProfileImage(imageId);
							}),
							function(error){
								alert(JSON.stringify(error));
							};
					},
					error: function(){
						DOMManipulationController.displayUploadMessage('error');
					}
				})
			});
		}
	}
	
	DOMEventHandlerController.wantPaymentChangeEventHandler = function() {
		$('input[type="checkbox"]').change(function(e) {
			if($('input[type="checkbox"]').is(':checked')) {
				$('#typeOfPaymentInput').prop('disabled', false);
			} else {
				$('#typeOfPaymentInput').prop('disabled', true);
			}
		});
	}
	
	DOMEventHandlerController.unloadEventHandler = function() {
		
	}
	
	return DOMEventHandlerController;
}(jQuery));

export { 
	DOMEventHandlerController
}