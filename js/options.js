(function() {
	if(window.localStorage.getItem('hiddenVideos') != null) {
		$('#filters').val(localStorage.getItem('hiddenVideos'));
	}
})();

$('input[name="save"]').click(function() {
	localStorage.setItem('hiddenVideos', $('#filters').val());
	alert('Saved! (' + $('#filters').val() + ')');
});