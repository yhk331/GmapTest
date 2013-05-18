   
	var map_obj = null;
	var NA = 'n/a';
	
	var infowindow = new google.maps.InfoWindow({
	    size: new google.maps.Size(150, 50)
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
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		
		map_obj = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		google.maps.event.addListener(map_obj, 'click', function() {
	        infowindow.close();
	    });
	    
	}

	google.maps.event.addDomListener(window, 'load', init);

	function addMarker(latlng, myTitle, newPlace) {
	    var contentString = createContStr(newPlace);
	    var marker = new google.maps.Marker({
	        position: latlng,
	        map: map_obj,
	        title: myTitle,
	        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
	    });

	    google.maps.event.addListener(marker, 'click', function() {
	        infowindow.setContent(contentString);
	        infowindow.open(map_obj, marker);
	    });
	}
	
	function addMarker2(latlng, myTitle, newPlace) {
	    var contentString = createContStr(newPlace);
	    
	    if(newPlace.total_rate>=2){
	    var marker = new google.maps.Marker({
	        position: latlng,
	        map: map_obj,
	        title: myTitle,
	    });

	    google.maps.event.addListener(marker, 'click', function() {
	        infowindow.setContent(contentString);
	        infowindow.open(map_obj, marker);
	    });
	}
	}

	function createContStr(place) {
		var description = place.type;

		str = '<h3 class="firstHeading">' + place.name + '</h3>' + 
		'<p>'+ description + '</p>' + 
		'<p> Price: '+ place.price + '</p>' +
		//'<p> Bedroom: '+ place.bedroom + '</p>' + 
		//'<p> Parking: '+ place.parking + '</p>' + 
		'<p> Score based on Restaurant: '+ place.food_rate + '</p>' + 
		'<p> Score based on Shopping Malls: '+ place.shop_rate + '</p>' +
		'<p> Score based on Education: '+ place.edu_rate + '</p>' +
		'<p> Score based on Subway Avail.: '+ place.trans_rate + '</p>' +
		'<p> Score based on Gas Station: '+ place.gas_rate + '</p>' +
		'<p> Total score: '+ place.gas_rate + '</p>'
		;

		return str;
	}

	// Place JS object
	function place(lat, longd, name,type,food_rate,shop_rate,edu_rate,trans_rate,gas_rate,total_rate,price,bedroom,parking) {
		this.lat = lat;
		this.longd = longd;
		this.name = name;
		this.type = type;
		this.food_rate = food_rate;
		this.shop_rate = shop_rate;
		this.edu_rate = edu_rate;
		this.trans_rate = trans_rate;
		this.gas_rate = gas_rate;
		this.total_rate = total_rate;
		this.price = price;
		this.bedroom = bedroom;
		this.parking = parking;

		return this;
	}
