import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Cliente para componentes del cliente
export const createClient = () => createClientComponentClient()

// Cliente para componentes del servidor
export const createServerClient = () => createServerComponentClient({ cookies })

// Cliente para route handlers
export const createRouteClient = () => createRouteHandlerClient({ cookies })