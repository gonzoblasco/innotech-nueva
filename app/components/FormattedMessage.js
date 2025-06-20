'use client'

export default function FormattedMessage({ content, isUser = false }) {
  // Para mensajes del usuario, mostrar texto simple preservando saltos de línea
  if (isUser) {
    return (
      <div className="text-white whitespace-pre-wrap leading-relaxed">
        {content}
      </div>
    )
  }

  // Para respuestas del agente, procesar markdown y formateo especial
  const processContent = (text) => {
    let processed = text

    // Procesar títulos (## Título)
    processed = processed.replace(/^## (.+)$/gm, '<h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2 first:mt-0">$1</h3>')
    
    // Procesar subtítulos (### Subtítulo)
    processed = processed.replace(/^### (.+)$/gm, '<h4 class="text-base font-medium text-gray-700 mt-3 mb-1">$1</h4>')

    // Procesar texto en negrita (**texto**)
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    
    // Procesar texto en cursiva (*texto*)
    processed = processed.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')

    // Procesar código inline (`código`)
    processed = processed.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')

    // Procesar listas con bullet points (• item)
    const lines = processed.split('\n')
    let inList = false
    const processedLines = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        if (!inList) {
          processedLines.push('<ul class="list-none space-y-1 my-2">')
          inList = true
        }
        const listItem = line.replace(/^[•\-*]\s*/, '')
        processedLines.push(`<li class="flex items-start"><span class="text-blue-600 mr-2 mt-0.5">•</span><span>${listItem}</span></li>`)
      } else {
        if (inList) {
          processedLines.push('</ul>')
          inList = false
        }
        processedLines.push(line)
      }
    }
    
    if (inList) {
      processedLines.push('</ul>')
    }

    processed = processedLines.join('\n')

    // Procesar enlaces [texto](url)
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 underline">$1</a>')

    // Procesar saltos de línea dobles como párrafos
    processed = processed.replace(/\n\n+/g, '</p><p class="mb-3">')
    
    // Procesar saltos de línea simples como <br>
    processed = processed.replace(/\n/g, '<br>')

    // Procesar emojis y destacarlos un poco
    processed = processed.replace(/([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/gu, '<span class="text-lg">$1</span>')

    // Procesar texto destacado con 🎯, ⚡, etc.
    processed = processed.replace(/^(🎯|⚡|💡|📈|🚀|✅|❌|⚠️)\s*(.+)$/gm, '<div class="flex items-start space-x-2 my-2 p-2 bg-blue-50 rounded-lg"><span class="text-lg">$1</span><span class="text-gray-800">$2</span></div>')

    // Envolver en párrafo si no hay etiquetas de bloque
    if (!processed.includes('<h3>') && !processed.includes('<ul>') && !processed.includes('<div class="flex">') && !processed.includes('<p>')) {
      processed = `<p class="mb-3">${processed}</p>`
    } else if (!processed.startsWith('<')) {
      processed = `<p class="mb-3">${processed}</p>`
    }

    return processed
  }

  return (
    <div 
      className="prose prose-sm max-w-none text-gray-900 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
      style={{
        // Override prose styles para mejor integración
        '--tw-prose-body': 'rgb(17 24 39)',
        '--tw-prose-headings': 'rgb(17 24 39)',
        '--tw-prose-links': 'rgb(37 99 235)',
        '--tw-prose-code': 'rgb(17 24 39)',
        '--tw-prose-bullets': 'rgb(37 99 235)',
      }}
    />
  )
}