import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5'
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const getCurrentWeather = async (lat, lon) =>  {
  const url = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  const request = axios.get(url)
  const response = await request

  return response.data
}

export default { getCurrentWeather }