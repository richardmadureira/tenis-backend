import { Request, Response } from 'express';
import fs from 'fs';

const obterAvatar = async (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = '/tmp/avatars/'.concat(filename);
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  return res.status(404).json({
    message: { severity: 'error', content: 'Avatar não encontrado para o identificador de tenista informado' }
  });
};

export default {
  obterAvatar
};
