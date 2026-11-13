import { Body, Controller,Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './Dto/registerUser.dto.js';
import { LoginDto } from './Dto/login.dto.js';

@Controller('auth') // /auth/register
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
   async register(@Body() registerUserDto:RegisterUserDto) {
        return await this.authService.registerUser(registerUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.loginUser(loginDto);
    }   
}
