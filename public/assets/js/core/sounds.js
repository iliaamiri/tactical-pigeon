export const soundsPath = {
    theme: "/assets/music/Fluffing-a-Duck.mp3",
    forkChecked: "/assets/music/Attack-[AudioTrimmer.com]-[AudioTrimmer.com].mp3",
    shieldClicked: "/assets/music/mixkit-player-jumping-in-a-video-game-2043.wav",
    denyTheClick: "/assets/music/mixkit-neutral-bot-pinbal-tone-3137.wav",
    putInTheTally: "/assets/music/putting-in-tally.wav",
    successAttack: "/assets/music/SuccessAttack.mp3"
}

export async function playSound(soundPath) {
    let audio = new Audio(soundPath);
    return await audio.play();
}