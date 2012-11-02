chrome.storage.sync.get('hiddenVideos', function(item) {	
	var videos = $('.feed-page ul li');
	var hidden_videos = (item.hiddenVideos).split('\n');
	
	console.log(hidden_videos);
	
	$.each(videos, function(i) {
		var title = $(videos[i]).find('a.title').text();
		
		$.each(hidden_videos, function(j) {
			if((title.toLowerCase()).indexOf((hidden_videos[j]).toLowerCase()) != -1) {
				console.log('removing ' + title + '(because of ' + hidden_videos[j] + ')');
				$(videos[i]).remove();
			}
		});
	});
});