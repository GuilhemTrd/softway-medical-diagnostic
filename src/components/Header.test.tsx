import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders the brand name', () => {
    render(<Header />)
    expect(screen.getByText('Softway Medical')).toBeInTheDocument()
  })

  it('renders the product subtitle', () => {
    render(<Header />)
    expect(screen.getByText(/cabine auto-diagnostic/i)).toBeInTheDocument()
  })

  it('renders a header landmark', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
