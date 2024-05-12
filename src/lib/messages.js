// /src/lib/messages.js
import { Messages } from './mongodb';

export const getAllMessages = async () => {
  const messages = await (await Messages()).find({}).toArray();
  return messages;
};

export const createMessage = async (newMsg) => {
  const message = await (await Messages()).insertOne(newMsg);
  return message;
};