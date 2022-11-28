/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tenista } from '@prisma/client';
import { Request, Response } from 'express';
import fs from 'fs';
import { Page, PageQueryParams, IdParam } from '../models';
import logger from '../utils/logger';
import prisma from '../utils/prisma-client';

const findById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Pesquisando tenista de id %s', req.params.id);
  const { id } = req.params;
  const tenista = await prisma.tenista.findUnique({
    where: { id }
  });
  if (tenista) {
    return res.json(tenista);
  }
  return res.status(304).end();
};

const findAll = async (
  req: Request<IdParam, Page<Tenista>, Tenista, PageQueryParams>,
  res: Response<Page<Tenista>>
) => {
  logger.debug('Pesquisando lista de temoradas');
  const { nome, sexo, email, dataNascimento } = req.body;
  const { page, size } = req.query;
  const where = {
    nome: {
      contains: nome ?? undefined
    },
    email: {
      contains: email ?? undefined
    },
    sexo: {
      equals: sexo ?? undefined
    },
    dataNascimento: {
      equals: dataNascimento ?? undefined
    }
  };
  const content = await prisma.tenista.findMany({
    where,
    skip: Number(page * size),
    take: Number(size),
    orderBy: {
      nome: 'asc'
    }
  });
  const totalElements = await prisma.tenista.count({ where });
  const pageCount = Math.ceil(totalElements / size);
  return res.json({ content, totalElements, pageCount });
};

const save = async (req: Request<any, Tenista, Tenista>, res: Response<Tenista>) => {
  const { nome, email, sexo, dataNascimento } = req.body;
  const file = req.file;
  console.log('file', file);
  logger.debug('Salvando novo tenista');
  const tenista = await prisma.tenista.create({
    data: {
      nome,
      email,
      sexo,
      dataNascimento,
      avatarUrl: `https://robohash.org/${nome}.png`
    }
  });
  const fileAvatar = process.env.DIR_AVATARS.concat('/').concat(file?.filename as string);
  if (fs.existsSync(fileAvatar)) {
    const avatarUrl = process.env.URL_AVATARS.replace(':idAvatar', file?.filename as string);
    const tenistaComAvatar = await prisma.tenista.update({
      data: { avatarUrl },
      where: {
        id: tenista.id
      }
    });
    return res.json(tenistaComAvatar).status(201);
  }
  return res.json(tenista).status(201);
};

const update = async (req: Request<any, Tenista, Tenista>, res: Response<Tenista>) => {
  logger.debug('Atualizando tenista de id %s', req.params.id);
  const { id } = req.params;
  const { nome, email, sexo, dataNascimento, avatarUrl } = req.body;
  const tenistaAtualizada = await prisma.tenista.update({
    data: {
      nome,
      email,
      sexo,
      dataNascimento,
      avatarUrl
    },
    where: { id }
  });
  return res.json(tenistaAtualizada);
};

const deleteById = async (req: Request<IdParam>, res: Response) => {
  logger.debug('Excluindo tenista de id %s', req.params.id);
  const { id } = req.params;
  const tenista = await prisma.tenista.findUnique({ where: { id } });
  if (tenista) {
    await prisma.tenista.delete({ where: { id } });
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
