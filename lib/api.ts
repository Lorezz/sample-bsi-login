import axios from 'axios';

const endpoint = process.env.NEXT_PUBLIC_API_HOST;
// axios.defaults.withCredentials = true;

export const signUp = (data: any) => axios.post(`${endpoint}/signup`, data);
export const signIn = (data: any) => axios.post(`${endpoint}/signin`, data);
export const verify = (data: any) => axios.post(`${endpoint}/verify`, data);
export const signOut = () => axios.post(`${endpoint}/signout`);
export const getProfile = () => axios.get(`${endpoint}/profile`);
export const getData = () => axios.get(`${endpoint}/data`);
export const postData = (data: any) => axios.post(`${endpoint}/data`, data);
