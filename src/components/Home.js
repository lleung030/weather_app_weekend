const weatherElement = document.getElementById('weatherDataInfo')

const weatherFetch = async function(cityname) {
    
    let APIkey = 'e58e31605e103eeaa1c736474c1a9e80'
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`)
        
        const weatherData = await response.json()

        const highData = ((((weatherData.main.temp_max)-273.15)*1.8)+32)
        const lowData = ((((weatherData.main.temp_min)-273.15)*1.8)+32)
        const forecastData = weatherData.weather[0].main
        const humidityData = weatherData.main.humidity
        const weatherEl = document.createElement('div')
        weatherEl.classList.add('card','mb-3')
    
        //input type text , submit put my questions div inside a submit form  

        weatherEl.innerHTML=`
            <div class="card-body">
                <h1>${cityname}</h1>
                <h2>High: ${highData.toFixed(2)}\u2109</h2>
                <h2>Low: ${lowData.toFixed(2)}\u2109</h2>
                <h2>Forecast: ${forecastData}</h2>
                <h2>Humidity: ${humidityData}%</h2>
            </div>
        `


        console.log(weatherData)

        // console.log(`Temperature HIGH: ${highData}, Temperature LOW: ${lowData}, FORECAST: ${forecastData}, HUMIDITY: ${humidityData}`)


        weatherElement.appendChild(weatherEl)
    }
    catch (err) {
        console.log('There is an error')
    }
}

        

    const formEl = document.getElementById('form')
    formEl.addEventListener('submit', (event) => {
    event.preventDefault() // Prevents refresh
    const inputElement = document.getElementById('validationServer03')
    weatherFetch(inputElement.value)
})

    const clearBtn = document.getElementById('clear')
    clearBtn.addEventListener('click', (event) => {
    event.preventDefault()
    weatherElement.innerHTML = ''
    // weathers = []
    // localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.removeItem('weatherDataInfo')
})

// weatherFetch('San Francisco')

// onclick="weatherFetch(document.getElementById('validationServer03').value)"

