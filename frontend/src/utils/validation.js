
export const VALIDATION_RULES = {
  title: {
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ.,!?\-_():]+$/,
    required: true
  },
  category: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ\-_]+$/,
    required: true
  }
};

export const ERROR_MESSAGES = {
  required: (field) => `${field} es requerido`,
  minLength: (field, min) => `${field} debe tener al menos ${min} caracteres`,
  maxLength: (field, max) => `${field} no puede exceder ${max} caracteres`,
  pattern: (field) => `${field} contiene caracteres no válidos`,
  empty: (field) => `${field} no puede estar vacío`
};

export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/\s+/g, ' ');
}

export function validateField(value, fieldName, rules) {
  const sanitizedValue = sanitizeInput(value);

  if (rules.required && !sanitizedValue) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.required(fieldName),
      sanitizedValue: ''
    };
  }

  if (!rules.required && !sanitizedValue) {
    return {
      isValid: true,
      error: '',
      sanitizedValue: ''
    };
  }

  if (sanitizedValue.length < rules.minLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.minLength(fieldName, rules.minLength),
      sanitizedValue
    };
  }

  if (sanitizedValue.length > rules.maxLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.maxLength(fieldName, rules.maxLength),
      sanitizedValue
    };
  }

  if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.pattern(fieldName),
      sanitizedValue
    };
  }

  return {
    isValid: true,
    error: '',
    sanitizedValue
  };
}

export function validateForm(formData) {
  const errors = {};
  const sanitizedData = {};
  let isValid = true;

  const titleValidation = validateField(formData.title, 'título', VALIDATION_RULES.title);
  if (!titleValidation.isValid) {
    errors.title = titleValidation.error;
    isValid = false;
  }
  sanitizedData.title = titleValidation.sanitizedValue;

  const categoryValidation = validateField(formData.category, 'categoría', VALIDATION_RULES.category);
  if (!categoryValidation.isValid) {
    errors.category = categoryValidation.error;
    isValid = false;
  }
  sanitizedData.category = categoryValidation.sanitizedValue;

  return {
    isValid,
    errors,
    sanitizedData
  };
}

export function validateOnInput(value, fieldName, rules) {
  if (!value || value.trim() === '') {
    return {
      isValid: true,
      error: '',
      sanitizedValue: value
    };
  }

  const trimmedValue = value.trim();

  if (rules.required && !trimmedValue) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.required(fieldName),
      sanitizedValue: value
    };
  }

  if (!rules.required && !trimmedValue) {
    return {
      isValid: true,
      error: '',
      sanitizedValue: value
    };
  }

  if (trimmedValue.length < rules.minLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.minLength(fieldName, rules.minLength),
      sanitizedValue: value
    };
  }

  if (trimmedValue.length > rules.maxLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.maxLength(fieldName, rules.maxLength),
      sanitizedValue: value
    };
  }

  if (rules.pattern && !rules.pattern.test(trimmedValue)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.pattern(fieldName),
      sanitizedValue: value
    };
  }

  return {
    isValid: true,
    error: '',
    sanitizedValue: value
  };
}
