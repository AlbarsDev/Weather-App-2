
const loadP = document.getElementById("loadP");
const loader = document.getElementsByClassName("lds-roller-small");

/*const inputCity = document.getElementById("inputCity");
const Search = document.getElementById("Search");*/

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

loadP.style.display = "none"

search.addEventListener('click', () => {

    const APIKey = 'e1965cf75a78a7a142c06c5f182f7b14';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.gif';
                    break;

                case 'Rain':
                    image.src = 'img/rain.gif';
                    break;

                case 'Snow':
                    image.src = 'img/snow.gif';
                    break;

                case 'Clouds':
                    image.src = 'img/cloudy.gif';
                    break;

                case 'Drizzle':
                    image.src = 'img/drizzle.gif';
                    break;

                case 'Haze':
                    image.src = 'img/haze.gif';
                    break;

                case 'Mist':
                    image.src = 'img/wind.gif';
                    break;

                case 'fog':
                    image.src = 'img/foggy.gif';
                    break;

                case 'Storm':
                    image.src = 'img/storm.gif';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});