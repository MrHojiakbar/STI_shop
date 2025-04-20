import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'http://localhost:3000',
    timeout:10000,
    withCredentials: true
})

export default customAxios