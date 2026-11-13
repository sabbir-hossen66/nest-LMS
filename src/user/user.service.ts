import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/Dto/registerUser.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema.js';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

   async createUser(registerUserDto: RegisterUserDto) {
 try{
      return  await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
        
    });
 }
    catch(err :unknown){
        // console.log('error', error);
        // throw error;
        const e = err as { code?: number; keyPattern?: { email: number } };
        if(e.code === 11000 && e.keyPattern?.email){
            throw new ConflictException('Email already exists');
        }
        throw err;
    }
   }

   async loginUser(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new ConflictException('User not found');
    }
    return user;
  }
}
