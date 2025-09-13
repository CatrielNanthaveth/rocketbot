# 🚀 API de Tareas - Rocketbot Challenge

Una API REST simple para la gestión de tareas desarrollada con Node.js y Express.js como parte de un desafío técnico.

## 📋 Descripción

Esta API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de tareas. Cada tarea contiene un identificador único, título y categoría.

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **Jest** - Framework de testing
- **Supertest** - Librería para testing de APIs HTTP
- **Morgan** - Middleware de logging
- **CORS** - Middleware para habilitar CORS
- **Body-parser** - Middleware para parsing de JSON

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm (viene incluido con Node.js)

### Pasos para levantar la API

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/CatrielNanthaveth/rocketbot_challenge.git
   cd rocketbot_challenge
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Levantar el servidor en modo desarrollo**
   ```bash
   npm run dev
   ```
   
   O para producción:
   ```bash
   npm start
   ```

4. **Verificar que la API esté funcionando**
   
   La API estará disponible en: `http://localhost:3000`
   
   Puedes verificar el estado visitando: `http://localhost:3000/`

## 📚 Documentación de la API

### Base URL
```
http://localhost:3000
```

### Endpoints Disponibles

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

## 🧪 Testing

### Ejecutar las pruebas

```bash
npm test
```

### Estructura de las pruebas

Las pruebas cubren todos los endpoints de la API:

- ✅ Crear una nueva tarea
- ✅ Obtener todas las tareas
- ✅ Actualizar una tarea existente
- ✅ Eliminar una tarea por ID

### Ejemplo de uso con cURL

```bash
# Obtener todas las tareas
curl -X GET http://localhost:3000/tasks

# Crear una nueva tarea
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Nueva tarea", "category": "Trabajo"}'

# Actualizar una tarea
curl -X PUT http://localhost:3000/tasks/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{"title": "Tarea actualizada", "category": "Personal"}'

# Eliminar una tarea
curl -X DELETE http://localhost:3000/tasks/550e8400-e29b-41d4-a716-446655440000
```

## 📁 Estructura del Proyecto

```
rocketbot_challenge/
├── src/
│   ├── controllers/
│   │   └── tasks.controllers.js    # Lógica de negocio para tareas
│   ├── routes/
│   │   └── tasks.routes.js         # Definición de rutas
│   └── index.js                    # Punto de entrada de la aplicación
├── __tests__/
│   └── tasks.test.js              # Pruebas unitarias
├── package.json                   # Configuración del proyecto
└── README.md                     # Este archivo
```

## 🔧 Scripts Disponibles

- `npm start` - Inicia la aplicación en modo producción
- `npm run dev` - Inicia la aplicación en modo desarrollo con nodemon
- `npm test` - Ejecuta las pruebas unitarias

## 🌟 Características

- **IDs Únicos**: Utiliza UUIDs generados con `crypto.randomUUID()`
- **Validación**: Manejo básico de errores y respuestas apropiadas
- **Logging**: Registro de peticiones HTTP con Morgan
- **CORS**: Habilitado para permitir peticiones desde diferentes orígenes
- **Testing**: Cobertura completa de pruebas con Jest y Supertest

## 🎯 Posibles mejoras

No se implementaron para no salirse del challenge, pero me habría gustado:

- Base de Datos
- Usuarios y persistencia de datos
- Estados para las tareas (done, in progress, etc)
- Mejora en las respuestas
- Más info en las tareas (timestamp, fecha limite, etc)
- Entre otras cosas

## 📞 Contacto

- [LinkedIn](https://www.linkedin.com/in/catriel-nanthaveth)
- [GitHub](https://github.com/CatrielNanthaveth)
- [Portfolio](https://carti-livid.vercel.app)

---

*Desarrollado como parte del desafío técnico de Rocketbot* 🚀
