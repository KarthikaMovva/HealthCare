import { Controller, Post, Body } from '@nestjs/common';
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
    const user = await this.userService.validateUser(body.email, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const token = this.authService.generateToken({ id: user._id, role: user.role });
    return { token };
  }
}
