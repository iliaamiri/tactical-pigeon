import Router from "./core/router.js";

// Importing the init.js and calling the function BEFORE EVERYTHING.
import init from "./core/init.js";

init();

await import('./routes/_common.js');

Router.assign('/', 'home');

Router.assign('/play', 'playOffline');
Router.assign('/play/map/selection', 'mapSelection');
Router.assign('/play/profile', 'userProfile');
Router.assign('/play/customizePigeon', 'customizePigeon');

// This route should be the last one for the /play routes
Router.assign('/play/:gameId', 'playOnline');


await import(`./routes/${Router.chosenPath}.js`);