import { AzureFunction, Context } from "@azure/functions"
import {fetchPost} from './http-utils';
import {AxiosRequestConfig} from 'axios';
import { METHODS } from "http";

const queueTrigger: AzureFunction = async function (context: Context, myQueueItem: string): Promise<void> {
  console.log(myQueueItem);
  const obj = {
    userId:12345,
    message:'`Default message` \n \n We have appointment for you at 12/12/2022 09:30AM on Flemington, NJ ',
    link: "http://myappointment.com/12/12/2022/09/15/dmv/12"
};
  let msg = obj;
  try {
    msg = JSON.parse(myQueueItem);
  } catch (error) {
    msg = obj;
  } 

  try {
    await sendMessage(1374826521,`${msg.message} Link: ${msg.link}`);
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async (chatId: number, message: string)=> {
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
    const response = await fetchPost(url, data, option);
    return response.data;
  } catch (error) {
    console.error(`sendMessage. ${error}`);
  }

}

export default queueTrigger;