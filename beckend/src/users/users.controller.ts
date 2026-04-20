import { Controller , Get, Post, Delete, Param, Body, Patch, Query} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @Get() // GET /user/ get all users
    getAllUsers(@Query('role') role?: 'PLAYER' | 'ADMIN', @Query('name') name?: string) {
        return this.UsersService.getAllUsers(role, name);
    }
   
    @Get(':id') // GET  /users/:id get user by id
    getUserById(@Param('id') id: string) {
        return this.UsersService.getUserById(+id);
    }

    @Post() // POST /users/ create a new user
    createUser(@Body() user: {id: number, name: string, role: "PLAYER" | "ADMIN"})  {
        return this.UsersService.createUser(user);
    }

    @Patch(':id') // PATCH /users/:id update user by id
    updateUser(@Param('id') id: string, @Body() updated: {name: string, role: "PLAYER" | "ADMIN" }) {
        return this.UsersService.updateUsser(+id, updated);
    }

    @Delete(':id') // DELETE /users/:id delete user by id 
    deleteUser(@Param('id') id: string) {
        return this.UsersService.delseteUser(+id);
    }
}
