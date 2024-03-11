import { Controller, Get, Request, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/whoami')
  getMe(@Session() session): string {
    return session.passport.user;
  }

  @Get('/signout')
  logout(@Request() req) {
    req.session.destroy();
    return { msg: 'The session has been destroyed' };
  }
}
