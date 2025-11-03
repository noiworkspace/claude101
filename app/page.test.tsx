import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('renders the welcome heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /welcome to claude 101/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('displays the project description', () => {
    render(<Home />)
    const description = screen.getByText(
      /a complete next\.js learning project with typescript/i
    )
    expect(description).toBeInTheDocument()
  })

  it('shows learning modules', () => {
    render(<Home />)
    expect(screen.getAllByText(/about claude/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/interactive chat/i)).toBeInTheDocument()
    expect(screen.getAllByText(/data fetching/i).length).toBeGreaterThan(0)
  })

  it('has navigation links to all pages', () => {
    render(<Home />)
    const aboutLink = screen.getByRole('link', { name: /about claude/i })
    const chatLink = screen.getByRole('link', { name: /interactive chat/i })
    const factsLink = screen.getByRole('link', { name: /data fetching/i })

    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(chatLink).toHaveAttribute('href', '/chat')
    expect(factsLink).toHaveAttribute('href', '/facts')
  })
})
