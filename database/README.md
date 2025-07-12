# Scripts de Base de Datos - Yachay App

## Instrucciones para ejecutar los scripts SQL en Supabase

### 1. Actualizar tabla profiles
Ejecutar el script `profiles_update.sql` para añadir las columnas adicionales al perfil:

```sql
-- Este script añade campos como phone, location, university, etc.
-- Ver archivo: database/profiles_update.sql
```

### 2. Crear tabla user_settings
Ejecutar el script `user_settings.sql` para crear la tabla de configuraciones:

```sql
-- Este script crea la tabla para guardar configuraciones de usuario
-- Ver archivo: database/user_settings.sql
```

### 3. Pasos para ejecutar:

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navega a "SQL Editor"
3. Copia y pega el contenido de cada archivo SQL
4. Ejecuta cada script uno por uno
5. Verifica que las tablas se crearon correctamente en "Table Editor"

### 4. Verificar políticas RLS

Asegúrate de que las políticas de Row Level Security (RLS) estén habilitadas:
- Los usuarios solo pueden ver y editar sus propios datos
- Las políticas de seguridad protegen la información personal

### 5. Funcionalidades implementadas

**Perfil de Usuario (`/profile`):**
- ✅ Edición de información personal completa
- ✅ Guardado automático en base de datos
- ✅ Validación de datos
- ✅ Interfaz responsive y moderna
- ✅ Notificaciones de éxito/error

**Configuración (`/configuration`):**
- ✅ Configuración de notificaciones
- ✅ Preferencias de apariencia
- ✅ Configuración de idioma y zona horaria
- ✅ Opciones de privacidad
- ✅ Persistencia en base de datos
- ✅ Guardado y restauración de configuraciones

### 6. Campos del perfil disponibles:

- Nombre completo
- Email (solo lectura)
- Teléfono
- Ubicación
- Universidad
- Carrera
- Biografía
- Fecha de nacimiento
- Género

### 7. Configuraciones disponibles:

- Notificaciones por email
- Notificaciones push
- Recordatorios de fechas límite
- Tema (oscuro/claro/automático)
- Idioma
- Zona horaria
- Copia de seguridad automática
- Compartir datos de uso
- Emails de marketing

¡Todo listo para usar! 🚀
