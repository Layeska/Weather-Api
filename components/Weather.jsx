import React, { useEffect, useState } from "react"
import axios from "axios";
import useAxios from "../src/hooks/useAxios"
import paises from "../src/paises.json"
import citylist from "../src/citylist.json"

const Weather = () => {

    const [value, setValue] = useState({})

    const [isDegree, setIsDegree] = useState(true)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
        
        function success(pos) {
            const crd = pos.coords

            /*console.log(`Latitude : ${crd.latitude}`)
            console.log(`Longitude: ${crd.longitude}`)*/

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=a6bee11f6399d0eb9003ec59c2435b3e`).then(res => setValue(res.data))
       //const {value} = useAxios(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=a6bee11f6399d0eb9003ec59c2435b3e`).then(res => setValue(res.data))
            changeTemp()
            
    }
    setLoading(true);
    setTimeout(() => { setLoading(false)},1000)
    },[])


    const timePc = Date.now();
    const dateNow = new Date(timePc); //Hora y fecha de PC
  
    const timestamp = value.sys?.sunrise
    const dateUTC = new Date(timestamp);

    const timeSunset = value.sys?.sunset 
    const dateUTCSunset = new Date(timeSunset)

    const hours = dateUTC.getHours();
    // crea un nuevo objeto `Date`
    var today = new Date();
 
    // obtener la hora en la configuración regional de EE. UU.
   // var now = today.toLocaleTimeString('en-US');
 


   

    /*console.log(dateUTC.getTime())
    const aux = dateUTC
    console.log('time', dateUTC)
    console.log("Date: "+dateUTC.getDate()+
          "/"+(dateUTC.getMonth()+1)+
          "/"+dateUTC.getFullYear()+
          " "+dateUTC.getHours()+
          ":"+dateUTC.getMinutes()+
          ":"+dateUTC.getSeconds())*/

    const date = new Date(dateUTC);
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    //entra y sale el sol
    var timeString = dateUTC.toLocaleString('en-US', options);
    var timeString1 = dateUTCSunset.toLocaleString('en-US', options);

    const date1 = new Date()
    let now = new Intl.DateTimeFormat('en-US', options).format(date1)
    //console.log(timeString);
     //     console.log(value.name)
     //     console.log(value)
    
    // temperatura actual y como se siente en C y F

    const tempF = (value.main?.temp - 273.15) * 9/5 + 32 
    const tempF_like = (value.main?.feels_like - 273.15) * 9/5 + 32 
    const tempC = value.main?.temp - 273.15 
    const tempC_like = value.main?.feels_like - 273.15

    const temMaxC = value.main?.temp_max - 273.15
    const temMaxF = (value.main?.temp_max - 273.15) * 9/5 + 32

    const tempMinC = value.main?.temp_min - 273.15
    const temMinF = (value.main?.temp_min - 273.15) * 9/5 + 32

    const changeTemp = () => {
        

        

       /* if(isDegree == 'C') {
            tempF = (value.main?.temp - 273.15) * 9/5 + 32
            tempF_like =  (value.main?.temp - 273.15) * 9/5 + 32
        } else {
            tempC = value.main?.temp - 273.15
            tempC_like = value.main?.feels_like - 273.15
            
        }*/

        setIsDegree(!isDegree)
    }

   /* const FunctiontempC = () => {
        if(setIsDegree) {
            console.log('--> precionado -------------')
            tempC = value.main?.temp - 273.15
            tempC_like = value.main?.feels_like - 273.15
            return tempC
        }
    }*/

    console.log('tempC',tempC)

    /*for(let i=0; i<paises.length; i++) {
        console.log(paises[i].cod)
    }*/




    return (
        <div className="card">
            { loading ? (
            <div className="loader-container">
                 <div className="spinner"></div>
            </div>
            ) : (

            <div className="main">
                <div  className="main-div">
                    <p className="stateCountry">{dateNow.toDateString()}</p>
                    <p className="location"><i className="fa-solid fa-location-dot"></i>  {value.name}, {value.sys?.country}</p>
                    <img src={`http://openweathermap.org/img/wn/${value.weather?.[0].icon}@2x.png`} alt="" />
                    <p className="description">{value.weather?.[0].main}, {value.weather?.[0].description}</p>

                    {/*<div className="icon-temp">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#F2F2F1">
                        <path  d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V152c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/>
                    </svg>
    </div>*/}
                    {/*<img className="icon-temp" src='../src/assets/temp.svg' alt="icon" width='100' height='100'/>*/}
                    <div className="tempe">
                        <p className="degreeC">{/*{Math.round(tempC)}º */}   {isDegree ? Math.round(tempC) : Math.round(tempF)}º</p>
                        <button onClick={changeTemp} className="btn">{isDegree ? 'C' : 'F'}</button>
                    </div>
                    <p className="feel">Feels like  {isDegree ? Math.round(tempC_like) : Math.round(tempF_like)}º {isDegree ? 'C' : 'F'}</p>
                    
                    {/*<div className="btn">
                    <button className="buttonC"> <span className="c">C</span> </button>
                    <button className="buttonF">F</button>
</div>*/}
                    
                </div>
                <div  className="main-div">
                    <p>Search by Country</p>
                    <label for="emails">City </label>
                    <select name="citys" id="">
                        <option value={-1}>{citylist[0].name}</option>
                        {citylist.forEach((city, i) => (
                            <option key={city[i]?.id} value={city[i]?.country}>{city[i]?.name}</option>
                       ))}
                        </select>
                    <br/>
                    <label for="emails"> Country: </label>
                    <input type="text"/>

                    <hr />
                    <div className="main-informations">
                        <p><i className="fa-regular fa-sun"></i> <i className="fa-solid fa-sort-up"></i>  {timeString1}</p> {/**Sale el sol:  */}
                        <p><i className="fa-regular fa-sun"></i> <i className="fa-solid fa-caret-down"></i>  {timeString}</p> {/**Entra el sol: */}
                        
                        <p><i className="fa-solid fa-cloud"></i> {value.main?.humidity} %</p>
                        

                        
                    </div>

                    <div className="main-informations2">
                    <p><i className="fa-solid fa-wind"></i> Wind Speed: {value.wind?.speed} mt/seg</p> {/**wind speed: */}
                    <p><i className="fa-solid fa-temperature-arrow-up"></i>  Maximum Temperature: {isDegree ? Math.round(temMaxC) : Math.round(temMaxF)}º </p> {/*maximum temperature: */}
                        <p> <i className="fa-solid fa-temperature-arrow-down"></i> Minimum Temperature: {isDegree ? Math.round(tempMinC) : Math.round(temMinF)}º</p> {/** minimum temperature:   */}
                        <p><i className="fa-solid fa-temperature-high"></i> Pressure: {Math.round(value.main?.pressure)}  hPa</p> {/**Pressure:  */}
                    </div>
                    
                    <dir className="hours">
                        
                        <p className="h">{now}</p>
                        <p className="p">Last actualization</p>
                    </dir>
                    
                    
                    
                    
                    
                    {/*<p><i class="fa-solid fa-temperature-three-quarters"></i> Temperatura:{Math.round(tempC)}ºC</p>
                    <p>Se siente como: {Math.round(tempC_like)}º</p>*/}
                   {/* <p>Temp F: {Math.round(tempF)} </p>
                    <p>Se siente como F: {Math.round(tempF_like)}</p>*/}
                </div>

               {/* <div className="main-div"> 
                    
                    
                    <p><i class="fa-solid fa-temperature-three-quarters"></i> Temperatura:{Math.round(tempC)}ºC</p>
                    <p>Se siente como: {Math.round(tempC_like)}º</p>
                    <p>Temp F: {Math.round(tempF)} </p>
                    <p>Se siente como F: {Math.round(tempF_like)}</p>
    </div>*/}
                
                
                
            </div>
            )}

        </div>
    )
}

export default Weather