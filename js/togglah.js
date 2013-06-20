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
		togglahElement = "<div class='togglah_wrap notransition'>";
		$.each(options, function(index, option) {
			togglahElement += "<span class='togglah_option option_" +index +"' togglah_id='" + option.togglah_id + "'";
			if (option.selected) {
				togglahElement += " on='on' "
			}
			togglahElement+= ">" +  option.text + "</span>";
		});
		togglahElement += "</div>";
		$(radioButtonSelector).last().after(togglahElement);
		togglahWidth = max($(".togglah_option"), true) * 1.3;
		togglahHeight = max($(".togglah_option"), false);
		$(".togglah_option").width(togglahWidth).height(togglahHeight);
		radioButtonSelector.hide();
		updateMargins($(".togglah_wrap"));
		$(".togglah_wrap").width(togglahWidth * 1.1).height(togglahHeight).click(toggle).removeClass('notransition');
	},
	updateMargins = function(togglah) {
		var options = $(togglah).find('.togglah_option');
		if (typeof options.first().attr('on') !== 'undefined') {
			options.first().css('margin-left', 0);
		}
		else {
			options.first().css('margin-left', '-' + options.first().width() * 0.9);
		}
	}
	toggle = function(togglah, changeRadios) {
		var options = $(this).find('.togglah_option');
		if(typeof options.first().attr('on') !== 'undefined') {
			options.first().removeAttr('on');
			options.last().attr('on', 'on');
		}
		else {
			options.first().attr('on', 'on');
			options.last().removeAttr('on');
		}
		updateMargins($(this));
		if (typeof changeRadios === 'undefined' || changeRadios) {
			updateRadios($(this));
		}
	},
	updateRadios = function(togglah) {
		var selectedTogglahId = togglah.find('.togglah_option[on=on]').attr('togglah_id'),
		unselectedTogglahId = togglah.find('.togglah_option:not([on=on])').attr('togglah_id');
		$("input[togglah_id=" + selectedTogglahId + "]").attr('checked', 'checked');
		$("input[togglah_id=" + unselectedTogglahId + "]").removeAttr('checked').change();
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
		init: initialize,
	};
}();
