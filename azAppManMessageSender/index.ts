import { AzureFunction, Context } from "@azure/functions"
import {sendTGMessage} from './http-utils';

const queueTrigger: AzureFunction = async function (context: Context, queueItem: any): Promise<void> {
  try {
    await sendTGMessage(context, 1374826521,`${queueItem.message} Link: ${queueItem.link}`);
  } catch (error) {
    context.log.error(error);
    throw error;
  }
};


export default queueTrigger;