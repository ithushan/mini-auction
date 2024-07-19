import axios from 'axios';
import { getUserData } from './Storage';

// set base url
axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1';
const API_KEY = 'AIzaSyA-95a1KHnz0LJXx5dGWgqQmE2rAA7W_Ws';
// reg url
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
// login url
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
// get details 
const DETAIL_URL = `accounts:lookup?key=${API_KEY}`;
export const RegisterApi = (inputs) => {
    let data = {displayName:inputs.name, email:inputs.email, password:inputs.password}
    return axios.post(REGISTER_URL, data);
}

export const LoginApi = (inputs) => {
    let data = {email:inputs.email, password:inputs.password}
    return axios.post(LOGIN_URL, data);
}

export const UserDetailsApi = () => {
    let data = {idToken:getUserData()}
    return axios.post(DETAIL_URL, data);
}