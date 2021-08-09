import env from './env';

export default {
    server: {
        port: 3000,
    },
    monster: {
        hosts: {
            monster: 'https://www.monster.com',
            identity: 'https://identity.monster.com',
        },
        routes: {
            profileDetails: '/profile/detail',
            login: '/usernamepassword/login',
            loginCb: '/login/callback',
        },
        auth: {
            email: String(env.monster.email),
            password: String(env.monster.password),
        },
    },
};
