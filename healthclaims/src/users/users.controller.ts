import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string; role: string }) {
    return this.userService.createUser(body.name, body.email, body.password, body.role);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('Login Request Received:', body);

    const user = await this.userService.findByEmail(body.email);

    if (!user || user.password !== body.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log(`User Role: ${user.role}`);

    const token = this.authService.generateToken({ email: user.email, role: user.role });
    console.log('Returning Token:', token);

    return { access_token: token };
  }
}
