import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://burgerbuilder-01.firebaseio.com/'
})

export default instance
