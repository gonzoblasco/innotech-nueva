// hooks/useChat.js
'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

export function useChat({ agent, onError }) {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Referencias para scroll y textarea
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Inicializar con mensaje de bienvenida
  useEffect(() => {
    if (agent?.welcome_message && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: agent.welcome_message,
          timestamp: new Date().toISOString(),
        },
      ])
    }
  }, [agent, messages.length])

  // Scroll suave al final
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [])

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, 120)
      textarea.style.height = `${newHeight}px`
    }
  }, [])

  // Enviar mensaje
  const sendMessage = useCallback(
    async (content) => {
      if (!content.trim() || isLoading) return

      const userMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date().toISOString(),
      }

      const updatedMessages = [...messages, userMessage]
      setMessages(updatedMessages)
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: updatedMessages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            agentId: agent?.id || 'marketing-digital',
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.message || 'Error en la respuesta del servidor')
        }

        // Formatear respuesta
        let messageContent = data.message
        if (data.mock) {
          messageContent = `🎭 **[Modo Demo - Sin API Key]**\n\n${messageContent}`
        }

        const aiResponse = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: messageContent,
          timestamp: new Date().toISOString(),
          usage: data.usage || null,
          mock: data.mock || false,
        }

        setMessages([...updatedMessages, aiResponse])
      } catch (err) {
        console.error('❌ Error en el chat:', err)
        setError(err.message)

        if (onError) {
          onError(err)
        }

        const errorMessage = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `❌ **Error técnico**\n\n${err.message}\n\n¿Podés intentar nuevamente en unos momentos?`,
          timestamp: new Date().toISOString(),
          isError: true,
        }

        setMessages([...updatedMessages, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [messages, isLoading, agent, onError]
  )

  // Limpiar chat
  const clearChat = useCallback(() => {
    setMessages(
      agent?.welcome_message
        ? [
            {
              id: 'welcome',
              role: 'assistant',
              content: agent.welcome_message,
              timestamp: new Date().toISOString(),
            },
          ]
        : []
    )
    setError(null)
  }, [agent])

  // Retry último mensaje
  const retryLastMessage = useCallback(() => {
    if (messages.length >= 2) {
      const lastUserMessage = messages.filter((m) => m.role === 'user').pop()

      if (lastUserMessage) {
        // Remover último mensaje de error si existe
        const filteredMessages = messages.filter((m) => !m.isError)
        setMessages(filteredMessages)
        setError(null)
        sendMessage(lastUserMessage.content)
      }
    }
  }, [messages, sendMessage])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    retryLastMessage,
    scrollToBottom,
    adjustTextareaHeight,
    messagesEndRef,
    textareaRef,
  }
}
