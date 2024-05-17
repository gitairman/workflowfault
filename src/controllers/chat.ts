// src/controllers/chat.ts

import EventEmitter from 'events';
import { createMessage, getAllMessages } from '../lib/messages';

export default class ChatController {
  private static instance: ChatController;
  static body: BodyInit = null;
  private constructor() {}

  static getInstance(): ChatController {
    if (!ChatController.instance) {
      ChatController.instance = new ChatController();
    }
    return ChatController.instance;
  }

  private messages: string[] = [];

  public async getMessages(): Promise<object[]> {
    const data = await getAllMessages();
    return data;
  }

  private emitter = new EventEmitter();

  public subscribe(callback: (message: string) => void): void {
    // console.log(this.emitter.on);
    this.emitter.on('message', callback);
    console.log(this.emitter.listeners('message'));
  }

  public unsubscribe(callback: (message: string) => void): void {
    console.log('unsubscribe');
    this.emitter.off('message', callback);
  }

  public async addMessage(message: string, user: string, project_id: string, chatColor: string): Promise<void> {
    await createMessage({ user, content: message, created_at: Date.now(), project_id, chatColor});
    console.log("sent message to database");
    this.emitter.emit('message', message);
  }
}
