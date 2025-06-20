'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ChatInterface from '../../components/ChatInterface'

// Mock agents data
const MOCK_AGENTS = {
  'marketing-digital': {
    id: 'marketing-digital',
    name: 'Consultor de Marketing Digital',
    title: 'Especialista en PyMEs argentinas',
    emoji: '🎯',
    welcome_message:
      '¡Hola! Soy tu consultor de Marketing Digital especializado en PyMEs argentinas. 🇦🇷\n\nTe ayudo con estrategias que realmente funcionan con presupuestos ajustados:\n• Redes sociales que conviertan\n• Google y Facebook Ads efectivos\n• Email marketing y WhatsApp Business\n• SEO local\n\n**¿Qué tipo de negocio tenés y cuál es tu principal desafío de marketing ahora?**',
  },
  'mentor-productividad': {
    id: 'mentor-productividad',
    name: 'Mentor de Productividad',
    title: 'Para emprendedores overwhelmed',
    emoji: '⚡',
    welcome_message:
      '¡Hola! Soy tu mentor de productividad y entiendo perfectamente esa sensación de estar overwhelmed. 🧠\n\nTe ayudo con:\n• Gestión efectiva del tiempo\n• Sistemas de organización personal\n• Técnicas anti-procrastinación\n• Balance vida-trabajo\n\n**¿Cuál es tu mayor desafío de productividad en este momento?**',
  },
  'estratega-fundraising': {
    id: 'estratega-fundraising',
    name: 'Estratega de Fundraising',
    title: 'Levantamiento de capital LATAM',
    emoji: '💰',
    welcome_message:
      '¡Hola! Soy tu estratega de fundraising especializado en el ecosistema de inversión latinoamericano. 💰\n\nTe ayudo con:\n• Pitch decks que convencen\n• Valuaciones realistas\n• Términos sheets\n• Networking con inversores\n\n**¿En qué etapa está tu startup y cuánto capital buscás levantar?**',
  },
  'coach-ventas': {
    id: 'coach-ventas',
    name: 'Coach de Ventas B2B',
    title: 'Mercado enterprise argentino',
    emoji: '📈',
    welcome_message:
      '¡Hola! Soy tu coach de ventas B2B, especializado en el mercado enterprise argentino. 📈\n\nTe ayudo con:\n• Prospección efectiva\n• Técnicas de negociación\n• Cierre de deals grandes\n• Gestión de CRM\n\n**¿Cuál es tu producto/servicio y qué desafío de ventas tenés ahora?**',
  },
  'asesor-legal': {
    id: 'asesor-legal',
    name: 'Asesor Legal para Startups',
    title: 'Derecho empresarial argentino',
    emoji: '⚖️',
    welcome_message:
      '¡Hola! Soy tu asesor legal especializado en derecho empresarial argentino para startups. ⚖️\n\nTe ayudo con:\n• Constitución de sociedades\n• Contratos y acuerdos\n• Propiedad intelectual\n• Compliance y regulaciones\n\n**¿Qué aspecto legal de tu startup necesitás resolver?**',
  },
}

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const agentId = params.agentId

    // Simular carga de agente
    setTimeout(() => {
      const foundAgent = MOCK_AGENTS[agentId]

      if (foundAgent) {
        setAgent(foundAgent)
      } else {
        // Agente no encontrado, redirigir
        router.push('/')
        return
      }

      setLoading(false)
    }, 500)
  }, [params.agentId, router])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando agente...</p>
        </div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Agente no encontrado</p>
          <button onClick={() => router.push('/')} className="text-blue-600 hover:text-blue-700">
            ← Volver a la galería
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="h-screen flex flex-col bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex-shrink-0 bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
          <button
            onClick={() => router.push('/')}
            className="hover:text-blue-600 transition-colors"
          >
            🏠 Galería de Agentes
          </button>
          <span className="mx-2">•</span>
          <span className="text-gray-700">{agent.name}</span>
        </div>
      </div>

      {/* Chat interface */}
      <div className="flex-1 min-h-0">
        <div className="h-full max-w-7xl mx-auto">
          <div className="bg-white h-full shadow-sm">
            <ChatInterface agent={agent} />
          </div>
        </div>
      </div>
    </main>
  )
}
