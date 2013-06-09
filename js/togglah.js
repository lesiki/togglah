var togglah = function() {
	var
	initialize = function(radioButtonClass) {
		// hide the radio buttons and related labels
		//   - expects two radio buttons with same name
		//   - expects text to be in input's 'alt' attribute
		//   for example
		//     <input name="sex" alt="Guy" value="m"/>
		//     <input name="sex" alt="Girl" value="f"/>
		var radioButtonSelector = $('input[type=radio].' + radioButtonClass), togglahElement, togglahWidth, togglahHeight,
		options = {};
		//radioButtonSelector.hide();
		radioButtonSelector.each(function(index, radioButton) {
			$(radioButton).attr('togglah_id', 'tog_' + index);	
			options[index] = {};
			options[index].togglah_id = 'tog_' + index;
			options[index].text = $(radioButton).attr('alt');
			options[index].selected = $(radioButton).is(':checked');
		});
		togglahElement = "<div class='togglah_wrap'>";
		$.each(options, function(index, option) {
			togglahElement += "<span class='togglah_option option_" +index +"' togglah_id='" + option.togglah_id + "'>" +  option.text + "</span>";
		});
		togglahElement += "</div>";
		$(radioButtonSelector).last().after(togglahElement);
		togglahWidth = max($(".togglah_option"), true) * 1.3;
		togglahHeight = max($(".togglah_option"), false);
		$(".togglah_option").width(togglahWidth).height(togglahHeight);
		$(".togglah_wrap").width(togglahWidth * 1.1).height(togglahHeight).click(toggle);
	},
	toggle = function() {
		var firstOption = $(this).find('.togglah_option.option_0');
		if(typeof firstOption.attr('on') !== 'undefined') {
			// switch off
			firstOption.css('margin-left', 0);
			firstOption.removeAttr('on');
		}
		else {
			// switch on
			firstOption.css('margin-left', '-' + firstOption.width() * (1 / 1.1));
			firstOption.attr('on', 'on');
		}
	},
	max = function(selector, useWidth) {
		var max = null;
		selector.each(function() {
			if (max == null)
				max = $(this);
			else {
				if (useWidth) {
					if ($(this).width() > max.width())
					max = $(this);
				}
				else {
					if ($(this).height() > max.height())
					max = $(this);
				}
			}
		});
		if (useWidth)
			return max.width();
		else
			return max.height()
	};
	return {
		init: initialize
	};
}();
