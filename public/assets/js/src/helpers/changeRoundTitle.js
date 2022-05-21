const roundTitle = document.querySelector('div.round-title');

function changeRoundTitle(roundCounter) {
  roundTitle.innerHTML = `<span>Round ${roundCounter}</span>`;
  roundTitle.classList.add("animate__bounceInDown");
}

export default changeRoundTitle;