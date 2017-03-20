function getDevice() {
	if($(window).width() < 570){
		$("#loogo,#top").hide();
		if($(".menubar-rsp").length < 1){
			$.ajax({
				type: "POST",
				url: '',//"admin/includes/ajax-query.php",
				data: "rsp_mn_itm=1&nsw_type=menu_rsp",
				dataType: "json",
				success: function(rsp_mnu){
					if(rsp_mnu.code_return == 1){
						if($(".menubar-rsp").length < 1){
							$(".blk-logo").append('<nav class="menubar-rsp float-l full text-center small-marg-btm">'+
								'<li class="float-l blk-box-10 login-rsp-btn">&nbsp;</li>'+
								'<li class="float-l text-center blk-box-80"></li>'+
								'<li class="float-r blk-box-10 text-center">'+
								'<span class="float-r btn-link menu-rsp-list vmarg-5 vpadd-5 hpadd-5 min-rounded bg-grey-1 pointer" data-psn-menu="0"><em class="float-l pict-2 clr-grey menu-btn"></em></span>'+
								'</li>'+
								'</nav>');
						}
						if(rsp_mnu.list.logo.length > 0){
							if(!$(".rsp-1-logo").length){	$(".menubar-rsp .blk-box-80").append('<a class="div-box-70 rsp-1-logo block hmarg-auto" href="/"><img class="float-l full" src="'+rsp_mnu.list.logo+'" /></a>');}
						}
						if(rsp_mnu.list.login == 1){
							if(!$(".login-btn").length){	$(".login-rsp-btn").append('<a href="/login.php" class="float-l btn-link vmarg-5 vpadd-5 hpadd-5 min-rounded bg-grey-1"><em class="float-l pict-2 login-btn"></em></a>');}
						}
					}
				}
			});
		}
		return false;
		
	} else {
		$(".menubar-rsp,#col-1").remove();
		$("#loogo,#top").fadeIn();
		return false;
	}
}
function hide_cnt_box(box_itm,opts,type){
	if(type == 1){
		$(box_itm).fadeOut(function(){
			$(this).remove();
		});
	} else {
		if(opts[0].parents(box_itm).length){
			opts[0].parents(box_itm).fadeOut(function(){
				$(this).remove();
			});
		} else {
			opts[1].fadeOut(function(){
				$(this).remove();
			});
		}
	}
}
function bg_preload(block_box,speed,opts,type){
	if(type == 1){
		if(!$("#modal-bckground").length){
			$("body").append("<div id='modal-bckground' data-pos='"+opts+"' class='"+block_box+"'></div>");
		}
		$("#modal-bckground").fadeIn();
	} else if(type == 2){
		hide_cnt_box("."+block_box, '', 1);
	}
}
function preloadr_box(block_work,array,opts,type){
	if(type == 1){
		if(array[0].length){
			var box = block_work;
			box.prepend('<div class="full h-100 '+array[1].substring(1)+' box-abst"><div class="full h-100 preload-box pos-center b-norepeat"></div></div>');
			box.find(array[1]).fadeIn();
		} else {
			bg_preload("modal-bckground", 100, '', 1);
		}
	}
}
function get_val_input(input_name,btn_value,value,type){
	if(type == 1){
		if(value == 1){
			$('input[name='+input_name+']').val(0);
			$(btn_value).children('span').fadeOut(function(){$(this).removeClass('on').addClass('off').fadeIn().text('Non')});
		} else {
			$('input[name='+input_name+']').val(1);
			$(btn_value).children('span').fadeOut(function(){$(this).removeClass('off').addClass('on').fadeIn().text('Oui')});
		}
    } else {
		var name_box = btn_value[1];
		 if(name_box.length){
			 name_box.find(btn_value[0]+" input[type=hidden]").val(0).parent().find("span").removeClass("on").addClass("off").text("Non");
			input_name.children("input[type=hidden]").val(1).parent().find("span").removeClass("off").addClass("on").text("Oui");
		}
    }
}
function selectrBox(itm_box, dft_value, opts, type){
	if(itm_box.is("select")){
		itm_box.find('option:selected').each(function(){
			var box_itm_view = $(this).attr("data-itm");
			var inputbox_rqrd = itm_box.parents(opts[2]).find(opts[3]);
			if(type == 1){
				if(box_itm_view){
					if($(opts[1]+box_itm_view).length){
						if(inputbox_rqrd.find("input[data-inpt=1]").length){	inputbox_rqrd.find("input[data-inpt=1]").addClass("required");}
						$(opts[1]+box_itm_view).fadeIn().removeClass(opts[0]);
						return 1;
					}
				} else {
					itm_box.parents(opts[2]).find(opts[3]).hide();
					if(inputbox_rqrd.find("input.required").length){
						inputbox_rqrd.find("input[data-inpt=1]").removeClass("required");
						if(inputbox_rqrd.find(".error").length){	inputbox_rqrd.find(".error").remove();}
					}
					return 0;
				}
			} else if(type == 2){
				if($(opts[1]+box_itm_view).length){
					$(opts[2]+":not("+opts[1]+box_itm_view+")").fadeOut(function(){
						$(opts[1]+box_itm_view).delay(opts[3]).fadeIn();
					});
				}
			}
		});
	}
}
function AlertBox(box,content,nbalert,type,time){
	if(type == 1){
		if($(".alert-box").length < 1){
			if($(box).length){	var fd_bck = $(box);} else {	var fd_bck = $('body');}
			fd_bck.append("<div class='box-ctn box-fixed pos-top-0 full h-100 hide'><div class='alert-box big-marg-top csr-normal padd-1 hmarg-auto rounded white shadow mbox-"+nbalert+"'>"+content+"</div></div>");
			$(".box-ctn").fadeIn().delay(time).fadeOut(function(){$(this).remove();});
		}
	} else if(type == 2){
		bg_preload(box.substring(1),time, content[3], 1);
		if($(box).length){
			$(box).append('<div class="hmarg-auto '+content[0]+'">'+
							'<div class="float-l full-box padd-1 big-marg-top min-rounded bg-white shadow">'+
							'<div class="float-l pop-ttl-box full vpadd-5 border-bottom small-marg-btm">'+
							'<div class="float-r bg-red-1 close-window-item pointer white min-rounded padd-6">x</div>'+
							'</div>'+
							'<div class="float-l full-box hmarg-1 pop-ctn-box '+content[2]+' box-rltiv"></div>'+
							'</div>'+
							'</div>');
			if($(content[1]).length){	$(".pop-ttl-box").append(content[1]);}
			return true;
		} else {
			return false;
		}
	}
}
function slideMovmnt(elem, attr_block, block_move, blockLabel, otherBlock, val_1, val_2, fast){
	var attr_elem = $(elem).attr(attr_block);
	if(attr_elem == 1){
		$(block_move).stop(true).animate({"left" : val_1},fast);
		if(otherBlock.length > 1){
			$(elem+","+otherBlock).attr(attr_block,0);
		} else {
			$(elem).attr(attr_block,0);
		}
		return false;
	} else {
		$(block_move).stop(true).animate({"left" : val_2},fast);
		if(otherBlock.length > 1){
			$(elem+","+otherBlock).attr(attr_block,1);
		} else {
			$(elem).attr(attr_block,1);
		}
		return false;
	}
}
function morph_box(itm_box,data_itm,opts,value){
	itm_box.each(function(index){
		if(value == 1){
			var mph_value = $(this).attr(data_itm);
			if(mph_value){
				if(mph_value == 1){
					$(this).wrapAll('<div class="float-l full min-rounded bg-grey" />');
				} else {
					$(this).append('<div class="float-l full-box bg-grey hmarg-1 min-h-100">1</div>');
				}
				$(this).removeAttr(data_itm).removeClass(opts);
			}
		} else if(value == 2){
			if($(this).attr("data-pos") == 1){
				$(this).wrapInner('<strong class="float-l btn-act-search clr-black pointer"></strong>').wrap('<div class="float-l blk-box-70"></div>');
			} else {
				$(this).wrapInner('<strong class="float-l clr-black csr-normal"></strong>').wrap('<div class="float-l blk-box-70"></div>');
			}
			$(this).parent().wrap('<div class="float-l ttl-box-1 border-bottom full min-marg-btm"></div>').after('<div class="float-l ttl-box-2 blk-box-30 vmarg-5"></div>');
			$(this).removeAttr("data-pos");
		} else if(value == 3){
			itm_box.each(function(index){
				var pos_type = $(this).attr("data-pos");
				if($(this).attr("data-opts")){
					opt_type = $(this).attr("data-opts").split(",");
					$(this).append('<div class="float-l full vpadd-5">'+'<div class="float-l full">'+
						 '<span class="float-l min-btn-link hmarg-2 min-rounded csr-normal bg-grey-1">'+
						  '<em class="float-l">'+pos_type.toUpperCase()+'</em>'+
						  '</span>'+
						  '<div class="float-l pict-title padd-6 hmarg-5"></div>'+
						  '<span class="float-r '+opt_type[1]+' min-btn-link hmarg-2 min-rounded pointer bg-grey-1">'+
						  '<span class="float-l pict-1 config-1 pointer '+opt_type[2]+' vmarg-2 hmarg-2" data-view="0"></span>'+
						  '</span>'+
						'</div>'+
					  '</div>');
					if(pos_type == "img"){
						$(this).append('<div class="float-l full bg-grey small-marg-top">'+'<div class="vmarg-10 hmarg-auto blk-box-70 min-rounded text-center box-rltiv min-h-100">'+'<div class="update-pict-box box-1 full img-link-box b-norepeat min-h-80" data-rfname="'+opt_type[3]+'" data-src="'+opt_type[5]+'" data-lds="'+opt_type[6]+'" data-opts="hmarg-auto block">'+'</div>'+'</div>'+'</div>');
						if(opt_type[4] == 1){
							$(this).find(".pict-title").text(opt_type[0]);
							$(this).find(".update-pict-box").append('<input type="hidden" name="'+opt_type[3]+'" class="img-value" value="'+opt_type[5]+'">');
							}
					} else if(pos_type == "attachments"){
						$(this).append('<div class="float-l full ovr-hide box-rltiv bg-grey min-h-100 small-marg-top">'+'<div class="update-attch-box box-abst pos-top-0 pos-lft-0" data-rfname="'+opt_type[3]+'"></nav>'+'</div>');
						if(opt_type[4] > 0){
							var att_itm_file = opt_type[5].split("*");
							for (att = 0; att < opt_type[4]; att++){
								var att_itm = att_itm_file[att].split("|");
								$(this).find(".update-attch-box").append('<li class="float-l file-upload bg-grey-4 box-rltiv vmarg-5 hmarg-5 fix-box-100 min-h-80 iln-block" title="'+att_itm[0]+'">'+'<div class="file-upload-close pointer pos-top-0 pos-rgh-0 box-abst padd-8 bg-red-2 white">x</div><img class="block icon-80 min-rounded csr-normal vmarg-5 hmarg-auto" src="/picts'+att_itm[1]+att_itm[0]+'" />'+'<input type="hidden" name="user_files[]" value="'+att_itm[0]+'" />'+'</li>');
							}
						}
						$(this).find(".pict-title").text(opt_type[0]);
					} else {
						if(opt_type[4] == 1){
							$(this).attr("data-rfname",opt_type[3]).find(".pict-title").text(opt_type[0]);
							$(this).append('<input type="hidden" name="'+opt_type[3]+'" class="img-value" value="'+opt_type[5]+'">');
						} else {
							$(this).attr("data-rfname",opt_type[3]);
						}
					}
					$(this).removeAttr("data-pos data-opts");
				}
			});
		}
	});
}
function load_img(ref_type, opts, type){
	if(opts[1] == 1){	var loop_type = $(ref_type); var type_box = ".modal-bckground";} else {	var loop_type = opts[2].find(ref_type); var type_box = ".bg-preloadr";}
	var total_img = loop_type.length;
	if(total_img > 0){	var nb_pld = $("#editor-block-"+loop_type.parents("body").attr("data-itm-box")).parents(".rich-txt-box");preloadr_box(nb_pld,[$(".modal-bckground"),'.bg-preloadr'],'',1);}
	loop_type.each(function(index){
		var img_type = $(this);
		if(img_type.attr("data-src") !== undefined){
			var real_src = img_type.attr("data-src");
			img_type.append('<img class="block hmarg-auto" style="display:none;" />');
			if(img_type.attr("data-lds") == "w"){
				var img_loaded = img_type.children("img").attr({'src':real_src, 'width':'100%'}).addClass("float-l").removeClass("hmarg-auto");
			} else {
				var img_loaded = img_type.children("img").attr({'src':real_src, 'height':'100%'});
			}
			if(type == 1){
				img_type.children("img").attr({'src':real_src}).load(function(){
					img_type.removeAttr("data-src data-lds data-opts").removeClass("b-norepeat "+ref_type.substring(1)).children("img").fadeIn();
					total_img--;
					if(total_img < 1){	if($(type_box).attr("data-pos") != 1){	$(type_box).fadeOut(function removeAdd(){$(this).remove();});}}
				});
			} else if(type == 2){
				img_type.removeAttr("data-src").children("img").attr({'src':real_src}).load(function(){
					$(this).remove();
					img_type.fadeOut("slow", function(){
						total_img--;
						$(this).css({'background-image':'url('+real_src+')'}).removeClass(ref_type.substring(1));
						if(opts[0].length){
							if(opts[0] == "contain"){
								var class_itm_img = "pos-center bck-contain";
							} else {
								var class_itm_img = "pos-center bck-cover";
							}
						} else {
							var class_itm_img = "pos-center bck-cover";
						}
						$(this).addClass(class_itm_img).fadeIn();
						if(total_img < 1){	if($(type_box).attr("data-pos") != 1){	$(type_box).fadeOut(function removeAdd(){$(this).remove();});}}
					});
				});
			}
		}
	});
}
function fadeBoxeffect(box_type, value, opts, type){
	if(type == 1){
		$(box_type).hide();
		$(box_type).each(function(i){
			$(this).delay(value*i).fadeIn();
		});
	} else if(type == 2){
		if(opts[1] < opts[3]){
			var inpt_sufx_folio = opts[0];
			var inpt_name_folio = inpt_sufx_folio+opts[1];
			if($('input[name='+inpt_sufx_folio+opts[1]+']').length > 0){
				box_type.each(function(index){
					if($('input[name='+inpt_sufx_folio+index+']').length < 1){
						inpt_name_folio = inpt_sufx_folio + index;
						return false;
					}
				});
			}
			if(value[0] == 1){
				opts[2].append('<li class="float-l double-box-1 bg-grey-1 vmarg-5 marg-1 itm-link-box min-rounded pointer">'+
							'<div class="float-l full-box padd-1">'+
							'<em class="float-l">'+value[1]+'.'+value[2]+'</em>'+
							'<span class="close-folio float-r hpadd-5 t10 pointer min-rounded bg-red-2 white">x</span>'+
							'<input type="hidden" name="'+inpt_name_folio+'" value="'+value[3]+'" />'+
							'</div>'+
							'</li>');
			} else if(value[0] == 2){
				opts[2].append('<li class="float-l double-box-1 bg-grey-1 vmarg-5 marg-1 itm-link-box min-rounded pointer">'+
							'<div class="float-l full-box padd-1">'+
							'<em class="float-l">'+value[1]+'</em>'+
							'<span class="close-folio float-r hpadd-5 t10 min-rounded pointer bg-red-2 white">X</span>'+
							'<input name="'+value[2]+'" type="hidden" value="'+value[3]+'" />'+
							'<input name="'+value[4]+'" type="hidden" value="'+value[5]+'" />'+
							'</div>'+
							'</li>');
			}
			return false;
		}
	}
}
function display_mod_upload(elem,name_box,name_box_list,switcher,form_input,opts,type){
	if(switcher == 0){
		if(name_box.length >= 1){
			name_box.prepend('<nav class="float-l '+name_box_list+'" data-ref="'+opts[0]+'">'+
					'<li class="attachment-btn float-l upld-file-box white min-rounded pointer bg-grey hmarg-4 padd-2 min-btn-link" data-mod="'+type+'">'+
					'<input type="file" class="float-l pointer user_file" name="'+form_input+'" /><span class="float-l pict-1 upld-1"></span>'+
					'</li>'+
					'</nav>');
		}
		$("."+name_box_list).fadeIn();
		elem.attr("data-view",1);
	} else {
		$("."+name_box_list).fadeOut(function(){	$(this).remove();});
		elem.attr("data-view",0);
	}
}
function attachmentViewer(Elem, type, uploadframe, file_box, version_upload, array){
	if($('#msg').length >= 1){$('#msg').hide(function(){$(this).remove();});}
	Elem.parents('form').removeAttr('action').removeAttr('target');
	if(type == 1){
		$(uploadframe).remove().queue(function(){
			if($("div[data="+version_upload+"]").length < 1){
				Elem.find(file_box).append('<li class="float-l file-upload bg-grey-4 box-rltiv vmarg-5 hmarg-5 fix-box-100 min-h-80 iln-block" data="'+version_upload+'" title="'+array.nom_file+'.'+array.extension_file+'">'+'<div class="file-upload-close pointer pos-top-0 pos-rgh-0 box-abst padd-8 bg-red-2 white">x</div><img class="block icon-80 min-rounded csr-normal vmarg-5 hmarg-auto" src="'+array.path_theme_file+'" />'+'<input type="hidden" name="user_files[]" value="'+array.nom_file+'.'+array.extension_file+'" />'+'</li>');
				if(array.img_display == 1){
					 $("div[data="+version_upload+"] .file-upload-close").after('<img class="block icon-80 min-rounded pointer vmarg-5 hmarg-auto" src="'+array.path_theme_file+'" />');
					 if(Elem.find('#msg').length >= 1){
						 Elem.find('#msg').text('').fadeIn().append('<img class="block hmarg-auto" src="'+array.path_theme_file+'" width="60%" />');
					 }
				} else {
					if($('#msg').length >= 1){$('#msg').text('').fadeOut();}
				}
			}
			$(".list-upload-mod").fadeOut(function(){	$(this).remove();});
			$(".btn-att").attr("data-view",0);
			$(this).dequeue();
		});
	} else if(type == 2){
		$(uploadframe).remove().queue(function(){
			var nme_input = Elem.find(file_box).attr("data-rfname");
			Elem.find(".pict-file").text(array.nom_file);
			if(Elem.find(file_box+" input").length < 1){
				Elem.find(file_box).append('<input type="hidden" name="'+nme_input+'" class="img-value" value="'+array.path_theme_file+'" />');
			} else {
				Elem.find(file_box+" input").attr("name",nme_input).val(array.path_theme_file);
			}
			if(Elem.find(file_box+" img").length){
				Elem.find(file_box+" img").fadeOut().attr("src",array.path_theme_file).delay(5).fadeIn();
			} else {
				Elem.find(file_box).append('<img class="hmarg-auto" src="'+array.path_theme_file+'" height="100%" style="display:none;" title="'+array.nom_file+'"/>');
				Elem.find(file_box+" img").fadeIn();
			}
			Elem.find(file_box+" input").attr("name",nme_input);
			Elem.find(".update-bar nav").remove();
			$(this).dequeue();
		});
	} else if(type == 3){
		if(file_box == "update-pict-box"){
			var nme_input = Elem.attr("data-rfname");
			Elem.children('img').attr('src', array.path_theme_file);
			if(Elem.children("input").length < 1){
				Elem.append('<input type="hidden" name="'+nme_input+'" class="img-value" value="'+array.path_theme_file+'" />');
			} else {
				Elem.children("input").val(array.path_theme_file);
			}
			Elem.children("input").attr("name",nme_input);
			$(".update-bar nav").fadeOut(function(){$(this).remove()});
		}
	} else if(type == 4){
		if($(Elem).length >= 1){
			Elem.append('<li class="float-l file-upload bg-grey-4 box-rltiv vmarg-5 hmarg-5 fix-box-100 min-h-80 iln-block" title="'+file_box+'">'+'<div class="file-upload-close pointer pos-top-0 pos-rgh-0 box-abst padd-8 bg-red-2 white">x</div><img class="block icon-80 min-rounded csr-normal vmarg-5 hmarg-auto" src="'+array.path_theme_file+'" />'+'<input type="hidden" name="user_files[]" value="'+array.path_theme_file+'" />'+'</li>');
		}
		$(".list-upload-mod").fadeOut(function(){	$(this).remove();});
		$(".btn-att").attr("data-view",0);
	} else if(type == 5){
		var nme_input = Elem.attr("data-rfname");
		Elem.find(".pict-title").text(array.nom_file+'.'+array.extension_file);
		if(Elem.find(".img-value").length < 1){	Elem.append('<input type="hidden" name="'+nme_input+'" class="img-value" value="'+array.path_theme_file+'" />');} else {	Elem.find(".img-value").val(array.path_theme_file);}
		$(".list-upload-mod").fadeOut(function(){	$(this).remove();});
		Elem.find(".btn-add-file").attr("data-view",0);
	} else if(type == 6){
		var count_itm_folio = Elem.find('.data-folio li').length;
		fadeBoxeffect(Elem.find('.data-folio li'), [1, array.nom_file, array.extension_file, array.path_theme_file], ["add_link_folio_", count_itm_folio, Elem.find('.data-folio nav'), 12], 2);
	} else if(type == 7){
		if(Elem.find('.pict-box-view').length < 1){
			Elem.append('<div class="float-l pict-box-view full bg-white">'+
					'<div class="vmarg-10 hmarg-auto blk-box-70 min-rounded text-center box-rltiv min-h-100">'+
					'<div class="update-pict-box full min-h-80">'+
					'<img class="hmarg-auto" src="'+array.path_theme_file+'" height="100%">'+
					'</div>'+
					'</div>'+
					'</div>');
		} else {
			Elem.find('.pict-box-view img').attr('src', array.path_theme_file);
		}
		Elem.find('.hide-pict-inpt').attr('value', array.path_theme_file).removeClass('required').removeAttr("data-inpt");
	}
}
function MoveUploadBridge(elem_form, upload_mod, path_to_work, frame_name, name_file_time, uploader_datas){
	elem_form.parents('form').attr({action: path_to_work, method:'post', enctype:'multipart/form-data', target:'upload-frame-destination'});
	if($('#msg').length >= 1){$('#msg').html('uploading...').fadeIn();}
	var input_cnt = elem_form.find("input");
	elem_form.parents('form').find('.name_upload_file').attr('value', name_file_time);
	$('body').append('<iframe id="'+frame_name+'" name="upload-frame-destination"></iframe>');
	elem_form.closest('form').submit();
	if($('#'+frame_name).html() != null){
		$('#'+frame_name).on('load',function(){
			if($(this).contents()[0].location.href.match($(this).parent('form').attr('action'))){
				$.ajax({
				  type: "POST",
				  url: path_to_work,
				  data: uploader_datas,
				  dataType: "json",
				  success: function(results){
					  if(results.success_code_file == 1){
						  input_cnt.replaceWith(input_cnt.val('').clone(true));
						  if(upload_mod == 1){
							  attachmentViewer(elem_form.parents("fieldset"), 1, "#"+frame_name, ".update-attch-box", name_file_time, results);
						  } else if(upload_mod == "upload_file"){
							  var work_folder_path = $(".folder_explore").val();
							  $('#'+frame_name).remove().queue(function(){
								  elem_form.parents('form').removeAttr('action').removeAttr('target').find("input[name=swing_path]").remove();
								  browseFolder_viewList(work_folder_path,0,'return_folder');
								  $(this).dequeue();
							  });
						  } else if(upload_mod == 2){
							  attachmentViewer(elem_form.parents("fieldset"), 2, "#"+frame_name, ".update-pict-box", name_file_time, results);
						  } else if(upload_mod == 3){
							  attachmentViewer(elem_form.parents(".update-block"), 5, "#"+frame_name, ".update-block", name_file_time, results);
						  } else if(upload_mod == 4){
							  input_cnt.replaceWith(input_cnt.val('').clone(true));
							  attachmentViewer(elem_form.parents(".add-folio-box"), 6, "#"+frame_name, ".data-folio", name_file_time, results);
							  $('#'+frame_name).remove().queue(function(){
								  elem_form.parents('form').removeAttr('action').removeAttr('target').find("input[name=swing_path]").remove();
								  $(this).dequeue();
							  });
						  } else if(upload_mod == 5){
							  input_cnt.replaceWith(input_cnt.val('').clone(true));
							  attachmentViewer(elem_form.parents(".profil-pict-box"), 7, "#"+frame_name, ".data-folio", name_file_time, results);
							  $('#'+frame_name).remove().queue(function(){
								  elem_form.parents('form').removeAttr('action').removeAttr('target').find("input[name=swing_path]").remove();
								  $(this).dequeue();
							  });
						  }
						  AlertBox(".modal-bckground",results.msg_file_return, 1, 1, 2000);
					  } else {
						  AlertBox(".modal-bckground",results.msg_file_return, 2, 1, 3000);
						  input_cnt.replaceWith(input_cnt.val('').clone(true));
						  $('#'+frame_name).remove();
					  }
				  }
			  });
			}
			return false;
		});
		$('#'+frame_name).attr({method:'post', enctype:'multipart/form-data', target:'upload_frame'}).submit();
	}
}
function getNameToShare(href_btn,type_return,share_infos,opts,type){
	if(href_btn.length){
		var share_url = share_infos.infos.url_link;
		var share_image = share_infos.infos.images;
		var title_link = share_infos.infos.titre;
		var description = share_infos.infos.desc;
		var sitenom = share_infos.infos.nom;
		if(type == 1){
			if(href_btn == "facebook"){
				var url_share_final  = "https://www.facebook.com/sharer.php?s=100&p[title]="+(title_link)+"&p[summary]="+description+"&p[url]="+encodeURIComponent(share_url)+"&p[images][0]="+(share_image);
				var window_name = 'facebookwindow';
			} else if(href_btn == "google"){
				var url_share_final = "https://plus.google.com/share?url="+encodeURIComponent(share_url);
				var window_name = 'googlewindow';
			} else if(href_btn == "twitter"){
				var url_share_final = "https://www.twitter.com/share?text="+(title_link)+"&url="+encodeURIComponent(share_url);//+"&via="+sitenom;
				var window_name = 'twitterwindow';
			} else if(href_btn == "pinterest"){
				var url_share_final = "http://pinterest.com/pin/create/bookmarklet/?media="+encodeURIComponent(share_image)+"&url="+encodeURIComponent(share_url)+"& is_video=false&description="+encodeURIComponent(title_link);
				var window_name = 'pinterestwindow';
			} else if(href_btn == "tumblr"){
				var url_share_final = "http://www.tumblr.com/share?v=3&u="+encodeURIComponent(share_url)+"&t="+encodeURIComponent(title_link);
//"https://www.tumblr.com/share/photo?source="+encodeURIComponent(share_image)+"&caption="+encodeURIComponent(description)+"&clickthru="+encodeURIComponent(share_url);
				var window_name = 'tumblrwindow';
			} else if(href_btn == "linkedin"){
				var url_share_final = "https://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(share_url)+"&title="+(title_link)+"&source="+encodeURIComponent(share_url);
				var window_name = 'linkedinwindow';
			} else if(href_btn == "reddit"){
				var url_share_final = "https://www.reddit.com/submit?url="+encodeURIComponent(share_url)+"&title="+(title_link);
				var window_name = 'reddit';
			} else if(href_btn == "buffer"){
				var url_share_final = "http://bufferapp.com/add?text="+(title_link)+"&url="+encodeURIComponent(share_url);
				var window_name = 'buffer';
			} else if(href_btn == "digg"){
				var url_share_final = "http://digg.com/submit?url="+encodeURIComponent(share_url)+"&title="+(title_link);
				var window_name = 'digg';
			} else if(href_btn == "stumbleupon"){
				var url_share_final = "http://www.stumbleupon.com/submit?url="+encodeURIComponent(share_url)+"&title="+(title_link);
				var window_name = 'stumbleupon';
			} else if(href_btn == "delicious"){
				var url_share_final = "https://delicious.com/save?v=5&provider="+sitenom+"&noui&jump=close&url="+encodeURIComponent(share_url)+"&title="+(title_link);
				var window_name = 'delicious';
			} else if(href_btn == "evernote"){
				var url_share_final = "http://www.evernote.com/clip.action?url="+encodeURIComponent(share_url)+"&title="+(title_link);
				var window_name = 'evernote';
			} else if(href_btn == "wordpress"){
				var url_share_final = "http://wordpress.com/press-this.php?u="+encodeURIComponent(share_url)+"&t="+(title_link)+"&s="+description+"&i="+(share_image);
				var window_name = 'wordpress';
			} else if(href_btn == "pocket"){
				var url_share_final = "https://getpocket.com/save?url="+encodeURIComponent(share_url)+"&title="+(title_link);
				var window_name = 'pocket';
			}
			newwindow = window.open(url_share_final,"_blank","toolbar=0, scrollbars=0,location=0, menubar=0, resizable=0, directories=0, top="+($(window).height() / 2 - 225) +", left="+($(window).width() / 2 - 300) +", width=400, width=650, height=400");
		}
	}
}
$(function(){
	getDevice();
	$(window).resize(function(){	getDevice();});
	$.ajax({
		type: "POST",
		url: "/admin/includes/ajax-query.php",
		data: "alertType=pp_cntr&screen=view",
		dataType: "json",
		success: function(msgbox){
			if(msgbox.data == 1){
				bg_preload("alert-bckground", 100, '', 1);
				if($(".alert-bckground").length){
					$(".alert-bckground").append(msgbox.val_box.dscr_ctn);
				}
			}
		}
	});
	if($("#center").hasClass("accueil")){
		$("#conteneurtitre").remove();
		$("#menucenter").append('<div class="float-l full bg-site vpadd-10"><nav class="blk-box-1280 hmarg-auto"><li class="float-l full-box t22 white hmarg-1 small-marg-btm line-h1-6"> Le réseau d\'échange de services GAGNANT - GAGNANT dédié à la communication, web & multimédia dans l\'hôtellerie, la restauration et le bien-être</li><li class="float-l full-box hmarg-1 clr-black"><div class="float-l full t-11 strong vmarg-5">Préinscription gratuite</div><div class="float-l full vmarg-5">Rejoignez le réseau avant le lancement et soyez les premiers à bénéficier de l\'offre à moindres frais</div></li></nav></div>');
	}
	$("body").on("click", ".menubar-close,.menu-rsp-list", function(){
		if($(this).hasClass("menubar-close")){
			if($(window).width() > 960){
				slideMovmnt(".menubar-close", "data-psn-menu", "#col-1", "left", ".btn-menu-mobile", -215, 0, 190);
			} else {
				slideMovmnt(".menubar-close", "data-psn-menu", "#col-1", "left", ".btn-menu-mobile", -300, 0, 190);
				bg_preload("modal-bckground-nd",100,'',2);
			}
		} else if($(this).hasClass("menu-rsp-list")){
			if($("#col-1").length < 1){
				$.ajax({
					type: "POST",
					url: "/admin/includes/ajax-query.php",
					data: "rsp_mn_itm=1&nsw_type=menu_list",
					dataType: "json",
					success: function(rsp_itm){
						if(rsp_itm.code_return == 1){
							$("body").append('<div id="col-1" class="shadow h-100"><div class="float-l full bg-dark-2 h-100">'+
											'<div class="float-l full small-marg-btm">'+
											'<span data-psn-menu="1" class="vpadd-10 hpadd-10 menubar-close bg-site t18 float-r white pointer">x</span>'+
											'</div>'+
											'<div class="float-l full-box rsp-logo hmarg-1 text-center small-marg-btm"></div>'+
											'<nav class="float-l full-box line-h1-4 small-marg-top hmarg-1 min-marg-btm rsp-list-itm"></nav>'+
											'</div></div>');
							if(rsp_itm.list.logo.length > 0){	$(".rsp-logo").append('<a href="/" class="icon-100 block vmarg-5 hmarg-auto"><img class="float-l full" src="'+rsp_itm.list.logo+'" /></a><div class="float-l full-box t10 white line-h1-4 vmarg-5 hmarg-1">'+'&nbsp;'+'</div>');} else {	$(".rsp-logo").append('<a href="/" class="float-l full-box t10 white line-h1-4 vmarg-5 hmarg-1">'+'&nbsp;'+'</a>');}//rsp_itm.list.slogan
							if(rsp_itm.list.name.length >= 1){
								$.each(rsp_itm.list.name, function(nb_rsp, item){
									if(rsp_itm.sub_list.check[nb_rsp] == 0){
										$("#col-1 .rsp-list-itm").append('<a class="float-l full-box marg-1 white t18 border-bottom" href="'+rsp_itm.list.ulink[nb_rsp]+'"><em class="float-l full-box vpadd-5 hmarg-1">'+rsp_itm.list.name[nb_rsp]+'</em></a>');
									} else {
										$("#col-1 .rsp-list-itm").append('<li class="float-l full smart-marg-btm" data-nbr="'+nb_rsp+'"><a class="float-l full-box marg-1 white t18 border-bottom" href="'+rsp_itm.list.ulink[nb_rsp]+'"><em class="float-l full-box vpadd-5 hmarg-1">'+rsp_itm.list.name[nb_rsp]+'</em></a></li>');
										$.each(rsp_itm.sub_list.itm.name[nb_rsp], function(nb_sub_link, item2){
											$('.rsp-list-itm li[data-nbr='+nb_rsp+']').append('<a href="'+rsp_itm.sub_list.itm.ulink[nb_rsp][nb_sub_link]+'" class="float-l white full-box marg-1"><em class="float-l full-box t18 vpadd-5 hmarg-1"> > '+rsp_itm.sub_list.itm.name[nb_rsp][nb_sub_link]+'</em></a>');
										});
									}
								});
							}
							var clone_menubar = $("#col-1").clone();
							slideMovmnt(".menu-rsp-list", "data-psn-menu", "#col-1", "left",".menubar-close", 0, 0, 190);
							bg_preload("modal-bckground-nd",100,'',1);
							$("#col-1").wrap('<div class="del-col-1"></div>');
							if($(".modal-bckground-nd").length){
								clone_menubar.appendTo(".modal-bckground-nd").css("position","static");
								$(".del-col-1").remove();
							}
							return false;
						}
					}
				});
			}
		}
	});
	$("body").on("hover, click ",".box-come,img",function(){
		if($(this).hasClass("box-come")){
			var box_parent = $(this).parent();
			if(box_parent.find(".box-share-viewer").length < 1){
				$.ajax({
					type: "POST",
					url: "/admin/includes/ajax-query.php",
					data: "share_links=get_share_link",
					dataType: "json",
					success: function(linkShare){
						$(".box-share-viewer").remove();
						if($(".box-share-viewer").length < 1){
							box_parent.append('<div class="box-share-viewer float-l bg-white csr-normal min-rounded shadow">'+
	'<div class="float-l t14 border-bottom full-box hmarg-1"><span class="float-l full-box marg-1">Partager</span></div>'+
								'<nav class="float-l full-box hmarg-1 vpadd-5" data-src="actualites">'+'</nav>'+
								'</div>');
							var box_work = box_parent.find(".box-share-viewer");
							$.each(linkShare.share_id, function(key, val){
								box_parent.find(".box-share-viewer nav").append('<a class="float-l '+linkShare.share_class[key]+' share-1 pointer hmarg-4 min-btn-link dater min-rounded bg-grey-1">'+
																			'<span class="float-l pict-3 share-'+val+' min-rounded"></span>'+
																			'<input type="hidden" data-name="'+val+'">'+
																			'</a>');
							});
							box_work.fadeIn();
						}
					}
				});
			}
		} else {
			$(".sc-link-box").fadeOut(function(){	$(this).remove();});
			if($(this).parent('.share-pict').length >= 1){
				if($(this).parents(".art-ctn-view").length >= 1){
					var art_number = $(this).parents(".art-ctn-view").find(".share-bar nav").attr("data-number");
				}
				$.ajax({
					type: "POST",
					url: "/admin/includes/ajax-query.php",
					data: "share_links=get_share_link",
					dataType: "json",
					context: this,
					success: function(linkShare){
						if($(this).parent().find(".sc-link-box nav").length < 1){
							$(this).parent().append('<div class="float-l full h-100 sc-link-box text-center box-abst" style="left:0;"><nav class="hmarg-auto hide box-rltiv shadow" style="top:45%;" data-number="8"></nav></div>');
							var box_work = $(this).parent().find("nav");
							$.each(linkShare.share_id, function(key, val){
								box_work.append('<li class="float-l padd-10 min-btn-link '+linkShare.share_class[key]+'-share share-2 pointer"><span class="float-l pict-3 share-'+val+'"></span><input type="hidden" data-name="'+val+'"></li>');
							});
							$(this).parent().find('nav.hmarg-auto').fadeIn().removeClass("hide").css({"display":"inline-block"});
						}
					}
				});
			}
		}
	});
	$("body").on("click mouseleave",".sc-link-box", function(){
		if($(".sc-link-box nav").length){
			$(".sc-link-box").fadeOut(function(){	$(this).remove();});
		}
	});
	$("body").on("click",".btn-close-box,.slide-mvmnt,.close-popr",function(){
		if($(this).hasClass("slide-mvmnt")){
			var ref_itm = $(this).attr("data-href");
			if(ref_itm){
				$("html, body").animate({ scrollTop: $(ref_itm).offset().top }, 500);
			}
			return false;
		} else if($(this).hasClass("close-popr")){
			var data_itm = $(this).attr("data-itm");
			if(data_itm){
				$.ajax({
					type: "POST",
					context: this,
					url: "/admin/includes/ajax-query.php",
					data: "alertType="+data_itm,
					dataType: "json",
					success: function(alertPop){
						if(alertPop.data == 1){
							hide_cnt_box(".flash-box-itm",[$(this), $("#modal-bckground")],2);
						}
					}
				});
			}
		} else if($(this).hasClass("btn-close-box")){
			hide_cnt_box(".flash-box-itm",[$(this), $("#modal-bckground")],2);
		}
	});
	$("body").on("click", ".close-window-item,.file-upload-close", function(){
		if($(this).hasClass("close-window-item")){
			$("#modal-bckground").fadeOut(function(){	$(this).remove();});
		} else if($(this).hasClass("modal-bckground-nd")){
			slideMovmnt(".menubar-close", "data-psn-menu", "#col-1", "left", ".btn-menu-mobile", -300, 0, 190);
			bg_preload("modal-bckground-nd", 100, '', 2);
			$("html,body,#general-content,#block-center").removeClass("bck-fixed");
		} else {
			$(this).parents(".file-upload").fadeOut(function(){	$(this).remove();});
		}
	});
	$("body").on("click",".shopp-photo-view,.shopp-video-view,.big-scrn-close",function(){
		if($(this).hasClass("shopp-photo-view")){
			var itm_scrn_pict = $(this).parents("li").attr("data-itm");
			$.ajax({
				type: "POST",
				url: "/admin/includes/ajax-query.php",
				data: "big_itm_scrn=large&value_itm="+itm_scrn_pict,
				dataType: "json",
				success: function(viewPict){
					if(!$("#modal-bckground").length){	$("body").append('<div id="modal-bckground" class="modal-bckground-nd"></div>');}
					$("#modal-bckground").fadeIn();
					$("#modal-bckground").append('<div class="min-marg-top hmarg-auto shadow" style="max-width:600px;"><div class="float-l full-box padd-1 bg-white">'+
												'<div class="float-l full small-marg-btm"><div class="float-l t14 color-link">'+viewPict.scrn_img_name+'</div><div class="big-scrn-close float-r majuscule clr-grey pointer">Close</div></div>'+
												'<div class="float-l full b-norepeat min-h-400 img-link-box" data-src="'+viewPict.scrn_nom+'"></div>'+
												'</div></div>');
					load_img('.img-link-box', ['cover',1, ''], 1);
				}
			});
		} else if($(this).hasClass("shopp-video-view")){
			var itm_scrn_pict = $(this).parents("li").attr("data-itm");
			$.ajax({
				type: "POST",
				url: "/admin/includes/ajax-query.php",
				data: "big_itm_scrn=video&value_itm="+itm_scrn_pict,
				dataType: "json",
				success: function(viewPict){
					if(!$("#modal-bckground").length){
						$("body").append('<div id="modal-bckground" class="modal-bckground-nd"></div>');
					}
					$("#modal-bckground").fadeIn();
					$("#modal-bckground").append('<div class="min-marg-top hmarg-auto shadow" style="max-width:700px;"><div class="float-l full-box padd-1 bg-white">'+
												'<div class="float-l full small-marg-btm"><div class="float-l t14 color-link">'+viewPict.scrn_img_name+'</div><div class="big-scrn-close float-r majuscule clr-grey pointer">Close</div></div>'+
												'<div>'+viewPict.scrn_src+'</div>'+
												'</div></div>');
					load_img('.img-link-box', ['cover',1, ''], 1);
				}
			});
		} else if($(this).hasClass("big-scrn-close")){
			bg_preload("modal-bckground-nd",100,'',2);
		}
	});
	$("body").on("mouseout, mouseleave",".box-share-viewer",function(){
		$(this).fadeOut(function(){	$(this).remove();});
	});
	$("body").on("click",".cgu-view,.cgv-view",function(){
		if($(this).hasClass("cgu-view")){	var dir_path = "cgu";} else if($(this).hasClass("cgv-view")){	var dir_path = "cgv";}
		$.ajax({
			type: "POST",
			url: "/admin/includes/ajax-query.php",
			data: "box_rtrn_datas=&ctnvalue_itm="+dir_path,
			dataType: "json",
			success: function(dataBox){
				if(dataBox.code_return == 1){
					var create_box = AlertBox('.modal-bckground', ['blk-box-70','','screen-rsp-600 ofw-y-scroll'], '', 2, 100);
					if(create_box == true){
						$('.pop-ttl-box'). append('<div class="float-l t18 color-link strong vmarg-5">'+dataBox.data_ctn.title+'</div>');
						$('.pop-ctn-box').append('<form class="float-l full" method="post">'+dataBox.data_ctn.ctn_box+'</form>');
					}
				}
			}
		});
	});
	$("body").on("click",".dtl-offers-btn,.add-itm-skills,.close-itm-skills",function(){
		if($(this).hasClass("dtl-offers-btn")){
			var parentBox = $(this).parent();
			if(parentBox.find(".dtl-list-offers").length){
				if(parentBox.find(".dtl-list-offers").hasClass("hide")){
					$(this).find(".div-box-10").text("-");
					parentBox.find(".dtl-list-offers").fadeIn().removeClass("hide");
				} else {
					$(this).find(".div-box-10").text("+");
					parentBox.find(".dtl-list-offers").fadeOut().addClass("hide");
				}
			}
		} else if($(this).hasClass("add-itm-skills")){
			var parentBox = $(this).parents(".ctn-skills-box");
			if(parentBox.find("nav li").length < 10){
				parentBox.find("nav").append('<li class="float-l full input-box vmarg-5">'+
												'<div class="float-l div-box-90">'+
												'<label class="float-l pos-1">&nbsp;</label>'+
												'<input class="required inpt-field-1" data-inpt="1" name="procom_comptences[]" type="text" />'+
												'</div>'+
												'<div class="float-r div-box-10 text-center">'+
												'<div class="iln-block vmarg-2 padd-5 bg-grey-1 min-rounded close-itm-skills pointer hmarg-auto">x</div>'+
												'</div>'+
												'</li>');
			}
		} else if($(this).hasClass("close-itm-skills")){
			var parentBox = $(this).parents("li");
			if($(this).parents(".ctn-skills-box nav").find("li").length > 1){
				parentBox.fadeOut(function(){	$(this).remove();});
			}
		}
	});
	//LIMIT INPUT CHARS
	$("body").on("keyup", ".chars-lmtd", function(){
		if($(this).attr("maxlength")){	var max_chars = $(this).attr("maxlength");} else {	var max_chars = 15;}
		if($(this).val().length > max_chars){
			$(this).val($(this).val().substr(0, max_chars));
		}
	});
	//TOGGLE
	$("body").on("click change",".selectr-box,.selectr-box2,.toggle-input,.toggle-input-2",function(){
		if($(this).hasClass("selectr-box")){
			selectrBox($(this), '', ["hide","#",".selctr-box-list",".selctr-box-dtl"], 1);
		} else if($(this).hasClass("selectr-box2")){
			selectrBox($(this), '', ["hide","#",".selctr-box-itm",40], 2);
		} else {
			toggle_value = $(this).children('input').val();
			id_btn_input = $(this).children('input').attr('name');
			if($(this).hasClass("toggle-input")){
				get_val_input(id_btn_input,$(this),toggle_value,1);
			} else {
				get_val_input($(this),[".toggle-input-2",$(this).parents(".toggle-choose")],toggle_value,2);
			}
		}
	});
	//PICT
	$("body").on("click", ".btn-att,.btn-add-file,.btn-upload-mod,.btn-update-form,.btn-add-folio,.btn-update", function(){
		if($(this).hasClass("btn-update")){
			var datas_mode = [$(this).parents(".update-bar"), "img_upld", 'pct', 2];
		} else if($(this).hasClass("btn-add-folio")){
			var datas_mode = [$(this).parents(".update-bar"), "img_upld2", 'pct', 2];
		} else if($(this).hasClass("btn-add-file")){
			var datas_mode = [$(this).parents(".update-bar"), "cfg_upld", 'add-file', 3];
		} else if($(this).hasClass("btn-att")){
			var datas_mode = [$(this).parents(".update-bar"), "atch_upld", 'attmnt', 1];
		}
		if(datas_mode){
			var upload_view = $(this).attr("data-view");
			$.ajax({
				type: "POST",
				url: "/admin/includes/ajax-query.php",
				data: "file_detct_itm=1",
				dataType: "json",
				context: this,
				success: function(file_detct){
					display_mod_upload($(this), datas_mode[0], "list-upload-mod", upload_view, datas_mode[1],[datas_mode[2],file_detct.value],datas_mode[3]);
				}
			});
		}
	});
	$("body").on("click",".attch-video-itm,.close-folio",function(){
		if($(this).hasClass("attch-video-itm")){
			var nb_itm_link = $(this).parents('.add-folio-box').find('.data-folio li').length;
			if(nb_itm_link < 12){
				var ref_box = $(this).attr("data-ref");
				var create_box = AlertBox('.modal-bckground', ['blk-box-30','','min-h-150 ofw-y-scroll',1], '', 2, 100);
				if(create_box == true){
					$('.pop-ttl-box'). append('<div class="float-l t18 color-link strong vmarg-5">Visuel avec lien vers une vidéo</div>');
					$('.pop-ctn-box').append('<form class="float-l full" method="post" data-prc="add-video-itm" data-ref="'+ref_box+'">'+
									'<fieldset class="float-l full-box hmarg-1">'+
									'<div class="float-l full input-box vmarg-5"><label class="float-l vmarg-7 min-tab">Lien</label><input type="text" class="required inpt-field-1 inpt-url" data-inpt="1" name="video_link" /></div>'+
									'<div class="float-l update-block full-box small-marg-btm hmarg-1 shadow-light wg-min-pict" data-pos="img" data-opts=",update-bar,btn-update,avatar_user,1,/theme/images/no_pict_icon.jpg,h"></div>'+
									'</div>'+
									'</fieldset>'+
									'<fieldset class="float-l full-box hmarg-1">'+
									'<div class="sbmt-link text-center pointer min-rounded bg-site white float-r" data-name="add_video_itm">Ok</div>'+
									'<input type="hidden" class="name_upload_file" name="name_upload_file">'+
									'</fieldset>'+
									'</form>');
					morph_box($(".update-block"),"",'',3);
					load_img('.img-link-box', ['cover',1, ''], 1);
				}
			}
		} else if($(this).hasClass("close-folio")){
			var parentBox = $(this).parents('li.itm-link-box');
			if(parentBox.length){	parentBox.fadeOut(function(){	$(this).remove();})}
		}
	});
	$("body").on("change",".attachment-btn,.btn-folio,.btn-pictr",function(){
		var name_upload_file = $.now();
		var uploader_path = "/admin/includes/upload-file.php";
		if($(this).hasClass("attachment-btn")){
			if($(this).attr("data-mod").length){
				MoveUploadBridge($(this), $(this).attr("data-mod"), uploader_path, "upload-frame", name_upload_file, "get_photo_file=1&name_upload_file="+name_upload_file);
			}
		} else if($(this).hasClass("btn-pictr")){
			MoveUploadBridge($(this), 5, uploader_path, "upload-frame", name_upload_file, "get_photo_file=1&name_upload_file="+name_upload_file);
		} else if($(this).hasClass("btn-folio")){
			var nb_itm_link = $(this).parents('.add-folio-box').find('.data-folio li').length;
			if(nb_itm_link < 12){
				MoveUploadBridge($(this), 4, uploader_path, "upload-frame", name_upload_file, "get_photo_file=1&name_upload_file="+name_upload_file);
			}
		}
	});
	//VERIF LIST PRESTATION
	//$("body").on("click",".",function(){
	//});
	//SHARE PRC
	$("body").on("click",".share-btn-details,.share,.share-1,.share-2",function(e){
		if($(this).hasClass("share-btn-details")){
			var data_bar_value = $(this).attr("data-bar-value");
			if(data_bar_value == 0){
				$.ajax({
					type: "POST",
					context: this,
					url: "/includes/QueryCnt/share-Process.cnt.php",
					data: "share_checkup=get_share_link",
					dataType: "json",
					success: function(linkShare){
						for(nb_links=0 ; nb_links<linkShare.share_id.length; nb_links++){
							$(this).parents(".share-bar").find("nav").append("<a class='"+linkShare.share_class[nb_links]+" vmarg-3 hmarg-2 padd-8 share pointer second min-rounded'><div>"+linkShare.share_nom[nb_links]+"</div><input type='hidden' data-name='"+linkShare.share_id[nb_links]+"' /></a>");
						}
					 }
				});
				$(this).attr("data-bar-value",1).find("span").text('-');
			} else {
				$(".share-bar a.second").remove();
				$(this).attr("data-bar-value",0).find("span").text('+');
			}
		} else {
			e.preventDefault();
			var name_to_share = $(this).children("input").attr("data-name");
			if($(this).hasClass("share") || $(this).hasClass("share-2")){
				var id_to_share = $(this).parents(".art-ctn-view").find(".share-bar nav").attr("data-number");
				var data_to_share = $(this).parents("article").attr("data-src");
			} else {
				var id_to_share = $(this).parents("li").find(".actu-itm").attr("data-number");
				var data_to_share = $(this).parents("nav").attr("data-src");
			}
			if($(this).parents(".share-pict").find("img").length >= 1){
				var pict_sharer = $(this).parents(".share-pict").find("img").attr("src");
			} else {
				var pict_sharer = "";
			}
			if(data_to_share.length && id_to_share){
				$.ajax({
					type: "POST",
					url: "/includes/QueryCnt/share-Process.cnt.php",
					data: "share_checkup=get_infos_share&share_name="+name_to_share+"&ref="+id_to_share+"&post_return="+data_to_share+"&img_sharer="+pict_sharer,
					dataType: "json",
					async: false,
					success: function(p_share){
						if(p_share.share_return == 1 || p_share.share_return != null){
							getNameToShare(p_share.data,0,p_share,'',1);
						}
					 }
				});
			}
		}
	});
	morph_box($(".update-block"),"",'',3);
	load_img('.img-link-box', ['cover',1, ''], 1);
});
