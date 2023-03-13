import { AzureFunction, Context } from "@azure/functions"
import {sendTGMessage} from './http-utils';
const appInsights = require("applicationinsights");
appInsights.setup();
const client = appInsights.defaultClient;
appInsights.start();
const queueTrigger: AzureFunction = async function (context: Context, queueItem: any): Promise<void> {
  context.log('JavaScript trigger function processed a request.');
  context.log("This is myTrigger: " + context.bindings.myTrigger);
  context.log("This is myInput: " + context.bindings.myInput);
  
  try {
    await sendTGMessage(context, 1374826521,`${queueItem.message} Link: ${queueItem.link}`);
  } catch (error) {
    context.log.error(error);
    throw error;
  }
};


export default queueTrigger;