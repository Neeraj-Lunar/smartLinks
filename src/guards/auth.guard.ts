import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      const jwtAccessSecret= this.configService.get<string>('app.jwtAccessTokenSecret')
      const jwtSecret = this.configService.get<string>('app.jwtSecret')
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid Authorization header');
      }
  
      const token = authHeader.split(' ')[1];
      let userData;
      let useToken;
      if (request.url.includes(`/admin`)) {
        useToken = jwtSecret
      } else {
        useToken = jwtAccessSecret
      }
      userData = jwt.verify(token, useToken);
      if (typeof userData === 'string' || (!userData.user_id && !userData.admin_id)) {
        throw new UnauthorizedException('Invalid token payload');
      }

      if (userData.admin_id) {
        request['user'] = { ...userData, role: 'admin' };
      } else if (userData.user_id) {
        request['user'] = { ...userData, role: 'user' };
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException('Unable to authenticate user');
    }
  }
}
