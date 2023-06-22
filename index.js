const apiKey = "fb8a0dfc7e413cc400042f24d6bf2250";
const url = "http://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");

function getWeather(city) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url + city + `&appid=${apiKey}`, true);
  xhr.onload = function () {
    if (xhr.status == 404 ) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
    const weather = JSON.parse(this.response);
      const temp = Math.floor(weather.main.temp);
      document.querySelector(".city").innerHTML = weather.name;
      document.querySelector(".temp").innerHTML = temp + "°C";
      document.querySelector(".humidity").innerHTML =
        weather.main.humidity + "%";
      document.querySelector(".wind").innerHTML = weather.wind.speed + " km/h";

      const condition = weather.weather[0].main;

      switch (condition) {
        case "Clouds":
          weatherIcon.src = "images/clouds.png";
          break;
        case "Clear":
          weatherIcon.src = "images/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "images/rain.png";
          break;
        case "Drizzle":
          weatherIcon.src = "images/drizzle.png";
          break;
        case "Mist":
          weatherIcon.src = "images/mist.png";
      }

      document.querySelector(".content").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  };
  xhr.send();
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
