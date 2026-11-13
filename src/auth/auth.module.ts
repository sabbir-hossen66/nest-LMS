import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UserModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, // Use the secret from environment variables
      signOptions: { expiresIn: '1h' }, // Token expiration time
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
