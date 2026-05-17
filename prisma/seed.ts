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
    console.log('📧 Email: test@ecocity.com');
    console.log('🔑 Contraseña: Test123!');
    console.log('🎉 Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error durante seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();

