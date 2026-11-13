import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('profile')
export class ProfileController {
  @UseGuards(AuthGuard)
  @Get() // 💡 এখন রুটটি হবে GET /profile
  getProfile(@Req() req: any) {
    return {
      message: 'Profile data fetched successfully',
      user: req.user, // গার্ড থেকে সেট হওয়া ইউজারের id ও email
    };
  }
}