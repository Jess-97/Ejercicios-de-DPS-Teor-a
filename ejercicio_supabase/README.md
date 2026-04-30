# 📋 Ejercicio Práctico - Lista de Tareas con Supabase
## DPS441 - Diseño y Programación de Software Multiplataforma

---

## ⚡ Pasos para configurar el proyecto

### 1. Crear la tabla en Supabase
En tu proyecto de Supabase, ve a **Table Editor → New Table** y crea una tabla llamada `tareas` con estas columnas:

| Columna      | Tipo        | Notas                        |
|--------------|-------------|------------------------------|
| `id`         | int8        | Primary key, autoincrement ✓ |
| `created_at` | timestamptz | Default: now() ✓             |
| `titulo`     | text        | Not null ✓                   |
| `completada` | bool        | Default: false               |

> ⚠️ Activa **Row Level Security (RLS)** en la tabla.  
> Luego en la pestaña **Policies**, crea una política que permita todo a usuarios anónimos (para este ejercicio):  
> - Target roles: `anon`  
> - Policy: `ALL` con `true` como expresión.

### 2. Obtener tus credenciales
Ve a **Settings → API** en tu proyecto Supabase y copia:
- `Project URL` → algo como `https://abcdefgh.supabase.co`
- `anon public` key → una cadena larga que empieza con `eyJ...`

### 3. Configurar el archivo `lib/supabase.js`
Abre el archivo `lib/supabase.js` y reemplaza:
```js
const SUPABASE_URL = 'https://TU_ID_AQUI.supabase.co';  // ← Tu URL
const SUPABASE_ANON_KEY = 'TU_ANON_KEY_AQUI';           // ← Tu key
```

### 4. Instalar dependencias y correr
```bash
npm install
npx expo start
```
Escanea el código QR con la app **Expo Go** en tu celular.

---

## ✅ ¿Cómo saber si lo hiciste bien?
1. La app carga sin errores (no aparece el Alert de error)
2. Al agregar una tarea, aparece en la lista
3. En Supabase → Table Editor → `tareas`, ves el registro que creaste
4. Al eliminar una tarea, desaparece de Supabase también

---

## 📁 Estructura del proyecto
```
ejercicio_supabase/
├── App.js              ← Pantalla principal con toda la lógica
├── lib/
│   └── supabase.js    ← ⚠️ AQUÍ van tus credenciales
├── package.json
└── README.md
```

---

## 🔍 Conceptos que practicaste
- `supabase.from('tareas').select('*')` → **READ** (leer todos los registros)
- `supabase.from('tareas').insert({...})` → **CREATE** (insertar un registro)
- `supabase.from('tareas').delete().eq('id', id)` → **DELETE** (eliminar por ID)

---

## 🔥 Reto extra (opcional)
Si terminas antes, intenta agregar:
1. Un checkbox que marque/desmarque `completada` usando `.update()`
2. Filtrar para mostrar solo tareas no completadas: `.eq('completada', false)`
