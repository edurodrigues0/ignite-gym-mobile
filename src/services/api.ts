import axios from "axios"
import { AppError } from "../utils/AppError"

const api = axios.create({
  baseURL: 'https://c883-201-71-39-2.ngrok-free.app'
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