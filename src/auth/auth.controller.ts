import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LocalGuard } from 'src/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @UseGuards(LocalGuard)
  @Post('/signin')
  login(@Request() req): any {
    return {
      user: req.user,
      msg: 'User logged in',
      status: HttpStatus.OK,
    };
  }
}
