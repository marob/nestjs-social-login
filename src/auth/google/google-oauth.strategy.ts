import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

import { AppConfig } from '../../config/interfaces';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		private configService: ConfigService<AppConfig>,
		private usersService: UsersService,
	) {
		super({
			clientID: configService.get<string>('auth.google.clientId'),
			clientSecret: configService.get<string>('auth.google.clientSecret'),
			callbackURL: configService.get<string>('auth.google.callbackURL'),
			scope: [
				'openid',
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email',
			],
		});
	}

	async validate(
		accessToken: string,
		_refreshToken: string,
		profile: any,
		done: VerifyCallback,
	): Promise<any> {
		console.log(profile);
		const user = await this.usersService.findOrCreate({
			id: '',
			provider: 'google',
			providerId: profile.id,
			displayName: profile.displayName,
			photos: profile.photos,
		});
		if (!user) {
			// TODO Depending on the concrete implementation of findOrCreate(), throwing the
			// UnauthorizedException here might not make sense...
			throw new UnauthorizedException();
		}
		return user;
	}
}
