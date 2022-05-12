export const sounds = {
  theme: {
    path: "/assets/music/Fluffing-a-Duck.mp3",
    audioElement: document.querySelector("audio#bgMusic")
  },
  winRound: {
    path: "/assets/music/win-round-sound.wav",
    audioElement: document.querySelector("audio#winRound")
  },
  winGame: {
    path: "/assets/music/winning-game.wav",
    audioElement: document.querySelector("audio#winGame")
  },
  loseGame: {
    path: "/assets/music/lose-game-moan.wav",
    audioElement: document.querySelector("audio#loseGame")
  },
  drawGame: {
    path: "/assets/music/draw-game.wav",
    audioElement: document.querySelector("audio#drawGame")
  },
  loseRound: {
    path: "/assets/music/click-error.wav",
    audioElement: document.querySelector("audio#loseRound")
  },
  forkChecked: {
    path: "/assets/music/Attack-[AudioTrimmer.com]-[AudioTrimmer.com].mp3"
  },
  shieldClicked: {
    path: "/assets/music/mixkit-player-jumping-in-a-video-game-2043.wav"
  },
  denyTheClick: {
    path: "/assets/music/mixkit-neutral-bot-pinbal-tone-3137.wav"
  },
  putInTheTally: {
    path: "/assets/music/putting-in-tally.wav"
  },
  doneChecked: {
    path: "/assets/music/SuccessAttack.mp3"
  }
}

export async function playSound(sound) {
  let audio;
  audio = new Audio(sound.path);
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

