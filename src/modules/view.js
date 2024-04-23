// set up the view of the page
const appendChildren = (parent, ...children) => {
    children.forEach(child => {
        parent.appendChild(child);
    })
}

const elementMaker = (el, id, type, txt, ph) => {
    const el = document.createElement(el);
    el.setAttribute('id', id);
    if (type) { el.type = type; };
    if (txt) { el.textContent = txt};
    if (ph) { el.setAttribute(placeholder, ph) };
    
    return el;
}

const view = (() => {
    //top view -> input search bar | search btn |  celsius btn | fahrenheit btn
    const topView = elementMaker(div, 'top-view');

    const searchBox = elementMaker(div, 'search-box');
    const searchInput = elementMaker(input, 'search-input', 'text', '', 'search for a location');
    const searchBtn = elementMaker(button, 'search-button', 'submit', 'Search');
    appendChildren(searchBox, [searchInput, searchBtn]);

    const sysBox = elementMaker(div, 'system-settings');
    const celsiusBtn = elementMaker(button, 'celsius-button', txt='Celsius');
    const fahrenheitBtn = elementMaker(button, 'fahrenheit-button', txt='Fahrenheit');
    appendChildren(sysBox, [celsiusBtn, fahrenheitBtn]);
    appendChildren(topView, [searchBox, sysBox]);

    //middle view -> location, time, date
    const midView = elementMaker(div, 'mid-view');
    const locationTxt = elementMaker(h4, 'location-text', '', '');
    const descTxt = elementMaker(div, 'date-time');
    const timeTxt = elementMaker(p, 'time-text','','');
    const dateTxt = elementMaker(p, 'date-text','','');
    appendChildren(descTxt, [timeTxt, dateTxt]);
    appendChildren(midView, [locationTxt, descTxt]);
    

    //info view -> temp, feels like temp, high/low | forecast (for the day)
    //             pressure, humidity, visibility | cloudiness, wind speed, wind direction
    const infoView = elementMaker(div, 'info-view');

    const tempView = elementMaker(div, 'tempView'); //top left

    const tempTxt = elementMaker(div, 'temp-text');
    const actualTemp = elementMaker(p, 'actual-temp');
    const feelsLikeTemp = elementMaker(p, 'feels-like-temp');
    appendChildren(tempTxt, [actualTemp, feelsLikeTemp]);

    const tempDesc = elementMaker(div, 'temp-desc');
    const tempIcon = elementMaker(img);
    const tempSumm = elementMaker(p, 'temp-summary');
    appendChildren(tempDesc, [tempIcon, tempSumm]);

    const highLow = elementMaker(div, 'high-low');
    const todayHigh = elementMaker(p, 'todays-high');
    const todayLow = elementMaker(p, 'todayLow');
    appendChildren(highLow, [todayHigh, todayLow]);

    appendChildren(tempView, [tempTxt, tempDesc, highLow]);

    const forecastView = elementMaker(div, 'forecast-view'); //top right -> to fill with forecast components later

    const waterView = elementMaker(div, 'water-view'); //bottom left
    const pressureTxt = elementMaker(p, 'pressure-text');
    const humidityTxt = elementMaker(p, 'humidity-text');
    const visibilityTxt = elementMaker(p, 'visibility-text');
    appendChildren(waterView, [pressureTxt, humidityTxt, visibilityTxt]);

    const windView = elementMaker(div, 'wind-view'); //bottom right
    const cloudinessTxt = elementMaker(p, 'cloud-text');
    const windSpdTxt = elementMaker(p, 'wind-speed-text');
    const windDirTxt = elementMaker(p, 'wind-direction-text');
    appendChildren(windView, [cloudinessTxt, windSpdTxt, windDirTxt])
    
    appendChildren(infoView, [tempView, forecastView, waterView, windView]);

})