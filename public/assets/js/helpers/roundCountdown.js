const Countdown = document.querySelector('span.countdown');

let timeleft = 3
function roundCountdown() {
    let timeCount = setInterval(() => {
        if (timeleft <= 0) {
            Countdown.innerHTML = "Go!";
            timeleft = 3
            clearInterval(timeCount);
        } else {
            Countdown.innerHTML = timeleft;
            timeleft--;
        }
    }, 1000);
};

export default roundCountdown;