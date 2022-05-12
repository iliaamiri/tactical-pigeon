const roundTitle = document.querySelector('div.round-title');

function changeRoundTitle(roundCounter) {
  roundTitle.innerHTML = `<span>Round ${roundCounter}</span>`;
<<<<<<< HEAD
}
=======
  roundTitle.classList.add("animate__bounceInDown");
};
>>>>>>> team-multiplayer

export default changeRoundTitle;