const Countdown = document.querySelector('div.countdown');

// let timeleft = 3;

async function roundCountdown() {
  // let index = 4;
  // let countdownArr = [null, 'Go!', '1', '2', '3'];

  // (function runCount() {
  //   if (index === 0) {
  //     return;
  //   } else {
  //     Countdown.innerHTML = countdownArr[index];
  //     setTimeout(() => {
  //       index--;
  //       runCount();
  //     }, 500);
  //   }
  // })();

  // function runCount(time, _countdownArr, cb) {
  //   const countdownArr = [..._countdownArr]
  //   const item = countdownArr.shift();
  //   if (countdownArr.length === 0) {
  //     return;
  //   }
  //   cb(item)
  //   requestAnimationFrame()
  //   setTimeout(() => {
  //     window.requestAnimationFrame(() => runCount(countdownArr))
  //   }, time);
  // }
  // runCount(500, ['Go!', '1', '2', '3'], (item => {
  //   Countdown.innerHTML = item
  // }))


  // async function wait(time) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(resolve, time)
  //   })
  // }

  // for (let item of ['3', '2', '1', 'Go!']) {
  //   Countdown.innerHTML = item
  //   await wait(500)
  // }


  // async function wait(time) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(resolve, time)
  //   })
  // }

  // for (let item of ['3', '2', '1', 'Go!']) {
  //   Countdown.innerHTML = item
  //   await wait(500)
  // }

  async function wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time)
    })
  }

  for (let item of ['ready', 'set', 'go']) {
    Countdown.classList.add(item)
    await wait(500)
  }

  for (let item of ['ready', 'set', 'go']) {
    Countdown.classList.remove(item)
  }

};

export default roundCountdown;