
// console.log(document.location.href)
document.querySelector('button.play-offline').addEventListener('click', event => {
    let audio = new Audio("/assets/music/SuccessAttack.mp3");
    audio.play();
    let tID = setTimeout(function () {
        window.location.href = document.location.href + "play";
        window.clearTimeout(tID);		// clear time out.
    }, 1350);

    document.querySelector(".startBtn").classList.remove("unpressed");
    document.querySelector(".startBtn").classList.add("pressed");

});

document.querySelector('button.play-online').addEventListener('click', event => {

});