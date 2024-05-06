import { ConnectedSocket, MessageBody, WebSocketGateway as NestWebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { WebSocketService } from './web-socket.service';
import { Socket, Server } from 'socket.io';
import { ApplyJobDto } from 'src/user/dto/create-user.dto';
@NestWebSocketGateway({
  cors: true
})
export class WebSocketGateway {
  constructor(private readonly webSocketService: WebSocketService) { }
  @WebSocketServer()
  server: Server = new Server();
  @SubscribeMessage('notification')
  async listenPayment(
    @MessageBody() userId: number,
    @ConnectedSocket() socket: Socket
  ) {
    try {
      let decoded: string = process.env.JWT_SECRET_KEY
      socket.join(decoded);

    } catch (error) {
      console.log('error', error)
    }
  }
  async completedResult(data: ApplyJobDto) {
    this.server.emit('notification', data);
  }
}
