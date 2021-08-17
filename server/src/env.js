const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../', '.env') });

// That param can use only cfg. Pls call only cfg
export default {
    monster: {
        email: String(process.env.MONSTER_EMAIL),
        password: String(process.env.MONSTER_PASSWORD),
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
    },
};
