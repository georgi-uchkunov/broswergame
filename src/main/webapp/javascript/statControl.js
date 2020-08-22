$(function() {
	var selects = $('.custom-select');
	$(selects).bind(
			'change',
			function(evt) {
				var newVal = $(this).val(), oldVal = $(this).data('old-val');

				if (newVal != 0) {
					$(selects).not(this).find('option[value="' + newVal + '"]')
							.attr('disabled', 'disabled');
				}

				$(selects).not(this).find('option[value="' + oldVal + '"]')
						.removeAttr('disabled');
				$(this).data('old-val', newVal);
			});
});