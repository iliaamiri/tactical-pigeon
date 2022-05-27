const body = document.querySelector("body");
const typeSelector = document.querySelector("div.type-selector");

body.addEventListener('click', async event => {
  let target = event.target;
  let tagName = target.tagName;

  /* ----- Save Button ----- */
  if (tagName === "DIV" && target.classList.contains("save-btn")) {

  }

  /* ----- Exit Button ----- */
  if (tagName === "DIV" && target.classList.contains("exit-btn")) {

  }

  /* ----- Type Selector ----- */
  let typeSelector = target.closest("div.type-selector");
  if (typeSelector) {
    try {
      await typeSelectorClickEventHandler(event);
    } catch (err) {
      console.log(err);
    }
  }
});

async function typeSelectorClickEventHandler(event) {
  let target = event.target;
  let tagName = target.tagName;

  let pigeonTypeOption = target.closest("div.pigeon-type-option");
  if (!pigeonTypeOption) {
    throw new Error("Target is not a pigeon type option.");
  }

  if (pigeonTypeOption.classList.contains('cool-down-click')) {
    return;
  } else {
    pigeonTypeOption.classList.toggle("cool-down-click", true);
  }

  if (pigeonTypeOption.querySelector('div.locked')) {
    // add animate__animated animate__headShake classes to the locked icon and return
    let lockedIcon = pigeonTypeOption.querySelector('div.locked');
    lockedIcon.classList.add('animate__animated', 'animate__headShake');
    // clean up and return
    setTimeout(() => {
      lockedIcon.classList.remove('animate__animated', 'animate__headShake');
      pigeonTypeOption.classList.toggle("cool-down-click", false);
    }, 1000);
    return;
  }

  if (pigeonTypeOption.classList.contains("active")) {
    await deActivePigeonTypeOption(pigeonTypeOption);
  } else {
    await deActiveAllPigeonTypeOptions();
    await activePigeonTypeOption(pigeonTypeOption);
  }

  // clean up the cool-down click
  pigeonTypeOption.classList.toggle("cool-down-click", false);
}

async function deActiveAllPigeonTypeOptions() {
  let pigeonTypeOptions = document.querySelectorAll("div.pigeon-type-option");
  for (let i = 0; i < pigeonTypeOptions.length; i++) {
    let pigeonTypeOption = pigeonTypeOptions[i];
    if (pigeonTypeOption.classList.contains("active")) {
      await deActivePigeonTypeOption(pigeonTypeOption);
    }
  }
}

async function deActivePigeonTypeOption(pigeonTypeOption) {
  pigeonTypeOption.classList.remove(..."active animate__animated animate__pulse animate__infinite".split(" "));
}

async function activePigeonTypeOption(pigeonTypeOption) {
  pigeonTypeOption.classList.add(..."active animate__animated animate__pulse animate__infinite".split(" "));
}