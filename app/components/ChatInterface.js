'use client'

import { useState, useRef, useEffect } from 'react'
import FormattedMessage from './FormattedMessage'

export default function ChatInterface({ agent }) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll automático al final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mensaje de bienvenida inicial
  useEffect(() => {
    if (agent?.welcome_message) {
      setMessages([
        {
          role: 'assistant',
          content: agent.welcome_message,
        },
      ])
    }
  }, [agent])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = { role: 'user', content: inputMessage }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInputMessage('')
    setIsLoading(true)

    try {
      // Simular respuesta del AI (por ahora)
      setTimeout(() => {
        const aiResponse = {
          role: 'assistant',
          content: `Gracias por tu consulta. Como ${
            agent?.name || 'tu agente especializado'
          }, puedo ayudarte con:\n\n• Estrategias específicas\n• Análisis detallado\n• Recomendaciones prácticas\n\n¿Podrías darme más detalles sobre tu situación específica?`,
        }

        setMessages([...updatedMessages, aiResponse])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error('Error:', error)
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: 'Disculpá, hubo un error técnico. ¿Podés intentar de nuevo?',
        },
      ])
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header del chat */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{agent?.emoji || '🤖'}</div>
          <div>
            <h1 className="font-semibold text-gray-900">{agent?.name || 'Agente Especializado'}</h1>
            <p className="text-sm text-gray-500">{agent?.title || 'Listo para ayudarte'}</p>
          </div>
        </div>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-[80%] space-x-3">
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {agent?.emoji || '🤖'}
                  </div>
                )}

                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white ml-auto'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <FormattedMessage content={message.content} isUser={message.role === 'user'} />
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    U
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {agent?.emoji || '🤖'}
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Mensaje a ${agent?.name || 'tu agente'}...`}
                className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={1}
                style={{
                  minHeight: '44px',
                  maxHeight: '120px',
                }}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors ${
                isLoading || !inputMessage.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            Presiona Enter para enviar • Shift+Enter para nueva línea
          </div>
        </div>
      </div>
    </div>
  )
}
