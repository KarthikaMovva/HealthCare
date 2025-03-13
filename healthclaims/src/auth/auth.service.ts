import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: { email: string; role: string }) {
    console.log('Generating Token for:', payload);
    return this.jwtService.sign(payload);
  }
}
