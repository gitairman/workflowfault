// /src/lib/messages.js
import { Messages, Users } from './mongodb';

export const getAllMessages = async () => {
  const messages = await (await Messages()).find({}).toArray();
  return messages;
};

export const createMessage = async (newMsg) => {
  const user = await (await Users()).findOne({email: newMsg.user});
  newMsg.user = user.name.split(' ')[0];
  const message = await (await Messages()).insertOne(newMsg);
  return message;
};

export const getMessagesByProjectId = async (id) => {
  const messages = await (await Messages()).find({ project_id: id }).toArray();
  return messages;
};