window.epc = {
	//root:'http://emp.epc-china.com',
	root:'http://192.168.0.153:8080',
	workHours:{//工时
		btn:{
			new:{
				title:'新建工时',
				formname:'New',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				}]
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
					/*$('input[name="formbean_jobsStructure_id"]').val(items[1].value);
					$('#showCityPicker3').val(items[1].text);
					$('input[name="formbean_jobsStructure_wbs_project_projectname"]').val(items[0].text);*/
					console.log(items);
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
				grid:[1,2,4,5],
			}],
			specialField:[{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epc.epcUsers());
				},
				callback:function(items){
					alert(items[0].text);
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
					alert(items[0].text);
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
		
	},
	task:{//流程
		
		btn:{
			new:'请假请申',
			view:'请假单',
			edit:'请假单',
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcfoundation.base.tasklist',
			grid:[1,2,4,5],
			iconfont:'icon-daiban',
		},
		form:{
			tabList:[{
				name:'表单信息',
				active:true,
				show:true,
				method:'loadForm',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.form2',
					functionpointid:'com.epc.epcfoundation.base.tasklist',
					formname:'workflow',
				},
			},{
				name:'流程历史',
				active:false,
				show:false,
				method:'loadSubList',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcfoundation.base.tasklist',
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
		mui.openWindow({
		  	url: webviewUrl,
		  	id: webviewId,
		  	styles: {                             // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: {                       // 窗口的标题栏控件
				  	titleText:title,                // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
				  	titleColor:"#000",             // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
				  	titleSize:"17px",                 // 字体大小,默认17px
				  	backgroundColor:"#ddd",        // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
				  	progress:{                        // 标题栏控件的进度条样式
						color:"#007aff",                // 进度条颜色,默认值为"#00FF00"  
						height:"1px"                    // 进度条高度,默认值为"2px"         
				  	},
			  	splitLine:{                       // 标题栏控件的底部分割线，类似borderBottom
					color:"#CCCCCC",                // 分割线颜色,默认值为"#CCCCCC"  
					height:"0px"                    // 分割线高度,默认值为"2px"
			      }
			    },
			    button:{
			    	
			    }
		  	},
		});
		
	},
	random:function(flag){
		return flag == false ?'999999': Math.random();
	},
}