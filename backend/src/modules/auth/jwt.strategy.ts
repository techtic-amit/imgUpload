import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtPayload, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/common/config.service';
import { UserImageService } from 'src/shared/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UserImageService))
    private readonly userImageService: UserImageService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ConfigService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload, done: any) {
    let { exp, iat, id, email } = payload;
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({
      id: id,
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;
    done(null, user);
  }
}
