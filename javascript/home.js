// Global variable to keep track of user's UID
var USER_UID;
var MAP = null;

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
			for (var i = 1; i >=0; i--){
				sentMap(response.Account[i].accessToken, response.Account[i].accountID);
			};
			
			console.log(response.Account);
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


function sentMap(token, id) {
	var http = new XMLHttpRequest();
		var url = "https://finance-genie.herokuapp.com/Transaction/get/";
		console.log(token);
		console.log(id);
		var body = "accessToken=" + token + "&startDate=2019-03-01&endDate=2019-03-31&accountID=" + id;

		http.open('POST',url,false);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		http.send(body);

		var input = http.responseText;
		require([
			"esri/Map",
			"esri/views/MapView",
			"esri/Graphic", 
			"esri/geometry/Point", 
			"esri/symbols/SimpleMarkerSymbol",
			"esri/layers/GraphicsLayer"
			], function(Map, MapView, Graphic, Point, SimpleMarkerSymbol, GraphicsLayer) {
				
				if(MAP == null){
					MAP = new Map({
					basemap: "topo-vector"
				});
					view = new MapView({
						container: "viewDiv",
						map: MAP,
						center: [-78, 34],
						zoom: 12
				});
				}
				
				var layer = new GraphicsLayer();
				var i =0;
				var parsed = JSON.parse("[" + input + "]");
				console.log("From map: ");
				console.log(input);

				for(var current in parsed[0]){
					
					var location = parsed[0][current].location;

					var lat = location.lat;
					var lon = location.lon;
					

					if(lat != null && lon != null){
						// Create a point
						var point = new Point({
							longitude: lon,
							latitude: lat
						})
							// Create a symbol for drawing the point
							var markerSymbol = new SimpleMarkerSymbol({
								color: [226, 119, 40],
								outline: {
									color: [255, 255, 255],
									width: 1
								}
							})
							// Create a graphic and add the geometry and symbol to it
							var pointGraphic = new Graphic({
								geometry: point,
								symbol: markerSymbol
							})
							layer.add(pointGraphic);
						}
					};

					
					MAP.add(layer);
				});
}