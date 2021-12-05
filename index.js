fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
              
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
        })
    .catch(error => {
        document.body.style.backgroundImage = `url(default.jpg)`
        document.getElementById("author").textContent = `By: Default`
    })

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(response => {
            if(!response.ok){
            document.getElementById("crypto").textContent = `Current price: to be updated`
        }    
        return response.json()
    })
    .then(data => {    
        document.getElementById("crypto-heading").innerHTML = ` <img src = ${data.image.thumb} />
        <span>${data.name}</span>`

        document.getElementById("crypto").innerHTML += `
        <p>Price: $${data.market_data.current_price.usd}</p>
        <p>Day high: $${data.market_data.high_24h.usd}</p>
        <p>Day low: $${data.market_data.low_24h.usd}</p>`
    })
    // .catch(error => {
    //     document.getElementById("author").textContent = `To be updated`
    // })

function timeClock(){ 
    
    let currentTime = new Date().toLocaleTimeString("ger", {timeStyle: "medium"})
    document.getElementById("time").innerHTML = `<h1>${currentTime}</h1>
    <p></p>`
    
}

setInterval(timeClock, 1000)


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
    .then(response => {
        if(!response.ok){
            throw Error("Weather data is not availble")
            //document.getElementById("weather").innerHTML = "Data is not availble"
        }
        return response.json()
    })
    .then(data => {
        const weatherUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML += `     
        
        <div class = "weather-top"><p><img src = ${weatherUrl} ></p>
        <p>${Math.round(data.main.temp)}<sup>o</sup/>C</p></div>
        <p><em style="color:orange";>${data.name}</em></p>`
    })
    .catch (error => document.getElementById("weather").innerHTML = error)
})

