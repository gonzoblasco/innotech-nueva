import React from 'react'
import { render, screen } from '@testing-library/react'
import AgentCard from '@/components/AgentCard'

describe('AgentCard', () => {
  const mockAgent = global.testUtils.mockAgent
  const mockOnClick = jest.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('renders agent information correctly', () => {
    render(<AgentCard agent={mockAgent} onClick={mockOnClick} />)
    
    expect(screen.getByText(mockAgent.name)).toBeInTheDocument()
    expect(screen.getByText(mockAgent.title)).toBeInTheDocument()
    expect(screen.getByText(mockAgent.emoji)).toBeInTheDocument()
    expect(screen.getByText(mockAgent.description)).toBeInTheDocument()
  })

  it('shows locked state when locked prop is true', () => {
    render(<AgentCard agent={mockAgent} onClick={mockOnClick} locked={true} />)
    
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.queryByText('Chatear')).not.toBeInTheDocument()
  })

  it('shows chat button when not locked', () => {
    render(<AgentCard agent={mockAgent} onClick={mockOnClick} locked={false} />)
    
    expect(screen.getByText('Chatear')).toBeInTheDocument()
    expect(screen.queryByText('Login')).not.toBeInTheDocument()
  })
})
