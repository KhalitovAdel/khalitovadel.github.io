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
    db: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_USER_PASSWORD || 'Benq1234',
        database: process.env.DATABASE_NAME || 'db',
    },
};
