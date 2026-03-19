# Softway Medical — Cabine Auto-Diagnostic

Application React simulant le système de traitement d'une cabine automatisée d'auto-diagnostic hospitalier.

## Contexte

La cabine dispose d'un capteur qui transmet un **indice de santé** (entier positif). Le système analyse cet indice et oriente le patient vers la ou les unités médicales concernées.

| Indice | Pathologie | Unité |
|--------|-----------|-------|
| Multiple de 3 | Problème cardiaque | Cardiologie |
| Multiple de 5 | Fracture | Traumatologie |
| Multiple de 3 et 5 | Les deux | Cardiologie, Traumatologie |

## Stack technique

- **React 19** + **TypeScript** (strict mode)
- **Vite 6** — dev server et bundler
- **Tailwind CSS 3** — styling
- **Jest 29** + **React Testing Library** — tests unitaires et composants

## Structure

```
src/
├── utils/
│   ├── diagnostic.ts        # Logique métier pure — getDiagnostic()
│   └── diagnostic.test.ts   # 22 tests unitaires (100% coverage)
├── components/
│   ├── Header.tsx            # Barre de navigation
│   ├── Header.test.tsx       # 3 tests
│   ├── DiagnosticPanel.tsx   # Carte de diagnostic
│   └── DiagnosticPanel.test.tsx # 11 tests composant
├── App.tsx                   # Point d'entrée
└── main.tsx                  # Montage React
```

## Lancer le projet

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # tests + couverture
npm run build     # build de production
```
