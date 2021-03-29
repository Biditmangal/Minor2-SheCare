import axios from 'axios';
import { getStore } from '../store';


// const baseUrl= 'http://167.71.232.141';
const baseUrl = '';
const mainApi = axios.create({
    baseURL: baseUrl,
});
// const venidoApi = () => {
//     console.log("isLoggedIn", getStore().auth.isLoggedIn)
//     const baseUrl = 'https://venido-test.herokuapp.com';
//     let venido = axios.create({
//         baseURL: baseUrl,
//     });
//     return venido;
// };

export default mainApi;
