//var map;
//var heatmap;
//var heatMapData;

function initMap(){
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 38.881, lng: -77.247},
    mapTypeId: google.maps.MapTypeId.MAP
  });
    var heatMapData = [];
  	var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatMapData
});alert("hi");
  	//process(map,heatmap, heatMapData);
}


function process(map, heatmap, heatMapData){
      	alert("hi");
      	    $(document).ready(function(){
  			$.getJSON("http://api.reimaginebanking.com/accounts/56c66be6a73e492741507e65/purchases?key=d1964bf859fc21d67d2de4ca68e24dcd", function(data, status){
  		var stringData = JSON.parse(JSON.stringify(data));
  		for (var i = 0; i < stringData.length; i++) {

  			$(document).ready(function(){
  			
  			var nestUrl = "http://api.reimaginebanking.com/merchants/" + stringData[i].merchant_id.toString() + 
  				"?key=d1964bf859fc21d67d2de4ca68e24dcd";
  			$.getJSON(nestUrl, function(data, status){
     			// var latLng = new google.maps.LatLng(data.geocode.lat, data.geocode.lng);
      		// 	var weightedLoc = {
        // 		location: latLng,
        // 		weight: 5;
      		// 	};
      		
     			// heatMapData.push(weightedLoc);
     			
     		});
  	});
}

  	});

		
	});
	heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatMapData
});
	$(document).ready(function(){
  	$.getJSON("http://api.reimaginebanking.com/customers/56c66be5a73e4927415073ca?key=d1964bf859fc21d67d2de4ca68e24dcd", function(data, status){
     	document.getElementById("daname").innerHTML = JSON.parse(JSON.stringify(data)).first_name + " " + JSON.parse(JSON.stringify(data)).last_name;
  	});
		
	});
      }

var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);



heatmap.setMap(map);