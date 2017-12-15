window.epc = {
	root:'http://emp.epc-china.com',
	//root:'http://192.168.0.218',
	//root:'http://192.168.0.153:8080',
	theme:[{
		color:'#D74B28',
		background:'#D74B28',
		use:true
	},{
		color:'#0062CC',
		background:'#0062CC',
		use:false
	}],
	workHours:{//工时
		title:'我的工时',
		btn:{
			new:{
				title:'新建工时',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				}]
			},
			edit:{
				title:'编辑工时',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				}]
			},
			view:{
				title:'查看工时',
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
					functionpointid:'com.epc.epcemp.workHours',
				},
			},{
				title:'未录入工时',
				active:false,
				show:true,
				tempUrl:'../sub-list/sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcemp.workHours',
					subgridname:'needWorkHour',
				},
				grid:[1,2,3]
			}],
			specialField:[{
				fieldId:'formbean_jobsStructure_id',//组件id
				layer:{layer:2},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.userProject());
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
		title:'请假申请',
		btn:{
			new:{
				title:'请假申请',
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
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			view:{
				title:'查看请假单',
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
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
				}
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'../sub-list/sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					subgridname:'taskhistory',
				},
				grid:[1,2,3]
			}],
			specialField:[{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},{
				fieldId:'_wfNextUser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
		
	},
	overtime:{//加班申请
		//加班申请
		title:'加班申请',
		btn:{
			new:{
				title:'加班申请',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			edit:{
				title:'编辑加班申请',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			view:{
				title:'查看加班申请',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
			functiongroupid:'4028809a45ac17270145ac6aadc90034',
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
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
				}
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'../sub-list/sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					componentid:'overtime.overtime.overtime_view',
					subgridname:'taskhistory',
					_projectid:-1
				},
				grid:[1,2,3]
			}],
			specialField:[
			
			{
				fieldId:'formbean_project_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcProject());
				},
				callback:function(items){
					$('#formbean_project_id_picker').val(items[0].text);
					$('input[name="fformbean_project_id"]').val(items[0].value);
				}
			},
			{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},{
				fieldId:'_wfNextUser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
		
	
		
	},
	dailyTrip:{
		//出差申请
		title:'出差申请',
		btn:{
			new:{
				title:'出差申请',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			edit:{
				title:'编辑出差申请',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			view:{
				title:'查看出差申请',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
			functiongroupid:'4028809a45ac17270145ac6dad850038',
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
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
				}
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'../sub-list/sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					componentid:'dailyTrip.dailyTrip.dailyTrip_view',
					subgridname:'taskhistory',
					_projectid:-1
				},
				grid:[1,2,3]
			}],
			specialField:[
			
			{
				fieldId:'formbean_project_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcProject());
				},
				callback:function(items){
					$('#formbean_project_id_picker').val(items[0].text);
					$('input[name="fformbean_project_id"]').val(items[0].value);
				}
			},
			{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},{
				fieldId:'_wfNextUser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
	},
	
	
	
	
	
	dailyAttendance:{
			
		//考勤证明
		title:'考勤证明',
		btn:{
			new:{
				title:'考勤证明',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			edit:{
				title:'编辑考勤证明',
				btn:[{
					title:'保存',
					fns:'callback_fn'
				},{
					title:'提交',
					fns:'submit_fn'
				}]
			},
			view:{
				title:'查看考勤证明',
				btn:[{
					title:'关闭',
					fns:'close_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
			functiongroupid:'4028809a45ac17270145ac7b914b0048',
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
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
				}
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'../sub-list/sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcdoc.custom.cusdocclassfunctionpoint',
					componentid:'dailyAttendance.dailyAttendance.dailyAttendance_view',
					subgridname:'taskhistory',
					_projectid:-1
				},
				grid:[1,2,3]
			}],
			specialField:[
			
			{
				fieldId:'formbean_project_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcProject());
				},
				callback:function(items){
					$('#formbean_project_id_picker').val(items[0].text);
					$('input[name="fformbean_project_id"]').val(items[0].value);
				}
			},
			{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},{
				fieldId:'_wfNextUser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
		
	
		
	
	
	},
	
	
	task:{//流程
		title:'待办列表',
		btn:{
			edit:{
				title:'待办工作',
				btn:[{
					title:'提交',
					fns:'submit_task_fn'
				}]
			}, 
		},
		list:{
			extensionid:'com.epc.epcfoundation.extensions.ui.grid',
			functionpointid:'com.epc.epcfoundation.base.tasklist',
			functiongroupid	:'402880b13c7fb7a6013c8074eacc0018',
			grid:[1,3,4,5],
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
					functionpointid:'com.epc.epcfoundation.base.tasklist',
					functiongroupid	:'402880b13c7fb7a6013c8074eacc0018',
				},
			},{
				title:'流程历史',
				active:false,
				show:true,
				tempUrl:'../sub-list/sub-list.html',
				action:{
					extensionid:'com.epc.epcfoundation.extensions.ui.grid',
					functionpointid:'com.epc.epcfoundation.base.tasklist',
					functiongroupid	:'402880b13c7fb7a6013c8074eacc0018',
					subgridname:'taskhistory',					
				},
				grid:[1,2,3]
			}],
			specialField:[
			
			{
				fieldId:'formbean_project_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcProject());
				},
				callback:function(items){
					$('#formbean_project_id_picker').val(items[0].text);
					$('input[name="fformbean_project_id"]').val(items[0].value);
				}
			},
			{
				fieldId:'formbean_user01_id',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#formbean_user01_id_picker').val(items[0].text);
					$('input[name="formbean_user01_id"]').val(items[0].value);
				}
			},{
				fieldId:'_wfNextUser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					$('#_wfNextUser_picker').val(items[0].text);
					$('input[name="_wfNextUser"]').val(items[0].value);
				}
			}],
			
		},
	},
}
