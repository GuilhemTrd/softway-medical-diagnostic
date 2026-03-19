import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DiagnosticPanel } from './DiagnosticPanel'

describe('DiagnosticPanel', () => {
  describe('Initial render', () => {
    it('renders the health index input', () => {
      render(<DiagnosticPanel />)
      expect(screen.getByLabelText('Indice de santé')).toBeInTheDocument()
    })

    it('renders the submit button disabled when input is empty', () => {
      render(<DiagnosticPanel />)
      expect(screen.getByRole('button', { name: /analyser/i })).toBeDisabled()
    })

    it('does not show a result on first render', () => {
      render(<DiagnosticPanel />)
      expect(
        screen.queryByRole('region', { name: /résultat/i }),
      ).not.toBeInTheDocument()
    })
  })

  describe('Diagnostic results', () => {
    it('shows Cardiologie for a multiple of 3 (e.g. 3)', async () => {
      render(<DiagnosticPanel />)
      await userEvent.type(screen.getByLabelText('Indice de santé'), '3')
      fireEvent.submit(screen.getByRole('button', { name: /analyser/i }).closest('form')!)
      expect(await screen.findByText('Cardiologie')).toBeInTheDocument()
    })

    it('shows Traumatologie for a multiple of 5 (e.g. 5)', async () => {
      render(<DiagnosticPanel />)
      await userEvent.type(screen.getByLabelText('Indice de santé'), '5')
      fireEvent.submit(screen.getByRole('button', { name: /analyser/i }).closest('form')!)
      expect(await screen.findByText('Traumatologie')).toBeInTheDocument()
    })

    it('shows both units for a multiple of 15 (e.g. 15)', async () => {
      render(<DiagnosticPanel />)
      await userEvent.type(screen.getByLabelText('Indice de santé'), '15')
      fireEvent.submit(screen.getByRole('button', { name: /analyser/i }).closest('form')!)
      expect(await screen.findByText('Cardiologie')).toBeInTheDocument()
      expect(await screen.findByText('Traumatologie')).toBeInTheDocument()
    })

    it('shows a neutral message for an index with no unit (e.g. 1)', async () => {
      render(<DiagnosticPanel />)
      await userEvent.type(screen.getByLabelText('Indice de santé'), '1')
      fireEvent.submit(screen.getByRole('button', { name: /analyser/i }).closest('form')!)
      expect(
        await screen.findByText(/aucune pathologie détectée/i),
      ).toBeInTheDocument()
    })
  })

  describe('Error handling', () => {
    it('shows an error when submitting a non-integer value', async () => {
      render(<DiagnosticPanel />)
      await userEvent.type(screen.getByLabelText('Indice de santé'), 'abc')
      fireEvent.submit(screen.getByRole('button', { name: /analyser/i }).closest('form')!)
      expect(
        await screen.findByRole('alert'),
      ).toBeInTheDocument()
    })

    it('shows an error for index 0 (invalid)', async () => {
      render(<DiagnosticPanel />)
      await userEvent.type(screen.getByLabelText('Indice de santé'), '0')
      fireEvent.submit(screen.getByRole('button', { name: /analyser/i }).closest('form')!)
      expect(await screen.findByRole('alert')).toBeInTheDocument()
    })

    it('clears the result when submitting again with invalid input', async () => {
      render(<DiagnosticPanel />)
      const input = screen.getByLabelText('Indice de santé')
      const form = screen.getByRole('button', { name: /analyser/i }).closest('form')!

      // First valid submission
      await userEvent.type(input, '3')
      fireEvent.submit(form)
      expect(await screen.findByText('Cardiologie')).toBeInTheDocument()

      // Then invalid submission
      await userEvent.clear(input)
      await userEvent.type(input, '0')
      fireEvent.submit(form)
      expect(screen.queryByText('Cardiologie')).not.toBeInTheDocument()
      expect(await screen.findByRole('alert')).toBeInTheDocument()
    })
  })

  describe('Reset', () => {
    it('resets the form when clicking "Nouvelle analyse"', async () => {
      render(<DiagnosticPanel />)
      await userEvent.type(screen.getByLabelText('Indice de santé'), '3')
      fireEvent.submit(screen.getByRole('button', { name: /analyser/i }).closest('form')!)
      expect(await screen.findByText('Cardiologie')).toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: /nouvelle analyse/i }))
      expect(screen.queryByText('Cardiologie')).not.toBeInTheDocument()
    })
  })
})
