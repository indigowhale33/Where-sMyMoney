var map, heatmap;
var points ;
var pointArray;
var darr = {};
 var tempdata = [];
var bdata = [];

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


function initMap() {
  points =  [ new google.maps.LatLng(38.881, -77.247)];
  pointArray = new google.maps.MVCArray(points);
  getPoints();
  for(var i in getPointbyMerc()){
    alert(i);
  }
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: {lat: 38.881, lng: -77.247},
          mapTypeId: google.maps.MapTypeId.SATELLITE
        });

        heatmap = new google.maps.visualization.HeatmapLayer({
          data: pointArray,
          map: map
        });

  
}

      function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      }

      function changeGradient() {
        var gradient = [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
      }

      function changeRadius() {
        heatmap.set('radius', heatmap.get('radius') ? null : 20);
      }

      function changeOpacity() {
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
      }

      // Heatmap data: 500 Points
      function getPoints() {
  var stringData=[];

$.getJSON("http://api.reimaginebanking.com/accounts/56c66be6a73e492741507e65/purchases?key=d1964bf859fc21d67d2de4ca68e24dcd",   function(data){

      stringData = JSON.parse(JSON.stringify(data));

    for(var i = 0; i<stringData.length; i++)
      {     

        $.getJSON("http://api.reimaginebanking.com/merchants/" + stringData[i].merchant_id.toString() + "?key=d1964bf859fc21d67d2de4ca68e24dcd",function(data,status){

          pointArray.push( new google.maps.LatLng(parseFloat(data.geocode.lat), parseFloat(data.geocode.lng)));
        });
      }

  });

      }

function markers(lati, lngi){


  //alert(m_id);
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



// input: merchant id
// output: purchase amount at one merchant
// function getPointbyMerc() {


// $.ajax({
//   url: "http://api.reimaginebanking.com/accounts/56c66be6a73e492741507e65/purchases?key=d1964bf859fc21d67d2de4ca68e24dcd",
//   async: false,
//   dataType: 'json',
//   success: function (response) {
//     for(var i = 0; i<response.length; i++)
//     {   
//         tempdata = [];
//         if(bdata.length != 0){
//           tokens = response[i].purchase_date.toString().split("-").slice(0,2);
//           month = parseInt(tokens.join());
//           if(response[i].merchant_id == bdata[bdata.length-1][0]){
//             if(month == bdata[i-1][1]){
//               bdata[bdata.length-1][2] += response[i].amount;
//             }else{
//               tempdata.push(response[i].merchant_id);
//               tempdata.push(month);
//               tempdata.push(response[i].amount);
//             }
          
//         }else{
//           tempdata.push(response[i].merchant_id);
//           tokens = response[i].purchase_date.toString().split("-").slice(0,2);
//           month = parseInt(tokens.join());
//           tempdata.push(month);
//           tempdata.push(response[i].amount);
            
            
//           }
//         }
        
        
//       $.ajax({
//           url: "http://api.reimaginebanking.com/merchants/"+response[i].merchant_id.toString()+"?key=d1964bf859fc21d67d2de4ca68e24dcd",
//           async: false,
//           dataType: 'json',
//           success: function (data) {

//             tempdata.push(data.geocode.lat.toFixed(6).toString() + data.geocode.lng.toFixed(6).toString());
//             tempdata.push(data.name);
//             //alert(data.geocode.lat);
//             markers(parseFloat(data.geocode.lat), parseFloat(data.geocode.lng));
            
            
//           }
//       });

//       //alert(tempdata);
     
        

          
        
//        }
//        bdata.push(tempdata);

//      }
// //     // do stuff with response.
//    });

//  }

function getPointbyMerc() {
$.getJSON("http://api.reimaginebanking.com/accounts/56c66be6a73e492741507e65/purchases?key=d1964bf859fc21d67d2de4ca68e24dcd",   function(data){

      stringData = JSON.parse(JSON.stringify(data));
    var hm = {};
    var month,tokens;
    var merc_id = "z";
    for(var i = 0; i<stringData.length; i++)
      {     
        
          
          tokens = stringData[i].purchase_date.toString().split("-").slice(0,2);
          
          month = tokens.join("-");

          if(merc_id == stringData[i].merchant_id.toString()){
            if(month in hm){
              hm[month] += parseFloat(stringData[i].amount.toString());
            }else{
              hm[month] = parseFloat(stringData[i].amount.toString());
            }

          }else{
            if(Object.keys(hm).length > 0){
              
              
              //alert(stringData[i].merchant_id.toString());
              //$.getJSON("http://api.reimaginebanking.com/merchants/" + stringData[i].merchant_id.toString() + "?key=d1964bf859fc21d67d2de4ca68e24dcd",function(data,status){
               //alert(data.merchant_id.toString());
  $.getJSON("http://api.reimaginebanking.com/merchants/" + stringData[i].merchant_id.toString() + "?key=d1964bf859fc21d67d2de4ca68e24dcd",   function(data){
            
      for(var k in hm){
          if(data.geocode.lat.toString()+ data.geocode.lng.toString() in darr){
                    
                    darr[data.geocode.lat.toString()+ data.geocode.lng.toString()].push([k,hm[k]]);
                    
          }else{
              darr[data.geocode.lat.toString()+ data.geocode.lng.toString()] = [[k,hm[k]]];
                    
          }
              delete hm[k];
                
      }
          
              //})
    });

            hm[month] = parseFloat(stringData[i].amount.toString());
            merc_id = stringData[i].merchant_id.toString();
          }
      }
      }     
  });
return darr;
}


          // if(month in hm){

          //   if(merc_id == stringData[i].merchant_id.toString()){

          //     hm[month] += parseFloat(stringData[i].amount.toString());
          //   }else{
          //     hm[month] = parseFloat(stringData[i].amount.toString());
          //   }
          // }else{
          //   if(merc_id == stringData[i].merchant_id.toString()){
          //     hm[month] = parseFloat(stringData[i].amount.toString());
          //   }else{
          //     if(Object.keys(hm).length > 0){
          //       var darr = [];
          //       alert(Object.keys(hm));
          //       for(var k in hm){
          //           darr.push([k,hm[k]]);
          //           delete hm[k];
          //       }
                
          //       $.getJSON("http://api.reimaginebanking.com/merchants/" + stringData[i].merchant_id.toString() + "?key=d1964bf859fc21d67d2de4ca68e24dcd",function(data,status){
                
          //         markers(parseFloat(data.geocode.lat), parseFloat(data.geocode.lng),darr);
          //       });
              
          //     }else{
          //       hm[month] = parseFloat(stringData[i].amount.toString());
          //     }
              
          //   }
          // }
   


function drawChart(marker){
  
  
  var data = new google.visualization.DataTable();
  var carr = [];
  var varr = [];
  //alert(Object.keys(darr));
  data.addColumn('number', 'Month');
  data.addColumn('number', 'Amount');
  data.addColumn('string', 'Name');
  for(var i in bdata){
    if(i[3] == marker.position.lat().toFixed(6).toString()+marker.position.lng().toFixed(6).toString()){
      carr.push(i);
    }
  }
  //alert(darr[marker.position.lat().toString()+marker.position.lng().toString()]);
  //alert(darr[m_id]);
  //alert(marker.position.lat().toFixedDown(6).toString()+marker.position.lng().toFixedDown(6).toString());
  //alert(marker.position.lat().toFixed(6).toString()+marker.position.lng().toFixed(6).toString());
  alert(darr[marker.position.lat().toFixed(6).toString()+marker.position.lng().toFixed(6).toString()]);

  for(var j in carr){
    varr.push([j[1],j[2],j[4]]);
  }
  data.addRows(varr);
  
        
        var options = {'title':'Pizza sold @ '+
                               marker.getPosition().toString(),
                       'width':300,
                       'height':150};
        
        var node = document.createElement('div'),
            infoWindow  = new google.maps.InfoWindow({maxWidth: 800});
            infoWindow.open(marker.getMap(),marker);
        node.setAttribute("id","chart");

        var chart = new google.visualization.LineChart(node);

            
            chart.draw(data, options);
            infoWindow.setContent(node);
            infoWindow.open(marker.getMap(),marker);
            
}

google.load('visualization', '1.0', {'packages':['corechart']});