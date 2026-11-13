import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterUserDto } from './Dto/registerUser.dto.js';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    registerUser(registerUserDto: RegisterUserDto) {
        console.log('register',registerUserDto);
        // Implement your registration logic here
        return this.userService.createUser();    
    }
}
