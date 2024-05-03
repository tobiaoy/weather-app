//this is where called values are stored and api calls are handled
//make sure to switch when the system buttons are pressed
//will likely need the date functions to get the high low of that time
import {format, fromUnixTime} from 'date-fns';
import {getApiValues} from "./api";
import {view, createForecastBox} from "./view";

let city = 'toronto';
let api = getApiValues(city);
let system = 'celsius';

const updateApiValues = (city) => {
    let api = getApiValues(city);
    return api;
}

const dom = ((api, city, system) => {

    const setValues = ((api) => {
        let cityName = api.location.name;
        let cityRegion = api.location.region;
        let cityCountry = api.location.country;
        let localTime = api.location[localtime_epoch]; //get unix time
        let tempSumm = api.current.condition.text;
        let tempIcon = api.current.condition.icon;
        let humidity = api.current.humidity;
        let cloudiness = api.current.cloud;
        let windDir = api.current['wind_dir'];
        let dayForecast = [];
        let temp;
        let feelsLike;
        let pressure;
        let visibility;
        let precipitation;
        let windSpeed;
        let minTemp;
        let maxTemp;

        // create condition for temperature if celsius is active or not
        if (system == 'celsius') {
            temp = api.current['temp_c']
            feelsLike = api.current['feelslike_c']
            pressure = api.current['pressure_mb']
            visibility = api.current['vis_km']
            precipitation = api.current['precip_mm']
            windSpeed = api.current['wind_kph']
            minTemp = api.forecast.forecastDay[0].day['mintemp_c']
            maxTemp = api.forecast.forecastDay[0].day['maxtemp_c']
        } else { 
            temp = api.current['temp_f']
            feelsLike = api.current['feelslike_f']
            pressure = api.current['pressure_in']
            visibility = api.current['vis_miles']
            precipitation = api.current['precip_in']
            windSpeed = api.current['wind_mph']
            minTemp = api.forecast.forecastDay[0].day['mintemp_f']
            maxTemp = api.forecast.forecastDay[0].day['maxtemp_f']
        }

        //create objects for every hour of a day
        for (let i = 0; i < 24; i++){
            let hourForecast = api.forecast.forecastDay[0].hour[i];
            dayForecast.push(hourForecast);
        }

        return {
            cityName,
            cityRegion,
            cityCountry,
            localTime,
            tempSumm,
            tempIcon,
            humidity,
            cloudiness,
            windDir,
            dayForecast,
            temp,
            feelsLike,
            pressure,
            visibility,
            precipitation,
            windSpeed,
            minTemp,
            maxTemp
        }

    })

    let values = setValues(api); //initial call

    const createView = view();
    let topView = createView.topView;
    let midView = createView.midView;
    let infoView = createView.infoView;

    //top view stuff
    const updateTopView = (topView, api, values, city, system) => {
        let input = topView.childNode[0].childNode[0];
        input.addEventListener('change', () => {
            city = input.value; //add validation later
        });
        
        let inputSearch = topView.childNode[0].childNode[1];
        inputSearch.addEventListener('click', () => {
            api = updateApiValues(city);
            values = setValues(api);
        });
    
        let celsiusClick = topView.childNode[1].childNode[0];
        celsiusClick.addEventListener('click', () => {
            system = 'celsius'
            api = updateApiValues(city);
            values = setValues(api);
        });
    
        let fahrenheitClick = topView.childNode[1].childNode[1];
        fahrenheitClick.addEventListener('click', () => {
            system = 'fahrenheit';
            api = updateApiValues(city);
            values = setValues(api);
        });
    
    };

    //mid view stuff
    let location = midView.childNode[0];
    location.textContent = `${values.cityName}, ${values.cityRegion}, ${values.cityCountry}`;

    let date = midView.childNode[1].childNode[0];
    let time = midView.childNode[1].childNode[1];

    let unixDate = fromUnixTime(values.localTime);
    date.textContent = `${format(unixDate, "eee d MMM")}`;
    time.textContent = `${format(unixDate, "HH:mm zzzz")}`;

    //info view stuff
    //upper left
    let tempView = infoView.childNode[0];
    let tempText = tempView.childNode[0];
    let tempDesc = tempView.childNode[1];
    let highLow = tempView.childNode[2];
    const actualTemp = tempText.childNode[0];
    const feelsLikeTemp = tempText.childNode[1];
    
    if (system == 'celsius') {
        actualTemp.textContent = `${values.temp} °C`
        feelsLikeTemp.textContent = `${values.feelsLike} °C`
    } else {
        actualTemp.textContent = `${values.temp} °F`
        feelsLikeTemp.textContent = `${values.feelsLike} °F`
    }

    let tempIcon = tempDesc.childNode[0];
    tempIcon.setAttribute('src', values.tempIcon);

    let tempSumm = tempDesc.childNode[1];
    tempSumm.textContent = `${values.tempSumm}`;

    let todayHigh = highLow.childNode[0];
    let todayLow = highLow.childNode[1];

    if (system == celsius){
        todayHigh.textContent = `${values.maxTemp} °C`;
        todayLow.textContent = `${values.minTemp} °C`;
    } else {
        todayHigh.textContent = `${values.maxTemp} °F`;
        todayLow.textContent = `${values.minTemp} °F`;
    }
    
    // upper right
    let forecastView = infoView.childNode[1];
    for (let i = 0; i < values.dayForecast.length; i++){
        let dayTime = dayForecast[i][time_epoch];
        dayTime = fromUnixTime(dayTime);
        let hour = `${format(dayTime, "HH:00")}`;
        let img = dayForecast[i].condition.icon;
        let temp;
        if (system = 'celsius'){
            temp = `${dayForecast[i]['temp_c']} °C`
        } else {
            temp = `${dayForecast[i]['temp_f']} °F`
        }
        let forecastBox = createForecastBox(hour, img, temp);
        forecastView.appendChild(forecastBox);
    }

    // lower left
    let waterView = infoView.childNode[2];
    let pressureTxt = waterView.childNode[0];
    let humidityTxt = waterView.childNode[1];
    let visibilityTxt = waterView.childNode[2];
    let precipitationTxt = waterView.childNode[3];
    
    humidityTxt.textContent = `${values.humidity}`;
    if (system == 'celsius') {
        pressureTxt.textContent = `${values.pressure} mb`;
        visibilityTxt.textContent = `${values.visibility} km`;
        precipitationTxt.textContent = `${values.precipitation} mm`
    } else {
        pressureTxt.textContent = `${values.pressure} in`;
        visibilityTxt.textContent = `${values.visibility} miles`;
        precipitationTxt.textContent = `${values.precipitation} in`
    }

    // lower right
    let windView = infoView.childNode[3];
    let cloudinessTxt = windView.childNode[0];
    let windSpdTxt = windView.childNode[1];
    let windDirTxt = windView.childNode[2];

    cloudinessTxt.textContent = `${values.cloudiness}`;
    if (system == 'celsius') {
        windSpdTxt.textContent = `${values.windSpeed} km/h`
    } else {
        windSpdTxt.textContent = `$${values.windSpeed} mi/h`
    }
    windDirTxt.textContent = `${values.windDir}`;
})
   

export {
    dom
}
