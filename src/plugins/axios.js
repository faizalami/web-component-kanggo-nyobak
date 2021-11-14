import axios from 'axios'

if (!process.env.API_BASE_URL) {
  console.error('Please setup API_BASE_URL environment variable')
}

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export default instance
