import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
})

axiosInstance.interceptors.response.use(
  (response) => {
    const statusCode = response.status

    const {
      data: { succeeded },
    } = response

    if (statusCode <= 300 && succeeded === false) {
      console.log('success messages')
    }
    return response
  },
  (error) => {
    console.log(error)
  },
)
