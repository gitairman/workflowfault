// /src/lib/messages.js
import { Messages, Users } from './mongodb';

export const getAllMessages = async () => {
  const messages = await (await Messages()).find({}).toArray();
  return messages;
};

export const createMessage = async (newMsg) => {
  console.log('inside createMessage');
  const user = await (await Users()).findOne({email: newMsg.user});
  newMsg.user = user.name.split(' ')[0];
  console.log(newMsg);
  const message = await (await Messages()).insertOne(newMsg);
  console.log(message);
  return message;
};

export const getMessagesByProjectId = async (id) => {
  console.log('inside messages');
  const messages = await (await Messages()).find({ project_id: id }).toArray();
  console.log(messages)
  return messages;
};