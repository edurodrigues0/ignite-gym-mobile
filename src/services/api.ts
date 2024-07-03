import axios from "axios"
import { AppError } from "../utils/AppError"

const api = axios.create({
  baseURL: 'https://1dc4-201-71-36-177.ngrok-free.app'
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  }
)

export { api }