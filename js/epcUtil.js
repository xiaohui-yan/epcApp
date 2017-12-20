window.epcUtil = {
	//加载data-list
	renderDataList:function(dialog,point,page,rows){
		/**
		 * 待实现
		 */
	},
	//初始化加载数据
	renderStartFlow:function(formtemp,tabList){
		var startflow = {};
		var json = {};
		var data = {};
		tabList.forEach(function(value){
			if(value.active == true){
				data = {
						extensionid:'com.epc.epcfoundation.extensions.ui.standardflow',
						functionpointid:value.action.functionpointid,
						componentid:formtemp.componentid,
						formname:formtemp.formname,
						functiongroupid:formtemp.functiongroupid,
						actionextension:formtemp.actionextension,
						buttonid:formtemp.buttonid,
						selrowid:formtemp.selrowid,
						ajaxtype:'post', 
				};
				mui.ajax(epc.root+'/extension/extensionAction.action',{
					data:data,
					type:'get',//HTTP请求类型
					dataType:'html',
					async: false,
					timeout:10000,//超时时间设置为10秒；
					success:function(data){
						var jsons = $(data).find('#jsondata').html();
						if(typeof jsons == 'undefined'){
							dialog.toast('读取数据异常！', 'error', 1000);
						}
						try{
							json = JSON.parse($.trim(jsons));//eval("(" + jsons + ")");//JSON.parse($.trim(json));//获取json数据
							json.formname = formtemp.formname;
						}catch(e){
							console.log(e);
						}
					},
					error:function(xhr,type,errorThrown){
						//异常处理；
						dialog.toast('网络异常！', 'error', 1000);
					}
				});
			}
		});
		startflow.json = json;
		startflow.data = data;
		return startflow;
	},
	//加载表单
	renderForm:function(point,mainformid,formbtn,parms){
		var fields = {};
		var json = {};
		var objArr = [];
		var sublist = [];
		var btnArr = epc[point].btn[formbtn].btn;//获取配置按钮信息
		parms.extensionid='com.epc.epcfoundation.extensions.ui.form2';
		mui.ajax(epc.root+'/extension/extensionAction.action',{
			data:parms, 
			type:'get',//HTTP请求类型
			dataType:'html',
			async: false,
			timeout:6000,//超时时间设置为10秒
			success:function(data){
				//开始解析dom数据
				var el = $(data);
				el.find('input[type="hidden"]').each(function(){//首先便利所有的hidden表单字段显示
					var obj = {};
					obj.type  = 'hidden';	 
					obj.name  =  $(this).attr("name");
					obj.value =  $(this).val();
					obj.title =  '';
					objArr.push(obj);
				});
				var formelement = el.find('.formelement');//其次便利所有的表单字段显示
				formelement.each(function(){
					//过滤子表
					if($(this).attr("subgridname")!=null&&$(this).attr("subgridname")!=''&&$(this).attr("subgridname")!='undefined'){
						
						var sub = {
							title:$(this).find('.text').text(),
							action:{
								subgridname:$(this).attr("subgridname"),
							}
						};
						sublist.push(sub);
					}
					//过滤字表
					if($(this).attr("uitype") == "INNERSUBGRID")return;
					var obj = {};
					obj.title = $(this).find('.text').text(); 
					if(formbtn == 'view'){
						obj.readonly = 'true';
					}
					obj.must  = $(this).find('.must').text(); 
					if($(this).find('input').length > 0){//input
						obj.type = 'text';	
						obj.name = $(this).find('input').attr("name");
						obj.value = $(this).find('input').val();
						if($(this).attr("uitype") == "DATEPICKER"){
							obj.type = 'DATEPICKER';	
						}else if($(this).attr("uitype") == "TIMEPICKER"){
							obj.type = 'TIMEPICKER';	
						}else if($(this).find('input').attr("type") == "radio"){
							obj.type = 'radio';	
							obj.value = [];
							$(this).find('input').each(function(){								
								obj.value.push({
									id:$(this).val(),
									text:$(this).next('label').html(),
									checked:($(this).attr('checked')!='' && typeof $(this).attr('checked')!='undefined')?true:false
								});
							});
						}
					}else if($(this).find('textarea').length > 0){//textarea
						obj.type = 'textarea';
						obj.value = $(this).find('textarea').val();
						obj.name = $(this).find('textarea').attr("name");
					}else if($(this).find('select').length > 0){//select
						var option = $(this).find('select').html();
						var name = $(this).find('select').attr("name");
						var value = $(this).find('select').val();
						var text = $(this).find('select').find('option:selected').text();
						obj.name = name;
						if($(this).attr('_extensionid') != '' && typeof $(this).attr('_extensionid') != 'undefined'){//特殊组件
							obj.type = 'Extension';
							obj.value = value;
							obj.text = text;
							obj.id = name+"_picker";
							obj.picker = {};//
						}else{ //普通的下拉
							obj.type = 'select';
							obj.value = [];
							$(this).find('option').each(function(){
								obj.value.push({
									id:$(this).val(),
									text:$(this).text(),
									selected:($(this).attr('selected')!='' && typeof $(this).attr('selected')!='undefined')?true:false
								})
							})
						}
					}
					objArr.push(obj);
				});
			},
			error:function(e){
				//异常处理；
				dialog.loading.close();
				dialog.toast('读取异常！', 'error', 1000);
			}
		});
		fields.field = objArr;
		fields.json = json;
		fields.btns = btnArr;
		fields.sublist = sublist;
		return fields;
	},
	//加载子表
	renderSubList:function(dialog,point,mainformid,parms){
		var objArr = [];
		var data = epc[point].form.tabList[1].action;
		parms.extensionid = data.extensionid;
		parms.mainformid = parms.selrowid ;
		//parms.subgridname = parms.subgridname;
		parms._projectid = -1;
		parms.async = false;
		parms.rows = 999;
		mui.ajax(epc.root+'/extension/extensionAction.action',{
			data:parms,
			type:'get',//HTTP请求类型 
			dataType:'html',
			async: false,
			timeout:6000,//超时时间设置为10秒
			success:function(data){
				//开始解析dom数据
				var taskJson = $(data).find('#jsondata').text();
				
				try{
					taskJson = eval("(" + taskJson + ")");//JSON.parse($.trim(json));//获取json数据
				}catch(e){
					dialog.loading.close();
					dialog.toast('解析异常', 'error', 2000);
					return false;
				}
				var rows = taskJson.datastr.rows;
				var colNames = taskJson.gridinfo.colNames;
				
				rows.forEach(function(value){
					var objSubArr = [];
					
					epc[point].form.tabList[1].grid.forEach(function(subvalue){//去除配置subList的grid信息
						var obj = {
							title:colNames[subvalue],
							value:value.cell[subvalue]
						};
						objSubArr.push(obj);
					});
					objArr.push({
						cell:objSubArr
					});
				});
				dialog.loading.close();
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				dialog.loading.close();
				dialog.toast('读取异常！', 'error', 1000);
			}
		});
		return objArr;
	},
	//保存表单 
	saveForm:function(dialog,point,mainformid,json){
		dialog.loading.open('保存数据');
		mui.ajax(epc.root+'/extension/extensionAction.action?'+$('#form').serialize(),{
			data:{
				extensionid:'com.epc.epcfoundation.extensions.ui.form2'
			},
			type:'post',//HTTP请求类型
			dataType:'html',
			timeout:6000,//超时时间设置为10秒
			success:function(data){
				var el = $(data);
				dialog.loading.close();
				if(el.find('#message').length > 0){
					dialog.toast(el.find('#message').html(), 'error', 1000);
				}else{
					dialog.toast('保存成功！', 'success', 1000);
					setTimeout(function(){
						epcTool.clicked('../data-list/data-list.html',epcTool.random(true),epc[point].title,{type:point});
					},500)
				}
			}, 
			error:function(xhr,type,errorThrown){
				dialog.loading.close(); 
				dialog.toast('保存数据失败！', 'error', 1000);
			}
		});
	},
	//提交流程
	submitForm:function(dialog,point,mainformid,json){
		mui.ajax(epc.root+'/extension/extensionAction.action?'+$('#form').serialize(),{
			data:{
				extensionid:'com.epc.epcfoundation.extensions.ui.form2',
				buttonid:'btn_workflow_Submit',
				_projectid:-1
			},
			type:'post',//HTTP请求类型
			dataType:'html',
			timeout:12000,//超时时间设置为10秒
			success:function(data){
				//开始解析dom数据
            	dialog.loading.close();
				dialog.toast('提交完毕！', 'success', 1000);
				setTimeout(function(){
					epcTool.clicked('../data-list/data-list.html',epcTool.random(true),epc[point].title,{type:point});
				},500)
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				dialog.loading.close(); 
				dialog.toast('流程提交失败！', 'error', 1000);
			}
		});
	},
	//提交待办
	submitTaskForm:function(dialog,point,mainformid,json,submitdata){
		submitdata._projectid = -1;
		submitdata.btnid 		= 'btn_workflow_Submit';
		submitdata.buttonname = 'SaveAndClose';
		submitdata.buttonid   = 'btn_workflow_Submit';
		mui.ajax(epc.root+'/extension/extensionAction.action?'+$('#form').serialize(),{
			data:{
				extensionid:'com.epc.epcfoundation.extensions.ui.form2',
				_projectid :-1,
				buttonid  :'btn_workflow_Submit',
			},
			type:'post',//HTTP请求类型
			dataType:'html',
			timeout:6000,//超时时间设置为10秒
			success:function(data){
				var el = $(data);
				dialog.loading.close();
				if(el.find('#message').length > 0){
					dialog.toast(el.find('#message').html(), 'error', 1000);
				}else{
					var _globalnames = $('#form').find("[name='globalnames']").val(),data = {};
					if(($.trim(_globalnames)).length>0)
					{
						var namesArr=_globalnames.split(",");
						for(var namei=0;namei<namesArr.length;namei++)
						{
							var _gloreg=("name="+namesArr[namei]);
							var $glodom= $('#form').find("input["+_gloreg+"],select["+_gloreg+"],textarea["+_gloreg+"]");
							if($glodom.length>0 && $glodom.eq(0).attr("type")=="radio")
							{
								for(var k=0;k<$glodom.length;k++)
								{
									if(!$glodom[k].checked) continue;
									$glodom=$glodom.eq(k);
									break;
								}
							}
							var gk=namesArr[namei];var gv=$glodom.val();
							var gjsonstr="{\""+gk+"\":\""+gv+"\"}";
							var gjson=eval("("+gjsonstr+")");
							if($glodom.length>0)data=$.extend(data,gjson);
							else window.status="[WARNING] global_dom_exception";
						}
					}
					data = $.extend(submitdata,data);
					mui.ajax(epc.root+'/extension/extensionAction.action',{
						data:data,
						type:'post',//HTTP请求类型
						dataType:'html',
						timeout:12000,//超时时间设置为10秒
						success:function(data){
							//开始解析dom数据
			            	dialog.loading.close();
							dialog.toast('提交完毕！', 'success', 1000);
							setTimeout(function(){
								epcTool.clicked('../data-list/data-list.html',epcTool.random(true),epc[point].title,{type:point});
							},500)
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							dialog.loading.close(); 
							dialog.toast('流程提交失败！', 'error', 1000);
						}
					});
				}
			}, 
			error:function(xhr,type,errorThrown){
				dialog.loading.close(); 
				dialog.toast('保存数据失败！', 'error', 1000);
			}
		});
		
		
		
	
	}
}
