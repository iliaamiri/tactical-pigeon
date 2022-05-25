appConfigs = {
  APP_NAME: process.env.APP_NAME ?? "Tactical People",
  APP_DEBUG: process.env.APP_DEBUG ?? false,
  APP_MODE: process.env.APP_MODE ?? "development",
  APP_URL: process.env.APP_URL ?? "http://localhost",
  APP_VERSION: process.env.APP_VERSION ?? 1.0,
  JWT_RSA_PRIVATE_KEY: JWT_PRIVATE_KEY || null,
  JWT_RSA_PUBLIC_KEY: JWT_PUBLIC_KEY || null,
  SESSION_SECRET: process.env.SESSION_SECRET ?? "",
  PORT: process.env.PORT ?? 8080,

  SQL_DB_HOST: process.env.SQL_DB_HOST ?? "",
  // too lazy to do now. TODO:
  // SQL_DB_PORT,
  // SQL_DB_NAME,
  // SQL_DB_USERNAME,
  // SQL_DB_PASSWORD,
  // SQL_DB_DIALECT
};

module.exports = appConfigs;