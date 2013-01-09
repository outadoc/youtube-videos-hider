/* YT Videos Hider // options.js
   Copyright (c) 2012 outa[dev].
*/

function updateEventListeners() {
	//unbind all the existing click listeners so they don't have duplicates
	$('button.remove').unbind('click');
	$('button.add').unbind('click');
	
	//implement and bind removal functionnality
	$('button.remove').click(function() {
		//get the list of the lines of the table
		var tableLines = $('#filters tr');
		var wasLastLine = false;
		
		//if we deleted the last line of the table, remember it
		if(tableLines[tableLines.length-1] == $(this).parent().parent().get(0)) {
			wasLastLine = true;
		}
		
		//delete the line of the button we clicked
		$(this).parent().parent().remove();
		
		//if we just deleted the last line of the table
		if(wasLastLine) {
			//update the list of lines
			tableLines = $('#filters tr');
			//re-add the addition button on the last line (which isn't the same anymore)
			$($(tableLines[tableLines.length-1]).children('td')[2]).append('<button class="add">+</button>');
		}
		
		//update events listners so the new buttons react correctly
		updateEventListeners();
	});
	
	//implement and bind addition functionnality
	$('button.add').click(function() {
		//add two fields and a "remove" button
		var content = '<tr><td><input type="text" class="author" value=""></input></td>';
			content += '<td><input type="text" class="match" value=""></input></td>';
			content += '<td><button class="remove">-</button>';
			content += '<button class="add">+</button></td></tr>';
		
		$('#filters table tr button.add').remove();
		$('#filters table').append(content);
		
		//update events listners so the new buttons react correctly
		updateEventListeners();
	});
}

//when the user clicks save
$('input[name="save"]').click(function() {
	//the DOM textfields containing the names of the authors
	var authorsDOM = $('#filters .author');
	//the DOM textfields containing the match patterns
	var matchesDOM = $('#filters .match');
	//the array that will contain the final array of filter properties
	var list = [];
	
	//there should be as much author fields as there are matches fields
	if(authorsDOM.length == matchesDOM.length) {
		//for each set of two fields; they're the same length so it should be no problem
		for(var i = 0; i < authorsDOM.length; i++) {
			//add the object containing the properties of the filter to the final array
			list[i] = {
				'match': matchesDOM[i].value,
				'author': authorsDOM[i].value
			}
		}
		
		//saving the filters with the Chrome storage API
		chrome.storage.sync.set({
			'filters': list
		}, function() {
			alert('Saved successfully!');
		});
		
	} else {
		//the fields count are not the same, the user must have messed something up
		alert('Something went wrong... :(');
	}
});

//getting the filters using the Chrome storage API
chrome.storage.sync.get('filters', function(item) {
	//if the list has already been set and isn't empty
	if(item.filters != null && item.filters.length > 0) {
		//begin with adding a table and its header
		var content = '<table><tr><th>Author</th><th>Title match</th></tr>';
		
		//for each filter
		for(var i = 0; i < item.filters.length; i++) {
			//if the field is null, make it empty instead
			if(item.filters[i].author == null) { item.filters[i].author = ''; }
			if(item.filters[i].match == null) { item.filters[i].match = ''; }
			
			//add two fields and a "remove" button for each line of the table
			content += '<tr><td><input type="text" class="author" value="' + item.filters[i].author + '"></input></td>';
			content += '<td><input type="text" class="match" value="' + item.filters[i].match + '"></input></td><td>';
			
			//if it's not the first field
			if(i > 0 || item.filters.length > 1) {
				content += '<button class="remove">-</button>';
			}
			
			//if it's the last field, add an "add" button so the user can add fields later
			if(i == item.filters.length - 1) {
				content += '<button class="add">+</button>';
			}
			
			//close the line of the table
			content += '</td></tr>';
		}
		
		//close the table
		$('#filters').append(content + '</table>');
		
		//add event listeners to the buttons
		updateEventListeners();
	} else {
		//add a blank line so at least something shows up
		chrome.storage.sync.set({
			'filters': [{
				'match': '',
				'author': null
			}]
		}, function() {
			//reload the page
			document.location.reload(true);
		});
	}
});