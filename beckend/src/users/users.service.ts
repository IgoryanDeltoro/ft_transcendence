import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdataeUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: "John@done",
            role: 'ADMIN'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: "Jane@smith",
            role: 'PLAYER'
        },
        {
            id: 3,
            name: 'Alice Johnson',
            email: "Alice@johnson",
            role: 'PLAYER'
        },
        {
            id: 4,
            name: 'Bob Brown',
            email: "Bob@brown",
            role: 'PLAYER'
        },
        {
            id: 5,
            name: 'Charlie Davis',
            email: "Charlie@davis",
            role: 'PlAYER'
        }
    ]; // Leater we will replace this with database query

    getAllUsers(role?: 'PLAYER' | 'ADMIN', name?: string) {
        let res = this.users; 
        if (role && name) {
            res = res.filter(user => user.role === role && user.name === name);
        }
        else if (role) {
            res = res.filter(user => user.role === role);
        }
        else if (name) {
            res = res.filter(user => user.name === name);
        }
        if (res.length === 0) {
            throw new NotFoundException('No users found with the given criteria');
        }
        return res;
    }

    getUserById(id: number) {
        const user =  this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    createUser(newUser: CreateUserDto) {
        let newId = 0;
        this.users.forEach(u => {
                if (u.id > newId)
                    newId = u.id;
        });
        this.users.push({id: newId + 1, ...newUser});
        return newUser;
    }

    updateUsser(id: number, updated: UpdataeUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updated };
            }
            return user;
        });
        return this.users.find(user => user.id === id);
    }

    delseteUser(id: number) {
        const removedUser = this.getUserById(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}
