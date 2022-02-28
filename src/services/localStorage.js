export function createRanking() {
  const ranking = JSON.parse(localStorage.getItem('@TriviaGame:ranking'));
  if (!ranking) localStorage.setItem('@TriviaGame:ranking', JSON.stringify([]));
}

export function addPlayerInRanking(gravatarEmail, player) {
  const ranking = JSON.parse(localStorage.getItem('@TriviaGame:ranking'));
  ranking.push(player);
  ranking.sort((playerOne, playerTWO) => playerTWO.score - playerOne.score);
  localStorage.setItem('@TriviaGame:ranking', JSON.stringify(ranking));
}
