(function($){

	$.fn.contactsApp = function( options ) {
		var searchBox = $( this );

		var defaults = {
			jsonSource: "data/contacts.json",
			outputTo : $( "#output" ),
			cacheTimeoutInSeconds : 3600
		};

		var options = $.extend( defaults, options );

		return this.each( function() {

			/* VIEW */
			var page = {

				/* update function accepts address book entries as inputs in the form of an array of
				name+email objects; e.g. [{"name":"bob","email":"bob@bob.com"},{"name":"joe","email":"joe@joe.com"}] */
				updatePage : function( entries ) {
					var i,
						output = options.outputTo;

					output.empty(); // initialize output element

					if( entries ){
						$.each( entries, function( i, entry ){
							output.append('<p><a href="mailto:' + entry.email + '">' + entry.name + '</a></p>');
						});
					}
				},

				/* getQueryString function just returns the appropriate search terms from the input box;
				call from the controller to pull data off the page */
				getQueryString : function() {
					return searchBox.val();
				}

			};

			/* CONTROLLER */
			var controller = {
				
				/* search function checks passed query string against each "name" attribute in passed
				data model, and returns an array with all the found entries */
				search : function( dataModel, queryString ) {
					if( queryString ){
						var foundItems = [],
						contacts = dataModel.addressBook,
						i;

						$.each( contacts, function( i, contact ){
							if( contact.name.indexOf( queryString ) !== -1 ) {
								foundItems.push( contact );
							}
						});

						return foundItems;
					}
				},

				/* execute function ties everything together */
				execute : function() {

					/* this gets a little tricky so sing along... */
					
					// method-agnostic; get JSON data and pass the whole data object to anonymous callback function...
					model.getData( options.jsonSource, function( contacts ) { 

						// the updatePage method inside the callback needs to be passed the entries to show...
						page.updatePage( 

							// which we pull by searching the data object using the query string from the page!
							controller.search( contacts, page.getQueryString() ) 

						); // end updatePage method call
					} // end anonymous function
					); // end getJSON method
				} // end execute method definition
			}; // end controller object

			var model = {

				// hacky private cache
				cache : {
					cachedData : {},
					lastRefreshed : 0,
					updateRefreshTime : function() {
						model.cache.lastRefreshed = Date.now();
					},
					isStillValid : function() {
						// multiply difference in dates by 1000 because the Date.now() method returns milliseconds
						if( Date.now() - model.cache.lastRefreshed >= options.cacheTimeoutInSeconds*1000 ) {
							return false;
						} else {
							return true;
						}
					}
				},

				getData : function( source, callback ) {
					if( model.cache.isStillValid() ) {	
						callback( model.cache.cachedData );
					} else {
						model.cache.updateRefreshTime();
						$.getJSON( source, function( returnedData ) {
							model.cache.cachedData = returnedData;
							callback( returnedData );
						});
					}
					
				},

			}; // end model object

			$(this).keyup( function() { controller.execute() } );

		})
	}

})( jQuery );

	