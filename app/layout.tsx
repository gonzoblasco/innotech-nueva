import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'InnoTech Solutions - Netflix de Agentes Conversacionales',
  description:
    'La primera plataforma que permite acceder a un catálogo de agentes de IA especializados para emprendedores y PyMEs latinos.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#2563eb',
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
          colorInputText: '#1f2937',
        },
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
          card: 'shadow-xl border',
          headerTitle: 'text-2xl font-bold text-gray-800',
          headerSubtitle: 'text-gray-600',
        },
      }}
    >
      <html lang="es-AR">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>"
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
