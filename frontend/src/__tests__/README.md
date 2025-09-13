# 🧪 Guía de Testing - Cómo Ejecutar y Entender los Tests

## 📋 **Comandos para Ejecutar Tests**

### **Ejecutar todos los tests:**
```bash
npm run test:unit
```

### **Ejecutar tests en modo watch (se ejecutan automáticamente al cambiar código):**
```bash
npm run test:unit -- --watch
```

### **Ejecutar tests específicos:**
```bash
# Solo tests de validación
npm run test:unit src/utils/__tests__/validation.test.js

# Solo tests del store
npm run test:unit src/stores/__tests__/tasks.test.js

# Solo tests de componentes
npm run test:unit src/components/__tests__/TaskForm.test.js
```

### **Ejecutar tests con cobertura:**
```bash
npm run test:unit -- --coverage
```

## 🔍 **Cómo Interpretar los Resultados**

### **✅ Test Exitoso:**
```
✓ should remove leading and trailing spaces (2ms)
✓ should validate required fields correctly (1ms)
✓ should render form elements (5ms)
```

### **❌ Test Fallido:**
```
✗ should validate minimum length
  AssertionError: expected false to be true
    at Object.<anonymous> (validation.test.js:45:5)
```

### **📊 Resumen de Tests:**
```
Test Files  3 passed (3)
Tests      25 passed (25)
Start      2024-01-15 10:30:00
Duration   1.2s
```

## 🎯 **Tipos de Tests que Creamos**

### **1. Tests de Utilidades (validation.test.js)**
- **Qué prueban:** Funciones puras de validación y sanitización
- **Por qué son importantes:** Son la base de la lógica de negocio
- **Ejemplos:** `sanitizeInput()`, `validateField()`, `validateForm()`

### **2. Tests del Store (tasks.test.js)**
- **Qué prueban:** Estado global y operaciones CRUD
- **Por qué son importantes:** Manejan la lógica de datos
- **Ejemplos:** `createTask()`, `updateTask()`, `deleteTask()`

### **3. Tests de Componentes (TaskForm.test.js)**
- **Qué prueban:** Interfaz de usuario y interacciones
- **Por qué son importantes:** Verifican que la UI funcione correctamente
- **Ejemplos:** Renderizado, validación en tiempo real, envío de formularios

## 🛠️ **Conceptos Clave de Testing**

### **Arrange-Act-Assert (AAA)**
```javascript
it('should validate required fields', () => {
  // ARRANGE - Preparar datos de prueba
  const input = ''
  const rules = VALIDATION_RULES.title
  
  // ACT - Ejecutar la función a probar
  const result = validateField(input, 'título', rules)
  
  // ASSERT - Verificar el resultado
  expect(result.isValid).toBe(false)
  expect(result.error).toBe('El título es requerido')
})
```

### **Mocks y Stubs**
```javascript
// Mock de una función
const mockCreateTask = vi.fn()

// Mock de una respuesta de API
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ id: 1, title: 'Test' })
})
```

### **Setup y Teardown**
```javascript
beforeEach(() => {
  // Se ejecuta antes de cada test
  setActivePinia(createPinia())
})

afterEach(() => {
  // Se ejecuta después de cada test
  vi.clearAllMocks()
})
```

## 🚀 **Mejores Prácticas**

### **1. Nombres Descriptivos**
```javascript
// ❌ Malo
it('should work', () => {})

// ✅ Bueno
it('should validate minimum length for title field', () => {})
```

### **2. Un Test, Una Verificación**
```javascript
// ❌ Malo - Múltiples verificaciones en un test
it('should validate form', () => {
  expect(validateForm({title: '', category: ''})).toBe(false)
  expect(validateForm({title: 'Valid', category: 'Valid'})).toBe(true)
})

// ✅ Bueno - Un test por cada caso
it('should reject empty form', () => {
  expect(validateForm({title: '', category: ''})).toBe(false)
})

it('should accept valid form', () => {
  expect(validateForm({title: 'Valid', category: 'Valid'})).toBe(true)
})
```

### **3. Casos Positivos y Negativos**
```javascript
// Caso positivo - lo que debe funcionar
it('should accept valid input', () => {
  expect(validateField('Valid Title', 'título', rules)).toBe(true)
})

// Caso negativo - lo que debe fallar
it('should reject empty input', () => {
  expect(validateField('', 'título', rules)).toBe(false)
})
```

## 📈 **Métricas de Cobertura**

### **¿Qué es la cobertura?**
- **Líneas cubiertas:** Porcentaje de líneas de código ejecutadas
- **Funciones cubiertas:** Porcentaje de funciones probadas
- **Ramas cubiertas:** Porcentaje de condiciones if/else probadas

### **Objetivo de Cobertura:**
- **Mínimo recomendado:** 80%
- **Ideal:** 90%+
- **Crítico:** 100% para funciones de validación y seguridad

## 🎉 **¡Felicidades!**

Has aprendido:
- ✅ Cómo escribir tests unitarios
- ✅ Cómo probar funciones, stores y componentes
- ✅ Cómo usar mocks y stubs
- ✅ Cómo interpretar resultados
- ✅ Mejores prácticas de testing

¡Ahora tu aplicación tiene una base sólida de tests que te darán confianza para hacer cambios! 🚀
