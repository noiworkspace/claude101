// ===== TESTING (Topic 5) =====
// Testing with Jest and React Testing Library

import { render, screen } from '@testing-library/react'
import AboutPage from './page'

describe('About Page', () => {
  it('renders the main heading', () => {
    render(<AboutPage />)
    const heading = screen.getByRole('heading', { name: /about claude ai/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays information about Claude', () => {
    render(<AboutPage />)
    expect(
      screen.getByText(/claude is an ai assistant created by anthropic/i)
    ).toBeInTheDocument()
  })

  it('shows all key features', () => {
    render(<AboutPage />)
    expect(screen.getByText(/long context window/i)).toBeInTheDocument()
    expect(screen.getByText(/code understanding/i)).toBeInTheDocument()
    expect(screen.getByText(/honest & helpful/i)).toBeInTheDocument()
    expect(screen.getByText(/safety focused/i)).toBeInTheDocument()
  })

  it('has navigation links', () => {
    render(<AboutPage />)
    const homeLink = screen.getByRole('link', { name: /back to home/i })
    const chatLink = screen.getByRole('link', {
      name: /try interactive demo/i,
    })

    expect(homeLink).toHaveAttribute('href', '/')
    expect(chatLink).toHaveAttribute('href', '/chat')
  })

  it('displays information about Anthropic', () => {
    render(<AboutPage />)
    expect(screen.getByText(/about anthropic/i)).toBeInTheDocument()
    expect(
      screen.getByText(/ai safety company focused on building reliable/i)
    ).toBeInTheDocument()
  })
})
