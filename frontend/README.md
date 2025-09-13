# 🚀 RocketBot Frontend - Aplicación de Tareas

Una aplicación moderna de gestión de tareas construida con Vue 3, Pinia y Vite. Incluye validación robusta, diseño responsive y testing completo.

## ✨ Características

- **📱 Diseño Responsive** - Optimizado para móviles y desktop
- **✅ Validación Robusta** - Validación en tiempo real con sanitización de inputs
- **🎨 UI Moderna** - Interfaz limpia y profesional
- **🧪 Testing Completo** - 43 tests unitarios con Vitest
- **📦 Estado Global** - Gestión de estado con Pinia
- **🔒 Seguridad** - Sanitización de inputs y validación de datos
- **📱 Mobile First** - Diseño optimizado para dispositivos móviles

## 🛠️ Tecnologías

- **Vue 3** - Framework JavaScript reactivo
- **Pinia** - Estado global de la aplicación
- **Vite** - Build tool y servidor de desarrollo
- **Vitest** - Framework de testing
- **CSS3** - Estilos modernos con variables CSS

## 🚀 Instalación

### Prerrequisitos

- Node.js 20.19.0+ o 22.12.0+
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/CatrielNanthaveth/rocketbot_front.git
   cd rocketbot_front
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env
   echo "VITE_API_URL=http://localhost:3000/api" > .env
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Build para producción
npm run preview      # Preview del build

# Testing
npm run test:unit    # Ejecutar tests unitarios
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes Vue
│   ├── Modal.vue        # Modal reutilizable
│   ├── TaskForm.vue     # Formulario de tareas
│   ├── TaskList.vue     # Lista de tareas
│   └── __tests__/       # Tests de componentes
├── stores/              # Estado global (Pinia)
│   ├── tasks.js         # Store de tareas
│   └── __tests__/       # Tests del store
├── utils/               # Utilidades
│   ├── validation.js    # Validación y sanitización
│   ├── validation-examples.md
│   └── __tests__/       # Tests de utilidades
├── assets/              # Recursos estáticos
│   └── main.css         # Estilos globales
├── __tests__/           # Tests de la aplicación
├── App.vue              # Componente principal
└── main.js              # Punto de entrada
```

## 🎯 Funcionalidades

### 📝 Gestión de Tareas
- **Crear** nuevas tareas con título y categoría
- **Editar** tareas existentes
- **Eliminar** tareas
- **Listar** todas las tareas

### ✅ Validación y Sanitización
- **Validación en tiempo real** mientras el usuario escribe
- **Sanitización automática** de inputs (espacios, caracteres especiales)
- **Mensajes de error** claros y específicos
- **Contador de caracteres** en tiempo real
- **Validación de patrones** (caracteres permitidos)

### 📱 Diseño Responsive
- **Mobile First** - Optimizado para dispositivos móviles
- **Breakpoints específicos** para iPhone 12 Pro (390px) y pantallas pequeñas (320px)
- **Sin scroll horizontal** en ningún dispositivo
- **Tipografía responsive** que se adapta al tamaño de pantalla

## 🧪 Testing

El proyecto incluye **43 tests unitarios** que cubren:

- **Utilidades de validación** (16 tests)
- **Store de Pinia** (11 tests)
- **Componente TaskForm** (15 tests)
- **Aplicación principal** (1 test)

### Ejecutar Tests

```bash
# Todos los tests
npm run test:unit

# Tests en modo watch
npm run test:unit -- --watch

# Tests con coverage
npm run test:unit -- --coverage
```

### Cobertura de Tests

- ✅ **Validación de campos** - Longitud, patrones, requeridos
- ✅ **Sanitización de inputs** - Espacios, caracteres especiales
- ✅ **Operaciones CRUD** - Crear, leer, actualizar, eliminar
- ✅ **Estados de carga** - Loading, errores, éxito
- ✅ **Interacciones de usuario** - Formularios, botones, inputs
- ✅ **Casos edge** - Datos vacíos, errores de API

## 🎨 Diseño y UX

### Paleta de Colores
```css
--primary-color: #4CAF50
--secondary-color: #2196F3
--error-color: #f44336
--warning-color: #ff9800
--background-color: #f5f5f5
--text-color: #333
```

### Características de UX
- **Feedback visual** inmediato en validaciones
- **Estados de carga** claros
- **Mensajes de error** descriptivos
- **Animaciones suaves** en transiciones
- **Accesibilidad** mejorada con labels y ARIA

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px
- **Tablet**: ≤ 768px
- **Móvil normal**: ≤ 390px
- **Móvil pequeño**: ≤ 320px

### Optimizaciones Móviles
- **Touch targets** de mínimo 44px
- **Word wrapping** para textos largos
- **Flexbox** para layouts adaptativos

## 🔧 Configuración

### Variables de Entorno
```env
VITE_API_URL=http://localhost:3000/api
```

### Configuración de Vite
- **Vue 3** con Composition API
- **Hot Module Replacement** (HMR)
- **Vue DevTools** integradas
- **Build optimizado** para producción

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Preview del Build
```bash
npm run preview
```

### Archivos Generados
- `dist/` - Archivos optimizados para producción
- **Tree shaking** automático
- **Minificación** de CSS y JS
- **Optimización de assets**

---

## 📞 Contacto

- [LinkedIn](https://www.linkedin.com/in/catriel-nanthaveth)
- [GitHub](https://github.com/CatrielNanthaveth)
- [Portfolio](https://carti-livid.vercel.app)

---
*Desarrollado como parte del desafío técnico de Rocketbot* 🚀