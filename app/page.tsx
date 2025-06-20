import AgentGrid from '../components/AgentGrid'

export const metadata = {
  title: 'InnoTech Solutions - Netflix de Agentes Conversacionales para PyMEs',
  description:
    'Accedé a un catálogo de agentes de IA especializados para PyMEs, emprendedores y profesionales independientes argentinos.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">🚀 InnoTech Solutions</h1>
        </div>
      </div>

      {/* Grid de agentes */}
      <AgentGrid />
    </main>
  )
}
