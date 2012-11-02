$('input[name="save"]').click(function() {
	chrome.storage.sync.set({
		'hiddenVideos': $('#filters').val()
	}, function() {
		alert('Saved successfully!');
	});
});

chrome.storage.sync.get('filters', function(item) {
	console.log(item.filters);
});