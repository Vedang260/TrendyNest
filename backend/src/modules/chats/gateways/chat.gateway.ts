// src/chat/gateways/chat.gateway.ts
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',  // Restrict in production
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    server.sockets.sockets.forEach(socket => {
      socket.removeAllListeners('send_message');
    });
  }
  
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleMessage(client: Socket, payload: any) {
    // Debug raw payload
    console.log('Raw payload:', payload);
    
    // Parse the payload if it's a string
    const parsedPayload = typeof payload === 'string' ? JSON.parse(payload) : payload;
    console.log('Parsed payload:', parsedPayload);
    
    // Safely extract message
    const message = parsedPayload.message || 
                   (parsedPayload.data && parsedPayload.data.message);
    
    if (!message) {
      throw new Error('No message provided');
    }

    console.log('Processing message:', message);
    const botResponse = await this.chatService.handleInquiry(message);
    
    // Send real-time response
    client.emit('receive_message', { 
      sender: 'premium_bot', 
      message: botResponse 
    });
  }
}