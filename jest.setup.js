// jest.setup.js - SETUP SIMPLE
import '@testing-library/jest-dom'

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Test response' }),
  })
)

// Mock Next.js
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  useParams: () => ({ agentId: 'test' }),
}))

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    isSignedIn: true,
    user: { firstName: 'Test' },
    isLoaded: true,
  }),
  UserButton: () => null,
}))
