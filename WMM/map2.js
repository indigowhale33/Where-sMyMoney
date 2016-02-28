var map;
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38, lng: -77},
    zoom: 10
  });
  
  markers(38,-77);
  // Add marker on user click
  


  // Create a heatmap.
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: [],
    map: map,
    radius: 8
  });

  
}

function markers(lati, lngi){
  marker = new google.maps.Marker({
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: {lat: lati, lng: lngi}
  });

  google.maps.event.addListener(marker, 'click', function() {
      
      drawChart(this);
    });

  
}

function drawChart(marker){

         var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);
        var options = {'title':'Pizza sold @ '+
                               marker.getPosition().toString(),
                       'width':"100%",
                       'height':"100%"};
                       
        var node        = document.createElement('div'),
            infoWindow  = new google.maps.InfoWindow({maxWidth: 800});

        node.setAttribute("id","chart");
        var chart       = new google.visualization.LineChart(node);

            
            chart.draw(data, options);
            infoWindow.setContent(node);
            infoWindow.open(marker.getMap(),marker);
          }

  




function test1(){
  $(document).ready(function(){
      $.getJSON("http://api.reimaginebanking.com/customers/56c66be5a73e4927415073ca?key=d1964bf859fc21d67d2de4ca68e24dcd", function(data, status){
          
          alert(JSON.parse(JSON.stringify(data)).first_name);
      });
    });

}
google.load('visualization', '1.0', {'packages':['corechart']});