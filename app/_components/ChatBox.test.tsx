import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatBox from './ChatBox'

// Mock fetch API
global.fetch = jest.fn()

describe('ChatBox Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    ;(global.fetch as jest.Mock).mockReset()
  })

  it('renders the chat interface', () => {
    render(<ChatBox />)
    expect(screen.getByText(/chat with claude/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument()
  })

  it('displays initial welcome message', () => {
    render(<ChatBox />)
    expect(screen.getByText(/hi! i am claude/i)).toBeInTheDocument()
  })

  it('allows user to type a message', async () => {
    const user = userEvent.setup()
    render(<ChatBox />)

    const input = screen.getByPlaceholderText(/type your message/i)
    await user.type(input, 'Hello Claude!')

    expect(input).toHaveValue('Hello Claude!')
  })

  it('sends message when send button is clicked', async () => {
    const user = userEvent.setup()

    // Mock successful API response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        reply: 'Hello! How can I help you?',
        timestamp: new Date().toISOString(),
      }),
    })

    render(<ChatBox />)

    const input = screen.getByPlaceholderText(/type your message/i)
    const sendButton = screen.getByRole('button', { name: /send/i })

    await user.type(input, 'Hello')
    await user.click(sendButton)

    // Check that user message appears
    expect(screen.getByText('Hello')).toBeInTheDocument()

    // Wait for API response
    await waitFor(() => {
      expect(screen.getByText(/hello! how can i help you/i)).toBeInTheDocument()
    })
  })

  it('shows typing indicator while waiting for response', async () => {
    const user = userEvent.setup()

    // Mock delayed response
    ;(global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ reply: 'Test reply' }),
              }),
            100
          )
        )
    )

    render(<ChatBox />)

    const input = screen.getByPlaceholderText(/type your message/i)
    const sendButton = screen.getByRole('button', { name: /send/i })

    await user.type(input, 'Test')
    await user.click(sendButton)

    // Check for typing indicator
    expect(screen.getByText(/claude is typing/i)).toBeInTheDocument()
  })

  it('clears input after sending message', async () => {
    const user = userEvent.setup()

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: 'Test' }),
    })

    render(<ChatBox />)

    const input = screen.getByPlaceholderText(
      /type your message/i
    ) as HTMLInputElement
    await user.type(input, 'Test message')
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(input.value).toBe('')
  })
})
