import env from './env';

export default {
    server: {
        port: 3000,
    },
    redis: env.redis,
    bull: {
        db: 0,
    },
    monster: {
        hosts: {
            monster: 'https://www.monster.com',
            api: 'https://services.monster.io',
            identity: 'https://identity.monster.com',
        },
        routes: {
            profileDetails: '/profile/detail',
            login: '/usernamepassword/login',
            loginCb: '/login/callback',
            jobSearch: '/jobs/search',
            applyStart: '/apply/start',
            applyDetails: '/profile/apply/details',
            applyContinue: '/apply/continue',
            jobSearchApi: '/jobs-svx-service/v2/monster/search-jobs/samsearch/en-us',
        },
        jobQuery: {
            // Get values from browser or not
            addresses: [
                'New York',
                'Los Angeles, CA',
                'Chicago, IL',
                'San Diego, CA',
                'San Jose, CA',
                'Jacksonville, FL',
                'San Francisco, CA',
                'Washington, DC',
                'Boston, MA',
                'Las Vegas, NV',
                'Oklahoma City, OK',
                'Kansas City, MO',
                'Miami, FL',
            ],
            // Get values from browser or not
            positions: ['JavaScript Developer', 'Web Developer'],
        },
        auth: env.monster,
    },
};
