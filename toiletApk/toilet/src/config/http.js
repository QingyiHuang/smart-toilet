import axios from 'axios'

const request = axios.create({
  timeout: '30000',
  baseURL: '',
  method: 'post'
})

request.interceptors.request.use((request) => request)

request.interceptors.response.use(
  (res) => res.data,
  (err) => console.log(err)
)

export default request
