# 🌍 EcoCity - Gestión de Residuos

## ✅ Implementado

### 🔐 Autenticación REAL con Prisma + JWT
- **Login/Register**: Página con tabs para ingresar o registrarse
- **Endpoints API**: POST `/api/auth/login` y `/api/auth/register`
- **Seguridad**: Bcryptjs para hash de contraseñas, JWT para sesiones
- **Token**: Guardado en localStorage
- **Auth Context**: `useAuth()` hook disponible en toda la app

### 🗺️ Mapa Interactivo con Leaflet
- **Ubicación**: Cochabamba (-17.3895, -66.1568)
- **Marcadores**:
  - 🗑️ Contenedores (verde si está disponible, rojo si está lleno)
  - ♻️ Puntos de reciclaje (azul)
  - 🚛 Camiones recolectores (púrpura)
- **Filtros**: Toggle por tipo de marcador
- **Info**: Cards emergentes con detalles al tocar marcador
- **Leyenda**: Colores identificados

### 👤 Perfil de Usuario
- Muestra nombre y email del usuario autenticado
- Botón logout que borra token y redirige a login
- Misma interfaz, datos actualizados

---

## 🚀 Cómo Usar

### 1️⃣ Configurar Base de Datos (IMPORTANTE)

Primero, asegúrate que tu `.env` tiene `DATABASE_URL` y `DIRECT_URL`:
```bash
# .env
DATABASE_URL=postgresql://user:password@host/dbname
DIRECT_URL=postgresql://user:password@host/dbname
```

Luego, crea las tablas en la DB:
```bash
pnpm prisma migrate dev --name init
```

Crea usuario de prueba:
```bash
pnpm prisma db seed
```

**Credenciales de Prueba:**
- Email: `test@ecocity.com`
- Contraseña: `Test123!`

### 2️⃣ Correr la App

```bash
npm run dev
# O
pnpm dev
```

Luego abre: **http://localhost:3000**

### 3️⃣ Flujo de Usuario

#### Primera Vez:
1. Haz clic en navegación → ya está autenticado con contexto
2. Ve a `/login` para ingresar o registrarte
3. O usa credenciales de prueba

#### Después de Login:
- **Home** (`/`): Ves los 3 botones principales
- **Mapa** (`/mapa`): Leaflet interactivo de Cochabamba
  - Filtra por contenedores, reciclaje, camiones
  - Toca un marcador para ver detalles
- **QOPA** (`/qopa`): Escanea QR con cámara
- **Reciclaje** (`/reciclaje`): Botones de escaneo y pagos
- **Usuario** (`/usuario`): Tu perfil + **Botón LOGOUT**

---

## 📁 Archivos Creados

### Autenticación
```
src/
├── lib/
│   ├── auth.ts          ← JWT, tokens, localStorage
│   └── prisma.ts        ← Cliente Prisma singleton
├── context/
│   └── AuthContext.tsx  ← React Context para usuario
├── app/
│   ├── login/
│   │   └── page.tsx     ← Página login/register
│   └── api/auth/
│       ├── login/route.ts
│       └── register/route.ts
```

### Mapa
```
src/app/mapa/page.tsx   ← Leaflet real de Cochabamba
```

### Base de Datos
```
prisma/seed.ts          ← Script para crear usuario test
```

---

## 🔑 Claves JWT

JWT creado con secreto (cambia en producción):
```
JWT_SECRET = "tu-clave-secreta-super-segura-cambiar-en-produccion"
```

Expira en 7 días. Token decodificable pero no verificable sin secreto.

---

## 🎯 Próximos Pasos Opcionales

1. **Middleware protector**: Redirigir a `/login` si no hay token
2. **Base de datos real**: Cambiar mock data por queries Prisma
3. **Rutas protegidas**: `[...auth]` layout para rutas privadas
4. **Notificaciones**: Agregar toast de éxito/error
5. **Persitencia de datos**: Guardar puntos, historial, etc en DB

---

## 🐛 Troubleshooting

### Error: "Can't resolve '@prisma/client'"
```bash
pnpm install @prisma/client
```

### Error: "DATABASE_URL not set"
Asegúrate que `.env` tiene las variables. Luego reinicia el servidor.

### Mapa no carga
Leaflet requiere `dynamic` import. Si sigue fallando, revisa console del navegador.

### Login no funciona
- Revisa que la BD esté corriendo
- Verifica credenciales en DB: `pnpm prisma studio`
- Mira logs de la API en la terminal

---

## 📊 Stack Técnico

- **Framework**: Next.js 16.2.6
- **Auth**: JWT + bcryptjs
- **BD**: Prisma + Supabase (PostgreSQL)
- **Mapa**: Leaflet + react-leaflet
- **UI**: Tailwind CSS + Lucide icons
- **QR**: react-qr-reader (cámara)

---

## ✨ Características Finales

✅ Autenticación real con encriptación
✅ Mapa interactivo de Cochabamba con Leaflet
✅ Perfil de usuario con datos reales
✅ Logout funcional
✅ Login/Register con validación
✅ JWT tokens con expiración
✅ Base de datos Prisma + Supabase
✅ UI moderna ecológica (emerald/teal)
✅ Mobile-first responsive

**¡La app está lista para usar! 🚀**
