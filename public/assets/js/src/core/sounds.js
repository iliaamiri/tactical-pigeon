export const sounds = {
  theme: {
    path: "/assets/music/Fluffing-a-Duck.mp3",
    audioElement: document.querySelector("audio#bgMusic"),
    soundLevel: 0.5
  },
  winRound: {
    path: "/assets/music/win-round-sound.mp3",
    audioElement: document.querySelector("audio#winRound"),
    soundLevel: 0.5
  },
  winGame: {
    path: "/assets/music/winning-game.mp3",
    audioElement: document.querySelector("audio#winGame"),
    soundLevel: 0.5
  },
  loseGame: {
    path: "/assets/music/lose-game-moan.mp3",
    audioElement: document.querySelector("audio#loseGame"),
    soundLevel: 0.5
  },
  drawGame: {
    path: "/assets/music/draw-game.mp3",
    audioElement: document.querySelector("audio#drawGame"),
    soundLevel: 0.5
  },
  loseRound: {
    path: "/assets/music/click-error.mp3",
    audioElement: document.querySelector("audio#loseRound"),
    soundLevel: 0.5
  },
  forkChecked: {
    path: "/assets/music/fork-click.mp3",
    soundLevel: 0.5
  },
  shieldClicked: {
    path: "/assets/music/mixkit-player-jumping-in-a-video-game-2043.mp3",
    soundLevel: 0.5
  },
  denyTheClick: {
    path: "/assets/music/mixkit-neutral-bot-pinbal-tone-3137.mp3",
    soundLevel: 0.5
  },
  putInTheTally: {
    path: "/assets/music/putting-in-tally.mp3",
    soundLevel: 0.5
  },
  doneChecked: {
    path: "/assets/music/SuccessAttack.mp3",
    soundLevel: 0.5
  },
  softClick:{
    path: "/assets/music/softclick.mp3",
    soundLevel: 0.5
  }, 
  buttonClick:{
    path: "/assets/music/buttonclick.mp3",
    soundLevel: 0.5
  }, 
  multiplayer:{
    path:"/assets/music/multiplayer.mp3",
    soundLevel:0.5
  },
  singleplayer:{
    path:"/assets/music/singleplayer.mp3",
    soundLevel:0.5
  }
}

export async function playSound(sound) {
  let audio;
  audio = new Audio(sound.path);
  audio.volume = sound.soundLevel;
  sound.audio = audio;
  if (sound.mute === undefined || sound.mute === false) {
    await audio.play();
  }
}

export const soundMuteEvent = new CustomEvent('soundMuteToggle');

document.addEventListener('soundMuteToggle', event => {
  let detail = event.detail;
  if (!detail) {
    console.debug("no details!");
    return;
  }
  let soundsToMute = detail.soundsToMute;
  soundsToMute.map(sound => {
    if (sound.mute !== undefined)
      sound.mute = !sound.mute;
    else
      sound.mute = true;

    if (sound.audioElement) {
      sound.audioElement.muted = !sound.audioElement.muted;
    }

    if (sound.audio) {
      sound.audio.mute = !sound.audio.mute;
      if (sound.mute)
        sound.audio.pause();
    }
  });
});

