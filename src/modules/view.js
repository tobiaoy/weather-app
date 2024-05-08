// set up the view of the page
const appendChildren = (parent, ...children) => {
    children.forEach((child) => {
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
    const topView = document.createElement('div');
    topView.setAttribute('id', 'top-view');

    // search box 
    const searchBox = document.createElement('div');
    searchBox.setAttribute('id', 'search-box');
    
    const searchInput = document.createElement('input');
    searchInput.setAttribute('id', 'search-input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'search for a location');

    const searchBtn = document.createElement('button');
    searchBtn.setAttribute('id', 'search-btn');
    searchBtn.setAttribute('type', 'submit');
    searchBtn.textContent = 'search'

    appendChildren(searchBox, searchInput, searchBtn)
    
    
    // system switch btns
    const sysBox = document.createElement('div');
    sysBox.setAttribute('id', 'sys-settings');

    const celsiusBtn = document.createElement('button');
    celsiusBtn.setAttribute('id', 'celsius-btn');
    celsiusBtn.textContent = 'celsius';

    const fahrBtn = document.createElement('button');
    fahrBtn.setAttribute('id', 'fahr-btn');
    fahrBtn.textContent = 'fahrenheit';

    appendChildren(sysBox, celsiusBtn, fahrBtn)
    
    // adding main boxes to top view
    appendChildren(topView, searchBox, sysBox)
    

    //middle view -> location, time, date
    const midView = document.createElement('div');
    midView.setAttribute('id', 'mid-view');

    // location text
    const locTxt = document.createElement('h4');
    locTxt.setAttribute('id', 'loc-text');
    
    // date - time text
    const dateTimeText = document.createElement('div');
    dateTimeText.setAttribute('id', 'date-time-text');

    const timeTxt = document.createElement('p');
    timeTxt.classList.add('dtime-text');

    const dateTxt = document.createElement('p');
    dateTxt.classList.add('dtime-text');

    appendChildren(dateTimeText, timeTxt, dateTxt);

    // adding main box to mid view
    appendChildren(midView, locTxt, dateTimeText);
    

    //info view -> temp, feels like temp, high/low | forecast (for the day)
    //             pressure, humidity, visibility | cloudiness, wind speed, wind direction

    const infoView = document.createElement('div');
    infoView.setAttribute('id', 'info-view');

    // temp view -> top left
    const tempView = document.createElement('div');
    tempView.setAttribute('id', 'temp-view');

    // temp text
    const tempTxt = document.createElement('div');
    tempTxt.setAttribute('id', 'temp-text');

    const actualTemp = document.createElement('p');
    actualTemp.setAttribute('id', 'actual-temp');

    const flTemp = document.createElement('p');
    flTemp.setAttribute('id', 'fl-temp');
    
    appendChildren(tempTxt, actualTemp, flTemp);

    // temp description
    const tempDesc = document.createElement('div');
    tempDesc.setAttribute('id', 'temp-desc');

    const tempIcon = document.createElement('img');
    
    const tempSumm = document.createElement('p');
    tempSumm.setAttribute('id', 'temp-summ');

    appendChildren(tempDesc, tempIcon, tempSumm);

    // high low
    const highLow = document.createElement('div');
    highLow.setAttribute('id', 'high-low'); 

    const high = document.createElement('p');
    high.classList.add('high-low');

    const low = document.createElement('p');
    low.classList.add('high-low');

    appendChildren(highLow, high, low);

    // add main boxes to temp view
    appendChildren(tempView, tempTxt, tempDesc, highLow);


    // forecast view -> top right
    const forecastView = document.createElement('div');
    forecastView.setAttribute('id', 'forecast-view');


    // water view -> bottom left
    const waterView = document.createElement('div');
    waterView.setAttribute('id', 'water-view');

    const pressureTxt = document.createElement('p');
    pressureTxt.classList.add('water-text');

    const humidTxt = document.createElement('p');
    humidTxt.classList.add('water-text');

    const visTxt = document.createElement('p');
    visTxt.classList.add('water-text');

    const precipTxt = document.createElement('p');
    precipTxt.classList.add('water-text');

    // add main boxes to water view
    appendChildren(waterView, pressureTxt, humidTxt, visTxt, precipTxt);


    // wind view -> bottom right
    const windView = document.createElement('div');
    windView.setAttribute('id', 'wind-view');

    const cloudTxt = document.createElement('p');
    cloudTxt.classList.add('wind-text');

    const windSpdTxt = document.createElement('p');
    windSpdTxt.classList.add('wind-text');

    const windDirTxt = document.createElement('p');
    windDirTxt.classList.add('wind-text');

    // add main boxes to wind view
    appendChildren(windView, cloudTxt, windSpdTxt, windDirTxt);

    // add main boxes to info view
    appendChildren(infoView, tempView, forecastView, waterView, windView);


    return {
        topView,
        midView,
        infoView
    }

})

const createForecastBox = (hour, img, temp) => {
    const box = document.createElement('div');
    box.classList.add('hour-forecast-box');

    // temp box -> for icon and forecast
    const tempBox = document.createElement('div');
    tempBox.classList.add('forecast-temp-box');

    // display hr
    const displayHour = document.createElement('p');
    displayHour.textContent = `${hour}`;

    // display temp
    const displayTemp = document.createElement('p');
    displayTemp.textContent = `${temp}`;

    // display icon
    const displayIcon = document.createElement('img');
    displayIcon.setAttribute('src', img);

    appendChildren(tempBox, displayIcon, displayTemp);
    appendChildren(box, displayHour, tempBox);

    return box;
}

export {
    view,
    createForecastBox
};