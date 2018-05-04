const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=87f79c53472e1f9e80ac8992bfcc78b7'

export const fetchWeather = (lat,lon) => {
	const url = rootUrl+'&lat='+lat+"&lon="+lon+"&units=metric"
	console.log(url)

	return fetch(url)
		.then(res => res.json())
		.then(json => ({
			temp: json.main.temp,
			pressure: json.main.pressure,
			humidity: json.main.humidity,
			maxTemp: json.main.temp_max,
			minTemp: json.main.temp_min,
			weather: json.weather[0].main,
			weatherDescription: json.weather[0].description,
			name: json.name,
			country: json.sys.country,
			windSpeed: json.wind.speed,
			windDeg: json.wind.deg,
			clouds: json.clouds.all,
			sunrise: json.sys.sunrise,
			sunset: json.sys.sunset,
			
		}))
}