import { Desafio } from '@prisma/client';
import { Request, Response } from 'express';
import { IdParam, Page, PageQueryParams } from '../models';

import logger from '../utils/logger';
import prisma from '../utils/prisma-client';

const findById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Pesquisando desafio de id %s', req.params.id);
  const { id } = req.params;
  const desafio = await prisma.desafio.findUnique({
    where: {
      id
    }
  });
  if (desafio) {
    return res.json(desafio);
  }
  return res.status(304).end();
};

const findAll = async (
  req: Request<IdParam, Page<Desafio>, Desafio, PageQueryParams>,
  res: Response<Page<Desafio>>
) => {
  logger.debug('Pesquisando lista de desafios');
  const {
    horarioPrevisto,
    tipoPartida,
    idTenistaDesafiante1,
    idTenistaDesafiado2,
    idTenistaDesafiado1,
    idTenistaDesafiante2
  } = req.body;
  const { page, size } = req.query;
  const where = {
    tipoPartida: {
      equals: tipoPartida ?? undefined
    },
    horarioPrevisto: {
      equals: horarioPrevisto ?? undefined
    },
    idTenistaDesafiante1: {
      equals: idTenistaDesafiante1 ?? undefined
    },
    idTenistaDesafiante2: {
      equals: idTenistaDesafiante2 ?? undefined
    },

    idTenistaDesafiado1: {
      equals: idTenistaDesafiado1 ?? undefined
    },
    idTenistaDesafiado2: {
      equals: idTenistaDesafiado2 ?? undefined
    }
  };
  const content = await prisma.desafio.findMany({
    where,
    skip: Number(page * size),
    take: Number(size),
    orderBy: {
      horarioInicio: 'desc'
    },
    include: {
      tenistaDesafiado1: true,
      tenistaDesafiado2: true,
      tenistaDesafiante1: true,
      tenistaDesafiante2: true
    }
  });
  const totalElements = await prisma.desafio.count({ where });
  const pageCount = Math.ceil(totalElements / size);
  return res.json({ content, totalElements, pageCount });
};

const save = async (req: Request<void, Desafio, Desafio>, res: Response<Desafio>) => {
  const {
    horarioPrevisto,
    tipoPartida,
    idTenistaDesafiado1,
    idTenistaDesafiado2,
    idTenistaDesafiante1,
    idTenistaDesafiante2
  } = req.body;
  logger.debug('Salvando novo desafio');
  const desafio = await prisma.desafio.create({
    data: {
      idTenistaDesafiado1,
      idTenistaDesafiante1,
      idTenistaDesafiado2,
      idTenistaDesafiante2,
      horarioPrevisto,
      tipoPartida
    }
  });
  return res.json(desafio).status(201);
};

const update = async (req: Request<IdParam, Desafio, Desafio>, res: Response<Desafio>) => {
  logger.debug('Atualizando desafio de id %s', req.params.id);
  const { id } = req.params;
  const {
    horarioPrevisto,
    tipoPartida,
    idTenistaDesafiado1,
    idTenistaDesafiado2,
    idTenistaDesafiante1,
    idTenistaDesafiante2
  } = req.body;
  const desafioAtualizado = await prisma.desafio.update({
    data: {
      idTenistaDesafiado1,
      idTenistaDesafiante1,
      idTenistaDesafiado2,
      idTenistaDesafiante2,
      horarioPrevisto,
      tipoPartida
    },
    where: { id }
  });
  return res.json(desafioAtualizado);
};

const deleteById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Excluindo desafio de id %s', req.params.id);
  const { id } = req.params;
  const desafio = await prisma.desafio.findUnique({ where: { id } });
  if (desafio) {
    await prisma.desafio.delete({ where: { id } });
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
