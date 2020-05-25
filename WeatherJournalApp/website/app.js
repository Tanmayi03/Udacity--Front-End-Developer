/* Global Variables */
let baseUrl = "api.openweathermap.org/data/2.5/weather?";
const appId = '2fae979a963258d11f9d621ac115140c';
const zipIp = document.getElementById("zip");
const userIp = document.getElementById("feelings");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const postUrl = "http://localhost:8000/add";
const getUrl = "http://localhost:8000/returnData";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const getData = async (baseUrl, zipIp, appId) => {
    const url = `http://${baseUrl}zip=${zipIp},in&appid=${appId}`;
    const response = await fetch(url);
    let jsonResponse = await response.json();
    return jsonResponse;
};

const postData = async (path, data = {}) => {
    const response = await fetch(path, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "content-Type": "application/json"
        },
        credentials: "same-origin",
        redirect: "follow",
        body: JSON.stringify(data)
    });
};

const UiUpdate = async () => {
    const response = await fetch(getUrl);
    const jsonResponse = await response.json();
    date.innerHTML = `<span class="entry">Date: </span>${jsonResponse.date}`;
    content.innerHTML = `<span class="entry">How are you feeling?</span>${jsonResponse.response}`;
    temp.innerHTML = `<span class="entry">Temperature: </span>${jsonResponse.temperature}`;
};

const asyncFunc = async () => {
    const weatherData = await getData(baseUrl, zipIp.value, appId);
    let data = {};
    data.temperature = weatherData.main.temp;
    data.date = newDate;
    data.response = userIp.value;
    postData(postUrl, data).then(function () {
        UiUpdate();
    });
};

document.getElementById("generate").addEventListener('click', asyncFunc);
