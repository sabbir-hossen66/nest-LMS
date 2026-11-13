import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterUserDto } from './Dto/registerUser.dto.js';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './Dto/login.dto.js';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    // console.log('register', registerUserDto);
    const hash = await bcrypt.hash(registerUserDto.password, 10);
    // Implement your registration logic here
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = { id: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    console.log(token);
    return {access_token: token};
  }

    async loginUser(loginDto: LoginDto) {
    const user = await this.userService.loginUser(loginDto.email);
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { id: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
