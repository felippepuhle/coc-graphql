import { startServer } from 'graphql-language-service-server'

const start = () => {
  startServer({
    method: 'node',
  })
    .then(() => {})
    .catch((err) => {
      console.error(err)
    })
}

start()
