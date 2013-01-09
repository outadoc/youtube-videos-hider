/* YT Videos Hider // background.js
   Copyright (c) 2012 outa[dev].
*/

function convertDataToNewFormat() {
	//if we're using the old filter format
	chrome.storage.sync.get('hiddenVideos', function(item) {
		if(item.hiddenVideos != null) {
			//split the filters, one per line
			var filtersArray = item.hiddenVideos.split('\n');
			var filtersObjArray = [];
			
			//for each filter
			for(var i = 0; i < filtersArray.length; i++) {
				//add a filter object containing its properties to the final array
				filtersObjArray[i] = {
					'match': filtersArray[i],
					'author': null
				};
			}
			
			//save the data in the new format using the Chrome storage API
			chrome.storage.sync.set({
				'filters': filtersObjArray
			}, function() {
				//delete the old data
				chrome.storage.sync.remove('hiddenVideos');
			});
		}
	});
}

//call the function, check for old data!
convertDataToNewFormat();