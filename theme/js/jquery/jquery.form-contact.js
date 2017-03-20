function form_inpt_checkr(boxData, attrbox, opts, type){
	var errorBox = $('<span class="float-l full text-center vmarg-5 '+opts[0].substring(1)+' t14 bg-red-2 vpadd-5 white min-rounded"></span>');
	if(type == 1){
		var inputVal = boxData.val();
		var parentTag = boxData.parent();
		if(boxData.hasClass('inpt-email') == true && inputVal.length > 0){
			var check_data_email = new RegExp(opts[1].stuffs_msg.email_inpt.regex_data);
			if(!check_data_email.test(inputVal)){	if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.email_inpt.msg_data));}}
		}
		if(boxData.hasClass('inpt-phone') == true && inputVal.length > 0){
			var check_data_phone = new RegExp(opts[1].stuffs_msg.phone_inpt.regex_data);
			if(!check_data_phone.test(inputVal)){	if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.phone_inpt.msg_data));}}
		}
		if(boxData.hasClass('inpt-siret') == true && inputVal.length > 0){
			var check_data_siret = new RegExp(opts[1].stuffs_msg.siret_inpt.regex_data);
			if(!check_data_siret.test(inputVal)){	if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.siret_inpt.msg_data));}}
		}
		if(boxData.hasClass('inpt-number') == true && inputVal.length > 0){
			var check_data_nbr = new RegExp(opts[1].stuffs_msg.nmbr_inpt.regex_data);
			if(!check_data_nbr.test(inputVal)){	if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.nmbr_inpt.msg_data));}}
		}
		if(boxData.hasClass('inpt-tarif') == true && inputVal.length > 0){
			var check_data_tarif = new RegExp(opts[1].stuffs_msg.tarif_inpt.regex_data);
			if(!check_data_tarif.test(inputVal)){	if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.tarif_inpt.msg_data));}}
		}
		if(boxData.hasClass('inpt-url') == true && inputVal.length > 0){
			var check_data_url = new RegExp(opts[1].stuffs_msg.url_inpt.regex_data);
			if(!check_data_url.test(inputVal)){	if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.url_inpt.msg_data));}}
		}
		if(boxData.hasClass('inpt-codepo') == true && inputVal.length > 0){
			var check_data_codepo = new RegExp(opts[1].stuffs_msg.codepo_inpt.regex_data);
			if(!check_data_codepo.test(inputVal)){	if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.codepo_inpt.msg_data));}}
		}
		if(boxData.hasClass('inpt-selctr') == true){
			inputVal == parentTag.find("option:selected");
			if(inputVal == "undefined" || !inputVal){
				if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.dflt_inpt));}
			}
		}
		if(boxData.hasClass('inpt-cgvaccept') == true && inputVal != 1){
			if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.dflt_inpt));}
		}
		if(boxData.hasClass('inpt-password') == true){
			var password1 = $('#pwd-1');
			var password2 = $('#pwd-2');
			if(password1){
				if(password1.val() != password2.val()){
					if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.pwd_inpt.msg_data));}
				}
			}
		}
		if(inputVal.length < 1){	if(parentTag.find(opts[0]).length < 1){	parentTag.append(errorBox.clone().text(opts[1].stuffs_msg.dflt_inpt));} else {	parentTag.find(opts[0]).text(opts[1].stuffs_msg.dflt_inpt);}}
	} else if(type == 2){
	}
	return false;
}
function moveBox_effect(itm_box, arrayBox, opts, type){
	if(type == 1){
		//$("html, body").animate({ scrollTop: $("body").offset().top }, opts[0]);
		itm_box.each(function(){
			var distance = opts[1];
			var width = $(this).outerWidth();
			var start = width + distance;
			$(this).show().css({	display: 'block', opacity: 0, right: -start+'px'}).animate({	right: -width+'px', opacity: 1}, 'slow');
		});
		return itm_box.length;
	}
}
var classInptError = '.error';
var classInptRqrd = '.required';
var classInptChck = '.chckr-inpt';
var form_link_datas = '/admin/includes/ajax-query.php';
$(document).ready(function(){
	$("body").on("click", ".btn-submit, .sbmt-link", function(){
		var formid = $(this).parents('form');
		var form_dir_btn = $(this).attr("data-name");
		var formAction = formid.attr('action');
		$('span'+classInptError).remove();
		$.ajax({
			type: "POST",
			url: form_link_datas,
			data: "form_stuffs=1&inpt_datas=check_form",
			context: this,
			dataType: "json",
			success: function(formData){
				$(classInptRqrd, formid).each(function(index){
					if($(this).attr("data-inpt").length){	form_inpt_checkr($(this), "", [classInptError, formData], $(this).attr("data-inpt"));}
				});
				var check_itm_rqrd = moveBox_effect($('span'+classInptError, formid), formData, [500, 5], 1);
				if(check_itm_rqrd < 1){
					if(formid.attr("data-prc").length > 0){
						var form_attrbox = formid.attr("data-prc");
						bg_preload("modal-bckground", 100, '', 1);
						if(form_attrbox == "pro-register"){
							if(form_dir_btn){
								$.ajax({
									type: "POST",
									url: "/includes/QueryCnt/register-form.php",
									data: $( "form" ).serialize()+"&data_register=1&inpt_datas="+form_dir_btn,
									dataType: "json",
									success: function(formPost){
										$("html, body").animate({ scrollTop: $("body").offset().top }, 500);
										if(formPost.val_return == 1){
											if(form_dir_btn == "reqstr_friend"){
												$('.modal-bckground').fadeOut(function(){	$(this).remove();});
											} else {
												bg_preload("modal-bckground", 100, '', 2);
												formid.find("fieldset").fadeOut(function(){	$(this).remove();});
												formid.append(formPost.datas.form_ctn);
												appnd_txtbox([".rich-txt-box",$(".txt-rich"),"#editor-block-","#container-"],["data-items","data-container"],1);
												morph_box($(".update-block"),"",'',3);
												load_img('.img-link-box', ['cover',1, ''], 1);
												if(form_dir_btn == "post_value"){
													setTimeout(function(){
														var create_box = AlertBox('.modal-bckground', ['double-box-1','','min-h-200'], '', 2, 100);
														if(create_box == true){
															$('.pop-ttl-box'). append('<div class="float-l t18 color-link strong vmarg-5">'+formPost.datas.rqst_friend.title+'</div>');
															$('.pop-ctn-box').append('<form class="float-l full" method="post" data-prc="pro-register">'+formPost.datas.rqst_friend.ctn_box+'</form>');
														}
													}, 2500);
												}
											}
										} else {
											AlertBox("body",formPost.datas.form_ctn, 2, 1, 3000);
										}
									}
								});
							}
						} else if(form_attrbox == "etab-register"){
							if(form_dir_btn){
								$.ajax({
									type: "POST",
									url: "/includes/QueryCnt/register-form.php",
									data: $( "form" ).serialize()+"&data_register=1&inpt_datas="+form_dir_btn,
									dataType: "json",
									success: function(formPost){
										$("html, body").animate({ scrollTop: $("body").offset().top }, 500);
										if(formPost.val_return == 1){
											if(form_dir_btn == "reqstr_friend"){
												$('.modal-bckground').fadeOut(function(){	$(this).remove();});
											} else {
												bg_preload("modal-bckground", 100, '', 2);
												formid.find("fieldset").fadeOut(function(){	$(this).remove();});
												formid.append(formPost.datas.form_ctn);
												appnd_txtbox([".rich-txt-box",$(".txt-rich"),"#editor-block-","#container-"],["data-items","data-container"],1);
												morph_box($(".update-block"),"",'',3);
												load_img('.img-link-box', ['cover',1, ''], 1);
												if(form_dir_btn == "post_value"){
													setTimeout(function(){
														var create_box = AlertBox('.modal-bckground', ['double-box-1','','min-h-200'], '', 2, 100);
														if(create_box == true){
															$('.pop-ttl-box'). append('<div class="float-l t18 color-link strong vmarg-5">'+formPost.datas.rqst_friend.title+'</div>');
															$('.pop-ctn-box').append('<form class="float-l full" method="post" data-prc="etab-register">'+formPost.datas.rqst_friend.ctn_box+'</form>');
														}
													}, 2500);
												}
											}
										} else {
											AlertBox("body",formPost.datas.form_ctn, 2, 1, 3000);
										}
									}
								});
							}
						} else if(form_attrbox == "form-contact"){
							$.ajax({
								type: "POST",
								url: "/includes/mails/mail-contact.php",
								data: formid.serialize(),
								success: function(){
									bg_preload("modal-bckground", 100, '', 2);
									if($(".success").length){
										formid.hide(function(){
											$('article.intro').text('Votre demande a été transmise. Nous reviendrons vers vous au plus vite.');
											$('.success').fadeIn();
										});
									} else {
										$('.modal-bckground').fadeOut(function(){
											$(this).remove();
											AlertBox("body",'Votre demande a été transmise. Nous reviendrons vers vous au plus vite.', 1, 1, 3000);
										});
									}
								}
							});
						} else if(form_attrbox == "add-video-itm"){
							var formBOX = $('#'+$(this).parents("form").attr("data-ref"));
							$.ajax({
								type: "POST",
								url: "/admin/includes/ajax-query.php",
								data: "video_add_inpt=1&"+formid.serialize(),
								success: function(addvideo){
									if(addvideo.code_value == 1){
										var count_itm_folio = formBOX.find('nav li').length;
										fadeBoxeffect(formBOX.find('.data-folio li'), [2, addvideo.link_datas.link_npict, addvideo.link_datas.link_val_inpt1+count_itm_folio, addvideo.link_datas.link_pict, addvideo.link_datas.link_val_inpt2+count_itm_folio, addvideo.link_datas.link_nom], ["add_link_folio_", count_itm_folio, formBOX.find('nav'), 12], 2);
									}
									$('.modal-bckground').fadeOut(function(){	$(this).remove();});
								}
							});
						}
					}
				}
			}
		});
	});
	$("body").on('change', ".chck-input-box", function(){
		if($(this).attr('checked')){
			$(this).parents(".input-block").find('input[type=text]').addClass('required');
		} else {
			$(this).parents(".input-block").find('input[type=text]').removeClass('required');
		}
	});
	$("body").on("focus click", classInptRqrd+', .ui-chckbox,.n-chckbox,.ui-pictbox', function(){
		var parentBox = $(this).parent();
		if($(this).hasClass("ui-chckbox")){
			var ui_chckbox = parentBox.find("input"+classInptRqrd);
			if(ui_chckbox.val() == 1){
				$(this).removeClass("checked white");
				ui_chckbox.val(0);
			} else {
				$(this).addClass("checked white");
				ui_chckbox.val(1);
			}
		} else if($(this).hasClass("n-chckbox")){
			var ui_chckbox = parentBox.find("input"+classInptRqrd);
			if(ui_chckbox.is(":checked")){ ui_chckbox.val(1);} else {	ui_chckbox.val(0);}
		}
		$('span.'+classInptError, parentBox).fadeOut(function(){	$(this).remove();});
	});
});
