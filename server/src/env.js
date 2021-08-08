const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../', '.env') });

// That param can use only cfg. Pls call only cfg
export default {
    monster: {
        email: process.env.MONSTER_EMAIL,
        password: process.env.MONSTER_PASSWORD,
    },
};
