mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYW52ZHAiLCJhIjoiY2ttbHB5NmpjMDA1NDJ1cGUwZ2J1enlvaCJ9.WBVtoZo5bH_VTa3HkWA-Mw';

var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '532f5578753398a48a6e52978b859df8';

function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='532f5578753398a48a6e52978b859df8';
	var city = document.getElementById('city').value;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {

	var type = response.weather[0].description;

	var degC = Math.floor(response.main.temp - 273.15);

	var windSpeed = response.wind.speed;

	var cloudiness = response.clouds.all;

	var weatherBox = document.getElementById('weather');


	var iconUrl = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';

	icon = '<div class="icon"> <img id="weather "src="'+iconUrl+'"> </div>';

	weatherBox.innerHTML = 'Degrees: ' + degC + '&#176;C <br>' + type + '<br>' + 'Windspeed: ' + windSpeed + ' m/s<br>' + 'Cloudiness: ' + cloudiness + '%' + icon;

}


function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'Did you enter a correct city?'; 
}

//functie uitvoeren als er op de button geklikt word
document.getElementById('getWeather').onclick = function(){
	getAPIdata();
};

//Nieuwe code om het weer van de landingsplaatsen te laten zien

function getAPIdata1(city) {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey = '532f5578753398a48a6e52978b859df8';

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		weerLanding(response);	
	})
	
}

function weerLanding(response) {
	// get type of weather in string format
	var type = response.weather[0].description;

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);

	var windSpeed = response.wind.speed;

	var cloudiness = response.clouds.all;

	// render weather in DOM
	var weatherBox = document.getElementById('weather1');
	weatherBox.innerHTML = 'Degrees: ' + degC + '&#176;C <br>' + type + '<br>' + 'Windspeed: ' + windSpeed + ' m/s' + '<br> Cloudiness: ' + cloudiness + '%';
}



//functie uitvoeren
document.getElementById('Schiphol').onclick = function(){
	getAPIdata1('schiphol');
};


//functie uitvoeren
document.getElementById('Lelystad').onclick = function(){
	getAPIdata1('lelystad');
};




//functie uitvoeren
document.getElementById('Rotterdam').onclick = function(){
	getAPIdata1('rotterdam');
};





//functie uitvoeren
document.getElementById('Enschede').onclick = function(){
	getAPIdata1('enschede');
};
//mapbox

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/brianvdp/ckn62bgh008tz18nxqcxbwa3n',
  center: [5.127684, 52.0809856],
  zoom: 6.5,
});

var popup1 = new mapboxgl.Popup().setHTML
(`<h3> Schiphol Amsterdam Airport</h3><p> Amsterdam Airport Schiphol is the largest Dutch airport and an important airport in Europe. With 71 million passengers, Schiphol was the third busiest airport in Europe in 2018, after Heathrow and Charles de Gaulle.
	<img src="./images/schiphol.jpg">`);

var marker1 = new mapboxgl.Marker()
	.setLngLat([4.761282545135503, 52.30826826023857])
	.setPopup(popup1)
	.addTo(map);
   

var popup3 = new mapboxgl.Popup().setHTML
(`
	<h3> Rotterdam Airport</h3><p> Rotterdam The Hague Airport, formerly Rotterdam Airport and named Zestienhoven Airport when it was built in 1956, has been the second regional airport in the Netherlands after Eindhoven Airport since the end of 2006, measured by the number of travelers.
</p>
	<img src="./images/Rotterdam.jpg">`);

var marker3 = new mapboxgl.Marker()
	.setLngLat([4.4342857, 51.9483126])
	.setPopup(popup3)
	.addTo(map);

var popup4 = new mapboxgl.Popup().setHTML
(`
	<h3> Eindhoven Airport</h3><p> Eindhoven Airport or Eindhoven Airport is located on the west side of Eindhoven, between Best and Veldhoven. Originally it was a civil airport that was transferred to the Royal Netherlands Air Force as an air base after the Second World War. </p>
	<img src="./images/Eindhoven.jpg">`);

var marker4 = new mapboxgl.Marker()
	.setLngLat([5.3737109, 51.44983])
	.setPopup(popup4)
	.addTo(map);

	init()

	function init(){
		var url = "https://api.covid19api.com/summary"

		$.get(url,function(data){
			console.log(data.Global)

			data = `
				
				<td>${data.Global.TotalConfirmed}</td>
				<td>${data.Global.TotalDeaths}</td>
				<td>${data.Global.TotalRecovered}</td>
			`

			$("#data").html(data)
		})
	}

