// Categorías y sus estilos
export const CATEGORIES = {
  Marketing: {
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-700',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    icon: 'fas fa-bullhorn',
  },
  Productividad: {
    color: '#10B981',
    gradient: 'from-green-500 to-green-700',
    bgClass: 'bg-green-100',
    textClass: 'text-green-800',
    icon: 'fas fa-bolt',
  },
  Finanzas: {
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-700',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-800',
    icon: 'fas fa-dollar-sign',
  },
  'Sin Categoría': {
    color: '#64748B',
    gradient: 'from-slate-500 to-slate-700',
    bgClass: 'bg-slate-100',
    textClass: 'text-slate-800',
    icon: 'fas fa-robot',
  },
}

export function getCategoryStyles(category) {
  return CATEGORIES[category] || CATEGORIES['Sin Categoría']
}
