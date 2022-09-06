import React, { useEffect, useState } from "react"
import axios from "axios";

const Weather = () => {

    const [value, setValue] = useState({})
    const [isCity, setIsCity] = useState({})

    const [isDegree, setIsDegree] = useState(true)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const urlKey = 'a6bee11f6399d0eb9003ec59c2435b3e'
        navigator.geolocation.getCurrentPosition(success)
        
        function success(pos) {
            const crd = pos.coords
            const cityUbi = value?.name
            console.log(cityUbi)

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=a6bee11f6399d0eb9003ec59c2435b3e`).then(res => setValue(res.data)).finally(() => setLoading(false))
            //axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityUbi}}&appid=a6bee11f6399d0eb9003ec59c2435b3e`).then(res => setIsCity(res.data)).catch(alert('Country not found')).finally(() => setLoading(false))
    } 

    changeTemp()
    },[])
    
    //Conseguir hora de PC
    const timePc = Date.now()
    const dateNow = new Date(timePc)
  
    const timeSunrise = value.sys?.sunrise
    const dateUTC = new Date(timeSunrise)

    const timeSunset = value.sys?.sunset 
    const dateUTCSunset = new Date(timeSunset)

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }

    //entra y sale el sol
    var timeString = dateUTC.toLocaleString('en-US', options);
    var timeString1 = dateUTCSunset.toLocaleString('en-US', options);

    const date = new Date()
    let now = new Intl.DateTimeFormat('en-US', options).format(date)

    
    // temperatura actual y como se siente en C y F

    const tempF = (value.main?.temp - 273.15) * 9/5 + 32 
    const tempF_like = (value.main?.feels_like - 273.15) * 9/5 + 32 
    const tempC = value.main?.temp - 273.15 
    const tempC_like = value.main?.feels_like - 273.15

    const temMaxC = value.main?.temp_max - 273.15
    const temMaxF = (value.main?.temp_max - 273.15) * 9/5 + 32

    const tempMinC = value.main?.temp_min - 273.15
    const temMinF = (value.main?.temp_min - 273.15) * 9/5 + 32

    const changeTemp = () => setIsDegree(!isDegree)

    return (
        <div className="card">
            { loading ? (
                <div className='loader-container'>
                    <div className='spinner'></div>
                </div>
            ) : (

            <div className='main'>
                <div  className='main-div'>
                    <p className='stateCountry'>{dateNow.toDateString()}</p>
                    <p className='location'><i className='fa-solid fa-location-dot'></i>  {value.name}, {value.sys?.country}</p>
                    <img src={`http://openweathermap.org/img/wn/${value.weather?.[0].icon}@2x.png`} alt='icon-weather'/>
                    <p className='description'>{value.weather?.[0].main}, {value.weather?.[0].description}</p>

                    <div className='tempe'>
                        <p className='degreeC'>{isDegree ? Math.round(tempC) : Math.round(tempF)}º</p>
                        <button onClick={changeTemp} className='btn'>{isDegree ? 'C' : 'F'}</button>
                    </div>
                    <p className='feel'>Feels like  {isDegree ? Math.round(tempC_like) : Math.round(tempF_like)}º {isDegree ? 'C' : 'F'}</p>
                </div>
                <div  className='main-div'>
                    <p>Search by Country</p>
                    <label>City </label>
                    <input type='text' placeholder='Managua'/>
                    <button className='search'><i className='fa-solid fa-magnifying-glass'></i></button>
                    <br/> <hr />

                    <div className='main-information'>
                        <p><i className='fa-regular fa-sun'></i> <i className='fa-solid fa-sort-up'></i>  {timeString1}</p>
                        <p><i className='fa-regular fa-sun'></i> <i className='fa-solid fa-caret-down'></i>  {timeString}</p> 
                        <p><i className='fa-solid fa-cloud'></i> {value.main?.humidity} %</p>
                    </div>

                    <div className='main-informationPlus'>
                        <p><i className='fa-solid fa-wind'></i> Wind Speed: {value.wind?.speed} mt/seg</p> {/**wind speed: */}
                        <p><i className='fa-solid fa-temperature-arrow-up'></i>  Maximum Temperature: {isDegree ? Math.round(temMaxC) : Math.round(temMaxF)}º {isDegree ? 'C' : 'F'}</p> {/*maximum temperature: */}
                        <p> <i className='fa-solid fa-temperature-arrow-down'></i> Minimum Temperature: {isDegree ? Math.round(tempMinC) : Math.round(temMinF)}º {isDegree ? 'C' : 'F'}</p> {/** minimum temperature:   */}
                        <p><i className='fa-solid fa-temperature-high'></i> Pressure: {Math.round(value.main?.pressure)}  hPa</p> {/**Pressure:  */}
                    </div>
                    
                    <div className='hours'>
                        <p className='h'>{now}</p>
                        <p className='p'>Last actualization</p>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Weather