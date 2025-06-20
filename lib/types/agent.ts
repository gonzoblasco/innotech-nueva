// Tipos para los agentes
export interface Agent {
  id: string
  name: string
  title?: string
  emoji?: string
  description: string
  category: string
  system_prompt: string
  welcome_message?: string
  model_provider?: 'claude' | 'gemini'
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AgentCardProps {
  agent: Agent
  locked?: boolean
  onClick?: () => void
}

export interface AgentGridProps {
  agents: Agent[]
  isLoading?: boolean
  selectedCategory?: string
  onAgentSelect?: (agent: Agent) => void
}
