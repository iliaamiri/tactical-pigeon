const Countdown = document.querySelector('div.countdown');
const countdownOverlayComponent = document.querySelector("div.countdown-overlay");

async function roundCountdown() {

  async function wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    })
  }

  for (let item of ['ready', 'set', 'go']) {
    Countdown.classList.add(item);
    await wait(500);
  }

  for (let item of ['ready', 'set', 'go']) {
    Countdown.classList.remove(item);
  }

}

export default roundCountdown;