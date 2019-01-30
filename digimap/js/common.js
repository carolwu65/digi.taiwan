$(document).ready(function(){
	
	$('img[usemap]').rwdImageMaps();
	$('area').rwdImageColor();
	//$('area').createInitImg();

	$(window).bind("resize", function(){
		$('.changeimg').hide();
		//$('area').createInitImg();
	});
});

;(function($) {

	$.fn.createInitImg = function(){
		var ass = $(this);
		
		ass.each(function(){
			var area = $(this);
			
			var pos = area.attr('coords').split(',');
			var pimg = $("#" + area.data('pimg'));
			var puse = area.data('use');
			var img = $("#imgn" + area.attr('id'));
			
			if($(window).width() >= 680){
				if(puse=='mobile') return;
			}else{
				if(puse=='pc') return;
			}
			
			if(area.data('img')!=''){
				if(!img.length){
					$('body').append("<a href='"+area.attr('href')+"' target='_blank'><img id='imgn" + area.attr('id') + "' src='/digimap/images/" + area.data('img') + "-01.png' class='initimg'></a>");
					img = $("#imgn" + area.attr('id'));
				}else{
					img.attr('src', '/digimap/images/' + area.data('img') + '-01.png');
				}
			}
			
			var ppos = pimg.position();
			var pw = pimg.width() / 1280;
			
			x = +pos[0] + ppos.left - (area.data("x") * pw);
			y = +pos[1] + ppos.top + (area.data("y") * pw);
			
			img.css("position","absolute");
			img.css("z-index","99");
			img.css("top", y + "px");
			img.css("left", x + "px");
			img.css("width", (area.data("cw") * pw) + "px");
			img.show();
		});
	};

	$.fn.rwdImageColor = function() {
		var ass = $(this);
		
		ass.each(function(){
			var area = $(this);
			
			area.mouseover(function(e){
				var th = $(this);
				var pos = th.attr('coords').split(',');
				var pimg = $("#" + th.data('pimg'));
				var img = $("#img" + th.attr('id'));

				if(th.data('img')!=''){
					if(!img.length){
						$('body').append("<a href='"+th.attr('href')+"' target='_blank'><img id='img" + th.attr('id') + "' src='/digimap/images/" + th.data('img') + "-02.png' class='changeimg'></a>");
						img = $("#img" + th.attr('id'));
					}else{
						img.attr('src', '/digimap/images/' + th.data('img') + '-02.png');
					}

					var ppos = pimg.position();
					var pw = pimg.width() / 1280;
					
					x = +pos[0] + ppos.left - (th.data("x") * pw);
					y = +pos[1] + ppos.top + (th.data("y") * pw);

					img.css("position","absolute");
					img.css("z-index","99");
					img.css("top", y + "px");
					img.css("left", x + "px");
					img.css("width", (th.data("cw") * pw) + "px");
					img.show();
					
					img.mouseover(function(e){
						$('.changeimg').hide();
						var ig = $(this);
						ig.show();
					});
				}
			});
			area.mouseout(function(e){
				var th = $(this);
				var img = $("#img" + th.attr('id'));
				img.hide();
				$('.changeimg').hide();
			});
		});
	};
	
	$.fn.rwdImageMaps = function() {
		var $img = this;

		var rwdImageMap = function() {
			$img.each(function() {
				if (typeof($(this).attr('usemap')) == 'undefined')
					return;

				var that = this,
					$that = $(that);

				// Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
				$('<img />').on('load', function() {
					var attrW = 'width',
						attrH = 'height',
						w = $that.attr(attrW),
						h = $that.attr(attrH);

					if (!w || !h) {
						var temp = new Image();
						temp.src = $that.attr('src');
						if (!w)
							w = temp.width;
						if (!h)
							h = temp.height;
					}

					var wPercent = $that.width()/100,
						hPercent = $that.height()/100,
						map = $that.attr('usemap').replace('#', ''),
						c = 'coords';

					$('map[name="' + map + '"]').find('area').each(function() {
						var $this = $(this);
						if (!$this.data(c))
							$this.data(c, $this.attr(c));

						var coords = $this.data(c).split(','),
							coordsPercent = new Array(coords.length);

						for (var i = 0; i < coordsPercent.length; ++i) {
							if (i % 2 === 0)
								coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
							else
								coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
						}
						$this.attr(c, coordsPercent.toString());
					});
				}).attr('src', $that.attr('src'));
			});
		};
		$(window).resize(rwdImageMap).trigger('resize');

		return this;
	};
})(jQuery);
