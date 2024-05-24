// fix issues in store.js
import {format, fromUnixTime} from 'date-fns';
import {createForecastBox} from "./view";
import {getApiValues} from "./api"
import { clearMain } from '..';

const dom = ((city, system, view) => {
    let searchCity = city;
    let searchSystem = system;

    const setApiValues = (() => {
    let apiValues = getApiValues(searchCity);
    
    // specific api values
    const cityName = apiValues.location.name;
    const cityRegion = apiValues.location.region;
    const cityCountry = apiValues.location.country;
    const localTime = apiValues.location['localtime_epoch'];
    const tempSumm = apiValues.current.condition.text;
    const tempIcon = apiValues.current.condition.icon;
    const humidity = apiValues.current.humidity;
    const cloudiness = apiValues.current.cloud;
    const windDir = apiValues.current['wind_dir'];
    const dayForecast = Array.from(apiValues.forecast.forecastDay[0].hour);
    
    // conditional values
    const temp = searchSystem == 'celsius' ? apiValues.current['temp_c'] : apiValues.current['temp_f'];
    const feelsLike = searchSystem == 'celsius' ? apiValues.current['feelslike_c'] : apiValues.current['feelslike_f'];
    const pressure = searchSystem == 'celsius' ? apiValues.current['pressure_mb'] : apiValues.current['pressure_in'];
    const visibility = searchSystem == 'celsius' ? apiValues.current['vis_km'] : apiValues.current['vis_miles'];
    const precipitation = searchSystem == 'celsius' ? apiValues.current['precip_in'] : apiValues.current['precip_in'];
    const windSpeed = searchSystem == 'celsius' ? apiValues.current['wind_kph'] : apiValues.current['wind_mph'];
    const minTemp = searchSystem == 'celsius' ? apiValues.forecast.forecastDay[0].day['mintemp_c'] : apiValues.forecast.forecastDay[0].day['mintemp_f'];
    const maxTemp = searchSystem == 'celsius' ? apiValues.forecast.forecastDay[0].day['maxtemp_c'] : apiValues.forecast.forecastDay[0].day['maxtemp_f'];

    return {
        cityName, cityRegion, cityCountry, localTime, tempSumm, tempIcon, humidity, cloudiness, windDir, dayForecast, temp, feelsLike, pressure, visibility, precipitation, windSpeed, minTemp, maxTemp
        }

    })()


    // handlers
    const topView = view.topView;
    const midView = view.midView;
    const infoView = view.infoView;

    // top view
    const updateTopView = () => {
        // input
        const input = topView.childNode[0].childNode[0];

        // update fn for the dom btns
        const updateApiValues = () => {
            searchCity = input.value;
            setApiValues();
        }

        // submit -> do input validation later
        const inputSearch = topView.childNode[0].childNode[1];
        inputSearch.addEventListener('click', () => {
            updateApiValues();
        })

        // celsius btn
        const celsiusBtn = topView.childNode[1].childNode[0];
        celsiusBtn.addEventListener('click', () => {
            searchSystem = 'celsius'
            updateApiValues();
        })

        // fahrenheit btn
        const fahrenheitBtn = topView.childNode[1].childNode[1];
        fahrenheitBtn.addEventListener('click', () => {
            searchSystem = 'fahrenheit'
            updateApiValues();
        })
    }

    // mid view
    const updateMidView = () => {
        const location = midView.childNode[0];
        location.textContent = `${values.cityName}, ${values.cityRegion}, ${values.cityCountry}`;

        const unixDate = fromUnixTime(setApiValues().localTime);

        const date = midView.childNode[1].childNode[0];
        date.textContent = `${format(unixDate, "eee d MMM")}`;
        const time = midView.childNode[1].childNode[1];
        time.textContent = `${format(unixDate, "HH:mm zzzz")}`;
    }

    // info view
    const updateInfoView = () => {
        const tempView = infoView.childNode[0];
        const forecastView = infoView.childNode[1];
        const waterView = infoView.childNode[2];
        const windView = infoView.childNode[3];

        // temp view
        const tempText = tempView.childNode[0];
        
        const actualTemp = tempText.childNode[0];
        actualTemp.textContent = searchSystem == 'celsius' ? `${setApiValues().temp} °C` : `${setApiValues().temp} °F`

        const feelsLikeTemp = tempText.childNode[1];
        feelsLikeTemp.textContent = searchSystem == 'celsius' ? `${setApiValues().feelsLike} °C` : `${setApiValues().feelsLike} °F`

        const tempDesc = tempView.childNode[1];
        const tempIcon = tempDesc.childNode[0];
        tempIcon.setAttribute('src', setApiValues().tempIcon);
        const tempSumm = tempDesc.childNode[1];
        tempSumm.textContent = `${setApiValues().tempSumm}`;

        const highLow = tempView.childNode[2];
        
        const highTemp = highLow.childNode[0];
        highTemp.textContent = searchSystem == 'celsius' ? `${setApiValues().maxTemp} °C` : `${setApiValues().maxTemp} °F`

        const lowTemp = highLow.childNode[1];
        lowTemp.textContent = searchSystem == 'celsius' ? `${setApiValues().minTemp} °C` : `${setApiValues().minTemp} °F`

        // forecast view
        const forecastArray = setApiValues().dayForecast;
        forecastArray.forEach((forecast) => {
            let time = forecast['time_epoch'];
            time = fromUnixTime(time);
            let hour = `${format(time, "HH:00")}`;
            let img = forecast.condition.icon;
            let temp = searchSystem == 'celsius' ? `${forecast['temp_c']} °C` : `${forecast['temp_f']} °F`;

            forecastView.appendChild(createForecastBox(hour, img, temp));
        })

        // water view
        const pressureTxt = waterView.childNode[0];
        const humidityTxt = waterView.childNode[1];
        humidityTxt.textContent = `${setApiValues().humidity}`;
        const visibilityTxt = waterView.childNode[2];
        const precipTxt = waterView.childNode[3];

        pressureTxt.textContent = searchCity == 'celsius' ? `${setApiValues().pressure} mb` : `${setApiValues().pressure} in`
        visibilityTxt.textContent = searchCity == 'celsius' ? `${setApiValues().visibility} km` : `${setApiValues().visibility} miles`
        precipTxt.textContent = searchCity == 'celsius' ? `${setApiValues().precipitation} mm` : `${setApiValues().precipitation} in` 

        // wind view
        const cloudTxt = windView.childNode[0];
        const windSpdTxt = windView.childNode[1];
        const windDirTxt = windView.childNode[2];
        
        cloudTxt.textContent = `${setApiValues().cloudiness}`;
        windDirTxt.textContent = `${setApiValues().windDir}`;
        windSpdTxt.textContent = searchCity == 'celsius' ? `${setApiValues().windSpeed} km/h` : `${setApiValues().windSpeed} mi/h`;


    }

    return {
        searchCity,
        searchSystem,
        updateTopView,
        updateMidView,
        updateInfoView
    }

})

export default dom;