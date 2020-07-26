import { startServer } from 'graphql-language-service-server'

const init = async () => {
  try {
    await startServer({
      method: 'node',
    })
  } catch (err) {
    console.error(err)
  }
}

init()
