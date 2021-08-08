import env from './env';

export default {
    server: {
        port: 3000,
    },
    monster: {
        routes: {
            home: 'https://www.monster.com',
            profileDetails: 'https://www.monster.com/profile/detail',
        },
        auth: {
            email: String(env.monster.email),
            password: String(env.monster.password),
        },
    },
};
