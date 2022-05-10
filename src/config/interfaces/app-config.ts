export interface AppConfig {
	port: number;

	auth: {
		jwt: {
			secret: string;
			expiresInSeconds: number;
		};
		github: {
			clientId: string;
			clientSecret: string;
			callbackURL: string;
		};
		google: {
			clientId: string;
			clientSecret: string;
			callbackURL: string;
		};
	};
	'auth.jwt.secret'?: string;
	'auth.jwt.expiresInSeconds'?: number;
	'auth.github.clientId'?: string;
	'auth.github.clientSecret'?: string;
	'auth.github.callbackURL'?: string;
	'auth.google.clientId'?: string;
	'auth.google.clientSecret'?: string;
	'auth.google.callbackURL'?: string;
}
