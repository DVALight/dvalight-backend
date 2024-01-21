import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return {
      user,
      tokens: {
        accesseToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.jwtSecretKey,
        }),

        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException('Uncorrect email or password');
    }
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      accesseToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.jwtSecretKey,
      }),

      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey,
      }),

      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
