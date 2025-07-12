-- Crear tabla user_settings para la configuración de usuarios
-- Ejecutar este script en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS user_settings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  notifications_email BOOLEAN DEFAULT true,
  notifications_push BOOLEAN DEFAULT true,
  notifications_deadlines BOOLEAN DEFAULT true,
  theme TEXT DEFAULT 'dark',
  language TEXT DEFAULT 'es',
  timezone TEXT DEFAULT 'America/Guayaquil',
  auto_backup BOOLEAN DEFAULT false,
  data_sharing BOOLEAN DEFAULT false,
  marketing_emails BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER trigger_handle_updated_at_user_settings
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();
