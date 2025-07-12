# Configuración de GitHub OAuth para Yachay App

## 🔧 Pasos detallados para habilitar GitHub login

### **Paso 1: Configurar OAuth App en GitHub**

1. **Ve a GitHub Settings:**
   - Abre https://github.com/settings/developers
   - Click en "OAuth Apps"
   - Click en "New OAuth App"

2. **Completa el formulario:**
   ```
   Application name: Yachay App
   Homepage URL: http://localhost:3000
   Application description: Plataforma académica para estudiantes
   Authorization callback URL: https://[TU-PROJECT-REF].supabase.co/auth/v1/callback
   ```

3. **Obtén las credenciales:**
   - Copia el **Client ID**
   - Genera y copia el **Client Secret**

### **Paso 2: Configurar en Supabase**

1. **Ve a tu Supabase Dashboard:**
   - Abre https://supabase.com/dashboard
   - Selecciona tu proyecto "yachay-app"

2. **Habilitar GitHub Provider:**
   - Ve a **Authentication** → **Providers**
   - Busca **GitHub** en la lista
   - Click en el toggle para habilitarlo
   - Ingresa:
     - **Client ID**: (el que copiaste de GitHub)
     - **Client Secret**: (el que copiaste de GitHub)
   - Click en **Save**

### **Paso 3: Configurar URLs de producción (cuando deploys)**

Cuando deploys tu app a producción, actualiza:

**En GitHub OAuth App:**
- Homepage URL: `https://tu-dominio.com`
- Authorization callback URL: `https://[TU-PROJECT-REF].supabase.co/auth/v1/callback`

**En Supabase:**
- Ve a **Authentication** → **Settings**
- Añade tu dominio de producción a **Site URL**

### **Paso 4: Variables de entorno (opcional)**

Si quieres usar variables de entorno locales, crea `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[TU-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[TU-ANON-KEY]
```

### **Paso 5: Verificar configuración**

1. **Restart tu aplicación:**
   ```bash
   npm run dev
   ```

2. **Prueba el login:**
   - Ve a `/login`
   - Click en "Continuar con GitHub"
   - Debería redirigir a GitHub para autorización

### **🔍 Troubleshooting común:**

**Error: "Unsupported provider"**
- ✅ Verifica que GitHub esté habilitado en Supabase
- ✅ Revisa que las credenciales estén guardadas correctamente

**Error: "Invalid redirect URI"**
- ✅ Verifica que la callback URL en GitHub coincida exactamente
- ✅ No debe tener espacios en blanco al final

**Error: "Client ID not found"**
- ✅ Verifica que el Client ID esté correcto en Supabase
- ✅ Verifica que la OAuth App esté activa en GitHub

### **📋 Checklist final:**

- [ ] OAuth App creada en GitHub
- [ ] Client ID y Secret copiados
- [ ] GitHub habilitado en Supabase Authentication
- [ ] Credenciales guardadas en Supabase
- [ ] Callback URL correcta
- [ ] Aplicación reiniciada
- [ ] Login probado

---

**¡Una vez completados estos pasos, el login con GitHub debería funcionar perfectamente!** 🚀
