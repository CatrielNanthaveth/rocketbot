# Ejemplos de Validación y Sanitización

## Funcionalidades Implementadas

### 1. Validación Robusta
- **Longitud mínima y máxima**: Título (3-100 chars), Categoría (2-50 chars)
- **Patrones de caracteres**: Solo caracteres alfanuméricos, espacios y caracteres especiales seguros
- **Validación en tiempo real**: Los errores se muestran mientras el usuario escribe
- **Validación completa**: Al enviar el formulario

### 2. Normalización de Inputs
- **Eliminación de espacios**: Espacios al inicio y final, múltiples espacios
- **Preservación de caracteres**: Mantiene todos los caracteres (Vue 3 previene XSS automáticamente)
- **Normalización**: Conversión a formato consistente

### 3. Mensajes de Error Descriptivos
- **Específicos por campo**: "El título es requerido", "La categoría debe tener al menos 2 caracteres"
- **Información de límites**: "El título no puede exceder 100 caracteres"
- **Patrones inválidos**: "El título contiene caracteres no válidos"

### 4. Indicadores Visuales
- **Contador de caracteres**: Muestra "25/100" en tiempo real
- **Estados de error**: Bordes rojos y mensajes de error
- **Validación en vivo**: Feedback inmediato al usuario

## Ejemplos de Validación

### Casos Válidos:
- Título: "Completar proyecto" ✅
- Categoría: "Trabajo" ✅
- Título: "Reunión con cliente - 15:00" ✅
- Categoría: "Urgente" ✅

### Casos Inválidos:
- Título: "AB" ❌ (muy corto)
- Categoría: "A" ❌ (muy corto)
- Título: "Título muy largo que excede los 100 caracteres permitidos y debería mostrar un error de validación..." ❌ (muy largo)
- Título: "Título\<script\>alert('xss')\</script\>" ❌ (caracteres peligrosos)
- Categoría: "Categoría@#$%" ❌ (caracteres no permitidos)

### Normalización Automática:
- Input: "  Título con espacios  " → Output: "Título con espacios"
- Input: "Título   con   múltiples   espacios" → Output: "Título con múltiples espacios"
