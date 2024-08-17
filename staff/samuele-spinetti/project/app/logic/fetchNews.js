import { errors } from '../../com/index.js'

const { SystemError } = errors

const API_KEY = 'ab3f0ce634d24df5808dc56050855a54'
const BASE_URL = 'https://newsapi.org/v2'

export default function fetchNews(query = 'latest', pageSize = 10) {
  const url = `${BASE_URL}/everything?q=${query}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  return fetch(url)
    .catch(error => { throw new SystemError(error.message) })
    .then((response) => {
      const { status } = response

      if (status === 200)
        return response.json()
          .then(data => data.articles)

      return response.json()
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}