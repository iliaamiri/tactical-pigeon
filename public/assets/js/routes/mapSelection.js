import { backgroundsCssClassNames } from "../helpers/Backgrounds.js";

import Cookie from "../helpers/Cookie.js";

const availableMaps = Object.keys(backgroundsCssClassNames);

let selectedMap;

document.querySelector('div.select-done-button').addEventListener('click', event => {
  let selectedMapDiv = document.querySelector('div.card.highlight');
  selectedMap = selectedMapDiv.dataset.mapName;
  if (!selectedMap) {
    console.log("No map name is set"); // debug
    return;
  }

  if (!availableMaps.includes(selectedMap)) {
    console.log("Invalid map name"); // debug
    return;
  }

  Cookie.set("selectedMap", selectedMap);

  location.href = "/";
});

document.querySelector("div.back-button").addEventListener("click", event => {
  location.href = "/";
})

export default selectedMap;