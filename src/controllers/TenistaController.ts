import { Request, Response } from 'express';

import { IdParam } from '../models/IdParam';
import logger from '../utils/logger';
import prisma from '../utils/prisma-client';

const findById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Pesquisando tenista de id %s', req.params.id);
  const { id } = req.params;
  const tenista = await prisma.tenista.findUnique({
    where: { id },
  });
  if (tenista) {
    return res.json(tenista);
  }
  return res.status(304).end();
};

export default {
  findById,
};
