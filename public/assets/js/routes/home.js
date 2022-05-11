// Components
const usernameInput = document.querySelector('input.usernameInput');
const playButton = document.querySelector('button.play');
const titleEnterName = document.querySelector("div.start p.title-enter-name");

// General Click Event Listener
document.querySelector("body").addEventListener('click', event => {
    let target = event.target;

    /* ---- Mobile Toggle ---- */
    if ((target.tagName === "LABEL" && target.classList.contains("toggleLabel")) ||
        (target.tagName === "DIV" && target.classList.contains("mobileToggle"))) {
        let iosToggleInput = document.querySelector("div.toggleWrapper input.mobileToggle.mobileToggle");

        let startBtn = document.querySelector('div.startBtn');

        iosToggleInput.checked = !iosToggleInput.checked;
        if (iosToggleInput.checked) {
            startBtn.classList.add("playOnlineBtn");
        } else {
            startBtn.classList.remove("playOnlineBtn");
        }
    }

});

// Play Button Click Listener
playButton.addEventListener('click', event => {
    let target = event.target;

    let audio = new Audio("/assets/music/SuccessAttack.mp3");
    audio.play();

    if (target.classList.contains("playOnlineBtn"))
    { // Play Online
        const playerUsername = usernameInput.value;
        if (playerUsername.length < 1) {
            usernameInput.focus();
            titleEnterName.classList.add("error-alert")
            return;
        }



    }
    else
    { // Play Offline
        let tID = setTimeout(function () {
            window.location.href = document.location.href + "play";
            window.clearTimeout(tID);		// clear time out.
        }, 1350);
    }

    playButton.classList.remove("unpressed");
    playButton.classList.add("pressed");
});

// Play Button Hover
playButton.addEventListener('mouseover', event => event.target.classList.add("hover"));
playButton.addEventListener('mouseout', event => event.target.classList.remove('hover'));