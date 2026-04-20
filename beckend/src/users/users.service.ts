import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            role: 'ADMIN'
        },
        {
            id: 2,
            name: 'Jane Smith',
            role: 'PLAYER'
        },
        {
            id: 3,
            name: 'Alice Johnson',
            role: 'PLAYER'
        },
        {
            id: 4,
            name: 'Bob Brown',
            role: 'PLAYER'
        },
        {
            id: 5,
            name: 'Charlie Davis',
            role: 'PlAYER'
        }
    ]; // Leater we will replace this with database query

    getAllUsers(role?: 'PLAYER' | 'ADMIN', name?: string) {
        let res = this.users; 
        if (role && name)
        {
            res = res.filter(user => user.role === role && user.name === name);
        }
        else if (role) {
            res = res.filter(user => user.role === role);
        }
        else if (name) {
            res = res.filter(user => user.name === name);
        }
        return res;
    }

    getUserById(id: number) {
        return this.users.find(user => user.id === id);
    }

    createUser(user: {id: number, name: string, role: "PLAYER" | "ADMIN"}) {
       let newId = 0;
       this.users.forEach(u => {
            if (u.id > newId)
                newId = u.id;
       });
       user.id = newId + 1;
       this.users.push(user);
       return user;
    }

    updateUsser(id: number, updated: {name: string, role: "PLAYER" | "ADMIN" }) {
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
