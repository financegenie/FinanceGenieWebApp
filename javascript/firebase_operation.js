/* Firebase app initialization */
// FIrebase app configuration
var config = {
	apiKey: "AIzaSyAnyK0_vSaKmg4h8a56SUHZVv4lNl9Eghs",
	authDomain: "financegenie.firebaseapp.com",
	databaseURL: "https://financegenie.firebaseio.com",
	projectId: "financegenie",
	storageBucket: "financegenie.appspot.com",
	messagingSenderId: "296993871048"
};

// Firebase app initializatoin
firebase.initializeApp(config);

/* Firebase operation */
// This will handle all sign up, sign in, and check user session 
// Handles the sign up operations
function signUpOperation() {
	// Parse in user inputs
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

	// Check if email and password is correct
	if (!checkEmailAndPassword(email, password)) {
		return;
	}

	// Sign up with email and pass
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function() {
		// Redirect user to front page
		location.href = "home.html";
	})
	.catch(function(error) {
		// Handle Errors here
		var errorCode = error.code;
		var errorMessage = error.message;

		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}

		console.log(error);
	});
}

// Handles the sign in operations
function signInOperation() {
		// Parse in user inputs
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;

		// Check if email and password is correct
		if (!checkEmailAndPassword(email, password)) {
			return;
		}
		
		// Sign in with email and pass
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function() {
			// Redirect user to front page
			location.href = "home.html";
		})
		.catch(function(error) {
			// Handle Errors here
			var errorCode = error.code;
			var errorMessage = error.message

			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}

			console.log(error);
		});
}

// Handles the sign out operation
function signOutOperation() {
	firebase.auth().signOut().then(function () {
		// Redirect user to index
		location.href = "index.html";
	});		
}

// Check if given password and email is correct
// Takes in two string, the email and password
function checkEmailAndPassword(email, pass) {
	if (email.length <= 0) {
		alert('Please enter an email address.');

		return false;
	}else if (pass.length <= 0) {
		alert('Please enter a password.');

		return false;
	}else {
		return true;
	}
}