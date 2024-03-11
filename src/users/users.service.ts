import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { User } from 'src/schemas/users.schema';

@UseGuards(AuthenticatedGuard)
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
}
