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
		if(typeObj&&typeObj.type&& typeof typeObj.formbtn == 'undefined'){
			buttons=epc[typeObj.type].buttons; 
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
				  	backgroundColor:epc.theme[0].color,        // 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
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
	},
	pySegSort:function (arr,empty) {
		    if(!String.prototype.localeCompare)return null;
		    var letters = "*ABCDEFGHJKLMNOPQRSTWXYZ".split('');
		    var zh = "阿八嚓哒妸发旮哈讥咔垃麻拏噢妑七呥扨它穵夕丫帀".split('');
		    var segs = [];
		    var curr;
		    $.each(letters, function(i,n){
		        curr = {letter: this.toString(), data:[]};
		        $.each(arr, function(k,v) {
		            if((!zh[i-1] || zh[i-1].localeCompare(v.text) <= 0) && v.text.localeCompare(zh[i]) == -1) {
		                curr.data.push(this);
		            }
		        });
		        if(empty || curr.data.length) {
		            segs.push(curr);
		            curr.data.sort(function(a,b){
		                return a.text.localeCompare(b.text);
		            });
		        }
		    });
		    return segs;
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

