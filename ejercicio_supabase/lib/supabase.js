// ============================================================
// ARCHIVO: lib/supabase.js
// DESCRIPCIÓN: Configuración del cliente Supabase
//
// ⚠️  INSTRUCCIONES PARA EL ESTUDIANTE:
//    1. Ve a https://supabase.com y crea/abre tu proyecto
//    2. En Settings → API, copia tu URL y tu anon key
//    3. Pega los valores en las constantes de abajo
// ============================================================

import { createClient } from '@supabase/supabase-js';

// 👇 CAMBIA ESTO: Ve a Settings → API en tu proyecto Supabase
const SUPABASE_URL = 'https://TU_ID_AQUI.supabase.co';

// 👇 CAMBIA ESTO: Es la "anon public" key (no la service_role!)
const SUPABASE_ANON_KEY = 'TU_ANON_KEY_AQUI';

// Creamos y exportamos el cliente para usarlo en toda la app
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
