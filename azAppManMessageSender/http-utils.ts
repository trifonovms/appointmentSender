import axios, { AxiosRequestConfig } from 'axios';

export const fetchPost =async (url:string, data:string, option:any) => {
    try {
        const response = await axios.post(url, data, option);
        return response.data;
    } catch (error) {
      console.error(error);
    }    
}


