import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.schema';
import { UsersService } from './users.service';
import { Message, MessageSchema } from 'src/schemas/messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [MongooseModule],
})
export class UsersModule {}
