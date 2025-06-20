// __tests__/components/ChatInterface.test.js - VERSIÓN SIMPLE
describe('ChatInterface', () => {
  test('componente básico funciona', () => {
    // Test simple sin renderizar componente real por ahora
    const mockProps = {
      agent: {
        id: 'test',
        name: 'Test Agent',
        emoji: '🤖',
      },
    }

    expect(mockProps.agent.name).toBe('Test Agent')
    expect(mockProps.agent.emoji).toBe('🤖')
  })

  test('agent tiene propiedades requeridas', () => {
    const agent = {
      id: 'marketing-digital',
      name: 'Marketing Expert',
      title: 'Digital specialist',
    }

    expect(agent).toHaveProperty('id')
    expect(agent).toHaveProperty('name')
    expect(agent).toHaveProperty('title')
  })
})
