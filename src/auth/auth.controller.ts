import { Body, Controller,Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './Dto/registerUser.dto.js';

@Controller('auth') // /auth/register
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    register(@Body() registerUserDto:RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }
}
