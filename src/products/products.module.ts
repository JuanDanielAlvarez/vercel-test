import { ProductsGateway } from './products.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [ProductsGateway],
})
export class ProductsModule {}
