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
	]
};

(function () {
	var addressBook = contacts.addressBook,
		contactsCount = addressBook.length,
		htmlTarget = document.getElementsByTagName("body")[0],
		i;

	if (contactsCount>0) {
		for (i=0; i<contactsCount; i++) {
			var entry = addressBook[i],
				name = entry.name,
				email = entry.email;

			htmlTarget.innerHTML += '<p><a href="mailto:' + email + '">' + name + '</a></p>';
		}
	}
})();