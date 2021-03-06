import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    }),
  )
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    }),
  )
  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  /*   @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrdersByUser(id);
  } */

  @UseInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    }),
  )
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @UseInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    }),
  )
  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @UseInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    }),
  )
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
