import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:3000/'
axios.interceptors.response.use((res) => {
  return res.data
})
// get sliders for home page
export let getSliders = () => {
  return axios.get('/sliders')
}
// get hot books
export let getHotBook = () => {
  return axios.get('/hot')
}
// get book list
export let getBooks = () => {
  return axios.get('/book')
}
// remove book
export let removeBook = (id) => {
  return axios.delete(`/book?id=${id}`)
}
// find book
export let findOneBook = (id) => {
  return axios.get(`/book?id=${id}`)
}
/**
 * @param id
 * @param data
 * @returns {AxiosPromise<any>}
 */
export let updateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data)
}
export let addBook = (data) => {
  return axios.post('/book', data)
}

export let getAll = () => {
  return axios.all([getSliders(), getHotBook()])
}
export let pagination = (offset) => {
  return axios.get(`/page?offset=${offset}`)
}
