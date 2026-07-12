export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: string;
}
