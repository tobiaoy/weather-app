//make api calls and get data

const getApiValues = ((city) => {

    const apiKey = 'ba0f81137d714181bdf171340241104';

    //api call to get forecast data
    const getForecastData = async (callCity) => {
        try {
            const response = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${callCity}`, {mode: 'cors'});
            const forecastData = await response.json();
            return forecastData;
        } catch (e) {
            console.log(e)
        }
    }

    const data = getForecastData(city);
    const location = data.location; //location object
    const current = data.current; //current object
    const forecast = data.forecast; //forecast object

    return {
        location,
        current,
        forecast
    }

})

export default getApiValues;