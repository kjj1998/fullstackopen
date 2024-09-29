import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const search = async name => {
  const request = axios.get(`${baseUrl}/api/name/${name}`)
  const response = await request
  return response.data
}

const getAll = async () => {
  const request = axios.get(`${baseUrl}/api/all`)
  const response = await request
  
  return response.data.map(country => country.name.common)
}

export default { search, getAll }