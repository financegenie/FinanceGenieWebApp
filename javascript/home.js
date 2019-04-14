// Global variable to keep track of user's UID
var USER_UID;

function initHome() {
	// Listening for auth state changes
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in
			USER_UID = user.uid;
			var response = requestAccounts(USER_UID);
			console.log("Current UID: " + USER_UID);
		}else {
			// Redirect user to front page
			location.href = "index.html";
		}
	});
}

// Given the user UID, return all the account associated with the user ID
function requestAccounts(uid) {
	xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://finance-genie.herokuapp.com/account/get_linked/", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("userID=" + uid);

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var response = JSON.parse(xhttp.responseText);
			console.log(response.Account[0].institutionID);
			requestInst(response.Account[0].institutionID);

			//requestBalance(response.Account[0].accessToken, response.Account[0].accountID);
		}
	}	
}

// Given an access token and an account ID, get the balance of the account
function requestBalance(token, id) {
	xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://finance-genie.herokuapp.com/account/get_balance/", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("accessToken=" + token + "&accountID=" + id);

	// xhttp.onreadystatechange = function() {
	// 	if (this.readyState == 4 && this.status == 200) {
	// 		var response = JSON.parse(this.responseText);
	// 		console.log(response);
	// 	}
	// }
}

// Given an institution ID, get the name of the institution
function requestInst(id) {
	xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://finance-genie.herokuapp.com/institution/get_by_id/", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("InstitutionID=" + id);
}