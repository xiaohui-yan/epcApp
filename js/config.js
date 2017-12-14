window.epc = {
	//root:'http://emp.epc-china.com',
	root:'http://192.168.0.153:8080',
	workHours:{//工时
		btn:{
			new:{
				title:'新建工时',
				formname:'New',
				btn:[]
			},
			edit:{
				title:'编辑工时',
				formname:'Modify',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				}]
			},
			view:{
				title:'查看工时',
				formname:'View',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid: 'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcemp.workHours',
			functiongroupid:'4028809a4153ceb0014153d300250002',
			grid:[2,3,4,5],
			iconfont:'icon-shi',
			_projectid:-1,
			_search:false,
			async:false,
			sidx:'id',
			sord:'desc',
		},
		form:{
			tabList:[{
				title:'表单信息',
				active:true,
				show:true,
				tempUrl:'../form/form.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.form2',
					functionpointid:'com.epc.epcemp.workHours',
					functiongroupid:'4028809a4153ceb0014153d300250002',
					_projectid:-1
				},
			},{
				title:'未录入工时',
				active:false,
				show:true,
				tempUrl:'../sub-list/sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					formname:'New',
					functionpointid:'com.epc.epcemp.workHours',
					mainformid:'',
					subgridname:'needWorkHour',
					async:false,
					rows:999
				},
				grid:[1,2,3]
			}],
			specialField:[{
				fieldId:'formbean_jobsStructure_id',//组件id
				layer:{layer:2},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epc.userProject());
				},
				callback:function(items){
					var text = items[0].text;
					$('#formbean_jobsStructure_id_picker').val(items[1].text);
					$('input[name="formbean_jobsStructure_id"]').val(items[1].value);
					$('input[name="formbean_jobsStructure_wbs_project_projectname"]').val(text.split(']')[1]);
					$('input[name="formbean_jobsStructure_wbs_project_projectcode"]').val(text.split(']')[0].substr(1));
				}
			}],
		},
	},
	
	leave:{//请假
		btn:{
			new:{
				title:'请假申请',
				formname:'btn_new',
				componentid:'dailyLeave.dailyLeave.dailyLeave_new',
				processinsid	:'wfinfo=emp_dailyLeave,start',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			edit:{
				title:'编辑请假单',
				formname:'btn_edit',
				componentid:'dailyLeave.dailyLeave.dailyLeave_modify',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				}]
			},
			view:{
				title:'查看请假单',
				formname:'btn_view',
				componentid:'dailyLeave.dailyLeave.dailyLeave_view',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
			functiongroupid:'4028809a45ac17270145ac672aba0030',
			grid:[2,10,11,12],
			iconfont:'icon-jia',
		},
		form:{
			tabList:[{
				title:'表单信息',
				active:true,
				show:true,
				tempUrl:'../form/form.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.form2',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					functiongroupid:'4028809a45ac17270145ac672aba0030',
					actionextension	:'wfinfo=emp_dailyLeave,start',
					processinsid	:'wfinfo=emp_dailyLeave,start',
					_projectid:-1
				}
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'../sub-list/sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					componentid:'dailyLeave.dailyLeave.dailyLeave_view',
					subgridname:'taskhistory',
					_projectid:-1
				},
				grid:[1,2,3]
			}],
			specialField:[{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epc.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},{
				fieldId:'_wfNextUser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epc.epcUsers());
				},
				callback:function(items){
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
		
	},
	
	
	task:{//流程
		btn:{
			view:{
				title:'我的待办',
				formname:'workflow',
				componentid:'dailyLeave.dailyLeave.dailyLeave_check_bmjl',
				processinsid:'wfinfo=emp_dailyLeave,dailyLeave_bmjl,9',
				btn:[{
					title:'提交',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcfoundation.base.tasklist',
			grid:[1,2,4,5],
			iconfont:'icon-daiban',
		},
		form:{
			tabList:[{
				title:'表单信息',
				active:true,
				show:true,
				tempUrl:'../form/form.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.form2',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					functiongroupid	:'402880b13c7fb7a6013c8074eacc0018',
				},
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'../sub-list/sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					functiongroupid	:'402880b13c7fb7a6013c8074eacc0018',
					subgridname:'taskhistory',					
				},
				grid:[1,2,3]
			}],
			
		},
	},
	
	
	userProject:function(){//缓存用户所属项目
		if(plus.storage.getItem("userProject") == null){
			var project_json = [];
			mui.ajax(epc.root+'/extension/extensionAction.action',{
				data:{
					extensionid : 'com.epc.epcfoundation.extensions.ui.treeinnerchildren',
					componentid : 'com.epc.epcemp.workHours.workTree',
					_projectid : -1,
					parentid : 0,
				},
				type:'get',//HTTP请求类型
				dataType:'html',
				async: false,
				timeout:6000,//超时时间设置为10秒
				success:function(treeData){
					try{
						treeData = eval("(" + treeData + ")");//JSON.parse($.trim(json));//获取json数据
					}catch(e){
						dialog.toast('解析项目树json异常', 'error', 2000);
						return false;
					} 
					//构造自定义格式json
					var data = treeData[0].children;
					for(var i in data){
						var project_obj = {};
						project_obj.value = data[i].attributes.id;
						project_obj.text =  data[i].data;
						mui.ajax(epc.root+'/extension/extensionAction.action',{
							data:{
								extensionid:'com.epc.epcfoundation.extensions.ui.treeinnerchildren',
								componentid:'com.epc.epcemp.workHours.workTree',
								parentid:data[i].attributes.id,
								typeid:0
							},
							async: false,
							type:'get',//HTTP请求类型
							dataType:'html',
							timeout:6000,//超时时间设置为10秒
							success:function(children){
								try{
									children = eval("(" + children + ")");//JSON.parse($.trim(json));//获取json数据
								}catch(e){
									dialog.toast('解析项目树节点json异常', 'error', 2000);
									return false;
								} 
								//构造自定义格式json
								var obj = [];
								for(var i in children){
									obj.push({
										value: children[i].attributes.id,
										text:  children[i].data,
									});
								} 
								project_obj.children = obj;
							}, 
							error:function(xhr,type,errorThrown){
								dialog.loading.close(); 
								dialog.toast('网络异常', 'error', 1000);
							}
						});
						project_json.push(project_obj); 
					}
					plus.storage.setItem("userProject",JSON.stringify(project_json));//所属项目缓存
				},
				error:function(xhr,type,errorThrown){
					dialog.loading.close(); 
					dialog.toast('网络异常！', 'error', 1000);
				}
			});
		}
		return plus.storage.getItem("userProject");
	},
	loadBtn:function (currTypeTemp,selrowid){
		var objArr = [];
		mui.ajax(epc.root+'/extension/extensionAction.action',{
			data:{
				extensionid:    'com.epc.epcfoundation.extensions.ui.buttons',
				functionpointid:epc[currTypeTemp].list.functionpointid,
				functiongroupid:epc[currTypeTemp].list.functiongroupid,
				selrowid :selrowid,
				_projectid:-1,
			}, 
			type:'post',//HTTP请求类 型
			dataType:'html',
			async:false,
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				dialog.loading.close();
				var content = $(data).find('#template');
				if(content!=null){
					$(content).find('div').each(function(){
						objArr.push({
							btnTitle:$.trim($(this).text()), 
							formname:$(this).attr("p:formname"),
							componentid:$(this).attr("p:componentid"),
							actionextension:$(this).attr("p:actionextension"),
							functiongroupid:$(this).attr("functiongroupid")
						});
					});
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				dialog.loading.close();
				dialog.toast('按钮异常！', 'error', 1000);
			}
		});
		return objArr;
	},
	epcUsers:function(){//缓存公司的所有办理人列表		
		if(plus.storage.getItem("epcUsers") == null){
			var epcUsers_json = [];
			mui.ajax(epc.root+'/extension/extensionAction.action',{
				data:{
					extensionid:'extension.multiselect.griddata',
					componentid:'workflowonline.nextusers.many', 
					rows:999,
					sidx:'id',
					sord:'desc',
				},
				type:'get',//HTTP请求类型
				dataType:'html',
				timeout:10000,//超时时间设置为10秒
				success:function(userJson){ 
					//开始解析dom数据
	            	try{
						userJson = eval("(" + userJson + ")");//JSON.parse($.trim(json));//获取json数据
					}catch(e){
						dialog.toast('办理人列表json解析异常', 'error', 2000);
						return false;
					} 
					var rows = userJson.rows;
					for(var row in rows){
						epcUsers_json.push({
							value:rows[row].id,
							text:rows[row].cell[2]
						})
					}
					plus.storage.setItem("epcUsers",JSON.stringify(epcUsers_json));//缓存
				},
				error:function(xhr,type,errorThrown){
					//异常处理；
					dialog.loading.close(); 
					dialog.toast('读取办理人列表数据异常！', 'error', 1000);
				}
			});
		}
		return plus.storage.getItem("epcUsers");
	},
	showActionSheet :function (bts,self){
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},function(e){
			if(bts[e.index-1].title == '修改'){
				editForm(self);
			}else if(bts[e.index-1].title == '删除'){
				//删除
			}
		});
	},
	epcProject:function(){//
		if(plus.storage.getItem("epcProject") == null){
			var epcProjects_json = [];
			mui.ajax(epc.root+'/extension/extensionAction.action',{
				data:{
					extensionid:'extension.multiselect.griddata',
					componentid:'custom.selMyProject', 
					rows:999,
					sidx:'id',
					sord:'desc',
				},
				type:'get',//HTTP请求类型
				dataType:'html',
				timeout:10000,//超时时间设置为10秒
				success:function(projectJson){ 
					//开始解析dom数据
	            	try{
						projectJson = eval("(" + projectJson + ")");//JSON.parse($.trim(json));//获取json数据
					}catch(e){
						dialog.toast('办理人列表json解析异常', 'error', 2000);
						return false;
					} 
					var rows = projectJson.rows;
					for(var row in rows){
						epcProjects_json.push({
							value:rows[row].id,
							text:rows[row].cell[2]
						})
					}
					plus.storage.setItem("epcProjects",JSON.stringify(epcProjects_json));//缓存
				},
				error:function(xhr,type,errorThrown){
					//异常处理；
					dialog.loading.close(); 
					dialog.toast('读取办理人列表数据异常！', 'error', 1000);
				}
			});
		}
		return plus.storage.getItem("epcProjects");
	},
	clicked:function(webviewUrl,webviewId,title,typeObj){//App跳转方法
		localStorage.setItem('webView',JSON.stringify(typeObj));
		var back = {//左上角返回箭头
	        image:{//图片格式
	            base64Data:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII='//加载图片的Base64编码格式数据 base64Data 和 imgSRC 必须指定一个.否则不显示返回箭头
	        }
	    }
		if(title == '首页'){
			back = {};
		}
		mui.openWindowWithTitle({
		  	url: webviewUrl,
		  	id: webviewId,
		  	styles: {                             // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				statusbar: {//WebviewStatusbarStyles类型,窗口状态栏样式.仅在应用设置为沉浸式状态栏样式下有效,设置此属性后将自动保留系统状态栏区域不被Webview窗口占用(即Webview窗口非沉浸式样式显示).
		            background: '#000'
		       	},
		  	}
		},{
		    title:{//标题配置
		        text:title,//标题文字
		        position:{ //绘制文本的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
		            top:0,
		            left:0,
		            width:"100%",
		            height:"100%"
		        },
		        styles:{//绘制文本样式，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.TextStyles
		            color:"#000000",
		            align:"center",
		            family:"'Helvetica Neue',Helvetica,sans-serif",
		            size:"17px",
		            style:"normal",
		            weight:"normal",
		        }
		    },
		    back:back
		});
		
	},
	random:function(flag){
		return flag == false ?'999999': Math.random();
	},
}
