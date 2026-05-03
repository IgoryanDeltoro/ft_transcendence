import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import  * as bcrypt from "bcrypt"

@Injectable()
export class UserService {

constructor(private readonly databaseService: DatabaseService) {}

async create(body: Prisma.UserCreateInput) {

	const	hashedPassword = await bcrypt.hash(body.password, 10);
	const	newUser = {
		...body,
		password: hashedPassword
	}
	return this.databaseService.user.create({ data: newUser });
}

// {email: string, password: string}
async login(body: Prisma.UserCreateInput) {
	const user = await this.databaseService.user.findUnique({
		where: {email: body.email}
	})
	if (!user)
		throw new Error ('User not found');
	const isMatch = await bcrypt.compare(body.password, user.password);
	if (!isMatch)
		throw new Error('Wrong password');
	return user;
}

async findAll(role?: 'ADMIN' | 'PLAYER') {
	if (role)
	{
		return this.databaseService.user.findMany( {
			where: {
				role: role,
			}
		});
	}
	return this.databaseService.user.findMany();
}

async findOne(id: number) {
	return this.databaseService.user.findUnique(
	{ 
		where: { id } 
	});
}

async update(id: number, updateUserDto: Prisma.UserCreateInput) {
	return this.databaseService.user.update(
	{
		where: { id },
		data: updateUserDto,
	});
}

async remove(id: number) {
	return this.databaseService.user.delete(
	{
		where: { id },
	});
}
}
