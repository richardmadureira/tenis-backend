import { Sexo } from '@prisma/client';
import prisma from '../src/utils/prisma-client';

async function main() {
  await prisma.tenista.create({
    data: {
      nome: 'Edymar Patryk Madureira',
      email: 'edymarpatryk@gmail.com',
      sexo: Sexo.Masculino,
      dataNascimento: new Date(1980, 11, 12),
      avatarUrl: 'https://robohash.org/edymar.png',
    },
  });

  await prisma.tenista.create({
    data: {
      nome: 'Richard Mendes Madureira',
      email: 'richard.madureira@gmail.com',
      sexo: Sexo.Masculino,
      dataNascimento: new Date(1980, 6, 10),
      avatarUrl: 'https://robohash.org/richard.png',
    },
  });
}

main();
