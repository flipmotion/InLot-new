//use strict mode;
'use strict';
import owlCarousel from '../owl.carousel.min.js';
import thumbs from '../owl.carousel2.thumbs.min.js';

$(document).ready( function() {
	//tooltips
	
	$(function () {
		var options = {
			trigger: 'click'
		};
		$('[data-toggle="tooltip"]').tooltip(options);
	})
	//phone number

	$('[data-item="phone"]').mask("+7 (999) 999-99-99");
	//show tabs in registration
	$('#registration label').click(function (e) {
		$(this).tab('show');
	});
	/* select */
	var select = $('[data-item="select"]');
	select.select2({theme: "bootstrap"});
	/* select END*/
	/*header*/
	$('[data-hover="dropdown"]').hover(
		function() {
			$(this).dropdown('toggle');
			$(this).next().next().stop(true, true).attr('data-hovered',true);
			$('[data-hovered="true"]').hover(
				function() {
					$(this).stop(true, true).attr('data-hovered',false);
				},
				function() {
					$(this).stop(true, true).delay(200).parent('.dropdown').removeClass('open');
				}
				);
		},
		function() {
			
		}
		);
	//sliders
	let owlMain = $('[data-item="slider-main"]');
	owlMain.owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots:true,
		items:1,
		autoplayHoverPause: true,
		autoplayTimeout: 5000,
		autoplay:true,
		navText: [
		"<i class='fa fa-angle-left'></i>", 
		"<i class='fa fa-angle-right'></i>"
		],
		dots: true
	});
	//sliders end
	
	/*header END*/
	var Settings = {
		ValidationOptions: {
			framework: 'bootstrap',
			/*err: {
				container: function($field, validator) {
					return $field.next('.validation-right-inner');
				}
			},*/
			locale: 'ru_RU',

			fields: {
				userCity: {
					trigger: 'blur keyup focus',
					validators: {
						// The validator will create an Ajax request
						// sending { username: 'its value' } to the back-end
						// колбэк если нужно какое-то особое правило но в принцепе не более, в данном случае если value = 2 то error
						callback: {
							message: 'if script wrong test',
							callback: function(value, validator, $field) {
								if(value == 2) {
									return false;
								}
								return true;
							}
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				DIMENSIONS: {
					trigger: 'blur keyup focus',
					validators: {
						// The validator will create an Ajax request
						// sending { username: 'its value' } to the back-end
						// колбэк если нужно какое-то особое правило но в принцепе не более, в данном случае если value = 2 то error
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userRegion: {
					trigger: 'blur keyup focus',
					validators: {
						// The validator will create an Ajax request
						// sending { username: 'its value' } to the back-end
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userAddress: {
					trigger: 'blur keyup focus',
					validators: {
						// The validator will create an Ajax request
						// sending { username: 'its value' } to the back-end
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				companyName: {
					trigger: 'blur keyup focus',
					validators: {
						// The validator will create an Ajax request
						// sending { username: 'its value' } to the back-end
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userName: {
					trigger: 'blur keyup focus',
					validators: {
						// The validator will create an Ajax request
						// sending { username: 'its value' } to the back-end
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userPhone: {
					trigger: 'blur keyup focus',

					validators: {
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userPassword: {
					trigger: 'blur keyup focus',

					validators: {
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userMail: {
					trigger: 'blur keyup focus',

					validators: {
						emailAddress: {
							message: 'Это не похоже на e-mail!'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userPasswordNew: {
					trigger: 'blur keyup focus',

					validators: {
						stringLength: {
							min: 6,
							message: 'Длина пароля должна быть более 6 символов!'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userPasswordNewConfirm: {
					trigger: 'blur keyup focus',

					validators: {
						identical: {
							field: 'userPasswordNew',
							message: 'Ваши пороли не совпадают!'
						},
						blank: {}
					}
				}
			}
		},

		initialize : function () {
			this.Validation('.Settings');
		},
		Validation:function(form){
			$(form).formValidation(this.ValidationOptions).on('success.form.fv', function(e) {
				e.preventDefault();
				var $form = $(e.target),
				fv = $form.data('formValidation');
				// For demonstrating purpose, the url is generated randomly
				// to get different response each time
				// In fact, it should be /path/to/your/back-end/
				var url = ['response.json'];
				$.ajax({
					url: url,
					data: $form.serialize(),
					dataType: 'json'
				}).success(function(response) {
				// If there is error returned from server
				if (response.result === 'error') {
					for (var field in response.fields) {
						fv
								// Show the custom message
								.updateMessage(field, 'blank', response.fields[field])
								// Set the field as invalid
								.updateStatus(field, 'INVALID', 'blank');
							}
						} else {
						// Do whatever you want here
						// such as showing a modal ...
					}
				});
			});
			$(form).find(select).select2({theme: "bootstrap"})
			.change(function(e) {
				console.log(e.target.name);
				$(form).formValidation('revalidateField', e.target.name);
			})
			.end();

			$(form)
			.find('[data-input="file"]').fileinput({
				uploadUrl: 'url',
				allowedFileExtensions: ["jpg", "png", "gif"],
				minImageWidth: 50,
				minImageHeight: 50
			})
			.on('fileloaded', function(event, file, previewId, index, reader) {
				console.log(event.target.name);
				$(form).formValidation('revalidateField', event.target.name);
				console.log(file);
			})
			.end()
			.find('[data-input="file"]').fileinput({
				uploadUrl: 'url',
				allowedFileExtensions: ["jpg", "png", "gif"],
				minImageWidth: 50,
				minImageHeight: 50
			})
			.on('change', function(e) {
				console.log(e.target.name);
				$(form).formValidation('revalidateField', e.target.name);
			})
			.end()
			.find('[data-input="file"]').fileinput({
				uploadUrl: 'url',
				allowedFileExtensions: ["jpg", "png", "gif"],
				minImageWidth: 50,
				minImageHeight: 50
			})
			.on('fileclear', function(event) {
				console.log(event.target.name);
				$(form).formValidation('revalidateField', event.target.name);
			})
			.end();
		}
	};
	var Registration = {
		ValidationOptions: {
			framework: 'bootstrap',

			err: {
				container: function($field, validator) {
					return $field.next('.validation-right-inner');
				}
			},

			locale: 'ru_RU',

			icon: {
				valid: 'fa fa-check-circle-o',
				invalid: 'fa fa-times-circle-o',
				validating: 'fa fa-refresh'
			},

			fields: {
				companyName: {
					trigger: 'blur keyup focus',

					validators: {
						// The validator will create an Ajax request
						// sending { username: 'its value' } to the back-end
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						remote: {
							message: 'Данное Имя уже используется!',
							url: 'hendler.php',
							type: 'POST',
							delay: 2000
						}
					}
				},
				userName: {
					trigger: 'blur keyup focus',

					validators: {
						// The validator will create an Ajax request
						// sending { username: 'its value' } to the back-end
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						remote: {
							message: 'Данное Имя уже используется!',
							url: 'hendler.php',
							type: 'POST',
							delay: 2000
						}
					}
				},
				userLogin: {
					trigger: 'blur keyup focus',

					validators: {
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						}
					}
				},
				userMail: {
					trigger: 'blur keyup focus',

					validators: {
						emailAddress: {
							message: 'Это не похоже на e-mail!'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						}
					}
				},
				userPhone: {
					trigger: 'blur keyup focus',

					validators: {
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						}
					}
				},
				userPassword: {
					trigger: 'blur keyup focus',

					validators: {
						stringLength: {
							min: 6,
							message: 'Длина пароля должна быть более 6 символов!'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						}
					}
				},
				userPasswordConfirm: {
					trigger: 'blur keyup focus',

					validators: {
						identical: {
							field: 'userPassword',
							message: 'Ваши пороли не совпадают!'
						}
					}
				}
			}
		},

		initialize : function () {
			this.Validation('.Registration-form');
		},
		Validation:function(form){
			$(form).on('init.field.fv', function(e, data) {
				var $parent = data.element.parents('.form-group'),
				$icon   = data.element.data('fv.icon'),
				$label  = $parent.find('.validation-right-inner .error-icon');

				$icon.appendTo($label);
			})
			.formValidation(this.ValidationOptions);
		}
	};

	var TogglePassword = {

		initialize: function () {
			this.chengeType();
			this.toggleGlass();
		},
		toggleGlass: function(){
			$('.toggle-password').on('click', function(e){
				$(this).toggleClass('fa-eye-slash fa-eye');
			});
		},

		chengeType: function () {
			$('.toggle-password').on('click', function(e){
				var input = $(this).parent().find('input'),
				checkType = input.attr('type');

				if(checkType === 'password') {
					input.attr('type', 'text');
				}
				else {
					input.attr('type', 'password');
				}

			});
		}
	}

	/*init libs*/
	Settings.initialize();
	Registration.initialize();
	TogglePassword.initialize();

	var Category = {
		that: function(e){
			var val = +this.value;
			var cat = this.name;
			switch (cat){
				case 'category':
					//check all disabled
					var subcategory = $('[data-item="subcategory"]').find('input');
					var subsubcategory = $('[data-item="subsubcategory"]').find('input');

					for (var i = 0; subcategory.length > i; i++){
						subcategory[i].checked = false;
					}
					for (var i = 0; subsubcategory.length > i; i++){
						subsubcategory[i].checked = false;
					}
					//need fix this shot;
					$('[data-item="subcategory"]').addClass('hidden');
					$('[data-item="subsubcategory"]').addClass('hidden');

					$('[data-item="subcategory"]')[val].classList.remove('hidden');

					break;
					case 'subcategory':
					//check all disabled
					var subsubcategory = $('[data-item="subsubcategory"]').find('input');
					
					for (var i = 0; subsubcategory.length > i; i++){
						subsubcategory[i].checked = false;
					}
					//need fix this shot;
					$('[data-item="subsubcategory"]').addClass('hidden');
					$('[data-item="subsubcategory"]')[val].classList.remove('hidden');

					break;
					case 'subsubcategory':
					break;
				}
			},
			category: function(){
				var category = $('[data-item="category"]');
				var form = $('[data-item="add-item-stage-1"]');

				form.find('input').on('change', this.that);

				form.on('submit',function(e){
					e.preventDefault();
				});
			},
			initialize: function () {
				this.category();
			}
		}

		Category.initialize();

		$('.btn-file').find('button').on('click',function(e){
			$(this).next('[data-item="photo"]').click();
		});

	//simple file preview manipulations
	var imagesPreview = function(input, placeToInsertImagePreview) {
		if (input.files) {
			var filesAmount = input.files.length;
			if(filesAmount >= 1){
				for (var i = 0; i < filesAmount; i++) {
					var file = input.files[i];
					setUp(placeToInsertImagePreview,file);
				}
				var list = $('.wrap-img').length;
				$('.wrap-img').append('<div class="del"></div>');
				var inputHidden = $($.parseHTML('<input type="hidden" class="hidden">')).attr('value', window.URL.createObjectURL(file));
				$(inputHidden).appendTo('.wrap-img');
				$('.del').on('click',function(e){
					$(this).parent('.wrap-img').remove();
					var list = $('.wrap-img').length;
					if(list <= 0) {
						placeholdIt(placeToInsertImagePreview);
					}
					calc();
				});
			}
			else {
				placeholdIt(placeToInsertImagePreview);
			}
		}
	};
	function setUp(place,file) {
		var img = $($.parseHTML('<img>')).attr('src', window.URL.createObjectURL(file));
		img.onload = function(e){
			window.URL.revokeObjectURL(this.src);
		}
		
		img.appendTo(place).wrap("<div class='wrap-img' data-title="+file.name.replace(/\s/g, '&nbsp;').replace('—', '-')+"></div>").addClass('loadedimg');
		$(place).find('.no-photo').remove();
		$(place).addClass('when-upload-photo');
		$(place).removeClass('when-no-photo');
	}

	function placeholdIt(place) {
		$(place).removeClass('when-upload-photo');
		$(place).addClass('when-no-photo');
		$(place).html('<div class="no-photo"><img src="http://placehold.it/200x200"></div>');
	}
	$('[data-item="photo"]').on('change', function() {
		$('div.photo-upload-container.one').html(' ');
		imagesPreview(this, 'div.photo-upload-container.one');
	});

	//file upload trying
	$('[data-input="file"]').fileinput({
		uploadUrl: 'url',
		allowedFileExtensions: ["jpg", "png", "gif"],
		minImageWidth: 50,
		minImageHeight: 50
	});
});
