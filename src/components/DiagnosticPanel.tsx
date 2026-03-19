import { useState, type FormEvent, type ReactElement } from 'react'
import { getDiagnostic, type DiagnosticResult, MEDICAL_UNITS } from '../utils/diagnostic'

function IconHeart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )
}

function IconBone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 3a3 3 0 00-3 3c0 .601.176 1.16.48 1.63L3.63 10.48A3 3 0 106.52 13.37l2.85-2.85a3 3 0 104.26-4.26L10.78 3.41A3.001 3.001 0 009 3zM15 21a3 3 0 003-3c0-.601-.176-1.16-.48-1.63l2.85-2.85a3 3 0 10-2.89-2.89l-2.85 2.85A3 3 0 1015 21z"
      />
    </svg>
  )
}

const UNIT_ICONS: Record<string, ReactElement> = {
  [MEDICAL_UNITS.CARDIOLOGY]: <IconHeart className="w-5 h-5" />,
  [MEDICAL_UNITS.TRAUMATOLOGY]: <IconBone className="w-5 h-5" />,
}

const UNIT_COLORS: Record<string, string> = {
  [MEDICAL_UNITS.CARDIOLOGY]: 'bg-red-50 border-red-200 text-red-800',
  [MEDICAL_UNITS.TRAUMATOLOGY]: 'bg-amber-50 border-amber-200 text-amber-800',
}

export function DiagnosticPanel() {
  const [inputValue, setInputValue] = useState<string>('')
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    const parsed = parseInt(inputValue, 10)

    if (isNaN(parsed)) {
      setError('Veuillez saisir un nombre entier valide.')
      return
    }

    try {
      setResult(getDiagnostic(parsed))
    } catch {
      setError("L'indice de santé doit être un entier strictement positif.")
    }
  }

  const handleReset = () => {
    setInputValue('')
    setResult(null)
    setError(null)
  }

  return (
    <main className="flex-1 flex items-start justify-center px-4 pt-10 sm:pt-16 pb-12">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-5 sm:py-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Analyse de l'indice de santé
            </h2>
            <p className="mt-1 text-blue-200 text-sm">
              Le capteur a transmis un indice. Lancez l'analyse pour
              identifier l'unité médicale concernée.
            </p>
          </div>

          {/* Card body */}
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <form onSubmit={handleSubmit} noValidate>
              <label
                htmlFor="health-index"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Indice de santé
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="health-index"
                  type="number"
                  min={1}
                  step={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ex. : 15"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-900
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent transition-shadow text-lg font-medium"
                  aria-describedby={error ? 'input-error' : undefined}
                  aria-invalid={error !== null}
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700
                    active:bg-blue-800 text-white font-semibold rounded-xl transition-colors
                    duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:ring-offset-2 disabled:opacity-50"
                  disabled={inputValue.trim() === ''}
                >
                  Analyser
                </button>
              </div>

              {/* Inline error */}
              {error && (
                <p
                  id="input-error"
                  role="alert"
                  className="mt-3 text-sm text-red-600 flex items-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              )}
            </form>

            {/* Result */}
            {result && (
              <div
                className="mt-8"
                role="region"
                aria-label="Résultat du diagnostic"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Unité(s) de prise en charge
                  </h3>
                  <button
                    onClick={handleReset}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Nouvelle analyse
                  </button>
                </div>

                {result.units.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-600 text-sm">
                    Aucune pathologie détectée pour cet indice.
                  </div>
                ) : (
                  <ul className="space-y-3" aria-label="Unités médicales">
                    {result.units.map((unit) => (
                      <li
                        key={unit}
                        className={`flex items-center gap-3 border rounded-xl px-5 py-4 font-semibold text-base ${UNIT_COLORS[unit] ?? 'bg-blue-50 border-blue-200 text-blue-800'}`}
                      >
                        {UNIT_ICONS[unit]}
                        {unit}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Diagnostic transmis par le capteur de la cabine automatisée.
          Veuillez vous rendre dans l'unité indiquée.
        </p>
      </div>
    </main>
  )
}
