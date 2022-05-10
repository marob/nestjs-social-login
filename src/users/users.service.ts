import { Injectable } from '@nestjs/common';

import { User } from '../shared';

@Injectable()
export class UsersService {
	id = 1;
	users: Map<string, User> = new Map<string, User>();

	async findOrCreate(user: User): Promise<User> {
		// TODO Perform database lookup to extract more information about the user
		// or to create the user if the UserId is unknown to us.
		const key = `${user.provider}|${user.id}`;
		if (!this.users.get(key)) {
			this.users.set(key, { ...user, id: '' + this.id++ });
		}
		return this.users.get(key);
	}
}
