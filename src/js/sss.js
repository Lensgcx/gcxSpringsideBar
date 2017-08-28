



jQuery.fn.shadow =function(options){
	//默认值被放在投影插件的命名空间里了
	var opts =jQuery.extend({},jQuery.fn.shadow.defaults,options);
	return this.each(function(){
		var $originalElement = jQuery(this);
		for(var i = 0;i < opts.slices;i++){
			//调用回调函数
			var offset = opts.sliceOffset(i);
			$originalElement.clone()
				.css({
					position :"absolute",
					left :$originalElement.offset().left + offset.x,
					top :$originalElement.offset().top + offset.y,
					margin : 0,
					zIndex :opts.zIndex,
					opacity : opts.opacity
				})
				.appendTo("body");
		}
	})
}
jQuery.fn.shadow.defaults= {
	slices : 5,
	opacity : 0.1,
	zIndex : -1,
	sliceOffset : function(i){
		return { x : i, y : i}
	}
} 