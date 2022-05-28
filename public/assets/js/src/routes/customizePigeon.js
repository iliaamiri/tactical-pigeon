const body = document.querySelector("body");
const typeSelector = document.querySelector("div.type-selector");
const selectedPigeon = document.querySelector("div.selectedPigeon");
const saveButton = document.querySelector("img.save");
const hueRangeSlider = document.querySelector("input#myRange");

hueRangeSlider.addEventListener('change', async event => {
  let value = event.target.value;

  // Change the hue of the selected pigeon. And update the dataset.hueAngle value.
  selectedPigeon.style.setProperty('filter', `hue-rotate(${(value / 100).toFixed(2)}turn)`);
  selectedPigeon.dataset.hueAngle = value;

  // Update pigeonTypeOption's hue angle value.
  let pigeonTypeOption = typeSelector.querySelector("div.pigeon-type-option.active");
  if (pigeonTypeOption) {
    let pigeonIndex = pigeonTypeOption.dataset.mypigeonArrindex;
    myPigeons[pigeonIndex].hueAngle = value;
    console.log(myPigeons);
    pigeonTypeOption.dataset.hueAngle = value;
    pigeonTypeOption.style.setProperty('filter', `hue-rotate(${(value / 100).toFixed(2)}turn)`);
  }

  // Toggle the save button to be enabled.
  saveButton.classList.toggle("disabled", false);
});

body.addEventListener('click', async event => {
  let target = event.target;
  let tagName = target.tagName;

  /* ----- Save Button ----- */
  if (tagName === "IMG" && target.classList.contains("save")) {
    try {
      saveButton.classList.toggle("disabled", true);
      let apiResponse = await axios.post('/api/profile/updatePigeonCustomization', {
        myPigeons: myPigeons
      });

      if (apiResponse.data.status) {
        console.log("Successfully updated the user's pigeon customization.");
      } else {
        saveButton.classList.toggle("disabled", false);
        console.log("Failed to update the user's pigeon customization.");
      }

      console.log(apiResponse);
    } catch (error) {
      console.log(error);
    }
  }

  /* ----- Exit Button ----- */
  if (tagName === "IMG" && target.classList.contains("exit")) {
    location.href = '/userHome';
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
    setTimeout(() => {
      pigeonTypeOption.classList.remove('cool-down-click');
    }, 1000);
    return;
  } else {
    pigeonTypeOption.classList.add("cool-down-click");
  }

  let locked = pigeonTypeOption.querySelector('div.locked');
  if (locked && !locked.classList.contains('hidden')) {
    // add animate__animated animate__headShake classes to the locked icon and return
    let lockedIcon = pigeonTypeOption.querySelector('div.locked');
    lockedIcon.classList.add('animate__animated', 'animate__headShake');
    // clean up and return
    setTimeout(() => {
      lockedIcon.classList.remove('animate__animated', 'animate__headShake');
      pigeonTypeOption.classList.remove('cool-down-click');
    }, 1000);
    return;
  }

  if (pigeonTypeOption.classList.contains("active")) {
    pigeonTypeOption.classList.remove('cool-down-click');
    return;
  }

  await deActiveAllPigeonTypeOptions();
  await activePigeonTypeOption(pigeonTypeOption);

  for (let i = 0; i < myPigeons.length; i++) {
    myPigeons[i].isSelected = false;
  }

  selectedPigeon.classList.remove(selectedPigeon.dataset.pigeonName);
  selectedPigeon.dataset.pigeonName = pigeonTypeOption.dataset.pigeonName;
  selectedPigeon.classList.add(pigeonTypeOption.dataset.pigeonName);

  let activePigeonIndex = pigeonTypeOption.dataset.mypigeonArrindex;
  myPigeons[activePigeonIndex].isSelected = true;

  selectedPigeon.dataset.hueAngle = pigeonTypeOption.dataset.hueAngle;
  selectedPigeon.style.setProperty('filter', `hue-rotate(${(pigeonTypeOption.dataset.hueAngle / 100).toFixed(2)}turn)`);

  hueRangeSlider.value = pigeonTypeOption.dataset.hueAngle;

  saveButton.classList.toggle("disabled", false);
  console.log(myPigeons);
  // clean up the cool-down click
  pigeonTypeOption.classList.remove('cool-down-click');
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