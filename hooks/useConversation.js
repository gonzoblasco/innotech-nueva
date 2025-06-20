// hooks/useConversation.js
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { getConversationMessages, getUserConversations } from '../lib/supabase'

export function useConversation(agentId) {
  const { user, isSignedIn } = useUser()
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar conversaciones del usuario
  const loadConversations = useCallback(async () => {
    if (!user?.id) return

    try {
      setIsLoading(true)
      console.log('📖 Loading user conversations...')

      const userConversations = await getUserConversations(user.id)
      setConversations(userConversations || [])

      console.log(`✅ Loaded ${userConversations?.length || 0} conversations`)
    } catch (err) {
      console.error('❌ Error loading conversations:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  // Cargar mensajes de una conversación específica
  const loadConversationMessages = useCallback(async (conversationId) => {
    if (!conversationId) return

    try {
      setIsLoading(true)
      console.log('📨 Loading conversation messages:', conversationId)

      const conversationMessages = await getConversationMessages(conversationId)

      // Convertir mensajes de BD al formato del componente
      const formattedMessages = conversationMessages.map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: msg.created_at,
        metadata: msg.metadata,
      }))

      setMessages(formattedMessages)
      console.log(`✅ Loaded ${formattedMessages.length} messages`)
    } catch (err) {
      console.error('❌ Error loading messages:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Buscar conversación existente con el agente
  const findExistingConversation = useCallback(
    (agentId) => {
      return conversations.find((conv) => conv.agents?.name && conv.agent_id === agentId)
    },
    [conversations]
  )

  // Crear nueva conversación
  const createConversation = useCallback(
    async (agentId, firstMessage = null) => {
      if (!user?.id || !agentId) return null

      try {
        console.log('💬 Creating new conversation...', { agentId, userId: user.id })

        // La conversación se creará automáticamente en el primer mensaje
        // Por ahora retornamos un objeto temporal
        const tempConversation = {
          id: `temp-${Date.now()}`,
          agent_id: agentId,
          user_id: user.id,
          title: `Nueva conversación`,
          created_at: new Date().toISOString(),
        }

        setCurrentConversation(tempConversation)
        return tempConversation
      } catch (err) {
        console.error('❌ Error creating conversation:', err)
        setError(err.message)
        return null
      }
    },
    [user?.id]
  )

  // Agregar mensaje al estado local
  const addMessage = useCallback((message) => {
    setMessages((prev) => [
      ...prev,
      {
        id: message.id || `temp-${Date.now()}`,
        role: message.role,
        content: message.content,
        timestamp: message.timestamp || new Date().toISOString(),
        metadata: message.metadata,
      },
    ])
  }, [])

  // Actualizar ID de conversación cuando se crea en el servidor
  const updateConversationId = useCallback((newConversationId) => {
    setCurrentConversation((prev) => ({
      ...prev,
      id: newConversationId,
    }))
  }, [])

  // Limpiar conversación actual
  const clearConversation = useCallback(() => {
    setCurrentConversation(null)
    setMessages([])
    setError(null)
  }, [])

  // Efecto para cargar conversaciones cuando el usuario cambia
  useEffect(() => {
    if (isSignedIn && user?.id) {
      loadConversations()
    } else {
      setConversations([])
      setCurrentConversation(null)
      setMessages([])
    }
  }, [isSignedIn, user?.id, loadConversations])

  // Efecto para buscar conversación existente con el agente
  useEffect(() => {
    if (agentId && conversations.length > 0) {
      const existing = findExistingConversation(agentId)
      if (existing) {
        setCurrentConversation(existing)
        loadConversationMessages(existing.id)
      }
    }
  }, [agentId, conversations, findExistingConversation, loadConversationMessages])

  return {
    // Estado
    conversations,
    currentConversation,
    messages,
    isLoading,
    error,

    // Acciones
    loadConversations,
    loadConversationMessages,
    createConversation,
    addMessage,
    updateConversationId,
    clearConversation,
    findExistingConversation,

    // Utilidades
    hasExistingConversation: !!findExistingConversation(agentId),
    conversationCount: conversations.length,
  }
}
