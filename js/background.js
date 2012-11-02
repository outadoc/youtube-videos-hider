function convertDataToNewFormat() {
	//if we're using the old filter format
	chrome.storage.sync.get('hiddenVideos', function(item) {
		if(item.hiddenVideos != null) {
			var filtersArray = item.hiddenVideos.split('\n');
			var filtersObjArray = [];
			
			for(var i = 0; i < filtersArray.length; i++) {
				filtersObjArray[i] = {
					'match': filtersArray[i],
					'author': null
				};
			}
			
			chrome.storage.sync.set({
				'filters': filtersObjArray
			}, function() {
				chrome.storage.sync.remove('hiddenVideos');
			});
		}
	});
}