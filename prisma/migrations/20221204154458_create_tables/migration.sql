-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('Masculino', 'Feminino');

-- CreateEnum
CREATE TYPE "TipoPonto" AS ENUM ('QUINZE', 'TRINTA', 'QUARENTA', 'GAME');

-- CreateEnum
CREATE TYPE "TipoPartida" AS ENUM ('SIMPLES_MASCULINA', 'SIMPLES_FEMININA', 'DUPLAS_MASCULINA', 'DUPLAS_FEMININA', 'DUPLAS_MISTA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temporadas" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "horario_inicio" TIMESTAMP(3) NOT NULL,
    "horario_termino" TIMESTAMP(3) NOT NULL,
    "ativa" BOOLEAN NOT NULL,
    "ano" INTEGER NOT NULL,

    CONSTRAINT "temporadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desafios" (
    "id" TEXT NOT NULL,
    "tipo_partida" "TipoPartida" NOT NULL,
    "id_tenista_desafiante1" TEXT NOT NULL,
    "id_tenista_desafiante2" TEXT,
    "id_tenista_desafiado1" TEXT NOT NULL,
    "id_tenista_desafiado2" TEXT,
    "horario_previsto" TIMESTAMP(3) NOT NULL,
    "horario_inicio" TIMESTAMP(3),
    "horario_termino" TIMESTAMP(3),

    CONSTRAINT "desafios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rankings" (
    "id" TEXT NOT NULL,
    "posicao" INTEGER NOT NULL,
    "id_tenista" TEXT NOT NULL,
    "total_desafios_realizados" INTEGER NOT NULL,
    "total_desafios_recebidos" INTEGER NOT NULL,
    "total_desafios_vencidos" INTEGER NOT NULL,
    "total_desafios_perdidos" INTEGER NOT NULL,
    "id_temporada" TEXT NOT NULL,

    CONSTRAINT "rankings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "torneios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "horario_previsto" TIMESTAMP(3) NOT NULL,
    "horario_inicio" TIMESTAMP(3),
    "horario_termino" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "torneios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenistas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "avatar_url" TEXT NOT NULL,

    CONSTRAINT "tenistas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partidas" (
    "id" TEXT NOT NULL,
    "id_torneio" TEXT NOT NULL,
    "tipo_partida" INTEGER NOT NULL,
    "id_tenista1" TEXT NOT NULL,
    "id_tenista2" TEXT NOT NULL,
    "horario_inicio" TIMESTAMP(3),
    "horario_termino" TIMESTAMP(3),

    CONSTRAINT "partidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sets" (
    "id" TEXT NOT NULL,
    "id_partida" TEXT NOT NULL,
    "horario_inicio" TIMESTAMP(3),
    "horario_termino" TIMESTAMP(3),

    CONSTRAINT "sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "id_set" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pontos" (
    "id" TEXT NOT NULL,
    "tipo_ponto" "TipoPonto" NOT NULL,
    "id_tenista_vencedor" TEXT NOT NULL,
    "id_game" TEXT NOT NULL,

    CONSTRAINT "pontos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "desafios" ADD CONSTRAINT "desafios_id_tenista_desafiante1_fkey" FOREIGN KEY ("id_tenista_desafiante1") REFERENCES "tenistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desafios" ADD CONSTRAINT "desafios_id_tenista_desafiante2_fkey" FOREIGN KEY ("id_tenista_desafiante2") REFERENCES "tenistas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desafios" ADD CONSTRAINT "desafios_id_tenista_desafiado1_fkey" FOREIGN KEY ("id_tenista_desafiado1") REFERENCES "tenistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desafios" ADD CONSTRAINT "desafios_id_tenista_desafiado2_fkey" FOREIGN KEY ("id_tenista_desafiado2") REFERENCES "tenistas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_id_tenista_fkey" FOREIGN KEY ("id_tenista") REFERENCES "tenistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_id_temporada_fkey" FOREIGN KEY ("id_temporada") REFERENCES "temporadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_id_torneio_fkey" FOREIGN KEY ("id_torneio") REFERENCES "torneios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_id_tenista1_fkey" FOREIGN KEY ("id_tenista1") REFERENCES "tenistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_id_tenista2_fkey" FOREIGN KEY ("id_tenista2") REFERENCES "tenistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sets" ADD CONSTRAINT "sets_id_partida_fkey" FOREIGN KEY ("id_partida") REFERENCES "partidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_id_set_fkey" FOREIGN KEY ("id_set") REFERENCES "sets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pontos" ADD CONSTRAINT "pontos_id_game_fkey" FOREIGN KEY ("id_game") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pontos" ADD CONSTRAINT "pontos_id_tenista_vencedor_fkey" FOREIGN KEY ("id_tenista_vencedor") REFERENCES "tenistas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
