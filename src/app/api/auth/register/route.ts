import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, nombre } = await request.json();

    if (!email || !password || !nombre) {
      return NextResponse.json(
        { error: 'Email, contraseña y nombre requeridos' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Crear usuario
    const user = await prisma.usuario.create({
      data: {
        email,
        nombre,
        passwordHash: hashedPassword,
      },
    });

    // Generar JWT
    const token = signToken({
      id: user.id,
      email: user.email,
      nombre: user.nombre,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
