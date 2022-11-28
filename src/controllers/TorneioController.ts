import { Torneio } from '@prisma/client';
import { Request, Response } from 'express';
import { IdParam, Page, PageQueryParams } from '../models';

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

const findAll = async (
  req: Request<IdParam, Page<Torneio>, Torneio, PageQueryParams>,
  res: Response<Page<Torneio>>
) => {
  logger.debug('Pesquisando lista de temoradas');
  const { nome, horarioPrevisto, horarioInicio, horarioTermino } = req.body;
  const { page, size } = req.query;
  const where = {
    nome: {
      contains: nome ?? undefined
    },
    horarioInicio: {
      equals: horarioInicio ?? undefined
    },
    horarioTermino: {
      equals: horarioTermino ?? undefined
    },
    horarioPrevisto: {
      equals: horarioPrevisto ?? undefined
    }
  };
  const content = await prisma.torneio.findMany({
    where,
    skip: Number(page * size),
    take: Number(size),
    orderBy: {
      horarioInicio: 'desc'
    }
  });
  const totalElements = await prisma.torneio.count({ where });
  const pageCount = Math.ceil(totalElements / size);
  return res.json({ content, totalElements, pageCount });
};

const save = async (req: Request<void, Torneio, Torneio>, res: Response<Torneio>) => {
  const { nome, horarioPrevisto, horarioInicio, horarioTermino } = req.body;
  logger.debug('Salvando novo torneio');
  const torneio = await prisma.torneio.create({
    data: {
      nome,
      horarioPrevisto,
      horarioInicio,
      horarioTermino
    }
  });
  return res.json(torneio).status(201);
};

const update = async (req: Request<IdParam, Torneio, Torneio>, res: Response<Torneio>) => {
  logger.debug('Atualizando torneio de id %s', req.params.id);
  const { id } = req.params;
  const { nome, horarioPrevisto, horarioInicio, horarioTermino } = req.body;
  const torneioAtualizada = await prisma.torneio.update({
    data: {
      nome,
      horarioPrevisto,
      horarioInicio,
      horarioTermino
    },
    where: { id }
  });
  return res.json(torneioAtualizada);
};
const deleteById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Excluindo torneio de id %s', req.params.id);
  const { id } = req.params;
  const torneio = await prisma.torneio.findUnique({ where: { id } });
  if (torneio) {
    await prisma.torneio.delete({ where: { id } });
    return res.status(204).end();
  }
  return res.status(304).end();
};

export default {
  findById,
  findAll,
  save,
  update,
  deleteById
};
