/* eslint-disable @typescript-eslint/no-unused-vars */
import { createServerClient } from '@/lib/supabase'

export default async function TestDB() {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from('_supabase_migrations').select('*').limit(1)
    return (
      <div className="p-4">
        <h1>Conexión a Supabase</h1>
        {error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : (
          <p className="text-green-500">✅ Conexión exitosa</p>
        )}
      </div>
    )
  } catch (err) {
    return <p className="text-red-500">Error de conexión</p>
  }
}
