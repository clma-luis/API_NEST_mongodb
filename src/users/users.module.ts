import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from '../products/products.module';
import { User, UserSchema } from './entities/user.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { OrderController } from './controllers/orders.controller';
import { OrderService } from './services/orders.services';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [CustomerController, UsersController, OrderController, ProfileController],
  providers: [CustomersService, UsersService, OrderService],
  exports: [UsersService],
})
export class UsersModule {}
