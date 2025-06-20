'use client'

import { useState, useEffect } from 'react'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import AgentCard from './AgentCard'

// Mock agents data (luego conectaremos con Supabase)
const MOCK_AGENTS = [
  {
    id: 'marketing-digital',
    name: 'Consultor de Marketing Digital',
    title: 'Especialista en PyMEs argentinas',
    emoji: '🎯',
    description:
      'Experto en marketing digital para PyMEs argentinas. Te ayudo con estrategias de redes sociales, Google Ads, Facebook Ads, email marketing y WhatsApp Business.',
    category: 'Marketing',
  },
  {
    id: 'mentor-productividad',
    name: 'Mentor de Productividad',
    title: 'Para emprendedores overwhelmed',
    emoji: '⚡',
    description:
      'Especialista en productividad para emprendedores que se sienten abrumados. Te ayudo con gestión del tiempo, sistemas de organización y técnicas anti-procrastinación.',
    category: 'Productividad',
  },
  {
    id: 'estratega-fundraising',
    name: 'Estratega de Fundraising',
    title: 'Levantamiento de capital LATAM',
    emoji: '💰',
    description:
      'Especialista en levantamiento de capital para startups latinoamericanas. Te ayudo con pitch decks, valuaciones, términos sheets y networking con inversores.',
    category: 'Finanzas',
  },
  {
    id: 'coach-ventas',
    name: 'Coach de Ventas B2B',
    title: 'Mercado enterprise argentino',
    emoji: '📈',
    description:
      'Especialista en ventas B2B para el mercado enterprise argentino. Te ayudo con prospección, técnicas de negociación, cierre de deals y gestión de CRM.',
    category: 'Ventas',
  },
  {
    id: 'asesor-legal',
    name: 'Asesor Legal para Startups',
    title: 'Derecho empresarial argentino',
    emoji: '⚖️',
    description:
      'Especialista en aspectos legales para startups argentinas. Te ayudo con constitución de sociedades, contratos, propiedad intelectual y compliance.',
    category: 'Legal',
  },
]

export default function AgentGrid() {
  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter()
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setAgents(MOCK_AGENTS)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAgentClick = (agent) => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    router.push(`/chat/${agent.id}`)
  }

  if (!isLoaded || loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Netflix de Agentes Conversacionales
          </h1>
          <p className="text-xl text-gray-600">Cargando agentes especializados...</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header con auth real */}
      <div className="text-center mb-12">
        {isSignedIn && user ? (
          <div>
            <div className="flex justify-end mb-4">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                    userButtonPopoverCard: 'shadow-xl border',
                    userButtonPopoverActionButton: 'hover:bg-gray-50',
                  },
                }}
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              ¡Hola {user.firstName}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              {agents.length} agentes especializados disponibles
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Netflix de Agentes Conversacionales
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Elegí tu experto ideal para PyMEs y emprendedores
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-blue-800 mb-4">
                <i className="fas fa-sign-in-alt mr-2"></i>
                Iniciá sesión para acceder a todos los agentes
              </p>
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <i className="fas fa-user-plus mr-2"></i>
                  Crear Cuenta Gratis
                </button>
              </SignInButton>
            </div>
          </div>
        )}
      </div>

      {/* Grid de agentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onClick={() => handleAgentClick(agent)}
            locked={!isSignedIn}
          />
        ))}
      </div>

      {/* Footer informativo */}
      {!isSignedIn && (
        <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2 font-semibold">
            <i className="fas fa-question-circle mr-2"></i>
            ¿Cómo funciona?
          </p>
          <p className="text-sm text-gray-500">
            <span className="block sm:inline">
              <i className="fas fa-user-plus mr-1"></i>
              1. Creá tu cuenta •
            </span>
            <span className="block sm:inline">
              <i className="fas fa-mouse-pointer mx-1"></i>
              2. Elegí el agente •
            </span>
            <span className="block sm:inline">
              <i className="fas fa-comments mx-1"></i>
              3. Chateá como consultoría
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
