$('input[name="save"]').click(function() {
	chrome.storage.sync.set({
		'hiddenVideos': $('#filters').val()
	}, function() {
		alert('Saved successfully!');
	});
});

chrome.storage.sync.get('filters', function(item) {
	console.log(item.filters);
	for(var i = 0; i < item.filters.length; i++) {
		$('#filters').append('<input type="text" class="author" value="' + item.filters[i].author + '"></input> \
						   	  <input type="text" class="match" value="' + item.filters[i].match + '"></input><br />');
	}
});