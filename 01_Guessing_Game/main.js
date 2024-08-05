function guessNumber() {
  let playerGuess;
  const numberToGuess = Math.ceil(Math.random() * 10);

  prompt('Devinez le nombre entre 1 et 10 inclus.');

  while (playerGuess != numberToGuess) {
    playerGuess = prompt('Echec! Essayer à nouveau de devinez le nombre (entre 1 et 10 inclus).')
  }

  alert(`Félicitations! Le nombre était ${numberToGuess}!`);
}

guessNumber();