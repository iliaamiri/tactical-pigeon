document.querySelector('body').addEventListener('click', async event => {
  event.preventDefault();
});

document.querySelector('form.gameMoveForm button').addEventListener('click', async event => {
  const target = event.target;
  const theForm = target.closest('form');
  const moveValue = theForm.querySelector('#move').value;

  const responseFromApi = await axios.post('/api/games/submitMove',
      { move: moveValue }
  );

  const resultDiv = document.querySelector('div#resultOfMatch');

  const result = responseFromApi.data;
  if (result.status) {
      resultDiv.innerHTML = `<h2>You ${result.result}!</h2>`;
  } else {
      console.log(result);
  }
});