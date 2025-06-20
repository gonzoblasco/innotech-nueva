import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Crear cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ===== GESTIÓN DE USUARIOS =====

export async function upsertUser(clerkUser) {
  try {
    console.log('👤 Upserting user:', clerkUser.id)

    const { data, error } = await supabase
      .from('users')
      .upsert(
        {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          first_name: clerkUser.firstName,
          last_name: clerkUser.lastName,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()
      .single()

    if (error) {
      console.error('❌ Error upserting user:', error)
      return null
    }

    console.log('✅ User upserted successfully')
    return data
  } catch (err) {
    console.error('💥 Exception in upsertUser:', err)
    return null
  }
}

export async function getUserById(userId) {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()

    if (error && error.code !== 'PGRST116') {
      console.error('❌ Error getting user:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('💥 Exception in getUserById:', err)
    return null
  }
}

// ===== GESTIÓN DE CONVERSACIONES =====

export async function getOrCreateConversation(userId, agentId) {
  try {
    console.log('💬 Getting/creating conversation:', { userId, agentId })

    // Buscar conversación existente
    const { data: existing, error: findError } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .eq('agent_id', agentId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (findError) {
      console.error('❌ Error finding conversation:', findError)
    }

    if (existing) {
      console.log('✅ Found existing conversation:', existing.id)
      return existing
    }

    // Crear nueva conversación
    console.log('📝 Creating new conversation')
    const { data: newConversation, error: createError } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        agent_id: agentId,
        title: `Chat con ${agentId}`,
      })
      .select()
      .single()

    if (createError) {
      console.error('❌ Error creating conversation:', createError)
      return null
    }

    console.log('✅ Conversation created:', newConversation.id)
    return newConversation
  } catch (err) {
    console.error('💥 Exception in getOrCreateConversation:', err)
    return null
  }
}

export async function getConversationMessages(conversationId) {
  try {
    console.log('📨 Getting messages for conversation:', conversationId)

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('❌ Error getting messages:', error)
      return []
    }

    console.log(`✅ Loaded ${data?.length || 0} messages`)
    return data || []
  } catch (err) {
    console.error('💥 Exception in getConversationMessages:', err)
    return []
  }
}

export async function saveMessage(conversationId, role, content, metadata = null) {
  try {
    console.log('💾 Saving message:', { conversationId, role, contentLength: content?.length })

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role,
        content,
        metadata,
      })
      .select()
      .single()

    if (error) {
      console.error('❌ Error saving message:', error)
      return null
    }

    // Actualizar timestamp de conversación
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId)

    console.log('✅ Message saved')
    return data
  } catch (err) {
    console.error('💥 Exception in saveMessage:', err)
    return null
  }
}

// ===== SISTEMA DE LÍMITES =====

export async function checkUserMessageLimit(userId) {
  try {
    const user = await getUserById(userId)

    if (!user) {
      return { canSend: false, remaining: 0, limit: 100, used: 0 }
    }

    const canSend = user.messages_used < user.messages_limit
    const remaining = user.messages_limit - user.messages_used

    return {
      canSend,
      remaining,
      limit: user.messages_limit,
      used: user.messages_used,
      plan: user.plan,
    }
  } catch (err) {
    console.error('💥 Exception in checkUserMessageLimit:', err)
    return { canSend: true, remaining: 100, limit: 100, used: 0 } // Fallback permisivo
  }
}

export async function incrementUserMessageCount(userId) {
  try {
    console.log('📊 Incrementing message count for user:', userId)

    // Verificar límite actual
    const limitCheck = await checkUserMessageLimit(userId)

    if (!limitCheck.canSend) {
      console.log('🚫 Message limit reached')
      return { success: false, ...limitCheck }
    }

    // Incrementar contador
    const { data, error } = await supabase
      .from('users')
      .update({
        messages_used: limitCheck.used + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('❌ Error incrementing message count:', error)
      return { success: false, ...limitCheck }
    }

    console.log('✅ Message count incremented')
    return {
      success: true,
      remaining: limitCheck.remaining - 1,
      limit: limitCheck.limit,
      used: limitCheck.used + 1,
      plan: limitCheck.plan,
    }
  } catch (err) {
    console.error('💥 Exception in incrementUserMessageCount:', err)
    return { success: true, remaining: 99, limit: 100, used: 1 } // Fallback permisivo
  }
}

// ===== GESTIÓN DE AGENTES =====

export async function getActiveAgents() {
  try {
    console.log('🤖 Getting active agents from Supabase...')

    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      console.error('❌ Error getting agents:', error)
      return []
    }

    console.log(`✅ Loaded ${data?.length || 0} active agents`)
    return data || []
  } catch (err) {
    console.error('💥 Exception in getActiveAgents:', err)
    return []
  }
}

export async function getAgentById(agentId) {
  try {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .eq('is_active', true)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('❌ Error getting agent:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('💥 Exception in getAgentById:', err)
    return null
  }
}

// ===== FUNCIONES DE UTILIDAD =====

export async function getUserConversations(userId, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select(
        `
        *,
        agents!inner(name, emoji)
      `
      )
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('❌ Error getting user conversations:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('💥 Exception in getUserConversations:', err)
    return []
  }
}

export async function deleteConversationMessages(conversationId) {
  try {
    console.log('🗑️ Deleting messages for conversation:', conversationId)

    const { error } = await supabase.from('messages').delete().eq('conversation_id', conversationId)

    if (error) {
      console.error('❌ Error deleting messages:', error)
      return false
    }

    console.log('✅ Messages deleted successfully')
    return true
  } catch (err) {
    console.error('💥 Exception in deleteConversationMessages:', err)
    return false
  }
}
