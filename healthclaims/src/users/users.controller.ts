// import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
// import { UserService } from './users.service';
// import { AuthService } from '../auth/auth.service';

// @Controller('user')
// export class UserController {
//   constructor(
//     private readonly userService: UserService,
//     private readonly authService: AuthService,
//   ) {}

//   @Post('register')
//   async register(@Body() body: { name: string; email: string; password: string; role: string }) {
//     // Create user
//     const user = await this.userService.createUser(body.name, body.email, body.password, body.role);

//     // Generate JWT token
//     const token = this.authService.generateToken({ email: user.email, role: user.role });

//     return { user, access_token: token };
//   }

//   @Post('login')
//   async login(@Body() body: { email: string; password: string }) {
//     console.log('Login Request Received:', body);

//     // Find user by email
//     const user = await this.userService.findByEmail(body.email);

//     // Validate user credentials
//     if (!user || user.password !== body.password) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     console.log(`User Role: ${user.role}`);

//     // Generate JWT token
//     const token = this.authService.generateToken({ email: user.email, role: user.role});
//     console.log('Returning Token:', token);

//     return { user, access_token: token };
//   }

//   @Post('get-user-id')
//   async getUserId(@Body() body: { email: string }) {
//     const user = await this.userService.findByEmail(body.email);

//     if (!user) {
//       console.log('User not found');
//     }

//     return { _id: user._id };
//   }
// }

import { Controller, Post, Body, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string; role: string }) {
    // Create user
    const user = await this.userService.createUser(body.name, body.email, body.password, body.role);

    // Generate JWT token
    const token = this.authService.generateToken({ email: user.email, role: user.role });

    return { user, access_token: token };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('Login Request Received:', body);

    // Find user by email
    const user = await this.userService.findByEmail(body.email);

    // Validate user credentials
    if (!user || user.password !== body.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log(`User Role: ${user.role}`);

    // Generate JWT token
    const token = this.authService.generateToken({ email: user.email, role: user.role});
    console.log('Returning Token:', token);

    return { user, access_token: token };
  }

  @Post('get-user-id')
  async getUserId(@Body() body: { email: string }) {
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { _id: user._id };
  }
}
