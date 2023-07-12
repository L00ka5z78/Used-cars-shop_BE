import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors';
import { UserDto } from './dtos';
import { AuthService } from './auth';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Get('/:id')
  async findUser(
    @Param('id')
    id: string,
  ) {
    const user = await this.usersService.findOneUserById(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  listAllUsers(
    @Query('email')
    email: string,
  ) {
    return this.usersService.findUserByEmail(email);
  }

  @Patch('/:id')
  updateUserById(
    @Param('id')
    id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUserById(
    @Param('id')
    id: string,
  ) {
    return this.usersService.removeUser(parseInt(id));
  }
}
