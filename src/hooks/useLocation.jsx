import useAxios from "./useAxios";

const useLocation = () => {
    
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        const crd = pos.coords

        console.log('Your current position is:')
        console.log(`Latitude : ${crd.latitude}`)
        console.log(`Longitude: ${crd.longitude}`)
        console.log(`More or less ${crd.accuracy} meters.`)
        const {value, changeApi} = useAxios(`https://api.openweathermap.org/data/2.5/weather?lat={crd.latitude}&lon={crd.longitude}&appid={apiKey}`, res => res.data)
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options)
      
    return{}
}

export default useLocation