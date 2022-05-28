import Router from "./core/router.js";

// Importing the init.js and calling the function BEFORE EVERYTHING.
import init from "./core/init.js";

init();

// Check for authentication
import Auth from "./auth/Auth.js";
await Auth.authenticate();

await import('./routes/_common.js');

Router.assign('/', 'home');
Router.assign('/signup', 'signup');
Router.assign('/userHome', 'userHome');
Router.assign('/mapselection', 'mapSelection');
Router.assign('/profile', 'userProfile');
Router.assign('/customizePigeon', 'customizePigeon');

Router.assign('/play', 'playOffline');

// This route should be the last one for the /play routes
Router.assign('/play/:gameId', 'playOnline');

console.log(Router.chosenPath);

await import(`./routes/${Router.chosenPath}.js`);