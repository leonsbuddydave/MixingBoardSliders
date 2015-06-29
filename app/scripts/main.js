/* jshint devel:true */

function Slider(selector) {

	var $body = $(document.body);

	$(selector).each(function(e, i) {
		console.log('Got one!');
		var $slider = $(this);
		var $thumb = $slider.find('.thumb');
		var $rail = $slider.find('.rail');
		var $lowerRail = $slider.find('.lower-rail');
		var $thumbLabel = $slider.find('.thumb-label');
		var touching = false;
		var startingTouchPoint = null;
		var startingFlexPosition = null;

		$thumb.on('mousedown', function(e) {
			touching = true;
			startingTouchPoint = {
				x: e.clientX,
				y: e.clientY
			};
			var flexHeight = $lowerRail.css('flex').split(' ')[2];
			flexHeight = flexHeight === 'auto' ? 0 : flexHeight;
			startingFlexPosition = parseInt( flexHeight || 0, 10);
		});

		$body.on('mousemove', function(e) {

			if (startingTouchPoint === null || touching === false) return;

			var deltaX = e.clientX - startingTouchPoint.x;
			var deltaY = e.clientY - startingTouchPoint.y;
			$lowerRail.css('flex', startingFlexPosition + deltaY * -1);

			var percentage = Math.floor($lowerRail.height() / $rail.height() * 100);
			console.log(percentage);
			$thumbLabel.text(percentage + '%');
		});

		$body.on('mouseup', function(e) {
			touching = false;
		});
	});
}

Slider('.slider');