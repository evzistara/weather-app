const input = document.querySelector("input");
const container = document.querySelector(".app_weather");
const dayOrNight = document.querySelector(".app_picture");
const weatherIcon = document.querySelector(".app_icon");
const cityName = document.querySelector(".city");
const weatherText = document.querySelector(".weather");
const temp = document.querySelector(".temperature");
const apiURL =
  "https://api.weatherapi.com/v1/current.json?key=217038a2bfc243b0a47180940261505";

input.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    container.classList.remove("d-none");
    const city = input.value.trim();
    input.value = "";
    const data = await getWeather(city);
    updateUI(data);
  }
});

const getWeather = async (city) => {
  const query = `&q=${city}&aqi=no`;
  const response = await fetch(apiURL + query);
  const data = await response.json();
  console.log(data);
  return data;
};

const updateUI = (data) => {
  const { location, current } = data;
  cityName.textContent = location.name;
  weatherText.textContent = current.condition.text;
  temp.textContent = current.temp_c + "°C";

  dayOrNight.setAttribute("src", "");
  if (current.is_day) {
    dayOrNight.setAttribute("src", "day.jpg");
  } else {
    dayOrNight.setAttribute("src", "night.jpg");
  }

  weatherIcon.setAttribute("src", current.condition.icon);
};

/*

const updateUI = (data) => {
  const { cityDets, weather } = data;

  cityName.textContent = cityDets.EnglishName;
  weatherText.textContent = weather.WeatherText;
  temp.textContent = weather.Temperature.Metric.Value + "°C";

  dayOrNight.setAttribute("src", "");
  if (weather.IsDayTime) {
    dayOrNight.setAttribute("src", "day.jpg");
  } else {
    dayOrNight.setAttribute("src", "night.jpg");
  }

  weatherIcon.setAttribute("src", `icons/${weather.WeatherIcon}.svg`);
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather,
  };
};
//get data from input field
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    container.classList.remove("d-none");
    const city = input.value.trim();
    input.value = "";
    updateCity(city)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  }
});


*/
