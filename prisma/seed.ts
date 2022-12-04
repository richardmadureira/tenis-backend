import { Sexo, TipoPartida } from '@prisma/client';
import prisma from '../src/utils/prisma-client';

async function main() {
  await prisma.temporada.createMany({
    data: [
      {
        descricao: 'Temporada de Desafios 2010',
        horarioInicio: '2010-01-01T00:00:00.000Z',
        horarioTermino: '2010-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2010
      },
      {
        descricao: 'Temporada de Desafios 2011',
        horarioInicio: '2011-01-01T00:00:00.000Z',
        horarioTermino: '2011-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2011
      },
      {
        descricao: 'Temporada de Desafios 2012',
        horarioInicio: '2012-01-01T00:00:00.000Z',
        horarioTermino: '2012-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2012
      },
      {
        descricao: 'Temporada de Desafios 2013',
        horarioInicio: '2013-01-01T00:00:00.000Z',
        horarioTermino: '2013-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2013
      },
      {
        descricao: 'Temporada de Desafios 2014',
        horarioInicio: '2014-01-01T00:00:00.000Z',
        horarioTermino: '2014-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2014
      },
      {
        descricao: 'Temporada de Desafios 2015',
        horarioInicio: '2015-01-01T00:00:00.000Z',
        horarioTermino: '2015-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2015
      },
      {
        descricao: 'Temporada de Desafios 2016',
        horarioInicio: '2016-01-01T00:00:00.000Z',
        horarioTermino: '2016-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2016
      },
      {
        descricao: 'Temporada de Desafios 2017',
        horarioInicio: '2017-01-01T00:00:00.000Z',
        horarioTermino: '2017-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2017
      },
      {
        descricao: 'Temporada de Desafios 2018',
        horarioInicio: '2018-01-01T00:00:00.000Z',
        horarioTermino: '2018-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2018
      },
      {
        descricao: 'Temporada de Desafios 2019',
        horarioInicio: '2019-01-01T00:00:00.000Z',
        horarioTermino: '2019-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2019
      },
      {
        descricao: 'Temporada de Desafios 2020',
        horarioInicio: '2020-01-01T00:00:00.000Z',
        horarioTermino: '2020-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2020
      },
      {
        descricao: 'Temporada de Desafios 2021',
        horarioInicio: '2021-01-01T00:00:00.000Z',
        horarioTermino: '2021-12-31T23:59:59.999Z',
        ativa: false,
        ano: 2021
      },
      {
        descricao: 'Temporada de Desafios 2022',
        horarioInicio: '2022-01-01T00:00:00.000Z',
        horarioTermino: '2022-12-31T23:59:59.999Z',
        ativa: true,
        ano: 2022
      }
    ]
  });

  const tenistaEdymar = await prisma.tenista.create({
    data: {
      nome: 'Edymar Patryk Madureira',
      email: 'edymarpatryk@gmail.com',
      sexo: Sexo.Masculino,
      dataNascimento: new Date(1980, 11, 12),
      avatarUrl: 'https://robohash.org/edymar.png'
    }
  });

  const tenistaRichard = await prisma.tenista.create({
    data: {
      nome: 'Richard Mendes Madureira',
      email: 'richard.madureira@gmail.com',
      sexo: Sexo.Masculino,
      dataNascimento: new Date(1980, 6, 10),
      avatarUrl: 'https://robohash.org/richard.png'
    }
  });

  await prisma.tenista.createMany({
    data: [
      {
        nome: 'Cíntia Madureira Orth',
        email: 'cintia.orth@gmail.com',
        sexo: Sexo.Feminino,
        dataNascimento: new Date(1978, 9, 2),
        avatarUrl: 'https://robohash.org/cintia.png'
      },
      {
        nome: 'Juciara Mendes Madureira',
        email: 'neguinhamm@gmail.com',
        sexo: Sexo.Feminino,
        dataNascimento: new Date(1985, 10, 22),
        avatarUrl: 'https://robohash.org/juciara.png'
      },
      {
        nome: 'Nilton Madureira Peres',
        email: 'nilton.madureira@gmail.com',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(1950, 6, 8),
        avatarUrl: 'https://robohash.org/nilton.png'
      },
      {
        nome: 'Elza Mendes Madureira',
        email: 'elza.madureira53@gmail.com',
        sexo: Sexo.Feminino,
        dataNascimento: new Date(1953, 7, 17),
        avatarUrl: 'https://robohash.org/elza.png'
      },
      {
        nome: 'Gabriel Madureira Orth',
        email: 'gabriel.orth@gmail.com',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: 'https://robohash.org/gabriel.png'
      },
      {
        nome: 'Arthur Madureira Orth',
        email: 'arthur.orth@gmail.com',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: 'https://robohash.org/arthur.png'
      },
      {
        nome: 'Leonardo Orth',
        email: 'leonardo.orth@gmail.com',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: 'https://robohash.org/leonardo.png'
      },
      {
        nome: 'Luiz Otávio Evangelhista Madureira',
        email: 'luizotaviomadureira@gmail.com',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: 'https://robohash.org/.png'
      },
      {
        nome: 'Davi Evangelhista Madureira',
        email: 'davievangelhistamadureira@gmail.com',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: 'https://robohash.org/.png'
      },
      {
        nome: 'Isabela Reis Evangelhista',
        email: 'isabelareisevangelhista@gmail.com',
        sexo: Sexo.Feminino,
        dataNascimento: new Date(),
        avatarUrl: 'https://robohash.org/.png'
      },
      {
        nome: 'Nome do Tenista 1',
        email: 'nome.tenista1',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista1.png`
      },
      {
        nome: 'Nome do Tenista 2',
        email: 'nome.tenista2',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista2.png`
      },
      {
        nome: 'Nome do Tenista 3',
        email: 'nome.tenista3',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista3.png`
      },
      {
        nome: 'Nome do Tenista 4',
        email: 'nome.tenista4',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista4.png`
      },
      {
        nome: 'Nome do Tenista 5',
        email: 'nome.tenista5',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista5.png`
      },
      {
        nome: 'Nome do Tenista 6',
        email: 'nome.tenista6',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista6.png`
      },
      {
        nome: 'Nome do Tenista 7',
        email: 'nome.tenista7',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista7.png`
      },
      {
        nome: 'Nome do Tenista 8',
        email: 'nome.tenista8',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista8.png`
      },
      {
        nome: 'Nome do Tenista 9',
        email: 'nome.tenista9',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista9.png`
      },
      {
        nome: 'Nome do Tenista 10',
        email: 'nome.tenista10',
        sexo: Sexo.Masculino,
        dataNascimento: new Date(),
        avatarUrl: `https://robohash.org/nome-tenista10.png`
      }
    ]
  });

  await prisma.desafio.create({
    data: {
      tipoPartida: TipoPartida.SIMPLES_MASCULINA,
      horarioPrevisto: new Date(),
      tenistaDesafiante1: {
        connect: {
          id: tenistaEdymar.id
        }
      },
      tenistaDesafiado1: {
        connect: {
          id: tenistaRichard.id
        }
      }
    }
  });
}

main();
