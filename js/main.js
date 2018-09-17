function SettingTinymce(idName,option){
	"use strict"
	if(!Array.prototype.indexOf){
		Array.prototype.indexOf=function(obj,start){
		    for(var index=(start || 0), j=this.length;index<j;index++){
		      if(this[index]===obj){ 
		        return index; 
		      }
		    }
		    return -1;
		}
	}
	var addTextarea = document.createElement("textarea");
	document.getElementById(idName).appendChild(addTextarea);
	var Setting = {
		bar:option.bar,
	};
	var IB={
		selector:'#'+idName+"> textarea",
		height: 500,
		theme: 'modern',
		language:'zh_CN',//文档语言设置 需要到
		theme: 'modern',
		plugins:'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
	  	toolbar: true,
	  	toolbar1:"print preview fullpage searchreplace fullscreen | image media visualblocks visualchars | template codesample table charmap hr pagebreak nonbreaking anchor | link bold italic strikethrough forecolor backcolor toc ltr rtl | alignleft aligncenter alignright alignjustify  |insertdatetime textpattern | numlist bullist outdent indent | formatselect removeformat ",
	  	contextmenu: "link image inserttable | cell row column deletetable |",
	  	setup: function(editor) {
	  		//遍历Setting.bar的值 根据content值生成不同的按钮
	  		var contentArr = ["file","edit","insert","format","tools","table","help"];
//	  		for(var i=0;i<Setting.bar.length;i++){
//	  			var b = Setting.bar[i];
//	  			if(contentArr.indexOf(b.content) >-1){
//	  				_addaddMenuItem(editor,b);
//	  			}else{
//	  				_addtoolbarButton(editor,b);
//	  			}	
//	  		}
//		editor.addButton(b.name, {
//		  title:b.text,
//		  icon:b.icon?b.icon:false,
//		  image: b.image? b.image:"",
//		  tooltip:b.text,
//		  onclick: function() {
//		  		editor.insertContent('&nbsp;Here\'s some content!&nbsp;');
//		  },
//  	});
_addtoolbarButton(editor,b);
	  	},
	}
	//动态添加toolbar按钮
	var tbArr = IB.toolbar1.split('|');
	var _Tb = '';
	function regToobarStr(str1,str2,num){
		var arr = str1.split(" ");
		if(num === undefined){
			arr.push(str2);
		}else{
			if(num < arr.length){
				arr.splice(num,1,str2);
			}else{
				arr.push(str2);
			}
		}
		return arr.join(" ");
	}	
	for(var i=0;i<Setting.bar.length;i++){
		var b = Setting.bar[i];
		IB.toolbar1 = regToobarStr(IB.toolbar1,b.name);
	}
	//在界面中添加  toolbar 按钮
	function _addtoolbarButton(ed,b){
		if(!(b.name && b.text)){
			return;
		}
		ed.addButton(b.name, {
		  title:b.text,
		  icon:b.icon?b.icon:false,
	      image: b.image? b.image:"",
	      tooltip:b.text,
	      onclick: function() {
	      	if(typeof b.handler  === 'function' ){
	      		b.handler(ed);
	      	}else{
	      		return ;
	      	}
	      },
	    });
	}
	//在各个下拉菜单中添加按钮
	function _addaddMenuItem(ed,b){
		ed.addMenuItem(b.name, {
		  text:b.text,
		  icon:true,
	      image: b.image?b.image:"",
	      tooltip:b.text,
	      context:b.content,
	      onclick: function(ed) {
	      	if(typeof b.handler === "function"){
	      		b.handler(ed);
	      	}else{
	      		return;
	      	}
	      },
	    });
	}
	//初始化tinymce
	tinymce.init(IB);
}

