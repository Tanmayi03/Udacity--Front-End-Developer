import { validateUrl } from './urlValidator'

describe('urlValidator', () => {
    test('Should not match', () => {
        const url = 'fsadfasfassom';
        const result = validateUrl(url);
        expect(result).toBe(false);
    })

    test('Should match without explicitly written http or https protocols', () => {
        const url = 'example.com';
        const result = validateUrl(url);
        expect(result).toBe(true);
    })

    test('It should match', () => {
        const url = 'https://example.com';
        const result = validateUrl(url);
        expect(result).toBe(true);
    })
})