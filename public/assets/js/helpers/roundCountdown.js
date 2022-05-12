const Countdown = document.querySelector('div.countdown');

// let timeleft = 3;

async function roundCountdown() {
  // let index = 4;
  // let countdownArr = [null, 'Go!', '1', '2', '3'];

  // (function runCount() {
<<<<<<< HEAD
  //     if (index === 0) {
  //         return;
  //     } else {
  //         Countdown.innerHTML = countdownArr[index];
  //         setTimeout(() => {
  //             index--;
  //             runCount();
  //         }, 500);
  //     }
  // })();

  // function runCount(time, _countdownArr, cb) {
  //     const countdownArr = [..._countdownArr]
  //     const item = countdownArr.shift();
  //     if (countdownArr.length === 0) {
  //         return;
  //     }
  //     cb(item)
  //     requestAnimationFrame()
  //     setTimeout(() => {
  //         window.requestAnimationFrame(() => runCount(countdownArr))
  //     }, time);
  // }
  // runCount(500, ['Go!', '1', '2', '3'], (item => {
  //     Countdown.innerHTML = item
=======
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
>>>>>>> team-multiplayer
  // }))


  // async function wait(time) {
<<<<<<< HEAD
  //     return new Promise((resolve, reject) => {
  //         setTimeout(resolve, time)
  //     })
  // }

  // for (let item of ['3', '2', '1', 'Go!']) {
  //     Countdown.innerHTML = item
  //     await wait(500)
=======
  //   return new Promise((resolve, reject) => {
  //     setTimeout(resolve, time)
  //   })
  // }

  // for (let item of ['3', '2', '1', 'Go!']) {
  //   Countdown.innerHTML = item
  //   await wait(500)
>>>>>>> team-multiplayer
  // }


  // async function wait(time) {
<<<<<<< HEAD
  //     return new Promise((resolve, reject) => {
  //         setTimeout(resolve, time)
  //     })
  // }

  // for (let item of ['3', '2', '1', 'Go!']) {
  //     Countdown.innerHTML = item
  //     await wait(500)
=======
  //   return new Promise((resolve, reject) => {
  //     setTimeout(resolve, time)
  //   })
  // }

  // for (let item of ['3', '2', '1', 'Go!']) {
  //   Countdown.innerHTML = item
  //   await wait(500)
>>>>>>> team-multiplayer
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
<<<<<<< HEAD

  for (let item of ['ready', 'set', 'go']) {
    Countdown.classList.remove(item)
  }
=======
>>>>>>> team-multiplayer

  for (let item of ['ready', 'set', 'go']) {
    Countdown.classList.remove(item)
  }

};

export default roundCountdown;