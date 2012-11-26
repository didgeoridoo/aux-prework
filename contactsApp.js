(function () {
	
	/* MODEL */
	var contacts = {
		"addressBook" : [
			{
				"name" : "dave",
				"email" : "dave@davesmail.com"
			},
			{
				"name" : "david junior",
				"email" : "jr@davesmail.com"
			},
			{
				"name" : "barb",
				"email" : "barb@barbsmail.com"
			},
			{
				"name" : "austin",
				"email" : "austin@austinsmail.com"
			},
			{
				"name" : "janna",
				"email" : "janna@jannasmail.com"
			}
		]
	};

	/* VIEW */
	var page = {
		"items" : {
			"output" : document.getElementById("output"),
			"searchForm" : document.getElementById("search-form"),
			"searchBox" : document.getElementById("search-box")
		},

		/* update function accepts address book entries as inputs in the form of an array of
		name+email objects; e.g. [{"name":"bob","email":"bob@bob.com"},{"name":"joe","email":"joe@joe.com"}] */
		updatePage : function(entries) {
			var outputArea = page.items.output,
				i;

			outputArea.innerHTML = ""; // initialize output element

			if(entries){
				for(i=0; i<entries.length; i++){
					outputArea.innerHTML += '<p><a href="mailto:' + entries[i].email + '">' + entries[i].name + '</a></p>';
				}
			}
		},

		/* getQueryString function just returns the appropriate search terms from the input box;
		call from the controller to pull data off the page */
		getQueryString : function() {
			var searchValue = page.items.searchBox.value;
			return searchValue;
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

				for(i=0; i<contacts.length; i++){
					if(contacts[i].name.indexOf(queryString) !== -1){
						foundItems.push(contacts[i]);
					}
				}

				return foundItems;
			}
		},

		/* execute function ties everything together */
		execute : function() {
			page.updatePage(
				controller.search(contacts, page.getQueryString() )
			);
		}
	};

	page.items.searchBox.addEventListener("keyup", controller.execute, false);

})();