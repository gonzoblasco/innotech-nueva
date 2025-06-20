import '@testing-library/jest-dom'

// Mock fetch
global.fetch = jest.fn()

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useParams: () => ({}),
  usePathname: () => '/',
}))

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    isSignedIn: true,
    user: { id: 'test-user', firstName: 'Test' },
    isLoaded: true,
  }),
  UserButton: () => <div data-testid="user-button" />,
  SignInButton: ({ children }) => <div data-testid="sign-in-button">{children}</div>,
}))

// Global test utilities
global.testUtils = {
  mockAgent: {
    id: 'test-agent',
    name: 'Test Agent',
    title: 'Test Specialist',
    emoji: '🤖',
    description: 'Test agent description',
    category: 'Testing',
    welcome_message: 'Welcome to test!',
  },
}

beforeEach(() => {
  fetch.mockClear()
})
