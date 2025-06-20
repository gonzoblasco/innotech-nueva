'use client'

import { getCategoryStyles } from '../lib/categories'

export default function AgentCard({ agent, onClick, locked = false }) {
  const categoryStyles = getCategoryStyles(agent.category || 'Sin Categoría')

  // Mapear gradientes estáticos para Tailwind
  const getGradientClass = (category) => {
    switch (category) {
      case 'Marketing':
        return 'bg-gradient-to-r from-blue-500 to-blue-700'
      case 'Productividad':
        return 'bg-gradient-to-r from-green-500 to-green-700'
      case 'Finanzas':
        return 'bg-gradient-to-r from-purple-500 to-purple-700'
      case 'Ventas':
        return 'bg-gradient-to-r from-red-500 to-red-700'
      case 'Legal':
        return 'bg-gradient-to-r from-indigo-500 to-indigo-700'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-700'
    }
  }

  return (
    <div
      onClick={!locked ? onClick : undefined}
      className={`relative group border rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl ${
        locked ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer transform hover:scale-105'
      }`}
    >
      {/* Lock overlay para usuarios no autenticados */}
      {locked && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 z-10">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Header con gradiente estático */}
      <div
        className={`${getGradientClass(agent.category)} p-6 text-white relative overflow-hidden`}
      >
        {/* Efecto de hover */}
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-300 ${
            !locked ? 'group-hover:opacity-10' : ''
          } opacity-0`}
        ></div>

        <div className="flex items-center mb-3 relative z-10">
          <span
            className={`text-3xl mr-3 transition-all duration-300 ${
              !locked ? 'group-hover:scale-110 group-hover:rotate-12' : ''
            }`}
          >
            {agent.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg transition-all duration-300 truncate">{agent.name}</h3>
            <p className="text-sm opacity-90 transition-all duration-300 truncate">{agent.title}</p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6 bg-white relative">
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {agent.description}
        </p>

        {/* Footer con categoría y CTA */}
        <div className="flex justify-between items-center">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryStyles.bgClass} ${categoryStyles.textClass}`}
          >
            <i className={`${categoryStyles.icon} mr-1 text-xs`}></i>
            {agent.category}
          </span>

          <div
            className={`text-sm font-medium transition-colors ${
              locked ? 'text-gray-400' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {locked ? (
              <span className="flex items-center">
                <i className="fas fa-lock mr-1 text-xs"></i>
                Login
              </span>
            ) : (
              <span className="flex items-center">
                <i className="fas fa-comments mr-1 text-xs"></i>
                Chatear
                <i className="fas fa-arrow-right ml-1 text-xs transition-transform group-hover:translate-x-1"></i>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
