import { startServer } from 'graphql-language-service-server'

(async () => {
  try {
    await startServer({
      method: 'node',
    });
  } catch (err) {
    console.error(err);
  }
})();
