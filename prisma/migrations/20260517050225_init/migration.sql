-- CreateEnum
CREATE TYPE "TipoContenedor" AS ENUM ('ORGANICO', 'RECICLABLE', 'GENERAL', 'VIDRIO', 'PELIGROSO');

-- CreateEnum
CREATE TYPE "EstadoContenedor" AS ENUM ('VACIO', 'MEDIO', 'LLENO');

-- CreateEnum
CREATE TYPE "EstadoCamion" AS ENUM ('EN_RUTA', 'DISPONIBLE', 'MANTENIMIENTO');

-- CreateEnum
CREATE TYPE "TipoResiduo" AS ENUM ('ORGANICO', 'PLASTICO', 'VIDRIO', 'PAPEL', 'METAL', 'PELIGROSO', 'OTRO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contenedores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "TipoContenedor" NOT NULL,
    "estado" "EstadoContenedor" NOT NULL DEFAULT 'VACIO',
    "nivelLlenado" INTEGER NOT NULL DEFAULT 0,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "direccion" TEXT,
    "esSoterrado" BOOLEAN NOT NULL DEFAULT false,
    "qrCode" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "ultimaLectura" TIMESTAMP(3),

    CONSTRAINT "contenedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "puntos_reciclaje" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "direccion" TEXT,
    "horario" TEXT,
    "telefono" TEXT,
    "tiposAceptados" "TipoResiduo"[],
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "puntos_reciclaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "camiones" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "nombre" TEXT,
    "estado" "EstadoCamion" NOT NULL DEFAULT 'DISPONIBLE',
    "latActual" DOUBLE PRECISION,
    "lngActual" DOUBLE PRECISION,
    "conductor" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "camiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rutas_camion" (
    "id" SERIAL NOT NULL,
    "camionId" INTEGER NOT NULL,
    "descripcion" TEXT,
    "puntoInicio" TEXT,
    "puntoFin" TEXT,
    "horaInicio" TEXT,
    "horaFin" TEXT,
    "dias" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "rutas_camion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paradas_ruta" (
    "id" SERIAL NOT NULL,
    "rutaId" INTEGER NOT NULL,
    "orden" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "horaEstimada" TEXT,

    CONSTRAINT "paradas_ruta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias_servicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "icono" TEXT,
    "color" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "categorias_servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "url" TEXT,
    "categoriaId" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contenedores_qrCode_key" ON "contenedores"("qrCode");

-- CreateIndex
CREATE UNIQUE INDEX "camiones_placa_key" ON "camiones"("placa");

-- AddForeignKey
ALTER TABLE "rutas_camion" ADD CONSTRAINT "rutas_camion_camionId_fkey" FOREIGN KEY ("camionId") REFERENCES "camiones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paradas_ruta" ADD CONSTRAINT "paradas_ruta_rutaId_fkey" FOREIGN KEY ("rutaId") REFERENCES "rutas_camion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresas" ADD CONSTRAINT "empresas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias_servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
