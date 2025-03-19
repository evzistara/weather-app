const key = 'XXIuUiGv5SCiapowuLd9riCi1ahTnlCG';
const input = document.querySelector('input');
const container = document.querySelector('.app_weather');
const dayOrNight = document.querySelector('.app_picture');
const weatherIcon = document.querySelector('.app_icon');
const cityName = document.querySelector('.city');
const weatherText = document.querySelector('.weather');
const temp = document.querySelector('.temperature');


const updateUI = (data)=> {

    const {cityDets, weather}  = data;

    cityName.textContent = cityDets.EnglishName;
    weatherText.textContent = weather.WeatherText;
    temp.textContent = weather.Temperature.Metric.Value + '°C';

    dayOrNight.setAttribute('src', '');
    if(weather.IsDayTime){
        dayOrNight.setAttribute('src', 'day.jpg');
    } else {
        dayOrNight.setAttribute('src', 'night.jpg');
    };

    weatherIcon.setAttribute('src', `icons/${weather.WeatherIcon}.svg`);
};

const updateCity = async(city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets, weather
    };
}
//get data from input field
input.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        container.classList.remove('d-none');
        const city = input.value.trim();
        input.value = '';
        updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    }
})



//get weather information
const getWeather = async(id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base+query);
    const data = await response.json();

    return data[0];

}

//get city information
const getCity = async(city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response =  await fetch(base + query);
    const data = await response.json();

    return data[0];
};
