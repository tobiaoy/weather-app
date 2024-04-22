// set up the view of the page
const appendChildren = (parent, ...children) => {
    children.forEach(child => {
        parent.appendChild(child);
    })
}

const view = (() => {
const controlBox = document.createElement('div'); // div for the top part

const searchBox = document.createElement('div'); // search items
const searchBar = document.createElement('input');
searchBar.type = 'text'; //consider input validation
const searchBtn = document.createElement('button'); //search trigger btn

appendChildren(searchBox, searchBar, searchBtn);

// C to F toggle
const celsiusTxt = document.createElement('p');
celsiusTxt.textContent = '°C'
const fahrenheitTxt = document.createElement('p');
fahrenheitTxt.textContent = '°F'


})()