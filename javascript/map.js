function sentMap(token, id) {
	var http = new XMLHttpRequest();
		var url = "https://finance-genie.herokuapp.com/Transaction/get/";
		var body = "accessToken=" + token + "&endDate=2019-03-31&accountID=" + id;

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
				map = new Map({
					basemap: "topo-vector"
				});
				view = new MapView({
					container: "viewDiv",
					map: map,
					center: [-118.27928, 34.13558],
					zoom: 12
				});
				var layer = new GraphicsLayer();
				var i =0;
				var parsed = JSON.parse("[" + input + "]");
				for(var current in parsed[0]){
					
					var location = parsed[0][current].location;

					var lat = location.lat;
					var lon = location.lon;
						
					if(lat != null && lon != null){
						console.log(lat)
						console.log(lon)
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
					map.add(layer);
				});
}