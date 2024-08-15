const API_KEY = 'ab3f0ce634d24df5808dc56050855a54';
const BASE_URL = 'https://newsapi.org/v2';

export default function fetchNews(query = 'latest', pageSize = 10) {
  const url = `${BASE_URL}/everything?q=${query}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching news: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.articles;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}