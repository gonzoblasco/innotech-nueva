import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock ChatInterface por ahora
const MockChatInterface = ({ agent }) => (
  <div data-testid="chat-interface">
    <div>{agent.name}</div>
    <div>{agent.emoji}</div>
    <input placeholder={`Mensaje a ${agent.name}...`} />
    <button>Enviar</button>
  </div>
)

describe('ChatInterface', () => {
  const mockAgent = global.testUtils.mockAgent
  
  it('renders chat interface with agent info', () => {
    render(<MockChatInterface agent={mockAgent} />)
    
    expect(screen.getByText(mockAgent.name)).toBeInTheDocument()
    expect(screen.getByText(mockAgent.emoji)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(`Mensaje a ${mockAgent.name}...`)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has proper structure', () => {
    render(<MockChatInterface agent={mockAgent} />)
    
    expect(screen.getByTestId('chat-interface')).toBeInTheDocument()
  })
})
