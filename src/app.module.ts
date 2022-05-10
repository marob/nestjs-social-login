import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubOauthModule } from './auth/github/github-oauth.module';
import appConfig from './config/app.config';
import { GoogleOauthModule } from './auth/google/google-oauth.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
		GithubOauthModule,
		GoogleOauthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
