chrome.storage.sync.get('filters', function(item) {	
	if(item.filters != null) {
		//get a list of all the videos on the page
		var videos = $('.feed-page > ul > li');
		
		//iterate through each video
		for(var i = 0; i < videos.length; i++) {
			//get the title of the video
			//we're using filter(':first') because we only want the first element that matches this selector
			//and we're using .toLowerCase() to match the preferences case insensitive
			var title = $(videos[i]).find('a.feed-video-title').filter(':first').text().toLowerCase();
			//get the username of the uploader
			var username = $(videos[i]).find('span.feed-item-owner a').filter(':first').text().toLowerCase();
			
			//iterate through each filter
			for(var j = 0; j < item.filters.length; j++) {
				//if the title of the video matches and the author is either blank or matches
				if(item.filters[j].match != '' && (title.indexOf(item.filters[j].match.toLowerCase()) != -1 && (item.filters[j].author == '' || item.filters[j].author == null || item.filters[j].author.toLowerCase() == username))) {
					//and that's where the magic happens: we remove the video from the page
					$(videos[i]).remove();
				}
			}
		}
	}
});