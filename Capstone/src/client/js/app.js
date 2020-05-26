const geonamesApi = '';
const weatherApi = '';
const pixabayApi = '';

const saveLocation = async (path, data) => {
  await fetch(path, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
};

const initializeApplication = () => {
  const startButton = document.querySelector('#startdate');
  startButton.addEventListener('click', uiUpdate);

  const startDateElement = document.querySelector('#startDate');
  startDateElement.min = new Date().toISOString().split('T')[0];

  const maxDate = new Date();
  const newDate = maxDate.getDate() + 15;
  maxDate.setDate(newDate);
  startDateElement.max = maxDate.toISOString().split('T')[0];

  document.querySelector('#image').innerHTML = `<img src="${localStorage.getItem('picture')}" alt="picture about the destination">`;
  document.querySelector('#city').innerHTML =  `<span>City: ${localStorage.getItem('city')}</span>`;
  document.querySelector('#country').innerHTML = `<span>Country: ${localStorage.getItem('country')}</span>`;
  document.querySelector('#weather').innerHTML = `<img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F4102326%2Fcloud_sun_sunny_weather_icon&psig=AOvVaw3YtrgD0_ytYKrxjZzNXtfL&ust=1590485753183000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNC8_u3azukCFQAAAAAdAAAAABAI" alt="weather-icon"><br><span>${localStorage.getItem('weatherDescription')}</span>`;
  document.querySelector('#startDate').innerHTML = `<span>Start: ${localStorage.getItem('startDate')}</span>`;
  document.querySelector('#latitude').innerHTML = `<span>Latitude: ${localStorage.getItem('latitude')}</span>`;
  document.querySelector('#longitude').innerHTML = `<span>Longitude: ${localStorage.getItem('longitude')}</span>`;
};

const getWeather = async (days, location) => {
  const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&days=${days + 2}&key=${weatherApi}`, {
    method: 'GET'
  });

  return response.json();
};

const getLocationInfo = async (location) => {
  const response = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geonamesApi}`, {
    method: 'GET'
  });

  return response.json();
};

const getPic = async (location) => {
  const response = await fetch(`https://pixabay.com/api/?key=${pixabayApi}&q=${location}&image_type=photo`, {
    method: 'GET'
  });
  return response.json();
};

const uiUpdate = () => {
  getLocationInfo(document.querySelector('#destination').value).then((locationResponse) => {
    const location = locationResponse.geonames[0];
    const startDate = document.querySelector('#startDate').value;

    const data = {
      latitude: location.lat,
      longitude: location.lng,
      country: location.countryName,
      startDate
    };

    saveLocation('http://localhost:3000/data', data).then(() => {
      getData('http://localhost:3000/all').then((storedData) => {
        localStorage.setItem('city', location.toponymName);
        localStorage.setItem('country', storedData.country);
        localStorage.setItem('latitude', storedData.latitude);
        localStorage.setItem('longitude', storedData.longitude);
        localStorage.setItem('startDate', storedData.startDate);

        document.querySelector('#city').innerHTML = `<span>City: ${location.toponymName}</span>`;
        document.querySelector('#country').innerHTML = `<span>Country: ${storedData.country}</span>`;
        document.querySelector('#latitude').innerHTML = `<span>Latitude: ${storedData.latitude}</span>`;
        document.querySelector('#longitude').innerHTML = `<span>Longitude: ${storedData.longitude}</span>`;

        const date = new Date();
        const daysBefore = Math.round((new Date(storedData.startDate) - date) / 86400000);
        document.querySelector('#startDate').innerHTML = `<span>Start: ${storedData.startDate} (${daysBefore} ${daysBefore === 1 ? 'day' : 'days'})</span>`;

        getWeather(daysBefore, location.toponymName).then((forecast) => {
          const weather = forecast.data[forecast.data.length - 1].weather;
          localStorage.setItem('weatherIcon', weather.icon);
          localStorage.setItem('weatherDescription', weather.description);
          document.querySelector('#weather').innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${weather.icon}.png" alt="weather-icon"><br><span>${weather.description}</span>`;
        });

        getPic(location.toponymName.replace(' ', '%')).then((pictures) => {
          const topPictureURL = pictures.hits[0].largeImageURL;
          localStorage.setItem('picture', topPictureURL);
          document.querySelector('#image').innerHTML = `<img src="${topPictureURL} alt="picture of your destination">`;
        });
      });
    });
  });
};


const getData = async (path) => {
  const response = await fetch(path, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
  return response.json();
};

export {
  getLocationInfo,
  getWeather,
  getPic,
  initializeApplication,
  uiUpdate
};