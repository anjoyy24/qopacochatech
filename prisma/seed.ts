import { prisma } from '../src/lib/prisma';
import bcryptjs from 'bcryptjs';

async function main() {
  console.log('🌱 Iniciando seed de base de datos...');

  try {
    // Crear usuario de prueba
    const hashedPassword = await bcryptjs.hash('Test123!', 10);

    const user = await prisma.usuario.upsert({
      where: { email: 'test@ecocity.com' },
      update: {}, // No actualizar si ya existe
      create: {
        email: 'test@ecocity.com',
        nombre: 'Usuario Test',
        passwordHash: hashedPassword,
      },
    });

    console.log('✅ Usuario de prueba creado:', user.email);

    // Crear algunos contenedores de ejemplo en Cochabamba
    const contenedores = [
      {
        lat: -17.3895,
        lng: -66.1568,
        direccion: 'Av. Oquendo #234',
        estado: 'disponible' as const,
        nivelLlenado: 30,
      },
      {
        lat: -17.3925,
        lng: -66.1545,
        direccion: 'C. Nataniel Aguirre #445',
        estado: 'lleno' as const,
        nivelLlenado: 95,
      },
      {
        lat: -17.3865,
        lng: -66.1590,
        direccion: 'Av. América #789',
        estado: 'disponible' as const,
        nivelLlenado: 45,
      },
      {
        lat: -17.3950,
        lng: -66.1520,
        direccion: 'Plaza Colón',
        estado: 'disponible' as const,
        nivelLlenado: 20,
      },
    ];

    for (const contenedor of contenedores) {
      await prisma.contenedor.upsert({
        where: { id: `contenedor-${contenedor.lat}-${contenedor.lng}`.replace(/\./g, '_') },
        update: {},
        create: {
          id: `contenedor-${contenedor.lat}-${contenedor.lng}`.replace(/\./g, '_'),
          ...contenedor,
        },
      });
    }

    console.log('✅ Contenedores de ejemplo creados');

    console.log('🎉 Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error durante seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
