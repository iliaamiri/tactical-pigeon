const roundTitle = document.querySelector('div.round-title');

function changeRoundTitle(roundCounter) {
  roundTitle.innerHTML = `<span>Round ${roundCounter}</span>`;
}

export default changeRoundTitle;