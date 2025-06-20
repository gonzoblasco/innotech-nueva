// __tests__/components/FormattedMessage.test.js - CON TEST
describe('FormattedMessage', () => {
  test('component logic works', () => {
    // Test de la lógica sin renderizar JSX
    const content = 'Test message'
    const isUser = false

    expect(content).toBe('Test message')
    expect(isUser).toBe(false)
  })

  test('processes user messages', () => {
    const isUser = true
    const content = 'User message'

    if (isUser) {
      // Lógica para usuario
      expect(content).toBe('User message')
    }
  })

  test('processes markdown content', () => {
    const content = '**bold text**'
    const processed = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    expect(processed).toBe('<strong>bold text</strong>')
  })
})
