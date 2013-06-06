var togglah = function() {
	var
	initialize = function(radioButtonClass) {
		// hide the radio buttons and related labels
		//   - expects two radio buttons with same name
		//   - expects text to be in input's 'alt' attribute
		//   for example
		//     <input name="sex" alt="Guy" value="m"/>
		//     <input name="sex" alt="Girl" value="f"/>
		var radioButtonSelector = $('input[type=radio].' + radioButtonClass),
		options = {};
		//radioButtonSelector.hide();
		radioButtonSelector.each(function(index, radioButton) {
			$(radioButton).attr('togglah_id', 'tog_' + index);	
			options[index] = {};
			options[index].togglah_id = 'tog_' + index;
			options[index].text = $(radioButton).attr('alt');
			options[index].selected = $(radioButton).is(':checked');
		});
		$.each(options, function(index, option) {
			$(radioButtonSelector).last().after("<span class='togglah_option' togglah_id='" + option.togglah_id + "'>" +  option.text + "</span>");
		});
	};
	return {
		init: initialize
	};
}();
