import { useState, useEffect } from "react"
import axios from "axios"

const useAxios = () => {
   

    useEffect(() => {
        const [value, setValue] = useState({})
        navigator.geolocation.getCurrentPosition(success)

      function success(pos) {
        const crd = pos.coords

        console.log(`Latitude : ${crd.latitude}`)
        console.log(`Longitude: ${crd.longitude}`)

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=a6bee11f6399d0eb9003ec59c2435b3e`).then(res => setValue(res.data))
      // const {value} = useAxios(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=a6bee11f6399d0eb9003ec59c2435b3e`).then(res => res.data)
     // axios.get(url).then(data => console.log(acessData(data)))  
      }
    }, [])

    return {value}
}

export default useAxios