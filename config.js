require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT || 0,
  allowedOrigins: process.env.ALLOWED_ORIGINS.split(',') || [],
};
