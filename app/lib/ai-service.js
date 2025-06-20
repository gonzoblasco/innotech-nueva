import Anthropic from '@anthropic-ai/sdk'

class AIService {
  constructor() {
    if (!process.env.CLAUDE_API_KEY) {
      console.warn('⚠️ CLAUDE_API_KEY not configured - using mock responses')
      this.client = null
    } else {
      this.client = new Anthropic({
        apiKey: process.env.CLAUDE_API_KEY,
      })
    }
  }

  async sendMessage(messages, systemPrompt, maxTokens = 2000) {
    // Fallback a respuesta mock si no hay API key
    if (!this.client) {
      return this.getMockResponse()
    }

    try {
      console.log('🤖 Calling Claude API...')

      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        temperature: 0.7,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      })

      console.log('✅ Claude API response received')

      return {
        content: response.content[0].text,
        usage: response.usage,
      }
    } catch (error) {
      console.error('❌ Claude API Error:', error)

      // Fallback a respuesta de error amigable
      return {
        content:
          'Disculpá, estoy teniendo problemas técnicos en este momento. ¿Podés intentar reformular tu consulta?',
        error: true,
      }
    }
  }

  getMockResponse() {
    const responses = [
      'Gracias por tu consulta. Estoy aquí para ayudarte con estrategias específicas y recomendaciones prácticas.',
      'Entiendo tu situación. Basándome en mi experiencia, te sugiero que empecemos analizando...',
      'Excelente pregunta. Para darte la mejor recomendación, necesito entender mejor tu contexto específico.',
      'Esa es una consulta muy común y importante. Te puedo ayudar con un enfoque paso a paso.',
    ]

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      mock: true,
    }
  }
}

export const aiService = new AIService()
