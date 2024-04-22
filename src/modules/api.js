//make api calls and get data

const api = (() => {

    const apiKey = 'ba0f81137d714181bdf171340241104';

    //api call to get forecast data
    const getForecastData = async (city) => {
        try {
            const response = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`, {mode: 'cors'});
            const forecastData = await response.json();
            return forecastData;
        } catch (e) {
            console.log(e)
        }
    }

    const location = getForecastData().location; //location object
    const current = getForecastData().current; //current object
    const forecast = getForecastData().forecast; //forecast object

    return {
        location,
        current,
        forecast
    }

})()

export default api;