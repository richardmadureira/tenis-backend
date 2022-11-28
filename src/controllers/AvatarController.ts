import { Request, Response } from 'express';
import fs from 'fs';

import logger from '../utils/logger';

const obterAvatar = async (req: Request, res: Response) => {
  logger.debug(`Obtendo avatar ${req.params.filename}`);
  const { filename } = req.params;
  const filePath = process.env.DIR_AVATARS.concat('/').concat(filename);
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  const msg = 'Avatar não encontrado para o identificador de tenista informado';
  logger.debug(msg);
  return res.status(404).json({
    message: { severity: 'error', content: msg }
  });
};

export default {
  obterAvatar
};
