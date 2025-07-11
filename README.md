# Yachay App

> El poder de tu conocimiento, en tus manos

Un dashboard académico personal para estudiantes universitarios en Ecuador. Organiza tus materias, calcula tus promedios ponderados en tiempo real y gestiona tus fechas de entrega.

![Yachay App](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Yachay+App+-+Dashboard+Académico)

## 🚀 Características

- ✅ **Autenticación segura** con Google y GitHub via Supabase Auth
- 📊 **Cálculo automático** de promedios ponderados
- 📅 **Gestión de fechas** de entrega y tareas
- 📚 **Organización por semestres** y materias
- 🎯 **Proyección de notas** finales
- 📱 **Diseño responsive** y moderno
- ⚡ **Rendimiento optimizado** para planes gratuitos

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel
- **Iconos**: Lucide React
- **Notificaciones**: Sonner

## 📋 Prerrequisitos

- Node.js 18.0.0 o superior
- Cuenta de Supabase (gratuita)
- Cuenta de Vercel (gratuita) para deployment

## ⚡ Instalación Rápida

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/mat1520/yachay-app.git
   cd yachay-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus credenciales de Supabase:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. **Configurar la base de datos**
   - Abre el SQL Editor en tu dashboard de Supabase
   - Ejecuta el script `database.sql` incluido en el proyecto

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 🗄️ Configuración de la Base de Datos

El archivo `database.sql` contiene todo lo necesario:

- ✅ Tablas con Row Level Security (RLS)
- ✅ Políticas de seguridad
- ✅ Triggers automáticos
- ✅ Configuración de Storage

**Tablas principales:**
- `profiles` - Perfiles de usuario
- `semesters` - Semestres académicos  
- `subjects` - Materias por semestre
- `grading_items` - Evaluaciones y notas

## 🎨 Estructura del Proyecto

```
yachay-app/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   ├── (main)/            # Rutas protegidas
│   ├── globals.css        # Estilos globales
│   └── layout.tsx         # Layout raíz
├── components/            # Componentes React
│   ├── auth/             # Componentes de autenticación
│   ├── core/             # Componentes principales
│   ├── dashboard/        # Componentes del dashboard
│   ├── subject/          # Componentes de materias
│   └── ui/               # Componentes de UI (Shadcn)
├── lib/                  # Utilidades y configuración
│   ├── actions/          # Server Actions
│   ├── supabase/         # Cliente de Supabase
│   └── utils.ts          # Funciones utilitarias
└── database.sql          # Script de configuración de BD
```

## 🔧 Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Linter de código
npm run type-check   # Verificación de tipos
```

## 🚀 Deployment en Vercel

1. **Conectar repositorio**
   - Conecta tu fork del repositorio con Vercel
   - Las variables de entorno se configuran automáticamente

2. **Configurar variables de entorno en Vercel**
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

3. **Deploy automático**
   - Cada push a `main` despliega automáticamente
   - Vercel maneja el build y optimización

## 📱 Funcionalidades

### Dashboard Principal
- Resumen de materias y entregas próximas
- Estadísticas académicas en tiempo real
- Navegación intuitiva y rápida

### Calculadora de Notas
- Ingreso de evaluaciones con peso específico
- Cálculo automático de promedio ponderado
- Proyección de nota final
- Edición en tiempo real

### Gestión de Materias
- Organización por semestres
- Información de profesores y créditos
- Colores personalizables
- Vista detallada por materia

### Próximas Entregas
- Lista de tareas pendientes
- Indicadores de fechas vencidas
- Organización por proximidad

## 🔒 Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- **Autenticación OAuth** segura con Supabase
- **Políticas de acceso** que garantizan privacidad de datos
- **Validación** tanto en frontend como backend

## 🎯 Optimización para Planes Gratuitos

### Vercel
- Server Components para reducir JavaScript del cliente
- Optimización automática de imágenes
- Edge Functions para mejor rendimiento

### Supabase
- Consultas optimizadas con `select()` específico
- Límites de storage respetados (5MB por archivo)
- Uso eficiente de conexiones de base de datos

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙋‍♂️ Autor

**mat1520**
- GitHub: [@mat1520](https://github.com/mat1520)
- Email: [contacto disponible en GitHub]

## ⭐ Agradecimientos

- [Shadcn/ui](https://ui.shadcn.com/) por los componentes de UI
- [Supabase](https://supabase.com/) por el backend como servicio
- [Vercel](https://vercel.com/) por el hosting gratuito
- Comunidad de desarrolladores de Ecuador 🇪🇨

---

<div align="center">
  <strong>Creado con ❤️ por mat1520</strong>
  <br>
  <em>El poder de tu conocimiento, en tus manos</em>
</div>
