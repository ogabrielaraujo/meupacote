import axios from 'axios'

const api = axios.create({
  baseURL: 'https://meupacote-api.vercel.app/api',
})

export default api
