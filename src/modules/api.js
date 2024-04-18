//make api calls and get data

const api = (() => {

    const apiKey = 'ba0f81137d714181bdf171340241104';

    const getCurrentData = async (city) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`, {mode: 'cors'});
            const weatherData = await response.json();
        } catch (e) {
            console.log(e);
        }
    }

    const getForecastData = (city) => {
        
    }
})()