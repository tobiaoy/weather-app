//make api calls and get data

const api = (() => {

    const apiKey = 'ba0f81137d714181bdf171340241104';

    // api call to get 'current' data
    const getCurrentData = async (city) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`, {mode: 'cors'});
            const currentData = await response.json();
            return currentData;
        } catch (e) {
            console.log(e);
        }
    }

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

    return {
        getCurrentData,
        getForecastData
    }

})()

export default api;