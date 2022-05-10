import Router from "./core/router.js";

// Importing the init.js and calling the function BEFORE EVERYTHING.
import init from "./init.js";
init();

await import('./routes/_common.js');

Router.assign('/', 'home');
Router.assign('/play', 'play');


await import(`./routes/${Router.chosenPath}.js`);
