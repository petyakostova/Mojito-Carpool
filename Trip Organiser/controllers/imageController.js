import 'jquery';

import { globals } from "globals";

var imageController = (function($){
	
	function readImage (input) {
		var fileType,
			fileReaderResult, fileBase64,
			fileReader = new FileReader();
		
		if (input.files && input.files[0]) {
			fileReader.onload = function(e) {
				fileReaderResult = fileReader.result;
				fileBase64 = fileReaderResult.split(',').pop();				
				fileType = input.files[0].type;
				imageController.uploadImage(fileType, fileBase64)
			};
			
			fileReader.readAsDataURL( input.files[0] );
		}
	}
	
	function uploadImage (fileType, fileBase64) {
			var fileName = $('input[type=file]').val().replace(/C:\\fakepath\\/i, ''),
				file = {
					"Filename": fileName,
					"ContentType": fileType,
					"base64": fileBase64
				},
				query = new Everlive.Query();
			
			$('.form__upload').submit(function(e){
				console.log('click');
				e.preventDefault();
				$.ajax({
					type: "POST",
					url: 'https://api.everlive.com/v1/FzvrWJlpUwPSsEBL/Files',
					contentType: "application/json",
					data: JSON.stringify(file),
					success: function(){
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
								globals.everlive.Users.currentUser()
									.then(function(data){
										return data.result
									})
									.then(function(currentUser){
										globals.everlive.Users.updateSingle({"Id": currentUser.Id, "Image": imageId},
											function(data){
												console.log(JSON.stringify(data));
											},
											function(err){
												console.log(JSON.stringify(err));
											});
									});
							}),
							function(error){
								alert(JSON.stringify(error));
							};
					},
					error: function(){
					}
				})
			});
		};
		
	return {
		readImage: readImage,
		uploadImage: uploadImage
	};
}(jQuery));

export { imageController }