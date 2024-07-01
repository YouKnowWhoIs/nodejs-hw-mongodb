import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './contacts/index.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirNotExists(TEMP_UPLOAD_DIR);
  await createDirNotExists(UPLOAD_DIR);

  setupServer();
};

void bootstrap();
