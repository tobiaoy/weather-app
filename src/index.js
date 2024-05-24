// necessary imports
import {dom} from "./modules/dom";
import {view} from "./modules/view";
import {getApiValues} from "./modules/api";

const main = document.querySelector("#main");

// create view
let view = view();

export const clearMain = () => {
    main.innerHTML = '';
}

// attach our view to the actual dom
main.appendChild(view);

// call individual components in the view
const topView = document.querySelector("#top-view");
const midView = document.querySelector("#mid-view");
const infoView = document.querySelector("#info-view");
const searchBtn = document.querySelector("search-btn");
const cBtn = document.querySelector("#celsius-btn");
const fBtn = document.querySelector("#fahr-btn");

// creat dom -> should handle most things
let dom = dom('toronto', 'celsius', view);

// function for changes
const updateView = () => {
    clearMain();
    dom.updateTopView();
    dom.updateMidView();
    dom.updateInfoView();
    let city  = dom.searchCity;
    let system = dom.searchSystem;
    view = view();
    main.appendChild(view);
    dom = dom(city, system, view);
}

