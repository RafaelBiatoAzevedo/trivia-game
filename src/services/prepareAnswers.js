const randomArray = (array) => {
  array.forEach((item, index) => {
    const numberRandom = Math.floor(Math.random() * array.length);
    const aux = item;
    array[index] = array[numberRandom];
    array[numberRandom] = aux;
  });
  return array;
};

export const prepareAnswers = (asks) => {
  asks.forEach((ask) => {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = ask;
    const allAnswers = [];
    allAnswers.push({ answer: correctAnswer, index: 0 });
    incorrectAnswers.forEach((item, index) =>
      allAnswers.push({ answer: item, index })
    );
    ask.results = randomArray(allAnswers);
  });
  return asks;
};

export const decodeHtml = (string) => {
  return string.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
};
