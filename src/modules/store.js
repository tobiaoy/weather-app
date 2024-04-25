//this is where called values are stored and api calls are handled
//make sure to switch when the system buttons are pressed
//will likely need the date functions to get the high low of that time
import {api} from "./api";
import {view} from "./view";

let city = 'toronto';
let api = api(city);
let system = 'celsius';

const dom = (() => {

    const setValues = ((api) => {
        let cityName = api.location.name;
        let cityRegion = api.location.region;
        let cityCountry = api.location.country;
        let localTime = api.location.localtime;
        let tempSumm = api.current.condition.text;
        let tempIcon = api.current.condition.icon;
        let dayForecast = [];
        let temp;
        let feelsLike;
        let pressure;
        let visibility;
        let precipitation;
        let windSpeed;

        // create condition for temperature if celsius is active or not
        if (system == 'celsius') {
            temp = api.current['temp_c']
            feelsLike = api.current['feelslike_c']
            pressure = api.current['pressure_mb']
            visibility = api.current['vis_km']
            precipitation = api.current['precip_mm']
            windSpeed = api.current['wind_kph']
        } else { 
            temp = api.current['temp_f']
            feelsLike = api.current['feelslike_f']
            pressure = api.current['pressure_in']
            visibility = api.current['vis_miles']
            precipitation = api.current['precip_in']
            windSpeed = api.current['wind_mph']
        }

        //create objects for every hour of a day
        for (let i = 0; i < 24; i++){
            let hourForecast = api.forecast.forecastDay[i];
            dayForecast.push(hourForecast);
        }

        return {
            cityName,
            cityRegion,
            cityCountry,
            localTime,
            tempSumm,
            tempIcon,
            dayForecast,
            temp,
            feelsLike,
            pressure,
            visibility,
            precipitation,
            windSpeed
        }

    })

    let values = setValues(api); //initial call

    const createView = view();
    let topView = createView.topView;
    let midView = createView.midView;
    let infoView = createView.infoView;

    //top view stuff
    let input = topView.childNode[0].childNode[0];
    input.addEventListener('change', () => {
        city = input.value; //add validation later
    })
    
    let inputSearch = topView.childNode[0].childNode[1];
    inputSearch.addEventListener('click', () => {
        api = api(city);
        setValues(api);
    })

    let celsiusClick = topView.childNode[1].childNode[0];
    celsiusClick.addEventListener('click', () => {
        system = 'celsius'
        api = api(city);
        setValues(api);
    })

    let fahrenheitClick = topView.childNode[1].childNode[1];
    fahrenheitClick.addEventListener('click', () => {
        system = 'fahrenheit';
        api = api(city);
        setValues(api);
    })

    //mid view stuff
    let location = midView.childNode[0];
    location.textContent = `${values.cityName}, ${values.cityRegion}, ${values.cityCountry}`;
    
    let date = midView.childNode[1].childNode[0];
    let time = midView.childNode[1].childNode[1];
    

})


