import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AdminNotificationDto } from './modules/admin/dto/adminNotification.dto';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://redis-brocker:6380',
      },
    });
  }

  @WebSocketServer() server: Server;
  private logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Websockets was initialized');
  }

  @SubscribeMessage('lastknownLocation')
  async handleLocation(client: Socket, data: any): Promise<any> {
    const response = await this.client
      .send('lastLocation', JSON.stringify(data))
      .toPromise();
    this.server.emit('lastknownLocation', response);
    return response;
  }

  notifyDrivers(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    driverId: string,
  ) {
    this.server.emit(driverId, data);
  }

  notifyUserOfDriverComing(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    userId: string,
  ) {
    this.server.emit(`${userId}`, { message: 'Your driver is coming' });
  }

  adminNotifyAllUsers(@MessageBody() data: AdminNotificationDto) {
    console.log('adminNotifyAllUsers');
    this.server.emit('adminNotifyAllUsers', data);
  }

  adminNotifyAllDrivers(@MessageBody() data: AdminNotificationDto) {
    this.server.emit('adminNotifyAllDrivers', data);
  }

  adminNotifyAllMerchants(@MessageBody() data: AdminNotificationDto) {
    console.log('adminNotifyAllMerchants');
    this.server.emit('adminNotifyAllMerchants', data);
  }

  adminNotifyAll(@MessageBody() data: AdminNotificationDto) {
    this.server.emit('adminNotifyAll', data);
  }
}
