import { ENV_VARS } from '../contacts/index.js';
import { env } from './env.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileUploadDir.js';

export const saveFile = async (file) => {
  let url;

  if (env(ENV_VARS.IS_CLOUDINARY_ENABLE)) {
    url = await saveFileToCloudinary(file);
  } else {
    url = saveFileToUploadDir(file);
  }

  return url;
};
