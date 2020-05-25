import { toPercent } from './formHandler'

describe('toPercent', () => {
    test('It should be 50.12%', () => {
        const probability = 0.501241512125124124

        const result = toPercent(probability)

        expect(result).toBe('50.12%')
    })
})