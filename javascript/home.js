// Global variable to keep track of user's UID
var USER_UID;

function initHome() {
	// Listening for auth state changes
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in
			USER_UID = user.uid;
			console.log("Current UID: " + USER_UID);
		}else {
			// Redirect user to front page
			location.href = "index.html";
		}
	});
}

// GIven the user UID, 