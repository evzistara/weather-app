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
