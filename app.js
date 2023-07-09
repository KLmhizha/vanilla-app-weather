function forecastDate(time) {
	let now = new Date(time);
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let day = days[now.getDay()];

	return day;

}



function currentDate(timeStamp) {
	let current = new Date(timeStamp);
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day = days[current.getDay()];
	let hours = current.getHours();
	let minutes = current.getMinutes();

	if(hours < 10) {
		hours = `0${hours}`;
	}

	if(minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${day} ${hours}:${minutes}`;

}



function displayForecast(response) {

	let forecastElement = response.data.daily;
	let forecastDay = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecastElement.forEach(function (day, index) {

		if(index < 4) {

			forecastHTML = forecastHTML + 

			`<div class="col-3 mt-5">
				<div id="forecast-date">${forecastDate(day.dt * 1000)}</div>
				<img src = "https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="cloudy" id="image">
				<div class="forecast-temp">
					<span class="temp-max">${Math.round(day.temp.max)}°</span>
					<span class="temp-min opacity-75">${Math.round(day.temp.min)}°</span>
				</div>
		</div>`;
		}
	});

	  forecastHTML = forecastHTML + `</div>`;
		forecastDay.innerHTML = forecastHTML;
}

function forecastWeather(coordinates) {
	let lat = coordinates.lat;
	let lon = coordinates.lon;
	let key = "5f472b7acba333cd8a035ea85a0d4d4c";
	let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
	axios.get(url).then(displayForecast);
}

function displayWeather(response) {
	console.log(response.data);
	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#date").innerHTML = currentDate(response.data.dt * 1000);
	document.querySelector("#description").innerHTML = response.data.weather[0].description;
	document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
	document.querySelector("#real-feel").innerHTML = Math.round(response.data.main.feels_like);
	document.querySelector("#humidity").innerHTML = response.data.main.humidity;
	document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);

	forecastWeather(response.data.coord);
}

function search(city) {
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
}



function formValue(event) {
	event.preventDefault();
	let inputForm = document.querySelector("#input-city");
	search(inputForm.value);
}




search("Pietermaritzburg");
let form = document.querySelector("#control-form");
form.addEventListener("submit", formValue);