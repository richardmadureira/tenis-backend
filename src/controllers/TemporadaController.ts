import { Temporada } from '@prisma/client';
import { Request, Response } from 'express';
import { IdParam, Page, PageQueryParams } from '../models';

import logger from '../utils/logger';
import prisma from '../utils/prisma-client';

const findById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Pesquisando temporada de id %s', req.params.id);
  const { id } = req.params;
  const temporada = await prisma.temporada.findUnique({
    where: {
      id
    }
  });
  if (temporada) {
    return res.json(temporada);
  }
  return res.status(304).end();
};

const findAll = async (
  req: Request<IdParam, Page<Temporada>, Temporada, PageQueryParams>,
  res: Response<Page<Temporada>>
) => {
  logger.debug('Pesquisando lista de temoradas');
  const { descricao, horarioInicio, horarioTermino } = req.body;
  const { page, size } = req.query;
  const where = {
    descricao: {
      contains: descricao ?? undefined
    },
    horarioInicio: {
      equals: horarioInicio ?? undefined
    },
    horarioTermino: {
      equals: horarioTermino ?? undefined
    }
  };
  const content = await prisma.temporada.findMany({
    where,
    skip: Number(page * size),
    take: Number(size),
    orderBy: {
      horarioInicio: 'desc'
    }
  });
  const totalElements = await prisma.temporada.count({ where });
  const pageCount = Math.ceil(totalElements / size);
  return res.json({ content, totalElements, pageCount });
};

const save = async (req: Request<void, Temporada, Temporada>, res: Response<Temporada>) => {
  const { descricao, horarioInicio, horarioTermino } = req.body;
  logger.debug('Salvando novo temporada');
  const temporada = await prisma.temporada.create({
    data: {
      descricao,
      horarioInicio,
      horarioTermino
    }
  });
  return res.json(temporada).status(201);
};

const update = async (req: Request<IdParam, Temporada, Temporada>, res: Response<Temporada>) => {
  logger.debug('Atualizando temporada de id %s', req.params.id);
  const { id } = req.params;
  const { descricao, horarioInicio, horarioTermino } = req.body;
  const temporadaAtualizada = await prisma.temporada.update({
    data: {
      descricao,
      horarioInicio,
      horarioTermino
    },
    where: { id }
  });
  return res.json(temporadaAtualizada);
};
const deleteById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Excluindo temporada de id %s', req.params.id);
  const { id } = req.params;
  const temporada = await prisma.temporada.findUnique({ where: { id } });
  if (temporada) {
    await prisma.temporada.delete({ where: { id } });
  }
  return res.status(204).end();
};

export default {
  findById,
  findAll,
  save,
  update,
  deleteById
};