$(document).ready(function () {
	
	$("#search-box").contactsApp({
		jsonSource : "data/contacts.json",
		outputTo : $("#output")
	});

});