$(function(){
	var screenInd = 0;//记录当前是第几屏
	
	$("#main").fullpage({
		anchors: ['page1','page2','page3','page4','page5','page6'],//导航链接锚点
		slidesNavigation:true,
		menu: '#menu',//作为导航的元素
		afterLoad:function(anchor,index){
		 screenInd = index;
		 console.log(screenInd);
		}
	});
	$(".front .nav li").click(function(){
		//1，隐藏front，显示backup
		$(this).parents(".front").hide();
		$(this).parents(".front").siblings(".backup").show();
		//2，判断是第几个 li 显示第几个slide
		var index = $(this).index();
		//2.2 查看当前是第几屏
		var ind = $(this).parents(".section").index();
		$.fn.fullpage.moveTo(ind+1, index);//移动到第二屏的第1个幻灯片
		//3，停止滚动
		$.fn.fullpage.setAllowScrolling(false);
	})
	
	$(".slide .back").click(function(){
		// 1，显示front，隐藏backup
		$(this).parents(".backup").hide();
		$(this).parents(".backup").siblings(".front").show();
		// 2，开始滚动
		$.fn.fullpage.setAllowScrolling(true)
	})
	$(".tab").tabs();
	$("header li").click(function(){
		$(".backup").hide();
		$(".front").show();
		$.fn.fullpage.setAllowScrolling(true)
		 hideFooter();
	})
	//显示页脚
	//何时显示页脚
	//1，鼠标滚动后
	//2，鼠标向下滚动后
	//3，当是第6屏时候
	window.addEventListener("mousewheel",wheelHd,false);
	//添加鼠标滚动事件监听
	function wheelHd(e){
		if(screenInd==6){		
			if(e.wheelDelta<0){
				showFooter();
			}else{
				hideFooter();
			}
		}
	}
	//如何显示页脚
	function showFooter(){
		$.fn.fullpage.setAllowScrolling(false);//不让插件滚动
		$("#main").css("margin-top",-160);
		$("footer").css("bottom",0);
	}
	function hideFooter(){
		$.fn.fullpage.setAllowScrolling(true);//不让插件滚动
		$("#main").css("margin-top",0);
		$("footer").css("bottom",-160);
	}
	
	$(".s4 li").eq(0).click(function(){
		var data1=["轮播1","轮播2","轮播3"];
		$(".modal").slider({data:data1})
		$.fn.fullpage.setAllowScrolling(false);//不让插件滚动
	})
	$(".s4 li").eq(1).click(function(){
		var data1=["hello1","hello2","hello3","hello4"];
		$(".modal").slider({data:data1})
		$.fn.fullpage.setAllowScrolling(false);//不让插件滚动
	})
	
})
;(
	function($){
		$.fn.extend({
			"slider":function(opt){
				this.each(function(){
					var dom = $(this);
					// 指定数据渲染html节点
					var str ="";
					for(let i=0;i<opt.data.length;i++){
						str+='<div class="slide">'+opt.data[i]+'</div>'
					}
					dom.find(".slider_content").html(str).css("width",1150*opt.data.length)
					// 默认打开显示
					dom.show();
					// 1，什么时候滑动
  					// 2，怎么实现滑动
   					// 3，滑动多少
   					// 4，滑动到第几个了 （默认滑动到第1个，没单击滑动到个数增加）	
					var index = 1; //滑动到第几个了
					dom.find(".slide_num").html(index+"/"+opt.data.length);
					dom.find(".next").click(function(){
					if(index>=opt.data.length){return}
					index++;
					dom.find(".slider_content").css("transform","translateX("+(index-1)*-1150+"px)");
					dom.find(".slide_num").html(index+"/"+opt.data.length);
					
					})
					dom.find(".pre").click(function(){
					if(index<=1){return}
					index--;
					dom.find(".slider_content").css("transform","translateX("+(index-1)*-1150+"px)");
					dom.find(".slide_num").html(index+"/"+opt.data.length);
					
					})
					// 单击close 关闭自己
					dom.find(".close").click(function(){
						dom.hide();
						$.fn.fullpage.setAllowScrolling(true);
					})
					
				})
				
			}
		})
	}
)(jQuery)

;(
	function($){
	$.fn.extend({
		"tabs":function(){
			this.each(function(){
			var pa=$(this);			
				pa.find(".tab_content").hide();
				pa.find(".tab_content").eq(0).show();
				pa.find(".tab_title").eq(0).addClass("active");
				//单击里面的tab_title 显示对应的 tab_content;
				pa.find(".tab_title").click(function(){
					var index =	$(this).index();
					pa.find(".tab_content:visible").hide();//以前显示的隐藏
					pa.find(".tab_title.active").removeClass("active");
					pa.find(".tab_content").eq(index).show();//显示对应的content
					$(this).addClass("active");
				})
			})
		}
	})
	}
)(jQuery)
