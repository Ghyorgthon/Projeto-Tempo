const apiKey = 'dfc55f22de164f3bfd965ac682ad146f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&appid=dfc55f22de164f3bfd965ac682ad146f&units=metric&lang=pt_br&q=';
const clima = document.querySelector('.weather .clima')
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')

async function checkWeather(city){
    const response = await fetch(apiUrl + city +'&appid=${apiKey}')

    if (response.status == 404){
        document.querySelector('.erro').style.display='block'
    } 
    else{
        var data = await response.json()
        console.log(data)

        document.querySelector('.city').innerHTML = data.name
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%"
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h'

        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src = 'images/clouds.png'
        } else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = 'images/rain.png'
        }else if (data.weather[0].main == 'Clear'){
            weatherIcon.src = 'images/clear.png'
        }else if (data.weather[0].main == 'Drizzle'){
            weatherIcon.src = 'images/drizzle.png'
        }else if (data.weather[0].main == 'Mist'){
            weatherIcon.src = 'images/mist.png'
        }

        clima.innerHTML = data.weather[0].description
        document.querySelector('.erro').style.display='none'
        document.querySelector('.search input').value = ''

    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

searchBtn.addEventListener("keypress", enter)
function enter(event){
    key = event.keyCode
    if(key===13){
        checkWeather(searchBox.value);
    }
}

