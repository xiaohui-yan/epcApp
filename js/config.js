window.epc = {
	root:'http://emp.epc-china.com',
	//root:'http://192.168.0.219',
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
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	
            	epcTool.clicked('tab/tab.html',epcTool.random(true),epc['workHours'].btn.new.title,{type:'workHours',formbtn:'new',formtemp:epcTool.loadBtn('workHours','')[0]});

            	//epcTool.clicked('/tab/tab.html',epcTool.random(true),'新建工时',{type:'workHours',formbtn:'new',formtemp:{"btnTitle":"新建","formname":"New","functiongroupid":"4028809a4153ceb0014153d300250002","buttonid":"New","selrowid":""} });; 
            },
            text:'新建',
        }],
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
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	
            	epcTool.clicked('tab/tab.html',epcTool.random(true),epc['leave'].btn.new.title,{type:'leave',formbtn:'new',formtemp:epcTool.loadBtn('leave','')[0]});

            },
            text:'新建',
        }],
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
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	
            	epcTool.clicked('tab/tab.html',epcTool.random(true),epc['overtime'].btn.new.title,{type:'overtime',formbtn:'new',formtemp:epcTool.loadBtn('overtime','')[0]});

            },
            text:'新建',
        }],
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
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	
            	epcTool.clicked('tab/tab.html',epcTool.random(true),epc['dailyTrip'].btn.new.title,{type:'dailyTrip',formbtn:'new',formtemp:epcTool.loadBtn('dailyTrip','')[0]});

            },
            text:'新建',
        }],
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
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        },{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'right', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	
            	epcTool.clicked('tab/tab.html',epcTool.random(true),epc['dailyAttendance'].btn.new.title,{type:'dailyAttendance',formbtn:'new',formtemp:epcTool.loadBtn('dailyAttendance','')[0]});

            },
            text:'新建',
        }],
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
		buttons:[{
            color: '#ffffff', //String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为窗口标题栏控件的标题文字颜色.
            colorPressed: '', //String类型,按下状态按钮文字颜色.String类型,按钮上文字颜色.可取值:"#RRGGBB"格式字符串,"rgba(R,G,B,A)".默认值为color属性值自动调整透明度为0.3.
            float: 'left', //String类型,按钮在标题栏上的显示位置.right:在标题栏中靠右排列显示.left:在标题栏中靠左侧排列显示(在返回键后). 默认:right.
            fontWeight: 'normal', //String类型,按钮上文字的粗细.normal:标准字体.bold:加粗字体.默认:normal.
            fontSize: '14px', //String类型,按钮上文字大小.可取值:字体高度像素值,数字加"px"格式字符串.
            fontSrc: '', //String类型,按钮上文字使用的字体文件路径.相对路径:相对于当前页面的host位置,如"a.jpg",注意当前页面为网络地址则不支持.绝对路径:如Android平台"/sdcard/logo.png",此类路径通常通过其它5+ API获取的.扩展相对路径URL(RelativeURL):以"_"开头的相对路径,如"_www/a.jpg".本地路径URL:以"file://"开头,后面跟随系统绝对路径.
            onclick:function(){
            	epcTool.clicked('home.html',epcTool.random(true),'首页');
            },
            text:'返回',
        }],
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
			specialMuselectField:[
			{
				fieldId:'_ccnextuser',//组件id
				layer:{layer:1},
				dataSource:function(){//扩展组件请求参数
					return JSON.parse(epcTool.epcUsers());
				},
				callback:function(items){
					var text = "";
					var value = "";
					items.forEach(function(item) {
						text +=" "+item.text;
						value += item.value+",";
					});
					value = (value.substring(value.length-1)==',')?value.substring(0,value.length-1):value;
					$('#_ccnextuser_picker').val(text);
					$('input[name="__multiselect__ccnextuser"]').val(value);
				}
			},]
		},
	},
}
