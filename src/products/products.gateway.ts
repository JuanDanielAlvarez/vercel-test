/* eslint-disable prettier/prettier */
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway( 3044, {cors: {origin: '*',},})
export class ProductsGateway {
  @WebSocketServer()
  io: Server
  
  products = {};

  @SubscribeMessage('createOrUpdateProduct') // Nombre del metodo para recibir eventos
  createOrUpdateProduct(
      @MessageBody()
          product: { 
            name: string;
            id: string;
            price: number;
            description: string;
          },
      @ConnectedSocket()
          client: Socket 
  ) {
      client.join(product.id);
      console.log('message', product);
      client.broadcast.to(product.id).emit('productUpdatedOrCreated', product);
      this.products[product.id] = product;
      return {mensaje: 'ok'};
  }

  @SubscribeMessage('subscribeToProduct') // Nombre del metodo para recibir eventos
  subscribeToProduct(
      @MessageBody()
          product: { 
            id: string;
          },
      @ConnectedSocket()
          client: Socket 
  ) {
    // if product does not exist return an error message
      if (!this.products[product.id]) {
        return {mensaje: 'product does not exist'};
      }
      console.log('client', client, 'subscribed to product', product.id);
      client.join(product.id);
      client.emit('productUpdatedOrCreated', this.products[product.id]);
      return {mensaje: 'ok'};
  }
}

