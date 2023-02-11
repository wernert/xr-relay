import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

// import interface msgformat = > from client ?

@WebSocketGateway({ cors: true }) // hmm true means allowed from all !?
export class RecordGateway {
  @WebSocketServer()
  server: Server;

  // constructor() {
  //   // this.test();
  // }

  formatLog(text: string, data: any): void {
    let txtOut = '';
    if ( data['timestamp'] ){
      txtOut = new Date(data['timestamp']).toLocaleString();
    }
    console.log(text, data['message'], txtOut);
  }
  @SubscribeMessage('cmd')
  handleCmd(socket: any, payload: any): void {
    console.log('cmd: ', payload)
    // this.server.emit('test', payload);
    socket.broadcast.emit("cmd", payload);
    return payload;
  }

  @SubscribeMessage('record')
  handleRecord(socket: any, payload: any): void {
    // console.log('client: ', client)
    this.formatLog('record payload: ', payload)
    console.log('record: ', payload)
    return payload;
  }
  @SubscribeMessage('test')
  handlePing(socket: any, payload: any): void {
    console.log('ping: ', payload)
    socket.emit('test', payload);
    return payload;
  }
  @SubscribeMessage('message')
  handleMessage(socket: any, payload: any): void {
    console.log('record message: ', payload)
    return payload;
  }

  @SubscribeMessage('debug')
  handleDebug( @MessageBody() data: string,): string {
    // const time = new Date(data['timestamp']).toISOString();
    // console.log('debug data: ', time, data['message'] )
    this.formatLog('debug data: ', data)
    return data;
  }

  handleConnection(socket: any, ...args: any[]): any {
    // console.log('connected: ', client);
    console.log('ClientConnect: ', socket.conn.remoteAddress, socket.client.id );
  }

  afterInit(server: any): any {
    console.log('SignallingGateway initialized');
  }

  handleDisconnect(socket: any): any {
    console.log(`ClientDisconnect: ${socket.conn.remoteAddress}  ${socket.client.id}`)
  }

  // test() {
  //   this.server.on('connection', (socket) => {
  //     socket.use((packet, next) => {
  //       // Handler
  //       next();
  //     });
  //   });
  // }
}
