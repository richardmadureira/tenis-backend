import { Request, Response } from 'express';
import { IdParam } from '../models';

import logger from '../utils/logger';
import prisma from '../utils/prisma-client';

const findById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Pesquisando torneio de id %s', req.params.id);
  const { id } = req.params;
  const torneio = await prisma.torneio.findUnique({
    where: {
      id
    }
  });
  if (torneio) {
    return res.json(torneio);
  }
  return res.status(304).end();
};

const findAll = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Pesquisando lista de torneios');
  return res.json({});
};

const save = async (req: Request, res: Response) => {
  logger.debug('Salvando novo torneio');
  return res.json({});
};

const update = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Atualizando torneio de id %s', req.params.id);
  return res.json({});
};
const deleteById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Excluindo torneio de id %s', req.params.id);
  return res.json({});
};

export default {
  findById,
  findAll,
  save,
  update,
  deleteById
};
