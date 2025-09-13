# RocketBot Challenge - Aplicación de Gestión de Tareas

Una aplicación full-stack para la gestión de tareas desarrollada con Node.js/Express en el backend y Vue.js en el frontend.

## 🚀 Características

- **Backend**: API REST con Node.js y Express
- **Frontend**: Aplicación Vue.js con Vite
- **Estado Global**: Gestión de estado con Pinia
- **Validación**: Validación de formularios en tiempo real
- **Responsive**: Diseño adaptable a diferentes dispositivos
- **Testing**: Tests unitarios con Jest (backend) y Vitest (frontend)

## 📋 Funcionalidades

- ✅ Crear nuevas tareas
- ✅ Listar todas las tareas
- ✅ Editar tareas existentes
- ✅ Eliminar tareas
- ✅ Validación de formularios
- ✅ Estados de carga y error
- ✅ Interfaz responsive

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- CORS
- Morgan (logging)
- Body-parser
- Jest (testing)

### Frontend
- Vue.js 3
- Vite
- Pinia (gestión de estado)
- Vitest (testing)
- CSS3 (responsive design)

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 20.19.0 o superior)
- npm

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd rocketbot
```

### 2. Configurar el Backend

```bash
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# O para producción
npm start
```

El backend estará disponible en `http://localhost:3000`

### 3. Configurar el Frontend

```bash
# Navegar a la carpeta del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### 4. Configurar Variables de Entorno

Crear un archivo `.env` en la carpeta `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm run test:unit
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000`

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/` | Información de la API | - |
| GET | `/tasks` | Obtener todas las tareas | - |
| POST | `/tasks` | Crear nueva tarea | `{ "title": "string", "category": "string" }` |
| PUT | `/tasks/:id` | Actualizar tarea | `{ "title": "string", "category": "string" }` |
| DELETE | `/tasks/:id` | Eliminar tarea | - |

## 🔧 Ejemplos de Requests

### 1. Obtener información de la API
```bash
curl -X GET http://localhost:3000/
```

### 2. Obtener todas las tareas
```bash
curl -X GET http://localhost:3000/tasks
```

### 3. Crear una nueva tarea
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Completar documentación",
    "category": "Desarrollo"
  }'
```

### 4. Actualizar una tarea
```bash
curl -X PUT http://localhost:3000/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Documentación actualizada",
    "category": "Documentación"
  }'
```

### 5. Eliminar una tarea
```bash
curl -X DELETE http://localhost:3000/tasks/{id}
```

### Ejemplos con Postman

1. **GET** `http://localhost:3000/tasks`
2. **POST** `http://localhost:3000/tasks`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "Nueva tarea",
       "category": "Categoría"
     }
     ```
3. **PUT** `http://localhost:3000/tasks/{id}`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "Tarea actualizada",
       "category": "Nueva categoría"
     }
     ```
4. **DELETE** `http://localhost:3000/tasks/{id}`

## 🏪 Gestión de Estado con Pinia

### Implementación

La aplicación utiliza **Pinia** como store de estado global para gestionar:

- **Estado de las tareas**: Lista de tareas, tarea en edición
- **Estados de UI**: Loading, errores
- **Acciones**: CRUD operations, manejo de errores

### Estructura del Store

```javascript
// stores/tasks.js
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],           // Lista de tareas
    editingTask: null,   // Tarea siendo editada
    loading: false,      // Estado de carga
    error: null,         // Errores
  }),

  actions: {
    // Obtener todas las tareas
    async fetchTasks() { ... },
    
    // Crear nueva tarea
    async createTask(task) { ... },
    
    // Actualizar tarea existente
    async updateTask(id, updatedTask) { ... },
    
    // Eliminar tarea
    async deleteTask(id) { ... },
    
    // Establecer tarea en edición
    async setEditingTask(task) { ... }
  }
});
```

### Ventajas de Pinia

1. **Simplicidad**: API más simple que Vuex
2. **TypeScript**: Mejor soporte para TypeScript
3. **DevTools**: Integración nativa con Vue DevTools
4. **Modularidad**: Stores independientes y reutilizables
5. **Composición API**: Compatible con la Composition API de Vue 3

### Uso en Componentes

```javascript
// En cualquier componente Vue
import { useTaskStore } from '@/stores/tasks'

const store = useTaskStore()

// Acceder al estado
console.log(store.tasks)

// Llamar acciones
await store.fetchTasks()
await store.createTask({ title: 'Nueva tarea', category: 'Trabajo' })
```

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: Layout completo con grid de 3 columnas
- **Tablet** (≤768px): Layout adaptado con grid de 1 columna
- **Mobile** (≤390px): Interfaz compacta optimizada para touch
- **Small Mobile** (≤320px): Layout ultra-compacto

## 🚀 Scripts Disponibles

### Backend
- `npm run dev`: Servidor de desarrollo con nodemon
- `npm start`: Servidor de producción
- `npm test`: Ejecutar tests

### Frontend
- `npm run dev`: Servidor de desarrollo con Vite
- `npm run build`: Build para producción
- `npm run preview`: Preview del build
- `npm run test:unit`: Tests unitarios

## 📁 Estructura del Proyecto

```
rocketbot/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   ├── __tests__/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── utils/
│   │   └── App.vue
│   ├── __tests__/
│   └── package.json
└── README.md
```

---

## 🎯 Posibles mejoras

- [ ] Autenticación de usuarios
- [ ] Persistencia en base de datos
- [ ] Filtros y búsqueda de tareas
- [ ] Categorías dinámicas
- [ ] Drag & drop para reordenar tareas
- [ ] Notificaciones push
- [ ] Modo oscuro

---

## 📞 Contacto

- [LinkedIn](https://www.linkedin.com/in/catriel-nanthaveth)
- [GitHub](https://github.com/CatrielNanthaveth)
- [Portfolio](https://carti-livid.vercel.app)

---

*Desarrollado como parte del desafío técnico de Rocketbot* 🚀
