import { describe, it, expect } from 'vitest'
import { 
  sanitizeInput, 
  validateField, 
  validateForm, 
  validateOnInput,
  VALIDATION_RULES,
  ERROR_MESSAGES 
} from '../validation.js'

describe('sanitizeInput', () => {
  it('should remove leading and trailing spaces', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello')
  })

  it('should replace multiple spaces with single space', () => {
    expect(sanitizeInput('hello    world')).toBe('hello world')
  })

  it('should preserve all characters except spaces', () => {
    expect(sanitizeInput('hello<script>alert("xss")</script>')).toBe('hello<script>alert("xss")</script>')
  })

  it('should handle empty strings', () => {
    expect(sanitizeInput('')).toBe('')
    expect(sanitizeInput('   ')).toBe('')
  })

  it('should handle non-string inputs', () => {
    expect(sanitizeInput(null)).toBe('')
    expect(sanitizeInput(undefined)).toBe('')
    expect(sanitizeInput(123)).toBe('')
  })
})

describe('validateField', () => {
  it('should validate required fields correctly', () => {
    const validResult = validateField('Valid Title', 'título', VALIDATION_RULES.title)
    expect(validResult.isValid).toBe(true)
    expect(validResult.error).toBe('')

    const emptyResult = validateField('', 'título', VALIDATION_RULES.title)
    expect(emptyResult.isValid).toBe(false)
    expect(emptyResult.error).toBe('título es requerido')
  })

  it('should validate minimum length', () => {
    const shortResult = validateField('AB', 'título', VALIDATION_RULES.title)
    expect(shortResult.isValid).toBe(false)
    expect(shortResult.error).toBe('título debe tener al menos 3 caracteres')
  })

  it('should validate maximum length', () => {
    const longTitle = 'A'.repeat(101)
    const longResult = validateField(longTitle, 'título', VALIDATION_RULES.title)
    expect(longResult.isValid).toBe(false)
    expect(longResult.error).toBe('título no puede exceder 100 caracteres')
  })

  it('should validate character patterns', () => {
    const invalidResult = validateField('Título@#$%', 'título', VALIDATION_RULES.title)
    expect(invalidResult.isValid).toBe(false)
    expect(invalidResult.error).toBe('título contiene caracteres no válidos')
  })

  it('should accept valid inputs', () => {
    const validTitles = [
      'Completar proyecto',
      'Reunión con cliente - 15:00',
      'Tarea importante (urgente)',
      'Tarea con números 123'
    ]

    validTitles.forEach(title => {
      const result = validateField(title, 'título', VALIDATION_RULES.title)
      expect(result.isValid).toBe(true)
      expect(result.error).toBe('')
    })
  })
})

describe('validateForm', () => {
  it('should validate complete valid form', () => {
    const validFormData = {
      title: 'Tarea válida',
      category: 'Trabajo'
    }

    const result = validateForm(validFormData)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({})
    expect(result.sanitizedData.title).toBe('Tarea válida')
    expect(result.sanitizedData.category).toBe('Trabajo')
  })

  it('should validate form with errors', () => {
    const invalidFormData = {
      title: 'AB',
      category: ''
    }

    const result = validateForm(invalidFormData)
    expect(result.isValid).toBe(false)
    expect(result.errors.title).toBe('título debe tener al menos 3 caracteres')
    expect(result.errors.category).toBe('categoría es requerido')
  })

  it('should sanitize form data', () => {
    const formDataWithSpaces = {
      title: '  Tarea con espacios  ',
      category: '  Trabajo  '
    }

    const result = validateForm(formDataWithSpaces)
    expect(result.sanitizedData.title).toBe('Tarea con espacios')
    expect(result.sanitizedData.category).toBe('Trabajo')
  })
})

describe('validateOnInput', () => {
  it('should allow writing spaces in real-time', () => {
    const result = validateOnInput('Título con espacios ', 'título', VALIDATION_RULES.title)
    expect(result.sanitizedValue).toBe('Título con espacios ')
    expect(result.isValid).toBe(true)
  })

  it('should validate empty input as valid during typing', () => {
    const result = validateOnInput('', 'título', VALIDATION_RULES.title)
    expect(result.isValid).toBe(true)
    expect(result.error).toBe('')
  })

  it('should show errors for invalid patterns while typing', () => {
    const result = validateOnInput('Título@#$', 'título', VALIDATION_RULES.title)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('título contiene caracteres no válidos')
  })
})
