   
	mapObj = null;
	var NA = 'n/a';
	
	//Marker Window to Store Photo
	var infowindow = new google.maps.InfoWindow({
	    size: new google.maps.Size(450, 350),
	    maxWidth:450
	});
	
	//Initialize the map when windows starts up
	$(document).ready(function(){
		google.maps.event.addDomListener(window, 'load', init);
		//google.maps.event.addListener(mapObj, 'rightclick', function(event){alert('Test');});
	});
	function init() {
		var mapOptions = {
			center : new google.maps.LatLng(43.6481, -79.4042),
			zoom : 15,
			mapTypeControl: true,
			mapTypeControlOptions: {
	            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
	        },
	        navigationControl: true,
	        disableDoubleClickZoom: true,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		
		
		mapObj = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
		
		var defaultBounds = new google.maps.LatLngBounds( 
  			new google.maps.LatLng(43.6281, -79.4242),
      		new google.maps.LatLng(43.6681, -79.3842)
      	);
  		mapObj.fitBounds(defaultBounds);

  		var input = /** @type {HTMLInputElement} */(document.getElementById('target'));
  		var searchBox = new google.maps.places.SearchBox(input);
		
		//google.maps.event.clearListeners(mapObj, 'dblclick');
		google.maps.event.addListener(mapObj, 'click', function() {
	        infowindow.close();
	    });
	    
	    google.maps.event.addListener(mapObj, 'dblclick', function(event){
		var css = {
		    left: $('body').width()/2 - $('#popUp').width()/2,
		    top: $('body').height()/2 - $('#popUp').height()/2
		};
		$('.screener').show();
		$('#popUp').css(css).show();
	    	event.stop();
	    });
	    
	    var description = 'Cherry blossom viewing in High Park.';
	    var photo1 = new PhotoClass('image/cb.jpg','4:00pm','May 5, 2013',description,new google.maps.LatLng(43.6481,-79.4042) );
	    
	    addPhotoMarker(photo1);
	    
	    google.maps.event.addListener(searchBox, 'places_changed', function() {
	    	//alert('PC');
    		var places = searchBox.getPlaces();

    		var bounds = new google.maps.LatLngBounds();
    		for (var i = 0, place; place = places[i]; i++) {
      			var image = {
        		url: place.icon,
        		size: new google.maps.Size(71, 71),
        		origin: new google.maps.Point(0, 0),
        		anchor: new google.maps.Point(17, 34),
        		scaledSize: new google.maps.Size(25, 25)
      			};

      			bounds.extend(place.geometry.location);
    		}

    		mapObj.fitBounds(bounds);
    	});
    	
    	google.maps.event.addListener(mapObj, 'bounds_changed', function() {
    		var bounds = mapObj.getBounds();
    		searchBox.setBounds(bounds);
  		});


	}

	function addPhotoMarker(photoObj) {
	    
	    //var mapObj2 = new google.maps.Map(document.getElementById("mapCanvas"));
	    
	    var marker = new google.maps.Marker({
	        position: photoObj.latLng,
	        map: mapObj,
	        //title: 'myTitle',
	        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
	    });

		var strContent = 
		'<div style="width:450px;height:350px;">'+
			'<div id="Image" style="width:450px;height:250px;text-align: center;line-height:250px;">'+
				'<img src = "'+photoObj.photoSrc+'" style="vertical-align: middle;width: 400px" >'+
			'</div>'+
			'<div id="Date" style="width:440px;height:25px;margin-left: 10px;">'+
			'<small><i>Taken on '+ photoObj.date +' at '+ photoObj.time +'.</i></small></div>'+
			'<div id="Description" style="width:450px;height:25px"> '+
				'<b>Description:</b> <br>'+
				photoObj.description+
			'</div>'+
		'</div>'
		;

	    google.maps.event.addListener(marker, 'click', function() {
	        infowindow.setContent(strContent);
	        infowindow.open(mapObj, marker);
	    });
	}

	function PhotoClass(photoSrc,time,date,description,latLng) {
		this.description = description;
		this.time = time;
		this.date = date;
		this.photoSrc = photoSrc;
		this.latLng = latLng;

	}

