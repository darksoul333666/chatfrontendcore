import axios from 'axios';

//export const URL_API = 'https://webrtc-assistance-api.herokuapp.com/';
export const URL_API = 'http://192.168.31.146:3200/';

  function config(URL) {
    return {
      baseURL: URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',

            },
    };
}
  
export const API = async () => axios.create( config(URL_API));

export const ROUTES = {
//chat Ai respuesta
GET_AI_RESPONS:'chat'
}