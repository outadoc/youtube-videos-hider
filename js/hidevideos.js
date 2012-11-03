chrome.storage.sync.get('filters', function(item) {	
	if(item.filters != null) {
		var videos = $('.feed-page > ul > li');
		
		for(var i = 0; i < videos.length; i++) {
			var title = $(videos[i]).find('a.feed-video-title').filter(':first').text().toLowerCase();
			var username = $(videos[i]).find('a.yt-user-name').filter(':first').text().toLowerCase();
			
			for(var j = 0; j < item.filters.length; j++) {
				if(title.indexOf(item.filters[j].match.toLowerCase()) != -1 && (item.filters[j].author == '' || item.filters[j].author == null || item.filters[j].author.toLowerCase() == username)) {
					$(videos[i]).remove();
				}
			}
		}
	}
});