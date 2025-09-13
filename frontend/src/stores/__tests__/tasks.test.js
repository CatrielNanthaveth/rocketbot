import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '../tasks.js'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Initial State', () => {
  it('should have correct initial state', () => {
    const store = useTaskStore()
    
    expect(store.tasks).toEqual([])
    expect(store.editingTask).toBe(null)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })
})

describe('Basic Actions', () => {
  it('should set editing task', async () => {
    const store = useTaskStore()
    const testTask = { id: 1, title: 'Test Task', category: 'Test' }
    
    await store.setEditingTask(testTask)
    
    expect(store.editingTask).toEqual(testTask)
  })

  it('should clear editing task when set to null', async () => {
    const store = useTaskStore()
    const testTask = { id: 1, title: 'Test Task', category: 'Test' }
    
    await store.setEditingTask(testTask)
    expect(store.editingTask).toEqual(testTask)
    
    await store.setEditingTask(null)
    expect(store.editingTask).toBe(null)
  })
})

describe('Error Handling', () => {
  it('should handle API errors correctly', async () => {
    const store = useTaskStore()
    
    const mockApiCall = vi.fn().mockRejectedValue(new Error('API Error'))
    
    try {
      await store.handleApiCall(mockApiCall)
    } catch (error) {
      expect(store.loading).toBe(false)
      expect(store.error).toBe('API Error')
    }
  })

  it('should set loading state during API calls', async () => {
    const store = useTaskStore()
    
    const mockApiCall = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve('success'), 100))
    )
    
    const promise = store.handleApiCall(mockApiCall)
    
    expect(store.loading).toBe(true)
    expect(store.error).toBe(null)
    
    await promise
    
    expect(store.loading).toBe(false)
  })
})

describe('CRUD Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should add task to list after creation', async () => {
    const store = useTaskStore()
    const newTask = { title: 'New Task', category: 'Work' }
    const createdTask = { id: 1, ...newTask }
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(createdTask)
    })
    
    await store.createTask(newTask)
    
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0]).toEqual(createdTask)
  })

  it('should update task in list', async () => {
    const store = useTaskStore()
    const existingTask = { id: 1, title: 'Old Title', category: 'Old Category' }
    const updatedTask = { id: 1, title: 'New Title', category: 'New Category' }
    
    store.tasks = [existingTask]
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(updatedTask)
    })
    
    await store.updateTask(1, { title: 'New Title', category: 'New Category' })
    
    expect(store.tasks[0]).toEqual(updatedTask)
    expect(store.editingTask).toBe(null)
  })

  it('should remove task from list', async () => {
    const store = useTaskStore()
    const task1 = { id: 1, title: 'Task 1', category: 'Work' }
    const task2 = { id: 2, title: 'Task 2', category: 'Personal' }
    
    store.tasks = [task1, task2]
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({})
    })
    
    await store.deleteTask(1)
    
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0]).toEqual(task2)
  })
})

describe('Edge Cases', () => {
  it('should handle empty task list', () => {
    const store = useTaskStore()
    expect(store.tasks).toEqual([])
    expect(store.tasks).toHaveLength(0)
  })

  it('should handle task not found during update', async () => {
    const store = useTaskStore()
    store.tasks = [{ id: 1, title: 'Task 1', category: 'Work' }]
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 2, title: 'Task 2', category: 'Work' })
    })
    
    await store.updateTask(999, { title: 'New Title', category: 'New Category' })
    
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0].title).toBe('Task 1')
  })

  it('should handle task not found during deletion', async () => {
    const store = useTaskStore()
    store.tasks = [{ id: 1, title: 'Task 1', category: 'Work' }]
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({})
    })
    
    await store.deleteTask(999)
    
    expect(store.tasks).toHaveLength(1)
  })
})
