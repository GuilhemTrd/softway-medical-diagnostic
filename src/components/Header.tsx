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

export function Header() {
  return (
    <header className="bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex-shrink-0">
          <IconHeart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
            Softway Medical
          </h1>
          <p className="text-xs text-blue-600 font-medium tracking-wide uppercase">
            Cabine Auto-Diagnostic
          </p>
        </div>
      </div>
    </header>
  )
}
