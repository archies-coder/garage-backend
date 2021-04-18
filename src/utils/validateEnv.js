const { cleanEnv, str, port } = require("envalid");


const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGO_HOST: str(),
    MONGO_PORT: str(),
    MONGO_DATABASE: str(),
    JWT_SECRET: str(),
    // BOOK_RENTAL_SERVICE_URL: str(),
  });
};

module.exports = validateEnv;
