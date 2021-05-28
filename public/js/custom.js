function blockUI()
{
	$.blockUI({
		message: '<h1><i class="fas fa-stroopwafel fa-spin" style="color: #004B7B; font-size: 40px;" ></i></h1>',
		overlayCSS: {
			backgroundColor: '#1b2024',
			opacity: 0.3,
			zIndex: 999999,
			cursor: 'wait'
		},
		css: {
			border: 0,
			color: '#fff',
			padding: 0,
			zIndex: 9999999,
			backgroundColor: 'transparent'
		}
	});
}

function formValidation(formID)
{
	$( "#"+formID ).validate({
		errorElement: "em",
		errorPlacement: function ( error, element ) {
			$(element).addClass("is-invalid");

		},
		success: function ( label, element ) {
			$(element).removeClass("is-invalid");
		}
	});

	if($( "#"+formID ).valid())
	{
		return true;
	}
	else
	{
		return false;
	}
}

function loadEditor(element_id)
{
	$("#"+element_id).redactor({
		autoresize: false,
		buttonsAdd: ['|', 'button1'],
		buttonsCustom: {
			button1: {
				title: 'Button',
				callback: function()
				{
					callFx();
				}

			}
		}
	});
}

function loadDataTable(element_id, data_source, action_button_arr)
{

}

$.fn.extend({
	treed: function (o) {
		var openedClass = 'oi-minus';
		var closedClass = 'oi-plus';

		if (typeof o != 'undefined'){
			if (typeof o.openedClass != 'undefined'){
				openedClass = o.openedClass;
			}
			if (typeof o.closedClass != 'undefined'){
				closedClass = o.closedClass;
			}
		};

    //initialize each of the top levels
    var tree = $(this);
    tree.addClass("tree");
    tree.find('li').has("ul").each(function () {
            var branch = $(this); //li with children ul
            branch.prepend("<i class='indicator oi " + closedClass + "'></i>");
            branch.addClass('branch');
            branch.on('click', function (e) {
            	if (this == e.target) {
            		var icon = $(this).children('i:first');
            		icon.toggleClass(openedClass + " " + closedClass);
            		$(this).children().children().toggle();
            	}
            })
            branch.children().children().toggle();
        });
    //fire event from the dynamically added icon
    tree.find('.branch .indicator').each(function(){
    	$(this).on('click', function () {
    		$(this).closest('li').click();
    	});
    });
    //fire event to open branch if the li contains an anchor instead of text
    tree.find('.branch>a').each(function () {

    	$(this).on('click', function (e) {
    		$(this).closest('li').click();
    		e.preventDefault();
    	});
    });
    //fire event to open branch if the li contains a button instead of text
    tree.find('.branch>button').each(function () {
    	$(this).on('click', function (e) {
    		$(this).closest('li').click();
    		e.preventDefault();
    	});
    });
    // Filter tree
    $(document).on("keyup","#txtSearchTree",function(){
    	var that = this, $allListElements = $('.tree ul li');
    	var $matchingListElements = $allListElements.filter(function(i, li){
    		var listItemText = $(li).text().toUpperCase(), searchText = that.value.toUpperCase();
    		return ~listItemText.indexOf(searchText);
    	});
    	$allListElements.hide();
    	$matchingListElements.show();
    });
}
});

// menu click
$(function(){
	$(document.body).on('click', "a[rel='tab']" ,function(e){
		return false;
	});
	$(document.body).on('click', "a[rel='tab']" ,function(e){
		e.preventDefault();

		//blockUI();

		var pageurl = $(this).attr('href');
		var img_path = 'images/loader.gif';
        //to get the ajax content and display in div with id 'content'
        $.ajax({
        	async: true,
        	type:'get',
        	url:pageurl,
        	beforeSend: function () {
        		blockUI();
        	},
        	success: function (data) {
        		$('#page-content').html(data);

        	},
        	complete: function (data) {

        		$.unblockUI();
        	}
        });

        //to change the browser URL to the given link location
        if(pageurl!=window.location){
        	window.history.pushState({path:pageurl},'',pageurl);
        }
        //stop refreshing to the page given in
        return false;
    });

	$(window).bind('popstate', function() {
		blockUI();
		$.ajax({
			async: false,
			type:'get',
			url:window.location,
			beforeSend: function () {
				blockUI();
			},
			success: function(data){
				$.unblockUI();
				$('#page-content').html(data);
			}
		});
	});

	window.onpopstate = function(event) {
		location.reload();
	}
});

$(document).on('click','.open-modal', function ()
{
	var id     = $(this).attr("data-id");
	var action = $(this).attr("data-action");
	var title  = $(this).attr("data-title");
	var modal  = $(this).attr("data-modal");

	$.ajax({
		async: true,
		url: action,
		data: { id:id},
		type: "get",
		beforeSend: function() {
			blockUI();
			$('.'+modal).modal('show');
			$('.'+modal+' .modal-body').html("<i class='fas fa-stroopwafel fa-spin'></i>");
			$('.'+modal+' .modal-title').html(title);
		},
		success: function (data) {
			$('.'+modal+' .modal-body').html(data);
		},
		complete: function (data) {
			$.unblockUI();
		}

	});
});
$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
});

function isAModalOpen() {
	return $('.modal.in').length > 0;
}

var dynamicFunc = {
	afterSaveModal: function(responseAction, modalClass, modalTitle)
	{
		if(responseAction !="")
		{
			$.ajax({
				async: false,
				url: responseAction,
				type: "get",
				beforeSend: function() {
					blockUI();
					if(isAModalOpen)
						$('.modal').modal('hide');

					$('.'+modalClass).modal('show');

					if(modalClass != "")
						$('.' + modalClass).addClass(modalClass);
					$('.'+ modalClass+' .modal-title').html(modalTitle);
					$('.'+ modalClass+' .modal-body').html("");
				},
				success: function (data) {
					$('.'+ modalClass+' .modal-body').html(data);
				},
				complete: function (data) {
					$.unblockUI();
				}
			});
		}
	},
	afterSaveLoadList: function(responseAction)
	{
		if(responseAction != "")
		{
			$.ajax({
				async: false,
				url: responseAction,
				type: "post",
				beforeSend: function() {
					blockUI();
					//$('.data-table').DataTable().destroy();
				},
				success: function (data) {
					$('#page-content').html(data);
				},
				complete: function (data) {
					$.unblockUI();
				}
			});
		}
	},
	afterSaveLoadPage: function(responseAction)
	{
		if(responseAction != "")
		{
			$.ajax({
				async: false,
				url: responseAction,
				type: "get",
				success: function (data) {
					$('#page-content').html(data);
				}
			});
		}
	}
};

function btnSaveUpdate(thisElement, customFunc='', responesUrl='', modalClass='', modalTitle='', callback="", callbackparam="")
{
	event.preventDefault();
	var formID      = $(thisElement).parents("form").attr("id");
	var formAction  = $(thisElement).parents("form").attr("action");
	var formMethod  = $(thisElement).parents("form").attr("method");
	var formData = $('#'+formID).serializeArray()
	if ($(thisElement).data('form-finalization-ind')) {
		formData.push({ name: 'form_finalization_ind', value: 1 })
	}
	if(formValidation(formID) == false)
	{
		return;
	}

	if(confirm("Are You Sure?"))
	{
		$.ajax({
			async: true,
			data: formData,
			url: formAction,
			type: formMethod,
			beforeSend:function(){
				if(customFunc == ""){
					if(isAModalOpen)
						$('.modal').modal('hide');


				}
				blockUI();
			},
			success: function (data) {
				if(customFunc == ""){
					if(data.title == 'Success')
					{
						$('.common-modal-notify').modal('show');
						$('.common-modal-notify .modal-body').html("<i class='fas fa-stroopwafel fa-spin'></i>");
						$('.common-modal-notify .modal-title').html(data.title);
						$('.common-modal-notify .modal-body').html(data.msg);
					}
				}
				else
				{

					var response_url = responesUrl+"/"+data.insert_id;
					if( typeof data.sl !=  'undefined'){
						var response_url = responesUrl+"/"+data.insert_id+"/"+data.sl;
					}
					dynamicFunc[customFunc](response_url, modalClass, modalTitle);
				}

				$("#" + formID).find("input, textarea").not('.keep_me').val("");
				$("#" + formID).find("select").not('.keep_me').val("0");

			},
			complete: function(){

			},
			error: function (data) {
				var errors = jQuery.parseJSON(data.responseText).errors;
				error_messages="";
				for (messages in errors) {
					var field_name = $("#"+messages).siblings("label").html();
					error_messages +=  "<div class='alert alert-danger' role='alert'>"+errors[messages]+"</div>";
				}

				$('.common-modal-notify-error').modal('show');
				$('.common-modal-notify-error .modal-title').html("Validation Error");
				$('.common-modal-notify-error .modal-body').html(error_messages);

				$.unblockUI();
			}
		}).done(function() {
			$.unblockUI();
			if(callback != "")
				callback(callbackparam);
		});
	}

	event.stopImmediatePropagation();

}

function btnSaveUpdateUpload(thisElement, customFunc='', responesUrl='', modalClass='', modalTitle='', callback="", callbackparam="")
{
	var formID      = $(thisElement).parents("form").attr("id");
	if(formValidation(formID) == false)
	{
		return;
	}
	if(confirm("Are you sure?"))
	{

		$('#' + formID).unbind().submit(function(e) {
			e.preventDefault();

			var formAction  = $(this).attr("action");
			var formMethod  = $(this).attr("method");
			var formData = new FormData(this);
			var customFunc = $("#save_update").attr("data-func");

			$.ajax({
				type: formMethod,
				url: formAction,
				data: formData,
				cache:false,
				contentType: false,
				processData: false,
				beforeSend:function(){
					if(customFunc == ""){
						if(isAModalOpen)
							$('.modal').modal('hide');

						$('.common-modal-notify').modal('show');
						$('.common-modal-notify .modal-body').html("<i class='fas fa-stroopwafel fa-spin'></i>");
					}
					blockUI();
				},
				success: (data) => {
					var response_url = $("#save_update").attr("data-response-url") + "/"+data.insert_id;
					dynamicFunc.afterSaveModal(response_url, "common-modal-sm", "Patient Card");

					$(this).find("input, textarea").not('.keep_me').val("");
					$(this).find("select").not('.keep_me').val("0");
				},
				error: function(data){
					console.log(data);
				},
				complete: function(){
					$.unblockUI();

				},
				error: function (data) {
					var errors = jQuery.parseJSON(data.responseText).errors;
					error_messages="";
					for (messages in errors) {
						var field_name = $("#"+messages).siblings("label").html();
						error_messages +=  "<div class='alert alert-danger' role='alert'>"+errors[messages]+"</div>";
					}

					$('.common-modal-notify-error').modal('show');
					$('.common-modal-notify-error .modal-title').html("Validation Error");
					$('.common-modal-notify-error .modal-body').html(error_messages);
					finished = false;
					$.unblockUI();
				}
			});
		});
	}

}


/*function generateReport(thisElement, formID, reportAction)
{
	$('.data-table').DataTable().destroy();

	var formData = $('#'+formID).serialize();
	$('.data-table').DataTable({
		"processing": true,
		"serverSide": true,
		"ajax":{
			"url": reportAction,
			"dataType": "json",
			"type": "POST",
			"data": function ( d ) {
				d.form = formData;//$('#'+formID).serializeArray();
			}
		},
		"columnDefs": [{
			"targets": -1,
			"orderable": false,
			"data": "Edit",
			"render": function ( data, type, row, meta ) {
				var edit_action = '';
				return '<span Class="btn btn-sm btn-primary open-modal" data-id="'+ row[0] +'" data-action="'+edit_action+'" data-modal="common-modal" data-title="Edit Item" title="Edit">Invoice</i></span>';
			}
		}]
	});

}*/

function generateReport(thisElement, formID, reportAction, placeholder="financial-list")
{
	$.ajax({
		data: $('#'+formID).serialize(),
		url: reportAction,
		type: "post",
		beforeSend:function(){
			blockUI();
		},
		success: function (data) {
			$("#" + placeholder).html(data);
		},
		complete:function(){
			$.unblockUI();
		}
	});

}

function generateSearch(thisElement, formID, reportAction, placeholder)
{
	if(formID != "")
	{
		$(".data-table").DataTable().destroy();
		$.ajax({
			data: $('#'+formID).serialize(),
			url: reportAction,
			type: "post",
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {
				$("#" + placeholder).html(data);
			},
			complete:function(){
				$.fn.dataTable.ext.search.push(
					function( settings, searchData, index, rowData, counter ) {

						var offices = $('input:checkbox[name="deli_status"]:checked').map(function() {
							return this.value;
						}).get();


						if (offices.length === 0) {
							return true;
						}


						if (offices.indexOf(searchData[10]) !== -1) {
							return true;
						}

						return false;
					}
					);
				var table = $(".data-table").DataTable({
					"ordering": false,
					"bPaginate": false,
					"bLengthChange": false,
					"bAutoWidth": false
				});
				$('input:checkbox').on('change', function () {
					table.draw();

				});
				$.unblockUI();
			}
		});
	}
}

$(document).ready(function()
{
	$(document).on("change",".check_all",function(e) {

		var table = $(e.target).parents('table');
		$('.is_check', table).attr('checked', e.target.checked);

	});

	$("#accordian h3, span").click(function() {
		var link = $(this);
		var closest_ul = link.closest("ul");
		var parallel_active_links = closest_ul.find(".active");
		var closest_li = link.closest("li");
		var link_status = closest_li.hasClass("active");
		var count = 0;

		closest_ul.find("ul").slideUp(function() {
			if (++count == closest_ul.find("ul").length)
				parallel_active_links.removeClass("active");
		});

		if (!link_status) {
			closest_li.children("ul").slideDown();
			closest_li.addClass("active");
		}
	});

	$(document).on("keyup paste",".number_only",function(){
		this.value = this.value.replace(/[^0-9.]/g, '');
	});
});



function getDropdownListByCondition(thisElement, action_url, target_element)
{
	var element_id = $(thisElement).val();
	var option_list = "<option value='0'>Select</option>";
	$.ajax({
		async: true,
		url: action_url,
		data: { element_id:element_id},
		type: "post",
		beforeSend: function() {
			$("#"+target_element).html('');
			blockUI();
		},
		success: function (data) {
			//data = $.parseJSON(data);
			$.each(data.list_arr, function(i, item) {
				option_list += "<option value='"+i+"'>"+item+"</option>";
			});
			$("#"+target_element).append(option_list);
		},
		complete: function (data) {
			$.unblockUI();
		}

	});
}

function removeById(thisElement)
{
	if(confirm("Are you sure?"))
	{
		var action_url = $(thisElement).attr("data-url");
		var data_id = $(thisElement).attr("data-id");

		$.ajax({
			async: true,
			url: action_url,
			data: { data_id:data_id},
			type: "get",
			beforeSend: function() {
				blockUI();
				$('.common-modal-notify').modal('show');
				$('.common-modal-notify .modal-body').html("");
			},
			success: function (data) {
				$(thisElement).parents("tr").remove();
				$('.common-modal-notify .modal-title').html(data.title);
				$('.common-modal-notify .modal-body').html(data.msg);
			},
			complete: function (data) {
				$.unblockUI();
			},
			error: function (data) {
				var errors = jQuery.parseJSON(data.responseText).errors;
				$('.common-modal-notify-error').modal('show');
				$('.common-modal-notify-error .modal-title').html("Validation Error");
				$('.common-modal-notify-error .modal-body').html(errors.msg);

				$.unblockUI();
			}

		});
	}
	return;
}

function cancelById(thisElement)
{
	if(confirm("Are you sure?"))
	{
		var action_url = $(thisElement).attr("data-url");
		var data_id = $(thisElement).attr("data-id");

		$.ajax({
			async: true,
			url: action_url,
			data: { data_id:data_id},
			type: "post",
			beforeSend: function() {
				blockUI();
				$('.common-modal-notify').modal('show');
				$('.common-modal-notify .modal-body').html("");
			},
			success: function (data) {
				$(thisElement).parents("tr").remove();
				$('.common-modal-notify .modal-title').html(data.title);
				$('.common-modal-notify .modal-body').html(data.msg);
			},
			complete: function (data) {
				$.unblockUI();
			},
			error: function (data) {
				var errors = jQuery.parseJSON(data.responseText).errors;
				$('.common-modal-notify-error').modal('show');
				$('.common-modal-notify-error .modal-title').html("Validation Error");
				$('.common-modal-notify-error .modal-body').html(errors.msg);

				$.unblockUI();
			}

		});
	}
	return;
}

function removeTableRowOnly(thisElement)
{
	if(confirm("Are you sure?"))
	{
		$(thisElement).parents("tr").remove();
	}
	return;
}

function removeParentElement(thisElement)
{
	if(confirm("Are you sure?"))
	{
		$(thisElement).parent().remove();
	}
	return;
}

function getAge(dateString) {
	var now = new Date();
	var today = new Date(now.getYear(),now.getMonth(),now.getDate());

	var yearNow = now.getYear();
	var monthNow = now.getMonth();
	var dateNow = now.getDate();

	var dob = new Date(dateString.substring(6,10),
		dateString.substring(0,2)-1,
		dateString.substring(3,5)
		);

	var yearDob = dob.getYear();
	var monthDob = dob.getMonth();
	var dateDob = dob.getDate();
	var age = {};
	var ageString = "";
	var yearString = "";
	var monthString = "";
	var dayString = "";


	yearAge = yearNow - yearDob;

	if (monthNow >= monthDob)
		var monthAge = monthNow - monthDob;
	else {
		yearAge--;
		var monthAge = 12 + monthNow -monthDob;
	}

	if (dateNow >= dateDob)
		var dateAge = dateNow - dateDob;
	else {
		monthAge--;
		var dateAge = 31 + dateNow - dateDob;

		if (monthAge < 0) {
			monthAge = 11;
			yearAge--;
		}
	}

	age = {
		years: yearAge,
		months: monthAge,
		days: dateAge
	};

	yearString = "Y";
	monthString = "M";
	dayString = "D";

	ageString = age.years + yearString + " " + age.months + monthString + " " + age.days + dayString;

	return ageString;
}

/*#####present address and parmanent address same ##########  */
$(document).on('input', '.same_as_pre_add', function() {

	if($(".same_pre_and_par").prop('checked') == true)
	{
		$('.same_as_par_add').val($(this).val()).attr('readonly',true);
	}else{
		$('.same_as_par_add').val('').removeAttr('readonly');
	}

});

$(document).on('change', '.same_pre_and_par', function() {
	if(this.checked) {
		var present_addres = $(".same_as_pre_add").val();
		$(".same_as_par_add").val(present_addres).attr('readonly',true);
	}else{
		$('.same_as_par_add').val('').removeAttr('readonly');
	}
});
/*##### END present address and parmanent address same ##########  */

var appointmentEngine = {
	searchAppointment: function(thisElement)
	{
		var page_view_type = $("#page-view-type").val();
		var formID      = $("#frmAppointmentSearch").attr("id");
		var formAction  = $("#frmAppointmentSearch").attr("action");
		var formMethod  = $("#frmAppointmentSearch").attr("method");

		$.ajax({
			data: $('#'+formID).serialize(),
			url: formAction,
			type: formMethod,
			beforeSend:function(){
				blockUI();
				$('.data-table').DataTable().destroy();

			},
			success: function (data) {
				$("#appointment-list").html(data);
			},
			complete:function(){
				$('.data-table').DataTable({
					"ordering": false
				});
				$.unblockUI();
			}
		});
	},
	cancelAppointment: function(thisElement)
	{
		btnSaveUpdate(thisElement,'', '', '', '', appointmentEngine.searchAppointment,thisElement);
	},
	payConsultationBill: function(thisElement)
	{
		var action = $(thisElement).attr("data-action");
		var response_action = $(thisElement).attr("data-response-action");

		if(confirm("Are You Sure?"))
		{
			$.ajax({
				url: action,
				type: "get",
				beforeSend:function(){
					blockUI();
				},
				success: function (data) {
					dynamicFunc.afterSaveModal(response_action, 'common-modal-md', 'Consultation Invoice')
				},
				complete:function(){
					appointmentEngine.searchAppointment($(thisElement));
					$.unblockUI();
				}
			});
		}
	}
};

var prescriptionFunc = {
	appointmentListByDate: function(appointment_date)
	{
		$.ajax({
			url: "get-appointment-list-by-date/"+appointment_date,
			type: "get",
			beforeSend: function() {
			},
			success: function (data) {
				$('#appointment-list').html(data);
			},
			complete: function (data) {
			}

		});
	},
	getPatientDetails: function(patient_id, patient_info_route, dtls_action)
	{
		$.ajax({
			url: patient_info_route,
			data:{ patient_id: patient_id },
			type: "post",
			beforeSend: function() {
			},
			success: function (data) {
				$("#hdn_patient_id").val(data['patient_info'].patient_no_pk);
				$("#hdn_service_id").val(data['patient_info'].service_number);
				$("#patient_name").html(data['patient_info'].patient_name_rank);
				$("#patient_age").html("Age: " + data['patient_info'].age);

				if(data['patient_info'].patient_photo !=null)
				{
					var patient_img_path = $("#patient_img").attr("data-path")+"/"+data['patient_info'].patient_photo;
					$("#patient_img").html("<img width='30' src='"+patient_img_path+"'>");
				}

				if(data['patient_info'].ref_patient_photo !=null)
				{
					var ref_patient_img_path = $("#patient_img").attr("data-path")+"/"+data['patient_info'].ref_patient_photo;
					$("#ref_patient_img").html("<img width='30' src='"+ref_patient_img_path+"'>");
				}
				$("#patient_mobile").html(data['patient_info'].mobile1);

				if(data['patient_info'].patient_type != "SRV")
				{
					$("#patient_name_other").html(data['patient_info'].ref_patient_name_rank);
					var ref_service_number_relation = data['patient_info'].ref_service_number + ", " + data['patient_info'].pat_relation;
					$("#patient_age_other").html(ref_service_number_relation);
				}
			},
			complete: function (data) {
				$("#service_id").typeahead('val','');
				var hdn_su_no = $("#hdn_su_no").val();
				prescriptionFunc.prescriptionDetails(hdn_su_no,dtls_action);
			}

		});
	},
	patientPrescriptionDetails: function(thisElement)
	{
		$(thisElement).parents('table').find('tr').removeClass("bg-light-blue");
		var action = $(thisElement).attr("data-action");
		var prescription_id = $(thisElement).attr("data-presc");
		var prescription_type = $(thisElement).attr("data-presc-type");
		var hdn_su_no = $("#hdn_su_no").val();
		$("#continue_med_con, #path_con, #rad_con, #patient_name_other, #patient_age_other, #chrn-items, #chronic_con, #allergy_con").html('');
		$.ajax({
			url: action,
			type: "get",
			beforeSend: function() {
				blockUI();
			},
			success: function (data) {
				
				$("#hdn_patient_id").val(data['appointments'].patient_no_fk);
				$("#hdn_service_id").val(data['appointments'].service_number);
				$("#patient_name").html(data['appointments'].patient_name_rank);
				$("#patient_age").html("Age: " + data['appointments'].age);

				if(data['appointments'].patient_photo !=null)
				{
					var patient_img_path = $("#patient_img").attr("data-path")+"/"+data['appointments'].patient_photo;
					$("#patient_img").html("<img width='30' src='"+patient_img_path+"'>");
				}

				if(data['appointments'].ref_patient_photo !=null)
				{
					var ref_patient_img_path = $("#patient_img").attr("data-path")+"/"+data['appointments'].ref_patient_photo;
					$("#ref_patient_img").html("<img width='30' src='"+ref_patient_img_path+"'>");
				}
				$("#patient_mobile").html(data['appointments'].mobile1);
				

				if(data['appointments'].patient_type != "SRV")
				{
					$("#patient_name_other").html(data['appointments'].ref_patient_name_rank);
					var ref_service_number_relation = data['appointments'].ref_service_number + ", " + data['appointments'].pat_relation;
					$("#patient_age_other").html(ref_service_number_relation);
				}

				$("#hdn_prescription_id").val(prescription_id);

				if (prescription_type !='pre') {
					$("#hdn_appointment_id").val(data['appointments'].patapp_no_pk);
					$("#hdn_doctor_id").val(data['appointments'].doctor_person_no_fk);
				}

				if(data['vitals'] != null)
				{
					$("#txt_pulse").val(data['vitals'].pulse_val);
					$("#txt_bp_sys").val(data['vitals'].bp_val_sys);
					$("#txt_bp_dia").val(data['vitals'].bp_val_dia);
					$("#txt_temperature").val(data['vitals'].temp_val);
					$("#txt_height").val(data['vitals'].height_val);
					$("#txt_weight").val(data['vitals'].weight_val);
					$("#txt_ofc").val(data['vitals'].ofc);
					$("#txt_bmi").val(data['vitals'].bmi);
				}
				else
				{
					$("#txt_pulse, #txt_bp_sys, #txt_bp_dia, #txt_temperature, #txt_height, #txt_weight, #txt_ofc, #txt_bmi").val('');
				}

				if(data['chronic_rs'] != null)
				{
					var chrn_item_str = chrn_item_hdn_str = "";
					var chronic_action = $("#chronic-route").val();
					var chronic_obj = data['chronic_rs'];
					$.each(chronic_obj, function(index, item) {
						var chrn_id = item.chronic_dis_item_pk_no_fk;
						var chrn_name = item.chronic_dis_name;
						chrn_item_hdn_str += chrn_id + "_" + chrn_name + "*";
						chrn_item_str += "<span class='btn btn-outline-primary bg-none btn-sm mr-1 mb-1' style='font-size:10px;' onclick='prescriptionFunc.addChronicItem(this)' data-modal='common-modal-sm' data-action='"+chronic_action+"' >" + chrn_name + "</span>";
					});
					$("#chrn-items").val(chrn_item_hdn_str);
					$("#chronic_con").html(chrn_item_str);
				}

				if(data['allergy_rs'] != null)
				{
					var allergy_item_str = "";
					var chronic_action = $("#chronic-route").val();
					var allergy_obj = data['allergy_rs'];
					$.each(allergy_obj, function(index, item) {
						var pat_allergies_no_pk = item.pat_allergies_no_pk;
						if(item.category_allergies == "DLRG")
						{
							var allergies_name = item.item_name;
						}
						else
						{
							var allergies_name = item.allergies_name;
						}
						
						allergy_item_str += "<span class='btn btn-outline-primary bg-none btn-sm mr-1 mb-1' style='font-size:10px;' >" + allergies_name + " &nbsp;<i class='fa fa-times text-danger' data-allergy-id='"+pat_allergies_no_pk+"' title='Click here to delete this Allergy item' onclick='prescriptionFunc.removeAllergyItem(this)' ></i></span>";
					});
					$("#allergy_con").html(allergy_item_str);
				}

				/*if(prescription_id == "")
				{

					var med_obj = data['continue_med_arr'];
					$.each(med_obj, function(index, item) {
						$("#continue_med_con").append('<tr><td class="w-5"><input type="checkbox" class="float-left"></td><td>'+item.item_name+'</td><td>'+item.dosage+'</td><td class="w-15">'+item.duration+' '+item.duration_mu+'</td></tr>');
					});

					var path_obj = data['path_arr'];
					$.each(path_obj, function(index, item) {
						$("#path_con").append('<tr class="border-bottom"><td><a href="#">'+item+'</a></td><td class="w-5"></td></tr>');
					});

					var rad_obj = data['rad_arr'];
					$.each(rad_obj, function(index, item) {
						$("#rad_con").append('<tr><td><a href="#">'+item+'</a></td><td class="w-5"></td></tr>');
					});
				}*/
			},
			complete: function (data) {
				$(thisElement).parents('tr').addClass("bg-light-blue");
				var dtls_action = $(thisElement).attr("data-dtls-action");
				$.ajax({
					data:{hdn_su_no:hdn_su_no},
					url: dtls_action,
					type: "get",
					beforeSend: function() {
					},
					success: function (data) {
						$("#presc_details").html(data);
					},
					complete: function (data) {
						$(thisElement).parents('tr').addClass("bg-light-blue");
						$(".data-table-inv").DataTable({
							"ordering": false,
							"bLengthChange": false,
							"bAutoWidth": false,
							"pageLength": 5
						});
						$.unblockUI();
					}
				});
			}
		});
},
prescriptionDetails: function(hdn_su_no,dtls_action)
{
	$.ajax({
		data:{hdn_su_no:hdn_su_no},
		url: dtls_action,
		type: "get",
		beforeSend: function() {
		},
		success: function (data) {
			$("#presc_details").html(data);
		},
		complete: function (data) {
			$.unblockUI();
		}
	});
},
patientPrescriptionTemplateDetails: function(thisElement)
{
	var template_id = $(thisElement).attr("data-template");
	var template_name = $(thisElement).attr("data-template-name");
	var patient_id = $("#hdn_patient_id").val();
	var hdn_su_no = $("#hdn_su_no").val();
	if(template_id != "")
	{
		var hdn_prescription_id = $("#hdn_prescription_id").val();

		if(hdn_prescription_id != "")
		{
			if(!confirm("Are you sure to use this Template? All the previous data of this Prescription will not be found."))
			{
				return;
			}
		}

		var dtls_action = $(thisElement).attr("data-dtls-action");
		$.ajax({
			url: dtls_action,
			data:{ template_id:template_id, patient_id:patient_id, template_name:template_name, hdn_su_no:hdn_su_no },
			type: "post",
			beforeSend: function() {
				blockUI();
			},
			success: function (data) {
				$("#presc_details").html(data);
			},
			complete: function (data) {
				$.unblockUI();
			}
		});
	}
	else
	{
		$.unblockUI();
	}
},
loadToPresFavouritList: function(thisElement, item_type, title, append_to, action_url)
{
	$(thisElement).parents("#cc-con").find(".card-body").removeClass("bg-light-blue");
	$(thisElement).parents("#cc-con .card-body").addClass("bg-light-blue");
	var hdn_su_no = $("#hdn_su_no").val();
	$.ajax({
		async: true,
		data: { item_type:item_type, hdn_su_no:hdn_su_no },
		url: action_url,
		type: "post",
		beforeSend:function(){
			$(".loading-img").html('<i class="spinner-border spinner-border-sm float-right"></i>');
		},
		success: function (data) {
			$("#favourit_list_title").html(title + " Favourite List ");
			$("#favourit_list_title").attr("data-append-to", append_to);
			$("#pres-favourit-list").html(data);
		},
		complete: function(){
			$(".loading-img").html('');
		}
	});
},
loadToPresFavouritListTeeth: function(thisElement, item_type, title, append_to, action_url)
{
	var item_type = "TEETHFIND";
	var title = "TEETH";
	var append_to = $(thisElement);
	var action_url = $("#hdn_favourite_route").val();
	$(thisElement).parents("#cc-con").find(".card-body").removeClass("bg-light-blue");
	$(thisElement).parents("#cc-con .card-body").addClass("bg-light-blue");
	var hdn_su_no = $("#hdn_su_no").val();

	$.ajax({
		async: true,
		data: { item_type:item_type, hdn_su_no:hdn_su_no },
		url: action_url,
		type: "post",
		beforeSend:function(){
			$(".loading-img").html('<i class="spinner-border spinner-border-sm float-right"></i>');
		},
		success: function (data) {
			$("#favourit_list_title").html(title + " Favourite List ");
			$("#favourit_list_title").attr("data-append-to", append_to);
			$("#pres-favourit-list").html(data);
		},
		complete: function(){
			$(".loading-img").html('');
		}
	});
},
addFromFavouritList: function(thisElement)
{
	var item_name = $(thisElement).attr("data-item-name");
	var lookup_id = $(thisElement).attr("data-lookup-id");
	var lookup_code = $(thisElement).attr("data-lookup-code");
	var lookup_data_code = $(thisElement).attr("data-lookup-data-code");
	var item_id = $(thisElement).val();
	var append_to = $("#favourit_list_title").attr("data-append-to");

	if(thisElement.checked)
	{
		var lookup_data = "<li id='item-" + item_id +"'><input class='left-element' type='hidden' name='item_id[]' value='" + item_id +"' readonly='readonly'><input type='hidden' name='item_name[]' value='" + item_name +"' readonly='readonly'><input type='hidden' name='lookup_id[]' value='" + lookup_id+"' readonly='readonly'><input type='hidden' name='lookup_code[]' value='" + lookup_code+"' readonly='readonly'><input type='hidden' name='lookupdata_code[]' value='"+lookup_data_code+"' readonly='readonly'><i class='fa fa-angle-double-right'></i> " + item_name +"&nbsp;&nbsp;<span class='float-right text-danger cursor-pointer' title='Remove This Item' onclick='removeParentElement(this)'><i class='fa fa-times'></i></span>&nbsp;<span class='float-right text-secondary mr-1 cursor-pointer' style='font-size:11px;' title='Add To Bookmark' data-id='" + item_id +"' data-name='" + item_name +"'><i class='fa fa-star'></i></span></li>";
		$(append_to).append(lookup_data);
	}
	else
	{
		$(append_to + " #item-"+item_id).remove();
	}
},
addToPresFavouritList: function(thisElement)
{
	var item_id 	= $(thisElement).attr("data-id");
	var item_name 	= $(thisElement).attr("data-name");
	var item_type 	= $(thisElement).attr("data-type");
	var lookup_id 	= $(thisElement).attr("data-lookup-id");
	var action_url 	= $(thisElement).attr("data-url");
	var hdn_su_no 	= $("#hdn_su_no").val();
	var doctor_id 	= $("#hdn_doctor_id").val();

	if(confirm("Are You Sure?"))
	{
		$.ajax({
			async: true,
			data: { item_id:item_id, item_name:item_name, item_type:item_type, hdn_su_no:hdn_su_no, doctor_id:doctor_id, lookup_id:lookup_id },
			url: action_url,
			type: "post",
			beforeSend:function(){
				$(".loading-img").html('<i class="spinner-border spinner-border-sm float-right"></i>');
			},
			success: function (data) {
				$("#pres-favourit-list").html(data);
			},
			complete: function(){
				$(".loading-img").html('');
			}
		});
	}
},
removeFromPresFavouritList: function(thisElement)
{
	if(confirm("Are You Sure?"))
	{
		var favourit_id = $(thisElement).attr("data-favourit-id");
		var favourit_type = $(thisElement).attr("data-lookup-code");
		var action_url  = $(thisElement).attr("data-action");

		$.ajax({
			async: true,
			data: { favourit_id:favourit_id, favourit_type:favourit_type },
			url: action_url,
			type: "post",
			beforeSend:function(){
				$(".loading-img").html('<i class="spinner-border spinner-border-sm float-right"></i>');
			},
			success: function (data) {
				$("#pres-favourit-list").html(data);
			},
			complete: function(){
				$(".loading-img").html('');
			}
		});
	}
},
addTeethFindingsFromFavouritList: function(thisElement)
{
	var item_name 			= $(thisElement).attr("data-item-name");
	var lookup_id 			= $(thisElement).attr("data-lookup-id");
	var lookup_code 		= $(thisElement).attr("data-lookup-code");
	var lookup_data_code 	= $(thisElement).attr("data-lookup-data-code");
	var item_id 			= $(thisElement).val();
	var append_to 			= $("#favourit_list_title").attr("data-append-to");

	if(thisElement.checked)
	{
		var lookup_data = "<li id='item-" + item_id +"'><input class='left-element' type='hidden' name='item_id[]' value='" + item_id +"' readonly='readonly'><input type='hidden' name='item_name[]' value='" + item_name +"' readonly='readonly'><input type='hidden' name='lookup_id[]' value='" + lookup_id+"' readonly='readonly'><input type='hidden' name='lookup_code[]' value='" + lookup_code+"' readonly='readonly'><input type='hidden' name='lookupdata_code[]' value='"+lookup_data_code+"' readonly='readonly'><i class='fa fa-angle-double-right'></i> " + item_name +"&nbsp;&nbsp;<span class='float-right text-danger cursor-pointer' title='Remove This Item' onclick='removeParentElement(this)'><i class='fa fa-times'></i></span>&nbsp;<span class='float-right text-secondary mr-1 cursor-pointer' style='font-size:11px;' title='Add To Bookmark' data-id='" + item_id +"' data-name='" + item_name +"'><i class='fa fa-star'></i></span></li>";
		$(append_to).append(lookup_data);
	}
	else
	{
		$(append_to + " #item-"+item_id).remove();
	}
},
updateContinueChronic: function(thisElement, typehead_element)
{
	var medicine_item_id = $(thisElement).val();
	var action_url = $(thisElement).attr("data-action");
	var type = $(thisElement).attr("data-type");
	$.ajax({
		async: true,
		data: { medicine_item_id:medicine_item_id, type:type },
		url: action_url,
		type: "post",
		beforeSend:function(){
			//$(".loading-img").html('<i class="spinner-border spinner-border-sm float-right"></i>');
		},
		success: function (data) {
			$(thisElement).parents("tr").remove();
		},
		complete: function(){
			//$(".loading-img").html('');
		}
	});
},
addNotFoundItem: function(thisElement, typehead_element)
{
	var typehead_id = $(thisElement).parents(".twitter-typeahead").find(".tt-input").attr("id");
	var typehead_text = $("#"+typehead_id).typeahead('val');
	var lookup_id = $(thisElement).parents(".twitter-typeahead").find(".tt-input").attr("data-lookup-id");
	var lookup_code = $(thisElement).parents(".twitter-typeahead").find(".tt-input").attr("data-lookup-code");

	var lookup_data = "<li><input type='hidden' name='item_id[]' value='' readonly='readonly'><input class='left-element' type='hidden' name='item_name[]' value='" + typehead_text +"' readonly='readonly'><input type='hidden' name='lookup_id[]' value='" + lookup_id +"' readonly='readonly'><input type='hidden' name='lookup_code[]' value='" + lookup_code +"' readonly='readonly'><input type='hidden' name='lookupdata_code[]' value='' readonly='readonly'><i class='fa fa-angle-double-right'></i> " + typehead_text +"&nbsp;&nbsp;<span class='float-right text-danger cursor-pointer' title='Remove This Item' onclick='removeParentElement(this)'><i class='fa fa-times'></i></span>&nbsp;</li>";

	$(thisElement).parents(".twitter-typeahead").siblings().find("ul").append(lookup_data);
	$("#"+typehead_id).typeahead('val','');
},
savePrescription: function(thisElement)
{
	var patient_id = $("#hdn_patient_id").val();
	if(patient_id == "")
	{
		$('.common-modal-notify-error').modal('show');
		$('.common-modal-notify-error .modal-title').html("Validation Error");
		$('.common-modal-notify-error .modal-body').html("You did not select any Patient");
		return;
	}

	/*var flag = false;
	$(".left-element").each(function () {
		if (this.value != '') {
			flag = true;
			return false;
		}
	});

	if (!flag) {
		$('.common-modal-notify-error').modal('show');
		$('.common-modal-notify-error .modal-title').html("Validation Error");
		$('.common-modal-notify-error .modal-body').html("You did not select any Chief Complaints");
	}
	else
	{
		var action = $(thisElement).attr("data-response_action");
		var riderect_action = $("#hdn_current_url").val();
		var items = $('input[name="item_name[]"]');
		var appointment_date = $("#hdn_appointment_date").val();
		var hdn_eye_ind = $("#hdn_eye_ind").val();

		if(hdn_eye_ind == 1)
		{
			btnSaveUpdate($(thisElement),'afterSaveModal', action, 'common-modal-md','Prescription', dynamicFunc.afterSaveLoadPage,riderect_action);
		}
		else
		{
			btnSaveUpdate($(thisElement),'afterSaveModal', action, 'common-modal-md','Prescription', dynamicFunc.afterSaveLoadPage,riderect_action);
		}
	}*/

	var action = $(thisElement).attr("data-response_action");
	var riderect_action = $("#hdn_current_url").val();
	var items = $('input[name="item_name[]"]');
	var appointment_date = $("#hdn_appointment_date").val();
	var hdn_eye_ind = $("#hdn_eye_ind").val();
	btnSaveUpdate($(thisElement),'afterSaveModal', action, 'common-modal-md','Prescription', dynamicFunc.afterSaveLoadPage,riderect_action);
},
savePrescriptionAsTemplate: function(thisElement)
{
	event.preventDefault();
	if ($("#template_name").val() == "") {
		$("#template_msg").html("( This field is required )");
		$("#template_name").addClass("is-invalid");
		return false;
	}

	var formID      = $(thisElement).parents("form").attr("id");
	var formAction  = $(thisElement).attr("data-action");
	var formMethod  = $(thisElement).parents("form").attr("method");

	if(confirm("Are You Sure?"))
	{
		$.ajax({
			async: true,
			data: $('#'+formID).serialize(),
			url: formAction,
			type: formMethod,
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {
				if(data.title == 'Success')
				{
					$('.common-modal-notify').modal('show');
					$('.common-modal-notify .modal-body').html("<i class='fas fa-stroopwafel fa-spin'></i>");
					$('.common-modal-notify .modal-title').html(data.title);
					$('.common-modal-notify .modal-body').html(data.msg);
				}
			},
			complete: function(){
				$.unblockUI();
			},
			error: function (data) {
				var errors = jQuery.parseJSON(data.responseText).errors;
				error_messages="";
				for (messages in errors) {
					var field_name = $("#"+messages).siblings("label").html();
					error_messages +=  "<div class='alert alert-danger' role='alert'>"+errors[messages]+"</div>";
				}

				$('.common-modal-notify-error').modal('show');
				$('.common-modal-notify-error .modal-title').html("Validation Error");
				$('.common-modal-notify-error .modal-body').html(error_messages);

				$.unblockUI();
			}
		});
	}

	event.stopImmediatePropagation();
},
calculateFollowupDate: function(thisElement)
{
	var followup_after 		= $("#followup_after").val()*1;
	var followup_after_mu 	= $("#followup_after_mu").val();
	var num_of_days = 0;
	if(followup_after_mu == "DAY")
	{
		num_of_days = followup_after;
	}
	if(followup_after_mu == "MONTH")
	{
		num_of_days = followup_after*30;
	}

	var today = new Date();
	var todayDate = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear();

	var date = new Date(todayDate);
	var newdate = new Date(date);

	newdate.setDate(newdate.getDate() + num_of_days);

	var dd = newdate.getDate();
	var mm = newdate.getMonth() + 1;
	var y = newdate.getFullYear();
	var someFormattedDate = mm + '/' + dd + '/' + y;
	$("#next_followup").val(someFormattedDate);
},
calculateMedicineQnty: function(thisElement)
{
	var dose_other_qnty = $(thisElement).parents("tr").find(".medicine_dose option:selected").attr("data-qnty");
	var dose = $(thisElement).parents("tr").find(".medicine_dose").val();
	var medicine_duration = $(thisElement).parents("tr").find(".medicine_duration").val()*1;
	var medicine_duration_mu = $(thisElement).parents("tr").find(".medicine_duration_mu").val();

	var dosearray = dose.split('+');
	var total_dose = 0;
	for(var i=0; i < dosearray.length; i++)
	{
		total_dose += parseInt(dosearray[i]);
	}

	if(medicine_duration_mu == "HOUR")
	{
		var net_duration = 24/medicine_duration;
	}
	else if(medicine_duration_mu == "DAY")
	{
		var net_duration = medicine_duration*1;
	}
	else if(medicine_duration_mu == "WEEK")
	{
		var net_duration = medicine_duration*7;
	}
	else
	{
		var net_duration = medicine_duration*30;
	}

	if(dose_other_qnty == "")
	{
		$(thisElement).parents("tr").find(".medicine_quantity").val(net_duration*total_dose);
	}
	else
	{
		$(thisElement).parents("tr").find(".medicine_quantity").val(1);
	}
},
setContinueDuration: function(thisElement)
{
	var dose = $(thisElement).parents("tr").find(".medicine_dose").val();
	var dosearray = dose.split('+');
	var total_dose = 0;
	for(var i=0; i < dosearray.length; i++)
	{
		total_dose += parseInt(dosearray[i]);
	}

	if(thisElement.checked) {
		$(thisElement).parents("tr").find("[name='medicine_duration_type[]']").val('30');
		$(thisElement).parents("tr").find("[name='medicine_duration_mu[]']").val('DAY');
		$(thisElement).parents("tr").find(".medicine_quantity").val(30*total_dose);
	}
	else
	{
		$(thisElement).parents("tr").find("[name='medicine_duration_type[]']").val('');
		$(thisElement).parents("tr").find("[name='medicine_duration_mu[]']").val('0');
		$(thisElement).parents("tr").find(".medicine_quantity").val('');
	}
},
selectChronicItem: function(thisElement)
{
	var chrn_item_str = chrn_item_hdn_str = "";
	var action = $("#chronic-route").val();
	var action_save = $("#chronic-route-save").val();
	$(".chronic-item").each(function () {
		if(this.checked)
		{
			var chrn_id = $(this).val();
			var chrn_name = $(this).attr("data-name");
			chrn_item_hdn_str += chrn_id + "_" + chrn_name + "*";
			chrn_item_str += "<span class='btn btn-outline-primary bg-none btn-sm mr-1 mb-1' style='font-size:10px;' onclick='prescriptionFunc.addChronicItem(this)' data-modal='common-modal-sm' data-action='"+action+"' >" + chrn_name + "</span>";
		}
	});

	var doctor_id  = $("#hdn_doctor_id").val();
	var patient_id = $("#hdn_patient_id").val();
	$.ajax({
		async: true,
		url: action_save,
		data: { chrn_item_hdn_str:chrn_item_hdn_str, doctor_id:doctor_id, patient_id:patient_id},
		type: "post",
		beforeSend: function() {
			blockUI();
		},
		success: function (data) {
			$("#chrn-items").val(chrn_item_hdn_str);
			$("#chronic_con").html(chrn_item_str);
		},
		complete: function (data) {
			$.unblockUI();
		}

	});
},
addChronicItem: function(thisElement)
{
	var patient_id = $("#hdn_patient_id").val();
	if(patient_id == "")
	{
		$('.common-modal-notify-error').modal('show');
		$('.common-modal-notify-error .modal-title').html("Validation Error");
		$('.common-modal-notify-error .modal-body').html("You did not select any Patient");
		return;
	}
	var action = $(thisElement).attr("data-action");
	var title  = $(thisElement).attr("title");
	var modal  = $(thisElement).attr("data-modal");
	var chrn_item_hdn_str = $("#chrn-items").val();
	$.ajax({
		async: true,
		url: action,
		data: { chrn_item_hdn_str:chrn_item_hdn_str},
		type: "post",
		beforeSend: function() {
			blockUI();
			$('.'+modal).modal('show');
			$('.'+modal+' .modal-body').html("<i class='fas fa-stroopwafel fa-spin'></i>");
			$('.'+modal+' .modal-title').html(title);
		},
		success: function (data) {
			$('.'+modal+' .modal-body').html(data);
		},
		complete: function (data) {
			$.unblockUI();
		}

	});
},
storeAllergyData: function(thisElement)
{
	event.preventDefault();

	var formID      = $(thisElement).parents("form").attr("id");
	var formAction  = $(thisElement).parents("form").attr("action");
	var formMethod  = $(thisElement).parents("form").attr("method")
	var formData 	= $('#'+formID).serialize();
	var doctor_id   = $("#hdn_doctor_id").val();
	var patient_id  = $("#hdn_patient_id").val();
	var cmb_type  = $("#cmb_type").val();
	if(cmb_type == "DLRG")
	{
		var allergy_name  = $("#medicine_item").val();
	}
	else
	{
		var allergy_name  = $('#cmb_allergy :selected').text();
	}
	
	var allergy_type  = $('#cmb_type :selected').text();
	var severity_name  = $('#cmb_severity :selected').text();

	if(confirm("Are You Sure?"))
	{
		$.ajax({
			async: true,
			data: formData  + "&doctor_id=" + doctor_id  + "&patient_id=" + patient_id  + "&allergy_name=" + allergy_name  + "&allergy_type=" + allergy_type  + "&severity_name=" + severity_name,
			url: formAction,
			type: formMethod,
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {
				var allergy_name_span = "<span class='btn btn-outline-primary bg-none btn-sm mr-1 mb-1' style='font-size:10px;'>" + allergy_name + "</span>";
				$("#allergy_con").append(allergy_name_span);
			},
			complete: function(){
				$.unblockUI();
			}
		});
	}

	event.stopImmediatePropagation();
},
removeAllergyItem: function(thisElement)
{
	if(confirm("Are you sure?"))
	{
		var id = $(thisElement).attr("data-allergy-id");
		var action_url  = $("#chronic-route-delete").val();
		$.ajax({
			async: true,
			data: { id:id },
			url: action_url,
			type: "post",
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {
				$(thisElement).parent("span").remove();
			},
			complete: function(){
				$('.common-modal-notify').modal('show');
				$('.common-modal-notify .modal-title').html("Success");
				$('.common-modal-notify .modal-body').html("Allergy item removed successfully");
				$.unblockUI();
			}
		});
	}
},
selectNewItem: function(thisElement)
{
	event.preventDefault();

	var formID      = $(thisElement).parents("form").attr("id");
	var formAction  = $(thisElement).parents("form").attr("action");
	var formMethod  = $(thisElement).parents("form").attr("method");

	if(formValidation(formID) == false)
	{
		return;
	}

	if(confirm("Are You Sure?"))
	{
		$.ajax({
			async: true,
			data: $('#'+formID).serialize(),
			url: formAction,
			type: formMethod,
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {
				$(thisElement).parents("table").find("tbody tr#1 #hdn_item_id_1").val(data.item_id);
				$(thisElement).parents("table").find("tbody tr#1 #hdn_item_name_1").val(data.item_name);
				$(thisElement).parents("table").find("tbody tr#1 .item_element").val(data.item_name);
			},
			complete: function(){
				$.unblockUI();
				if(isAModalOpen)
					$('.modal').modal('hide');
			}
		});
	}

	event.stopImmediatePropagation();
},
addRow: function(thisElement, type)
{
	var row = $(thisElement).parents("tr").clone();
	var newId = $(thisElement).parents("#data-append-to").find("tr").length + 1;
	var oldId = Number($(thisElement).parents("tr").attr("id"));

	row.attr('id', newId );
	if(type == 'THRPEX')
	{

		row.find('#te_item_name_' + oldId).attr('id', 'te_item_name_' + newId);
		row.find('#session_mu_' + oldId).attr('id', 'session_mu_' + newId);
		row.find('#session_duration_' + oldId).attr('id', 'session_duration_' + newId);
		row.find('#session_unit_' + oldId).attr('id', 'session_unit_' + newId);
		row.find('#te_td_action_' + oldId).attr('id', 'te_td_action_' + newId);

		row.find('#hdn_item_id_' + oldId).attr('id', 'hdn_item_id_' + newId);
		row.find('#hdn_item_name_' + oldId).attr('id', 'hdn_item_name_' + newId);
		row.find('#hdn_lookup_id_' + oldId).attr('id', 'hdn_lookup_id_' + newId);
		row.find('#hdn_lookup_code_' + oldId).attr('id', 'hdn_lookup_code_' + newId);
		row.find('#hdn_lookupdata_code_' + oldId).attr('id', 'hdn_lookupdata_code_' + newId);
		row.find('#unit_intensity_mu_' + oldId).attr('id', 'unit_intensity_mu_' + newId);
		row.find('#unit_intensity_' + oldId).attr('id', 'unit_intensity_' + newId);

		row.find('#session_mu_' + newId).val($(thisElement).parents('tbody').find('#session_mu_1').val());

		$(thisElement).parents('tbody').find('#te_item_name_' + oldId).val('');
		$(thisElement).parents('tbody').find('#session_duration_' + oldId).val('');
		$(thisElement).parents('tbody').find('#session_mu_' + oldId).val('');
		$(thisElement).parents('tbody').find('#session_unit_' + oldId).val('');

		$(thisElement).parents('tbody').find('#hdn_item_id_' + oldId).val('');
		$(thisElement).parents('tbody').find('#hdn_item_name_' + oldId).val('');
		$(thisElement).parents('tbody').find('#hdn_lookupdata_code_' + oldId).val('');
		$(thisElement).parents('tbody').find('#unit_intensity_mu_' + oldId).val('');
		$(thisElement).parents('tbody').find('#unit_intensity_' + oldId).val('');
	}

	if(type == 'ETHER')
	{
		row.find('#et_item_name_' + oldId).attr('id', 'et_item_name_' + newId);
		row.find('#unit_intensity_mu_' + oldId).attr('id', 'unit_intensity_mu_' + newId);
		row.find('#session_duration_' + oldId).attr('id', 'session_duration_' + newId);
		row.find('#unit_intensity_' + oldId).attr('id', 'unit_intensity_' + newId);
		row.find('#et_td_action_' + oldId).attr('id', 'et_td_action_' + newId);

		row.find('#hdn_item_id_' + oldId).attr('id', 'hdn_item_id_' + newId);
		row.find('#hdn_item_name_' + oldId).attr('id', 'hdn_item_name_' + newId);
		row.find('#hdn_lookup_id_' + oldId).attr('id', 'hdn_lookup_id_' + newId);
		row.find('#hdn_lookup_code_' + oldId).attr('id', 'hdn_lookup_code_' + newId);
		row.find('#hdn_lookupdata_code_' + oldId).attr('id', 'hdn_lookupdata_code_' + newId);
		row.find('#session_mu_' + oldId).attr('id', 'session_mu_' + newId);
		row.find('#no_of_session_' + oldId).attr('id', 'no_of_session_' + newId);

		row.find('#unit_intensity_mu_' + newId).val($(thisElement).parents('tbody').find('#unit_intensity_mu_' + oldId).val());

		$(thisElement).parents('tbody').find('#et_item_name_' + oldId).val('');
		$(thisElement).parents('tbody').find('#session_duration_' + oldId).val('');
		$(thisElement).parents('tbody').find('#unit_intensity_mu_' + oldId).val('');
		$(thisElement).parents('tbody').find('#unit_intensity_' + oldId).val('');

		$(thisElement).parents('tbody').find('#hdn_item_id_' + oldId).val('');
		$(thisElement).parents('tbody').find('#hdn_item_name_' + oldId).val('');
		$(thisElement).parents('tbody').find('#hdn_lookupdata_code_' + oldId).val('');
		$(thisElement).parents('tbody').find('#session_mu_' + oldId).val('');
		$(thisElement).parents('tbody').find('#no_of_session_' + oldId).val('');
	}

	$(thisElement).parents("#data-append-to").append(row);

	if(type == 'THRPEX')
	{
			openItemAutocomplete($("#te_item_name_"+newId), 'PT', "#hdn_item_id_" + newId, "#hdn_item_name_" + newId); // 3 = SERVICE ITEM TYPE
			$('#te_td_action_' + newId).html("<span class='btn btn-danger btn-sm' onclick='removeTableRowOnly(this)'> <i class='fa fa-times'></i> </span>");
			//$('#hdn_lookup_code_' + newId).val('THRPEX');
		}

		if(type == 'ETHER')
		{
            openItemAutocomplete($("#et_item_name_"+newId), 'PT', "#hdn_item_id_" + newId, "#hdn_item_name_" + newId); // 3 = SERVICE ITEM TYPE
            $('#et_td_action_' + newId).html("<span class='btn btn-danger btn-sm' onclick='removeTableRowOnly(this)'> <i class='fa fa-times'></i> </span>");
            //$('#hdn_lookup_code_' + newId).val('ETHER');
        }
    },
    addMedRow: function(thisElement)
    {
    	var lookup_code = $(thisElement).attr("data-lookup-code");
    	var item_id = item_name = "";
    	if(lookup_code == "MED")
    	{
    		var item_id 	= $(thisElement).val();
    		var item_name 	= $(thisElement).attr("data-item-name");
    		thisElement 	= $("#med_td_action_0 span");
    	}
    	var row 	= $(thisElement).parents("tr").clone();
    	var newId 	= $(thisElement).parents("#data-append-to").find("tr").length;
    	var oldId 	= Number($(thisElement).parents("tr").attr("id"));

    	row.attr('id', newId );
    	row.find('#hdn_report_serial_med_' + oldId).attr('id', 'hdn_report_serial_med_' + newId);
    	row.find('#hdn_medicine_item_id_' + oldId).attr('id', 'hdn_medicine_item_id_' + newId);
    	row.find('#medicine_item_' + oldId).attr('id', 'medicine_item_' + newId).css({"background-color": "#ffffff", "border": "0px"});
    	row.find('#med_favourit_' + oldId).attr('id', 'med_favourit_' + newId);
    	row.find('#medicine_dose_' + oldId).attr('id', 'medicine_dose_' + newId);
    	row.find('#medicine_duration_mu_' + oldId).attr('id', 'medicine_duration_mu_' + newId);
    	row.find('#medicine_duration_type_' + oldId).attr('id', 'medicine_duration_type_' + newId);
    	row.find('#medicine_quantity_' + oldId).attr('id', 'medicine_quantity_' + newId);
    	row.find('#instruction_' + oldId).attr('id', 'instruction_' + newId);
    	row.find('#medicine_route_' + oldId).attr('id', 'medicine_route_' + newId);
    	row.find('#is_continue_' + oldId).attr('id', 'is_continue_' + newId);
    	//row.find('#is_chronic_' + oldId).attr('id', 'is_chronic_' + newId);
    	row.find('#med_td_action_' + oldId).attr('id', 'med_td_action_' + newId);

    	var interaction_route 	= $("#hdn_interaction_url").val();
    	var hdn_patient_id 		= $("#hdn_patient_id").val();

    	if(lookup_code == "MED")
    	{
    		row.find('#hdn_medicine_item_id_' + newId).val(item_id);
    		row.find('#medicine_item_' + newId).val(item_name);
    	}

    	row.find('#is_continue_' + newId).val(newId);
    	//row.find('#is_chronic_' + newId).val(newId);

    	row.find('#hdn_report_serial_med_' + newId).val($(thisElement).parents('tbody').find('#hdn_report_serial_med_' + oldId).val());
    	row.find('#medicine_dose_' + newId).val($(thisElement).parents('tbody').find('#medicine_dose_' + oldId).val());
    	row.find('#instruction_' + newId).val($(thisElement).parents('tbody').find('#instruction_' + oldId).val());
    	row.find('#medicine_route_' + newId).val($(thisElement).parents('tbody').find('#medicine_route_' + oldId).val());
    	row.find('#medicine_duration_mu_' + newId).val($(thisElement).parents('tbody').find('#medicine_duration_mu_' + oldId).val());

    	$(thisElement).parents('tbody').find('#hdn_report_serial_med_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#hdn_medicine_item_id_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#medicine_item_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#medicine_dose_' + oldId).val('0');
    	$(thisElement).parents('tbody').find('#medicine_duration_mu_' + oldId).val('DAY');
    	$(thisElement).parents('tbody').find('#medicine_duration_type_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#medicine_quantity_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#instruction_' + oldId).val('0');
    	$(thisElement).parents('tbody').find('#medicine_route_' + oldId).val('0');

    	var add_fav_list_action = $(thisElement).attr("data-favourit-action");
    	var med_item_id = row.find('#hdn_medicine_item_id_' + newId).val();
    	var med_item_name = row.find('#medicine_item_' + newId).val();
    	row.find('#med_favourit_' + newId).html('<span class="float-right text-secondary mr-1 cursor-pointer" style="font-size:11px;" title="Add To Favourite List" onclick="prescriptionFunc.addToPresFavouritList(this)" data-url="'+add_fav_list_action+'" data-id="'+med_item_id+'" data-name="'+med_item_name+'" data-type="MED"><i class="fa fa-star text-primary"></i></span>');

    	var item_id = row.find('#hdn_medicine_item_id_' + newId).val();
    	var interaction_result = '';
    	$.ajax({
    		async: false,
    		url: interaction_route,
    		data: { item_id:item_id, hdn_patient_id:hdn_patient_id },
    		type: "post",
    		success: function (data) {
    			if(data.result != '0')
    			{
    				interaction_result = '<blockquote class="blockquote"><p class="mb-0">'+data.msg+'</p><footer class="blockquote-footer"><div class="btn btn-outline-danger bg-none btn-md">'+data.seviriaty+'</div></footer></blockquote>';
    				var msg = interaction_result + '<div class="modal-footer pl-0"><button type="button" class="btn btn-success btn-sm ml-0" id="modal-btn-si" data-dismiss="modal"><i class="fa fa-check"></i> Continue</button><button type="button" class="btn btn-danger btn-sm" id="modal-btn-no" data-dismiss="modal" onclick="prescriptionFunc.discardInteractedMedRow()"><i class="fa fa-times"></i> Discard</button></div>';

    				$('.common-modal-notify-error').modal('show');
    				$('.common-modal-notify-error .modal-body').html("<i class='fas fa-stroopwafel fa-spin'></i>");
    				$('.common-modal-notify-error .modal-title').html(data.title);
    				$('.common-modal-notify-error .modal-body').html(msg);
    			}
    		}
    	});

    	$(thisElement).parents("#data-append-to").append(row);
    	$("#medicine_item_0").typeahead("destroy");
    	openItemAutocomplete($("#medicine_item_0"), 'MED','#hdn_medicine_item_id_0','#medicine_item_0');
    	$("#medicine_item_0").focus();
    	$('#med_td_action_' + newId).html("<span class='btn btn-danger btn-sm' onclick='removeTableRowOnly(this)'> <i class='fa fa-times'></i> </span>");
    	
    },
    discardInteractedMedRow: function()
    {
    	$('#data-append-to tr:last').remove();
    },
    addIPDMedRow: function(thisElement)
    {
    	var lookup_code = $(thisElement).attr("data-lookup-code");
    	var item_id = item_name = "";
    	if(lookup_code == "MED")
    	{
    		var item_id 	= $(thisElement).val();
    		var item_name 	= $(thisElement).attr("data-item-name");
    		thisElement 	= $("#med_td_action_0 span");
    	}
    	var row 	= $(thisElement).parents("tr").clone();
    	var newId 	= $(thisElement).parents("#data-append-to").find("tr").length;
    	var oldId 	= Number($(thisElement).parents("tr").attr("id"));

    	row.attr('id', newId );
    	row.find('#hdn_report_serial_med_' + oldId).attr('id', 'hdn_report_serial_med_' + newId);
    	row.find('#hdn_medicine_item_id_' + oldId).attr('id', 'hdn_medicine_item_id_' + newId);
    	row.find('#medicine_item_' + oldId).attr('id', 'medicine_item_' + newId).css({"background-color": "#ffffff", "border": "0px"});
    	row.find('#med_favourit_' + oldId).attr('id', 'med_favourit_' + newId);
    	row.find('#medicine_dose_' + oldId).attr('id', 'medicine_dose_' + newId);
    	row.find('#medicine_duration_mu_' + oldId).attr('id', 'medicine_duration_mu_' + newId);
    	row.find('#medicine_duration_type_' + oldId).attr('id', 'medicine_duration_type_' + newId);
    	row.find('#medicine_quantity_' + oldId).attr('id', 'medicine_quantity_' + newId);
    	row.find('#instruction_' + oldId).attr('id', 'instruction_' + newId);
    	row.find('#med_td_action_' + oldId).attr('id', 'med_td_action_' + newId);
    	var hdn_patient_id 		= $("#hdn_patient_id").val();

    	if(lookup_code == "MED")
    	{
    		row.find('#hdn_medicine_item_id_' + newId).val(item_id);
    		row.find('#medicine_item_' + newId).val(item_name);
    	}

    	row.find('#hdn_report_serial_med_' + newId).val($(thisElement).parents('tbody').find('#hdn_report_serial_med_' + oldId).val());
    	row.find('#medicine_dose_' + newId).val($(thisElement).parents('tbody').find('#medicine_dose_' + oldId).val());
    	row.find('#instruction_' + newId).val($(thisElement).parents('tbody').find('#instruction_' + oldId).val());
    	row.find('#medicine_duration_mu_' + newId).val($(thisElement).parents('tbody').find('#medicine_duration_mu_' + oldId).val());

    	$(thisElement).parents('tbody').find('#hdn_report_serial_med_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#hdn_medicine_item_id_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#medicine_item_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#medicine_dose_' + oldId).val('0');
    	$(thisElement).parents('tbody').find('#medicine_duration_mu_' + oldId).val('DAY');
    	$(thisElement).parents('tbody').find('#medicine_duration_type_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#medicine_quantity_' + oldId).val('');
    	$(thisElement).parents('tbody').find('#instruction_' + oldId).val('0');

    	var add_fav_list_action = $(thisElement).attr("data-favourit-action");
    	var med_item_id = row.find('#hdn_medicine_item_id_' + newId).val();
    	var med_item_name = row.find('#medicine_item_' + newId).val();
    	row.find('#med_favourit_' + newId).html('<span class="float-right text-secondary mr-1 cursor-pointer" style="font-size:11px;" title="Add To Favourite List" onclick="prescriptionFunc.addToPresFavouritList(this)" data-url="'+add_fav_list_action+'" data-id="'+med_item_id+'" data-name="'+med_item_name+'" data-type="MED"><i class="fa fa-star text-primary"></i></span>');

    	var item_id = row.find('#hdn_medicine_item_id_' + newId).val();

    	$(thisElement).parents("#data-append-to").append(row);
    	$("#medicine_item_0").typeahead("destroy");
    	openItemAutocomplete($("#medicine_item_0"), 'MED','#hdn_medicine_item_id_0','#medicine_item_0');
    	$("#medicine_item_0").focus();
    	$('#med_td_action_' + newId).html("<span class='btn btn-danger btn-sm' onclick='removeTableRowOnly(this)'> <i class='fa fa-times'></i> </span>");

    },
    addSelectedTeeth: function(thisElement)
    {
    	var selected_teeth_txt = $(thisElement).attr("id");
    	var hidden_fields = "<input type='hidden' class='left-element' name='item_id[]' id='item_id' value='' readonly='readonly'><input type='hidden' name='item_name[]' id='item_name' value='"+selected_teeth_txt+"' readonly='readonly'><input type='hidden' name='lookup_id[]' id='lookup_id' value='' readonly='readonly'><input type='hidden' name='lookup_code[]' id='lookup_code' value='TEETHFIND' readonly='readonly'><input type='hidden' name='lookupdata_code[]' id='lookupdata_code' value='"+selected_teeth_txt+"' readonly='readonly'>";
    	var ac_buttons = "<span class='text-danger cursor-pointer' title='Remove This Item' onclick='prescriptionFunc.removeSelectedTeeth(this)'><i class='fa fa-times'></i></span>";
    	var selected_item = "<div class='selected-teeth-item' id='selected-teeth-item-"+selected_teeth_txt+"'><div class='form-group form-row mb-0'><label class='col-sm-4 col-form-label col-form-label-sm'>"+selected_teeth_txt+"</label><div class='col-sm-6'><input type='text' class='form-control mb-0 teeth_find' id='teeth_findings' name='teeth_findings' onclick='prescriptionFunc.loadToPresFavouritListTeeth(this)' data-lookup-code='TEETHFIND'>"+hidden_fields+"</div><div class='col-sm-2 ac_button_con'><span class='fav_btn'></span>"+ac_buttons+"</div></div><div class='form-group'></div></div>";

    	if(selected_teeth_txt == "Teeth-All")
    	{
    		$("#selected-teeth").html('');
    	}

    	if($(thisElement).hasClass("list-group-item-selected"))
    	{
    		$("#selected-teeth").find("#selected-teeth-item-"+selected_teeth_txt).remove();
    		$(thisElement).removeClass("list-group-item-selected").addClass('list-group-item-navy');
    	}
    	else
    	{
    		$("#selected-teeth").append(selected_item);
    		$(thisElement).addClass("list-group-item-selected").removeClass('list-group-item-navy');
    	}
    	teeth_autocomplete.destroy();
    	teeth_autocomplete.init();
    },
    removeSelectedTeeth: function (thisElement)
    {
    	if(confirm("Are you sure?"))
    	{
    		$(thisElement).parents(".selected-teeth-item").remove();
    	}
    	return;
    },
    selectOccuExamElements: function(thisElement)
    {
    	var thisValue 		= $(thisElement).val();
    	var lkp_id  		= $(thisElement).children("option").filter(":selected").attr("data-lkp-id");
    	var lkpdatacode  	= $(thisElement).children("option").filter(":selected").attr("data-lkpdatacode");
    	var thisValueItem  	= $(thisElement).children("option").filter(":selected").text();

    	$(thisElement).parent(".form-group").find("input[name='item_id[]']").val(thisValue);
    	$(thisElement).parent(".form-group").find("input[name='item_name[]']").val(thisValueItem);
    	$(thisElement).parent(".form-group").find("input[name='lookup_id[]']").val(lkp_id);
    	$(thisElement).parent(".form-group").find("input[name='lookupdata_code[]']").val(lkpdatacode);

    }
};

var pathologyFunc = {
	selectSampleCheckbox: function(thisElement)
	{
		var lab_no = $(thisElement).val();


		if(thisElement.checked) {
			$("#sample_item tr").find(".chk_sample_item_"+lab_no).prop("checked", true);
		}
		else
		{
			$("#sample_item tr").find(".chk_sample_item_"+lab_no).prop("checked", false);
		}
	},
	searchSampleCollectionListByPresc: function(thisElement)
	{
		var prescription_id = $("#prescription_uid").val();
		if(prescription_id == "")
		{
			$('.common-modal-notify-error').modal('show');
			$('.common-modal-notify-error .modal-title').html("Validation Error");
			$('.common-modal-notify-error .modal-body').html("You did not select any Prescription");
			return;
		}

		var action = $(thisElement).attr("data-action");
		var type = $(thisElement).attr("data-type");
		$.ajax({
			data: { prescription_id:prescription_id, type:type },
			url: action,
			type: "post",
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {

				$("#sample-container").html(data);
			},
			complete:function(){
				$.unblockUI();
			}
		});
	},
	getPendingSamples: function(thisElement)
	{
		var prescription_uid = $("#prescription_uid").val();
		var action = $(thisElement).attr("data-action");
		$.ajax({
			data: { prescription_uid:prescription_uid },
			url: action,
			type: "post",
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {
				$(".sample_content").html(data);
			},
			complete:function(){
				$.unblockUI();
			}
		});
	},
	getCollectedSamples: function(thisElement)
	{
		var prescription_uid = $("#prescription_uid").val();
		var action = $(thisElement).attr("data-action");
		$.ajax({
			data: { prescription_uid:prescription_uid },
			url: action,
			type: "post",
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {
				$(".sample_content").html(data);
			},
			complete:function(){
				$.unblockUI();
			}
		});
	},
	searchSampleReceiveListByPresc: function(thisElement)
	{
		var lab_no = $("#lab_no").val();
		if(lab_no == "")
		{
			$('.common-modal-notify-error').modal('show');
			$('.common-modal-notify-error .modal-title').html("Validation Error");
			$('.common-modal-notify-error .modal-body').html("You did not select any Lab No");
			return;
		}
		var action = $(thisElement).attr("data-action");
		var type = $(thisElement).attr("data-type");
		$.ajax({
			data: { lab_no:lab_no,type:type },
			url: action,
			type: "post",
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {
				$(".sample_content").html(data);
			},
			complete:function(){
				$.unblockUI();
			}
		});
	},
	getReceiveSamples: function(thisElement)
	{
		var lab_no = $("#lab_no").val();
		if(lab_no == "")
		{
			$('.common-modal-notify-error').modal('show');
			$('.common-modal-notify-error .modal-title').html("Validation Error");
			$('.common-modal-notify-error .modal-body').html("You did not select any Lab No");
			return;
		}
		var action = $(thisElement).attr("data-action");
		$.ajax({
			data: { lab_no:lab_no },
			url: action,
			type: "post",
			beforeSend:function(){
				blockUI();
			},
			success: function (data) {
				$(".sample_content").html(data);
			},
			complete:function(){
				$.unblockUI();
			}
		});
	},
	storeReceiveSamples: function(thisElement)
	{
		var lab_no = $("#lab_no").val();
		var lab_id = $(thisElement).attr("data-lab-id");
		if(lab_no == "")
		{
			$('.common-modal-notify-error').modal('show');
			$('.common-modal-notify-error .modal-title').html("Validation Error");
			$('.common-modal-notify-error .modal-body').html("You did not select any Lab No");
			return;
		}
		if(confirm("Are you sure?"))
		{
			var action = $(thisElement).attr("data-action");
			$.ajax({
				data: { lab_no:lab_no, lab_id:lab_id },
				url: action,
				type: "post",
				beforeSend:function(){
					blockUI();
				},
				success: function (data) {
					$(thisElement).parents("tr").remove();
					if(data.title == 'Success')
					{
						$('.common-modal-notify').modal('show');
						$('.common-modal-notify .modal-body').html("<i class='fas fa-stroopwafel fa-spin'></i>");
						$('.common-modal-notify .modal-title').html(data.title);
						$('.common-modal-notify .modal-body').html(data.msg);
					}
				},
				complete:function(){
					$.unblockUI();
				}
			});
		}
	},
	collectPendingSamples: function(thisElement)
	{
		event.preventDefault();
		var pageurl = $(thisElement).attr('href');
		var prescription_uid = $(thisElement).attr('data-pres');

		$.ajax({
			async: true,
			data: { prescription_uid:prescription_uid },
			type:'get',
			url:pageurl,
			beforeSend: function () {
				blockUI();
			},
			success: function (data) {
				$('#page-content').html(data);

			},
			complete: function (data) {

				$.unblockUI();
			}
		});

		if(pageurl!=window.location){
			window.history.pushState({path:pageurl},'',pageurl);
		}
		event.stopImmediatePropagation();
		return false;
	},
	storeResultEntry: function(thisElement)
	{
		var riderect_action = $(thisElement).attr("data-redirect");
		var type = $(thisElement).attr("data-type");
		$("#action_type").val(type);
		btnSaveUpdate($(thisElement),'', '', '','', dynamicFunc.afterSaveLoadPage,riderect_action);
	},
	searchResultEntry: function(thisElement)
	{
		var formID = "frm-result-search";
		var reportAction = $("#frm-result-search").attr("action");
		generateReport(thisElement, formID, reportAction, "result-container");
	}
}

var billingEngine = {
	patientQuickReg: function(thisElement)
	{
		event.preventDefault();

		var formID      = $(thisElement).parents("form").attr("id");
		var formAction  = $(thisElement).parents("form").attr("action");
		var formMethod  = $(thisElement).parents("form").attr("method");

		if(formValidation(formID) == false)
		{
			return;
		}

		if(confirm("Are You Sure?"))
		{
			$.ajax({
				async: true,
				data: $('#'+formID).serialize(),
				url: formAction,
				type: formMethod,
				beforeSend:function(){
					blockUI();
				},
				success: function (data) {
					$("#hdn_patient_id").val(data.insert_id);
					$("#patient_id").val(data.patient_name);

					var patient_info = "<strong>" + data.patient_code + " : </strong>" + data.patient_name + ", <strong>Gender : </strong>" + data.gender + ", <strong>Age : </strong>" + data.age + ", <strong>Phone : </strong>" + data.phone_mobile;
					$("#patient_info").html(patient_info);

					$("#" + formID).find("input, textarea").not('.keep_me').val("");
					$("#" + formID).find("select").not('.keep_me').val("0");
				},
				complete: function(){
					if(isAModalOpen)
						$('.modal').modal('hide');

					$.unblockUI();
				},
				error: function (data) {
					var errors = jQuery.parseJSON(data.responseText).errors;
					error_messages="";
					for (messages in errors) {
						var field_name = $("#"+messages).siblings("label").html();
						error_messages +=  "<div class='alert alert-danger' role='alert'>"+errors[messages]+"</div>";
					}

					$('.common-modal-notify-error').modal('show');
					$('.common-modal-notify-error .modal-title').html("Validation Error");

					$.unblockUI();
				}
			});
		}

		event.stopImmediatePropagation();
	},
	doctorQuickReg: function(thisElement)
	{
		var formID      = $(thisElement).parents("form").attr("id");
		var formAction  = $(thisElement).parents("form").attr("action");
		var formMethod  = $(thisElement).parents("form").attr("method");
		var doc_type  	= $(thisElement).parents("form").find("#doc_type").val();

		if(formValidation(formID) == false)
		{
			return;
		}

		if(confirm("Are You Sure?"))
		{
			$.ajax({
				data: $('#'+formID).serialize(),
				url: formAction,
				type: formMethod,
				beforeSend:function(){
					blockUI();
				},
				success: function (data) {
					if(doc_type == 1)
					{
						$("#hdn_doctor_id").val(data.insert_id);
						$("#doctor_code").val(data.last_name);
					}
					if(doc_type == 2)
					{
						$("#hdn_first_refer").val(data.insert_id);
						$("#first_refer").val(data.last_name);
					}
					if(doc_type == 3)
					{
						$("#hdn_second_refer").val(data.insert_id);
						$("#second_refer").val(data.last_name);
					}
				},
				complete:function(){
					if(isAModalOpen)
						$('.modal').modal('hide');
					$.unblockUI();
				}
			});
		}
		event.stopImmediatePropagation();
	},
	calculateTotal: function(thisElement)
	{
		if($("#billing_table-body tr").length > 0)
		{
			var item_total=0;
			$( "#billing_table-body tr" ).each(function() {
				item_total += $(this).find(".item_total_amt").val()*1;
			});
			$("#item_total").val(item_total.toFixed(2));

			var discount_perc_hos = $("#discount_percent_hospital").val()*1;
			var discount_amt_hos = (item_total*discount_perc_hos)/100;
			$("#discount_amount_hospital").val(discount_amt_hos.toFixed(2));

			var discount_perc_doc = $("#discount_percent_doctor").val()*1;
			var discount_amt_doc = (item_total*discount_perc_doc)/100;
			$("#discount_amount_doctor").val(discount_amt_doc.toFixed(2));

			var after_disc_amt = (item_total - (discount_amt_hos + discount_amt_doc));
			$("#total_discount_amount").val((discount_amt_hos + discount_amt_doc).toFixed(2));

			var item_vat 	= $("#item_vat").val()*1;
			var urgent_fee 	= $("#urgent_fee").val()*1;
			var s_charge 	= $("#s_charge").val()*1;

			var total_payable = (after_disc_amt+item_vat+urgent_fee+s_charge);
			$("#total_payable").val(total_payable.toFixed(2));
		}
		else
		{
			alert("You did not selected any Item.");
			return;
		}
	},
	calculateItemTotal: function(thisElement){
		var item_id = $(thisElement).parents("tr").find(".item_id").val();
		var item_qnty = $("#hdn_item_qnty_"+item_id).val()*1;
		var item_rate = $("#hdn_item_rate_"+item_id).val()*1;
		$("#hdn_item_total_qnty_"+item_id).val(item_qnty*item_rate);
	},
	calculatePayment: function(thisElement){
		var pay_amount   = $("#pay_amount").val()*1;
		var given_amount = $("#given_amount").val()*1;
		if(pay_amount > 0)
		{
			$("#total_payment").val(pay_amount);
			$("#change_amount").val(pay_amount-given_amount);
			$("#total_due").val($("#total_payable").val()*1-$("#total_payment").val()*1);
		}
	},
	createBill: function(thisElement)
	{
		var action = $(thisElement).attr("data-response_action");
		if($("#billing_table-body tr").length == 0)
		{
			alert("You did not select any Service Item");
			event.preventDefault();
			return;
		}

		formValidation("frmBilling");

		btnSaveUpdate($(thisElement),'afterSaveModal', action, 'common-modal-md', 'Service Bill Invoice');
		billingEngine.resetBillForm();
	},
	resetBillForm: function()
	{
		$("#frmBilling").find("input").val('');
		$("#frmBilling").find("select").val(0);
		$("#billing_table-body, #patient_info, #doctor_info").html('');
	}
};


