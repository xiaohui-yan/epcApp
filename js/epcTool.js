window.epcTool = {
	//缓存数据
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
	epcProject:function(){//缓存项目
		if(plus.storage.getItem("epcProjects") == null){
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
	
	//工具方法
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
							functiongroupid:$(this).attr("functiongroupid"),
							buttonid:$(this).attr("p:buttonid"),
							selrowid:selrowid
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
	showActionSheet :function (bts,values){//显示底部脚本
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},function(e){
			if(bts[e.index-1].title && (bts[e.index-1].title == '修改')){	
				editForm(values[e.index-2]);
			}else if(bts[e.index-1].title == '删除'){
				delForm(values[e.index-2]);
			}
		});
	},
	clicked:function(webviewUrl,webviewId,title,typeObj){//App跳转方法
		localStorage.setItem('webView',JSON.stringify(typeObj));//存储跳转参数
		var buttons = [];
		if(webviewUrl == 'data-list/data-list.html'){
			buttons = [{
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
            }]
		}
		mui.openWindowWithTitle({
		  	url: webviewUrl,
		  	id: webviewId,
		  	styles: {                             // 窗口参数 参考5+规范中的WebviewStyle,也就是说WebviewStyle下的参数都可以在此设置
				titleNView: {                       // 窗口的标题栏控件
					style:'transparent',
				  	titleText:title,                // 标题栏文字,当不设置此属性时，默认加载当前页面的标题，并自动更新页面的标题
				  	titleColor:"#fff",             // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
				  	titleSize:"17px",                 // 字体大小,默认17px
				  	backgroundColor:"#D74B28",        // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
				  	progress:{                        // 标题栏控件的进度条样式
						color:"#5FB878",                // 进度条颜色,默认值为"#00FF00"  
						height:"2px"                    // 进度条高度,默认值为"2px"         
				  	},
			  		splitLine:{                       // 标题栏控件的底部分割线，类似borderBottom
						color:"#CCCCCC",                // 分割线颜色,默认值为"#CCCCCC"  
						height:"0px"                    // 分割线高度,默认值为"2px"
			      	},
			      	buttons:buttons, 
			    },
		  	}, 
		  	waiting: { //系统等待框参数
		        autoShow: true, //是否自动显示等待框.true:显示等待框.false:不显示等待框.注意:若waiting框的autoShow为true,但目标页面不自动显示,则需在目标页面中通过如下代码关闭等待框:plus.nativeUI.closeWaiting();
		        title: '加载中...',
	        }
		}); 
		
		/**
		 * 
		 *  
			mui.openWindowWithTitle( {
			  	url: webviewUrl,  
			  	id: webviewId,
			  	styles: {   
					statusbar:  {
			            background: '#000'
			       	},
	 		  	}
			},{
				id:webviewId+"title",//导航栏ID,默认为title,若不指定将会使用WebviewOptions中指定的 [webviewID+ "_title"] 作为id
			    height:"50px",//导航栏高度值
			    backgroundColor:"#000",//导航栏背景色
			    bottomBorderColor:"#fff",//底部边线颜色
			    title: {
			        text:title,//标题文字
			        position: { 
			            top:0,
			            left:0,
			            width:"100%",
			            height:"100%"
			        },
			        styles: {
			            color:"#ffffff",
			            align:"center",
			            family:"'Helvetica Neue',Helvetica,sans-serif",
			            size:"17px",
			            style:"normal",
			            weight:"normal",
			        }
			    },
			    back:back
			});
	 	*/
	},
	random:function(flag){
		return flag == false ?'999999': Math.random();
	},
	init:function(){
		this.userProject();
		this.epcUsers();
		this.epcProject();
	}
}

