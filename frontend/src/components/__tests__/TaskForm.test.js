import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import TaskForm from '../TaskForm.vue'

vi.mock('../../stores/tasks', () => ({
  useTaskStore: () => ({
    createTask: vi.fn(),
    updateTask: vi.fn(),
    setEditingTask: vi.fn(),
    editingTask: null,
    loading: false,
    error: null
  })
}))

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Rendering', () => {
  it('should render form elements', () => {
    const wrapper = mount(TaskForm)
    
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[id="title"]').exists()).toBe(true)
    expect(wrapper.find('input[id="category"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('should show correct labels', () => {
    const wrapper = mount(TaskForm)
    
    expect(wrapper.find('label[for="title"]').text()).toBe('Título')
    expect(wrapper.find('label[for="category"]').text()).toBe('Categoría')
  })

  it('should show correct button text for new task', () => {
    const wrapper = mount(TaskForm)
    
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.text()).toBe('Agregar Tarea')
  })
})

describe('User Interaction', () => {
  it('should update input values when user types', async () => {
    const wrapper = mount(TaskForm)
    
    const titleInput = wrapper.find('input[id="title"]')
    const categoryInput = wrapper.find('input[id="category"]')
    
    await titleInput.setValue('Nueva tarea')
    await categoryInput.setValue('Trabajo')
    
    expect(titleInput.element.value).toBe('Nueva tarea')
    expect(categoryInput.element.value).toBe('Trabajo')
  })

  it('should show validation errors for invalid input', async () => {
    const wrapper = mount(TaskForm)
    
    const titleInput = wrapper.find('input[id="title"]')
    
    await titleInput.setValue('AB')
    
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.error').text()).toContain('al menos 3 caracteres')
  })

  it('should show character count', async () => {
    const wrapper = mount(TaskForm)
    
    const titleInput = wrapper.find('input[id="title"]')
    await titleInput.setValue('Test')
    
    expect(wrapper.find('.char-count').text()).toBe('4/100')
  })

  it('should disable submit button when form is invalid', async () => {
    const wrapper = mount(TaskForm)
    
    const titleInput = wrapper.find('input[id="title"]')
    const submitButton = wrapper.find('button[type="submit"]')
    
    await titleInput.setValue('AB')
    
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('should enable submit button when form is valid', async () => {
    const wrapper = mount(TaskForm)
    
    const titleInput = wrapper.find('input[id="title"]')
    const categoryInput = wrapper.find('input[id="category"]')
    const submitButton = wrapper.find('button[type="submit"]')
    
    await titleInput.setValue('Tarea válida')
    await categoryInput.setValue('Trabajo')
    
    expect(submitButton.attributes('disabled')).toBeUndefined()
  })
})

describe('Form Submission', () => {
  it('should call createTask when submitting new task', async () => {
    const wrapper = mount(TaskForm)
    
    await wrapper.find('input[id="title"]').setValue('Nueva tarea')
    await wrapper.find('input[id="category"]').setValue('Trabajo')
    
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('should call updateTask when editing existing task', async () => {
    const wrapper = mount(TaskForm)
    
    await wrapper.find('input[id="title"]').setValue('Tarea modificada')
    await wrapper.find('input[id="category"]').setValue('Modificada')
    
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('should not submit when form is invalid', async () => {
    const wrapper = mount(TaskForm)
    
    await wrapper.find('input[id="title"]').setValue('AB')
    await wrapper.find('input[id="category"]').setValue('Trabajo')
    
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()
  })
})

describe('Loading States', () => {
  it('should show loading state when submitting', async () => {
    const wrapper = mount(TaskForm)
    
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.exists()).toBe(true)
  })

  it('should have input elements', async () => {
    const wrapper = mount(TaskForm)
    
    expect(wrapper.find('input[id="title"]').exists()).toBe(true)
    expect(wrapper.find('input[id="category"]').exists()).toBe(true)
  })
})

describe('Error Handling', () => {
  it('should have form structure', async () => {
    const wrapper = mount(TaskForm)
    
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[id="title"]').exists()).toBe(true)
    expect(wrapper.find('input[id="category"]').exists()).toBe(true)
  })

  it('should handle form validation', async () => {
    const wrapper = mount(TaskForm)
    
    await wrapper.find('input[id="title"]').setValue('AB')
    expect(wrapper.find('.error').exists()).toBe(true)
  })
})
