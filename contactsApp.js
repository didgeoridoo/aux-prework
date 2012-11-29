$(document).ready(function () {
	
	/* VIEW */
	var page = {

		/* update function accepts address book entries as inputs in the form of an array of
		name+email objects; e.g. [{"name":"bob","email":"bob@bob.com"},{"name":"joe","email":"joe@joe.com"}] */
		updatePage : function(entries) {
			var i,
				output = $("#output");

			output.empty(); // initialize output element

			if(entries){
				$.each(entries, function(i, entry){
					output.append('<p><a href="mailto:' + entry.email + '">' + entry.name + '</a></p>');
				});
			}
		},

		/* getQueryString function just returns the appropriate search terms from the input box;
		call from the controller to pull data off the page */
		getQueryString : function() {
			return $("#search-box").val();
		}

	};

	/* CONTROLLER */
	var controller = {
		
		/* search function checks passed query string against each "name" attribute in passed
		data model, and returns an array with all the found entries */
		search : function(dataModel, queryString) {
			if(queryString){
				var foundItems = [],
				contacts = dataModel.addressBook,
				i;

				$.each(contacts, function(i, contact){
					if(contact.name.indexOf(queryString) !== -1){
						foundItems.push(contact);
					}
				});

				return foundItems;
			}
		},

		/* execute function ties everything together */
		execute : function() {
			/* this gets a little tricky so sing along... */
			
			// get JSON data and pass the whole data object to anonymous callback function...
			$.getJSON("data/contacts.json", function(contacts){ 

				// the updatePage method inside the callback needs to be passed the entries to show...
				page.updatePage( 

					// which we pull by searching the data object using the query string from the page!
					controller.search(contacts, page.getQueryString() ) 

				); // end updatePage method call
			} // end anonymous function
			); // end getJSON method
		} // end execute method definition
	}; // end controller object

	$("#search-box").keyup( function() { controller.execute() } );

});