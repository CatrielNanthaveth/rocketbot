# RocketBot Challenge - Aplicación de Gestión de Tareas

Una aplicación full-stack para la gestión de tareas desarrollada con Node.js/Express en el backend y Vue.js en el frontend.

## 🔗 Enlaces Rápidos

- **🌐 Aplicación en Vivo**: [https://rocketbot-front.vercel.app](https://rocketbot-front.vercel.app)
- **🚀 API en Producción**: [https://rocketbot-api-832881849181.us-central1.run.app](https://rocketbot-api-832881849181.us-central1.run.app)
- **📚 Documentación de la API**: [Ver sección API Endpoints](#-api-endpoints)
- **🐳 Docker**: [Ver sección Docker](#-docker-y-despliegue)
- **🧪 Testing**: [Ver sección Testing](#-testing)

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
git clone https://github.com/CatrielNanthaveth/rocketbot.git
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

## 🐳 Docker y Despliegue

### Backend con Docker

El backend está containerizado y desplegado en Google Cloud Run:

#### Construir la imagen Docker
```bash
cd backend
docker build -t rocketbot-api .
```

#### Ejecutar localmente con Docker
```bash
docker run -p 3000:3000 rocketbot-api
```

#### Comandos Docker útiles
```bash
# Construir la imagen
docker build -t rocketbot-api .

# Ejecutar en modo interactivo
docker run -it -p 3000:3000 rocketbot-api

# Ejecutar en segundo plano
docker run -d -p 3000:3000 --name rocketbot-container rocketbot-api

# Ver logs del contenedor
docker logs rocketbot-container

# Detener el contenedor
docker stop rocketbot-container

# Eliminar el contenedor
docker rm rocketbot-container
```

### Despliegue en Producción

- **Frontend**: Desplegado en Vercel con integración automática desde GitHub
- **Backend**: Containerizado con Docker y desplegado en Google Cloud Run
- **Escalabilidad**: Cloud Run proporciona escalado automático basado en la demanda
- **Alta Disponibilidad**: Servicios gestionados por Google Cloud Platform

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

## 🌐 Aplicación en Producción

### URLs de Despliegue
- **Frontend**: [https://rocketbot-front.vercel.app](https://rocketbot-front.vercel.app)
- **Backend API**: [https://rocketbot-api-832881849181.us-central1.run.app](https://rocketbot-api-832881849181.us-central1.run.app)

### Docker
El backend está containerizado con Docker y desplegado en Google Cloud Run para escalabilidad automática y alta disponibilidad.

## 📡 API Endpoints

### Base URL Local: `http://localhost:3000`
### Base URL Producción: `https://rocketbot-api-832881849181.us-central1.run.app`

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/` | Información de la API | - |
| GET | `/tasks` | Obtener todas las tareas | - |
| POST | `/tasks` | Crear nueva tarea | `{ "title": "string", "category": "string" }` |
| PUT | `/tasks/:id` | Actualizar tarea | `{ "title": "string", "category": "string" }` |
| DELETE | `/tasks/:id` | Eliminar tarea | - |

### Documentación Detallada de Endpoints

#### 1. **GET /** - Información de la API
Obtiene información básica sobre la API.

**Respuesta:**
```json
{
  "name": "rocketbot_challenge",
  "author": "cnanthaveth",
  "description": "technical challenge for rocketbot interview",
  "version": "1.0.0"
}
```

#### 2. **GET /tasks** - Obtener todas las tareas
Retorna un array con todas las tareas existentes.

**Respuesta:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Task 1",
    "category": "Category 1"
  }
]
```

#### 3. **POST /tasks** - Crear una nueva tarea
Crea una nueva tarea en el sistema.

**Body (JSON):**
```json
{
  "title": "Comprar leche",
  "category": "Hogar"
}
```

**Respuesta (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Comprar leche",
  "category": "Hogar"
}
```

#### 4. **PUT /tasks/:id** - Actualizar una tarea existente
Actualiza una tarea existente por su ID.

**Parámetros:**
- `id` (string): ID único de la tarea

**Body (JSON):**
```json
{
  "title": "Título actualizado",
  "category": "Categoría actualizada"
}
```

**Respuesta (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Título actualizado",
  "category": "Categoría actualizada"
}
```

#### 5. **DELETE /tasks/:id** - Eliminar una tarea
Elimina una tarea del sistema por su ID.

**Parámetros:**
- `id` (string): ID único de la tarea

**Respuesta (200 OK):**
```json
{
  "message": "Task 550e8400-e29b-41d4-a716-446655440000 deleted successfully"
}
```

### Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Error en la petición |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error interno del servidor |

## 🔧 Ejemplos de Requests

### Local Development

#### 1. Obtener información de la API
```bash
curl -X GET http://localhost:3000/
```

#### 2. Obtener todas las tareas
```bash
curl -X GET http://localhost:3000/tasks
```

#### 3. Crear una nueva tarea
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Completar documentación",
    "category": "Desarrollo"
  }'
```

#### 4. Actualizar una tarea
```bash
curl -X PUT http://localhost:3000/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Documentación actualizada",
    "category": "Documentación"
  }'
```

#### 5. Eliminar una tarea
```bash
curl -X DELETE http://localhost:3000/tasks/{id}
```

### Producción

#### 1. Obtener información de la API
```bash
curl -X GET https://rocketbot-api-832881849181.us-central1.run.app/
```

#### 2. Obtener todas las tareas
```bash
curl -X GET https://rocketbot-api-832881849181.us-central1.run.app/tasks
```

#### 3. Crear una nueva tarea
```bash
curl -X POST https://rocketbot-api-832881849181.us-central1.run.app/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Completar documentación",
    "category": "Desarrollo"
  }'
```

#### 4. Actualizar una tarea
```bash
curl -X PUT https://rocketbot-api-832881849181.us-central1.run.app/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Documentación actualizada",
    "category": "Documentación"
  }'
```

#### 5. Eliminar una tarea
```bash
curl -X DELETE https://rocketbot-api-832881849181.us-central1.run.app/tasks/{id}
```

### Ejemplos con Postman

#### Local Development
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

#### Producción
1. **GET** `https://rocketbot-api-832881849181.us-central1.run.app/tasks`
2. **POST** `https://rocketbot-api-832881849181.us-central1.run.app/tasks`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "Nueva tarea",
       "category": "Categoría"
     }
     ```
3. **PUT** `https://rocketbot-api-832881849181.us-central1.run.app/tasks/{id}`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "Tarea actualizada",
       "category": "Nueva categoría"
     }
     ```
4. **DELETE** `https://rocketbot-api-832881849181.us-central1.run.app/tasks/{id}`

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

## ⚡ Características Técnicas

### Backend
- **IDs Únicos**: Utiliza UUIDs generados con `crypto.randomUUID()`
- **Validación**: Manejo robusto de errores y respuestas apropiadas
- **Logging**: Registro de peticiones HTTP con Morgan
- **CORS**: Habilitado para permitir peticiones desde diferentes orígenes
- **Testing**: Cobertura completa de pruebas con Jest y Supertest
- **Containerización**: Docker para despliegue consistente
- **Escalabilidad**: Desplegado en Google Cloud Run

### Frontend
- **Composition API**: Vue.js 3 con sintaxis moderna
- **Estado Global**: Pinia para gestión de estado reactiva
- **Validación en Tiempo Real**: Sistema de validación robusto
- **Responsive Design**: Adaptable a todos los dispositivos
- **Testing**: Vitest para pruebas unitarias
- **Build Optimizado**: Vite para desarrollo y build rápidos
- **Despliegue Automático**: Integración con Vercel

## 🎯 Posibles mejoras

- [ ] Autenticación de usuarios
- [ ] Persistencia en base de datos
- [ ] Filtros y búsqueda de tareas
- [ ] Categorías dinámicas
- [ ] Drag & drop para reordenar tareas
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Estados para las tareas (done, in progress, etc)
- [ ] Timestamps y fechas límite
- [ ] Mejoras en las respuestas de la API

---

## 📞 Contacto

- [LinkedIn](https://www.linkedin.com/in/catriel-nanthaveth)
- [GitHub](https://github.com/CatrielNanthaveth)
- [Portfolio](https://carti-livid.vercel.app)

---

*Desarrollado como parte del desafío técnico de Rocketbot* 🚀
