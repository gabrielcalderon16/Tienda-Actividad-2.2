import axios from 'axios';

export const ProductApi = axios.create({
    baseURL : "http://localhost:8080/api",
})