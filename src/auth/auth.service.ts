import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterUserDto } from './Dto/registerUser.dto.js';
import bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    console.log('register', registerUserDto);
    const hash = await bcrypt.hash(registerUserDto.password, 10);
    // Implement your registration logic here
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    return user;
  }
}
