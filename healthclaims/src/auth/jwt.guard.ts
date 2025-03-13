import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log('Received Token:', token);
        const decoded = jwt.verify(token, 'your_secret_key');
        console.log('Decoded Payload:', decoded);
        request.user = decoded;
        return true;
      } catch (error) {
        console.error('JWT Verification Failed:', error.message);
        throw new UnauthorizedException('Invalid or expired token');
      }
  }
}
