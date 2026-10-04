import { createApiServer } from './app.js';
import { pool } from './db.js';

const port = Number(process.env.API_PORT || 3000);
const server = createApiServer();

server.listen(port, () => {
  console.info(`SkillSpace API listening on port ${port}`);
});

async function shutdown(signal) {
  console.info(`Received ${signal}; shutting down API`);
  server.close(async (error) => {
    await pool.end();
    if (error) {
      console.error('API shutdown failed', error);
      process.exitCode = 1;
    }
  });
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));
