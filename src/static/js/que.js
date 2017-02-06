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
	
})

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
