$(function(){
	$("#main").fullpage({
		anchors: ['page1','page2','page3','page4','page5','page6'],//导航链接锚点
		slidesNavigation:true
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
})
