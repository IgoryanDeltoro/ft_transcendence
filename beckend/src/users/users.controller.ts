import { Controller , Get, Post, Delete, Param, Body, Patch, Query, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdataeUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @Get() // GET /user/ get all users
    getAllUsers(@Query('role') role?: 'PLAYER' | 'ADMIN', @Query('name') name?: string) {
        return this.UsersService.getAllUsers(role, name);
    }
   
    @Get(':id') // GET  /users/:id get user by id
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.UsersService.getUserById(id);
    }

    @Post() // POST /users/ create a new user
    createUser(@Body(ValidationPipe) createUserDto:  CreateUserDto)  {
        return this.UsersService.createUser(createUserDto);
    }

    @Patch(':id') // PATCH /users/:id update user by id
    updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updated: UpdataeUserDto) {
        return this.UsersService.updateUsser(id, updated);
    }

    @Delete(':id') // DELETE /users/:id delete user by id 
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.UsersService.delseteUser(id);
    }
}

