const fs = require('fs');

// Define the include function for absolute file name
global.base_dir = __dirname;
global.abs_path = function (path) {
  return base_dir + path;
}
global.include = function (file) {
  return require(abs_path('/' + file));
}

global.JWT_PRIVATE_KEY = fs.readFileSync('./jwtRS256.key').toString();

global.JWT_PUBLIC_KEY = fs.readFileSync('./jwtRS256.key.pub').toString();

/*
* ///////////// Importing the dotenv module to handle reading environment variables from .env file /////////////
* */
const dotenv = require('dotenv');

/*
* ///////////// Loading the environment variable configurations from .env file /////////////
* */
dotenv.config();