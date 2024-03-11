import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { LoginDto, CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newuser = new this.userModel(createUserDto);
    return newuser.save();
  }

  async logIn(loginDto: LoginDto): Promise<any> {
    const user = await this.userModel.findOne({ username: loginDto.username });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  findUserById(id: string) {
    return this.userModel.findById(id);
  }
}
