(function () {
	
	/* MODEL SETUP*/
	var contacts = {
		"addressBook" : [
			{
				"name" : "dave",
				"email" : "dave@davesmail.com"
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
		],

		// implement 'count' method in model for skinniest controller possible!
		count : function() {
			return this.addressBook.length;
		}
	};

	/* VIEW SETUP */
	var page = {
		"items" : {
			"output" : document.getElementById("output"),
			"searchForm" : document.getElementById("search-form"),
			"searchBox" : document.getElementById("search-box"),
			"getAllBtn" : document.getElementById("get-all")
		},

		/* update function accepts address book entries as inputs in the form of an array of
		name+email objects; e.g. [{"name":"bob","email":"bob@bob.com"},{"name":"joe","email":"joe@joe.com"}] */
		update : function(entries) {
			var outputArea = this.items.output,
				i;

			outputArea.innerHTML = ""; // initialize output element

			if(entries.length)>0{
				for(i=0; i<entries.length; i++){
					outputArea.innerHTML += '<p><a href="mailto:' + entries[i].email + '">' + entries[i].name + '</a></p>';
				}

			}
		},

		/* search function just returns the appropriate search terms from the input box;
		call from the controller to pull data off the page */
		search : function() {
			var searchValue = this.items.searchBox.value;
			return searchValue;
		}

	}

})();