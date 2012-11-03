$('input[name="save"]').click(function() {
	var authorsDOM = $('#filters .author');
	var matchesDOM = $('#filters .match');
	var list = [];
		
	if(authorsDOM.length == matchesDOM.length) {
		for(var i = 0; i < authorsDOM.length; i++) {
			list[i] = {
				'match': matchesDOM[i].value,
				'author': authorsDOM[i].value
			}
		}
		
		chrome.storage.sync.set({
			'filters': list
		}, function() {
			alert('Saved successfully!');
		});
		
	} else {
		alert('Something went wrong... :(');
	}
});

chrome.storage.sync.get('filters', function(item) {
	if(item.filters != null) {
		var content = '<table><tr><th>Author</th><th>Title match</th></tr><tr>';
		
		for(var i = 0; i < item.filters.length; i++) {
			if(item.filters[i].author == null) { item.filters[i].author = ''; }
			if(item.filters[i].match == null) { item.filters[i].match = ''; }
			
			content += '<tr><td><input type="text" class="author" value="' + item.filters[i].author + '"></input></td>';
			content += '<td><input type="text" class="match" value="' + item.filters[i].match + '"></input></td>';
			content += '<td><button class="remove">-</button>';
			
			if(i == item.filters.length - 1) {
				content += '<button class="add">+</button>';
			}
			
			content += '</td></tr>';
		}
		
		$('#filters').append(content + '</table>');
	}
});