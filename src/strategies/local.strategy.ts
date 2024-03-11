import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
    });
  }
  async validate(username: string, password: string): Promise<any> {
    //red this function is the one that add it's return to the request
    this.logger.log(LocalStrategy.name);
    const result = await this.authService.logIn({
      username,
      password,
    });
    const userObject = result.toObject(); //because result is mongoose document object
    delete userObject.password;

    return userObject;
  }
}
