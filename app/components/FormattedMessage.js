'use client';

export default function FormattedMessage({ content, isUser = false }) {
  // Para mensajes del usuario, mostrar texto simple
  if (isUser) {
    return (
      <div className="text-white">
        {content.split('\n').map((line, index) => (
          <div key={index}>
            {line}
            {index < content.split('\n').length - 1 && <br />}
          </div>
        ))}
      </div>
    );
  }

  // Para respuestas del agente, procesar markdown básico
  const processContent = (text) => {
    // Convertir bullet points
    text = text.replace(/^•\s(.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Convertir texto en negrita
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convertir saltos de línea
    text = text.replace(/\n\n/g, '</p><p>');
    text = text.replace(/\n/g, '<br>');
    
    // Envolver en párrafos
    if (!text.includes('<p>')) {
      text = `<p>${text}</p>`;
    }

    return text;
  };

  return (
    <div 
      className="prose prose-sm max-w-none text-gray-900"
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
    />
  );
}