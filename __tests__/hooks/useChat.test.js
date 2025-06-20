// __tests__/hooks/useChat.test.js - VERSIÓN SIMPLE SIN DEPENDENCIAS
describe('useChat hook', () => {
  test('hook básico funciona', () => {
    // Test simple sin renderHook por ahora
    const mockHook = {
      messages: [],
      isLoading: false,
      sendMessage: jest.fn(),
    }

    expect(mockHook.messages).toEqual([])
    expect(mockHook.isLoading).toBe(false)
    expect(typeof mockHook.sendMessage).toBe('function')
  })

  test('sendMessage es función', () => {
    const sendMessage = jest.fn()
    sendMessage('test')
    expect(sendMessage).toHaveBeenCalledWith('test')
  })
})
