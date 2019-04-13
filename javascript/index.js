function initIndex() {
	// Listening for auth state changes
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			// Redirect user to homepage
			location.href = "home.html";
		}
	});
}