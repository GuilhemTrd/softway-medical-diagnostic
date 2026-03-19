/**
 * Medical units available for patient redirection.
 */
export const MEDICAL_UNITS = {
  CARDIOLOGY: 'Cardiologie',
  TRAUMATOLOGY: 'Traumatologie',
} as const

export type MedicalUnit = (typeof MEDICAL_UNITS)[keyof typeof MEDICAL_UNITS]

/**
 * Diagnostic result returned for a given health index.
 */
export interface DiagnosticResult {
  units: MedicalUnit[]
  label: string
}

/**
 * Pure function that computes which medical unit(s) a patient should be
 * redirected to based on their health index.
 *
 * Rules:
 *  - Multiple of 3       → Cardiologie
 *  - Multiple of 5       → Traumatologie
 *  - Multiple of 3 and 5 → Cardiologie + Traumatologie
 *
 * @param index - The patient's health index (positive integer)
 * @returns A DiagnosticResult describing the target unit(s)
 * @throws {RangeError} If the index is not a positive integer
 */
export function getDiagnostic(index: number): DiagnosticResult {
  if (!Number.isInteger(index) || index <= 0) {
    throw new RangeError('Health index must be a positive integer')
  }

  const isMultipleOf3 = index % 3 === 0
  const isMultipleOf5 = index % 5 === 0

  if (isMultipleOf3 && isMultipleOf5) {
    return {
      units: [MEDICAL_UNITS.CARDIOLOGY, MEDICAL_UNITS.TRAUMATOLOGY],
      label: `${MEDICAL_UNITS.CARDIOLOGY}, ${MEDICAL_UNITS.TRAUMATOLOGY}`,
    }
  }

  if (isMultipleOf3) {
    return {
      units: [MEDICAL_UNITS.CARDIOLOGY],
      label: MEDICAL_UNITS.CARDIOLOGY,
    }
  }

  if (isMultipleOf5) {
    return {
      units: [MEDICAL_UNITS.TRAUMATOLOGY],
      label: MEDICAL_UNITS.TRAUMATOLOGY,
    }
  }

  return {
    units: [],
    label: 'Aucune orientation spécifique',
  }
}
