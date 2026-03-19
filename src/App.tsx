import { Header } from './components/Header'
import { DiagnosticPanel } from './components/DiagnosticPanel'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      <Header />
      <DiagnosticPanel />
    </div>
  )
}
