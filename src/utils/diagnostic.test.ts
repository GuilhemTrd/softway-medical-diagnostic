import { getDiagnostic, MEDICAL_UNITS } from './diagnostic'

describe('getDiagnostic', () => {
  describe('Cardiologie — multiples of 3 only', () => {
    it('returns Cardiologie for 3', () => {
      const result = getDiagnostic(3)
      expect(result.units).toEqual([MEDICAL_UNITS.CARDIOLOGY])
      expect(result.label).toBe('Cardiologie')
    })

    it('returns Cardiologie for 6', () => {
      const result = getDiagnostic(6)
      expect(result.units).toEqual([MEDICAL_UNITS.CARDIOLOGY])
    })

    it('returns Cardiologie for 9', () => {
      const result = getDiagnostic(9)
      expect(result.units).toEqual([MEDICAL_UNITS.CARDIOLOGY])
    })

    it('returns Cardiologie for 99', () => {
      const result = getDiagnostic(99)
      expect(result.units).toEqual([MEDICAL_UNITS.CARDIOLOGY])
    })
  })

  describe('Traumatologie — multiples of 5 only', () => {
    it('returns Traumatologie for 5', () => {
      const result = getDiagnostic(5)
      expect(result.units).toEqual([MEDICAL_UNITS.TRAUMATOLOGY])
      expect(result.label).toBe('Traumatologie')
    })

    it('returns Traumatologie for 10 is excluded (multiple of both)', () => {
      // 10 is 2*5 but not 3*n — it IS only multiple of 5
      const result = getDiagnostic(10)
      expect(result.units).toEqual([MEDICAL_UNITS.TRAUMATOLOGY])
    })

    it('returns Traumatologie for 25', () => {
      const result = getDiagnostic(25)
      expect(result.units).toEqual([MEDICAL_UNITS.TRAUMATOLOGY])
    })

    it('returns Traumatologie for 50', () => {
      const result = getDiagnostic(50)
      expect(result.units).toEqual([MEDICAL_UNITS.TRAUMATOLOGY])
    })
  })

  describe('Both units — multiples of 15 (LCM of 3 and 5)', () => {
    it('returns both units for 15', () => {
      const result = getDiagnostic(15)
      expect(result.units).toContain(MEDICAL_UNITS.CARDIOLOGY)
      expect(result.units).toContain(MEDICAL_UNITS.TRAUMATOLOGY)
      expect(result.units).toHaveLength(2)
    })

    it('returns both units for 30', () => {
      const result = getDiagnostic(30)
      expect(result.units).toContain(MEDICAL_UNITS.CARDIOLOGY)
      expect(result.units).toContain(MEDICAL_UNITS.TRAUMATOLOGY)
    })

    it('returns both units for 45', () => {
      const result = getDiagnostic(45)
      expect(result.units).toContain(MEDICAL_UNITS.CARDIOLOGY)
      expect(result.units).toContain(MEDICAL_UNITS.TRAUMATOLOGY)
    })

    it('builds the correct label for 15', () => {
      const result = getDiagnostic(15)
      expect(result.label).toBe('Cardiologie, Traumatologie')
    })
  })

  describe('No specific unit — neither multiple of 3 nor 5', () => {
    it('returns no units for 1', () => {
      const result = getDiagnostic(1)
      expect(result.units).toHaveLength(0)
      expect(result.label).toBe('Aucune orientation spécifique')
    })

    it('returns no units for 2', () => {
      expect(getDiagnostic(2).units).toHaveLength(0)
    })

    it('returns no units for 4', () => {
      expect(getDiagnostic(4).units).toHaveLength(0)
    })

    it('returns no units for 7', () => {
      expect(getDiagnostic(7).units).toHaveLength(0)
    })

    it('returns no units for 11', () => {
      expect(getDiagnostic(11).units).toHaveLength(0)
    })

    it('returns no units for 14', () => {
      expect(getDiagnostic(14).units).toHaveLength(0)
    })
  })

  describe('Input validation', () => {
    it('throws RangeError for 0', () => {
      expect(() => getDiagnostic(0)).toThrow(RangeError)
    })

    it('throws RangeError for negative numbers', () => {
      expect(() => getDiagnostic(-3)).toThrow(RangeError)
      expect(() => getDiagnostic(-15)).toThrow(RangeError)
    })

    it('throws RangeError for floating-point numbers', () => {
      expect(() => getDiagnostic(3.5)).toThrow(RangeError)
      expect(() => getDiagnostic(15.0001)).toThrow(RangeError)
    })

    it('throws with the correct error message', () => {
      expect(() => getDiagnostic(0)).toThrow(
        'Health index must be a positive integer',
      )
    })
  })
})
