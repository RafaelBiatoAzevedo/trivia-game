import md5 from 'crypto-js/md5';

export const getToken = async () => {
  const requestFetch = await fetch('https://opentdb.com/api_token.php?command=request');
  const requestJSON = await requestFetch.json();
  return requestJSON;
};

export const getAsks = async (token, settings) => {
  const { category, difficulty, type } = settings;
  let stringCategory = '';
  let stringDifficulty = '';
  let stringType = '';
  if (category !== 'All') stringCategory = `&category=${category}`;
  if (difficulty !== 'All') stringDifficulty = `&difficulty=${difficulty}`;
  if (type !== 'All') stringType = `&type=${type}`;

  const requestFetch = await fetch(`https://opentdb.com/api.php?amount=${settings.number}${stringCategory}${stringDifficulty}${stringType}&token=${token}&Don%27t+forget+that+π+%3D+3.14+%26+doesn%27t+equal+3`);
  const requestJSON = await requestFetch.json();
  return requestJSON;
};

export const getGravatar = async (email) => {
  const emailHash = md5(email).toString();
  const requestFetch = await fetch(`https://www.gravatar.com/avatar/${emailHash}`);
  return requestFetch;
};

export const getCategories = async () => {
  const requestFetch = await fetch('https://opentdb.com/api_category.php');
  const requestJson = await requestFetch.json();
  return requestJson.trivia_categories;
};
