import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() newUser: Prisma.UserCreateInput) {
    return this.userService.create(newUser);
  }

  @Post('login')
  login(@Body() body: {email: string, password: string}) {
    return this.userService.login(body);
  }

  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'PLAYER') {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedUser: Prisma.UserCreateInput) {
    return this.userService.update(+id, updatedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
