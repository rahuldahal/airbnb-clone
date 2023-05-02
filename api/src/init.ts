import app from './app';
import db from './db';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

(async function init() {
  try {
    await db();
    logger.info('Connected to the database.');
    app.listen(PORT, () =>
      logger.info(`The server is listening on post: ${PORT}`)
    );
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
})();
