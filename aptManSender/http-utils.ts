import axios, { AxiosRequestConfig } from 'axios';
import { Context } from "@azure/functions"


export const fetchPost =async (context,url:string, data:string, option:any) => {
    try {
        const response = await axios.post(url, data, option);
        return response.data;
    } catch (error) {
      context.log.error(error);
      throw error;
    }    
}


export const sendTGMessage = async (context: Context, chatId: number, message: string)=> {
  const msg = {
    chat_id:chatId,
    text: message,
  };
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if(!token){
    throw new Error('Bot token not defined');
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const option: AxiosRequestConfig = {
    headers:{
      'content-type': 'application/json',
      'connection': 'keep-alive',
    }

  }
  const data = JSON.stringify(msg);
  try {
    const response = await fetchPost(context, url, data, option);
    return response.data;
  } catch (error) {
    context.log.error(`sendMessage. ${error}`);
    throw error;
  }

}