import { backgroundsCssClassNames } from "../helpers/Backgrounds.js";

import Cookie from "../helpers/Cookie.js";

const availableMaps = Object.keys(backgroundsCssClassNames);

document.querySelector('div.select-done-button').addEventListener('click', event => {
  let selectedMapDiv = document.querySelector('div.card.highlight');
  let mapName = selectedMapDiv.dataset.mapName;
  if (!mapName) {
    console.log("No map name is set"); // debug
    return;
  }

  if (!availableMaps.includes(mapName)) {
    console.log("Invalid map name"); // debug
    return;
  }

  Cookie.set("selectedMap", mapName);

  location.href = "/";
});