const RegexGenerator = require('./../src/index');

describe('RegexGenerator', () => {

    test('should generate regex for digits correctly', () => {
        const rg = new RegexGenerator();
        rg.addDigit({ count: 3 });
        expect(rg.build().toString()).toBe('/\\d{3}/');

        rg.addDigit({ count: 2, optional: true });
        expect(rg.build().toString()).toBe('/\\d{3}\\d{2}?/');
    });

    test('should generate regex for character patterns correctly', () => {
        const rg = new RegexGenerator();
        rg.addChar({ value: 'a' });
        expect(rg.build().toString()).toBe('/a/');

        rg.addChar({ value: 'b', optional: true });
        expect(rg.build().toString()).toBe('/ab?/');
    });

    test('should generate regex for character ranges correctly', () => {
        const rg = new RegexGenerator();
        rg.addRange({ from: 'a', to: 'z' });
        expect(rg.build().toString()).toBe('/[a-z]/');

        rg.addRange({ from: '0', to: '9', optional: true });
        expect(rg.build().toString()).toBe('/[a-z][0-9]?/');
    });

    test('should add custom text to the regex correctly', () => {
        const rg = new RegexGenerator();
        rg.addText('hello');
        expect(rg.build().toString()).toBe('/hello/');
    });

    test('should handle repetition patterns correctly', () => {
        const rg = new RegexGenerator();
        rg.addRepeat({ value: '\\d', min: 2, max: 4 });
        expect(rg.build().toString()).toBe('/\\d{2,4}/');
    });

    test('should set flags correctly', () => {
        const rg = new RegexGenerator();
        rg.setFlags({ caseInsensitive: true, global: true });
        expect(rg.build().toString()).toBe('/(?:)/gi');
    });

    test('should handle capturing groups correctly', () => {
        const rg = new RegexGenerator();
        rg.addCapturingGroup('\\d{2}');
        expect(rg.build().toString()).toBe('/(\\d{2})/');

        rg.addCapturingGroup('\\d{3}', true);
        expect(rg.build().toString()).toBe('/(\\d{2})(\\d{3})?/');
    });

    test('should handle non-capturing groups correctly', () => {
        const rg = new RegexGenerator();
        rg.addNonCapturingGroup('\\d{2}');
        expect(rg.build().toString()).toBe('/(?:\\d{2})/');

        rg.addNonCapturingGroup('\\d{3}', true);
        expect(rg.build().toString()).toBe('/(?:\\d{2})(?:\\d{3})?/');
    });

    test('should handle lookahead assertions correctly', () => {
        const rg = new RegexGenerator();
        rg.addLookahead('\\d{3}');
        expect(rg.build().toString()).toBe('/(?=\\d{3})/');
    });

    test('should handle negative lookahead assertions correctly', () => {
        const rg = new RegexGenerator();
        rg.addNegativeLookahead('\\d{3}');
        expect(rg.build().toString()).toBe('/(?!\\d{3})/');
    });

    test('should handle lookbehind assertions correctly', () => {
        const rg = new RegexGenerator();
        rg.addLookbehind('\\d{3}');
        expect(rg.build().toString()).toBe('/(?<=\\d{3})/');
    });

    test('should handle negative lookbehind assertions correctly', () => {
        const rg = new RegexGenerator();
        rg.addNegativeLookbehind('\\d{3}');
        expect(rg.build().toString()).toBe('/(?<!\\d{3})/');
    });

    test('should validate regex pattern correctly', () => {
        const rg = new RegexGenerator();
        rg.addDigit({ count: 3 });
        expect(() => rg.validatePattern()).not.toThrow();

        rg.addChar({ value: '[a-z' }); // Invalid pattern
        expect(() => rg.validatePattern()).toThrow('Invalid regex pattern:');
    });

    test('should validate email addresses correctly', () => {
        const emailRegex = RegexGenerator.email();
        expect(emailRegex.test('user@example.com')).toBe(true);
        expect(emailRegex.test('user123@company.net')).toBe(true);
        expect(emailRegex.test('user@com')).toBe(false);
        expect(emailRegex.test('user@.com')).toBe(false);
    });

    test('should validate whole numbers correctly', () => {
        const wholeNumbersRegex = RegexGenerator.wholeNumbers();
        expect(wholeNumbersRegex.test('123')).toBe(true);
        expect(wholeNumbersRegex.test('0')).toBe(true);
        expect(wholeNumbersRegex.test('-123')).toBe(false);
        expect(wholeNumbersRegex.test('12.34')).toBe(false);
    });

    test('should validate decimal numbers correctly', () => {
        const decimalNumberRegex = RegexGenerator.decimalNumber();
        expect(decimalNumberRegex.test('123.45')).toBe(true);
        expect(decimalNumberRegex.test('0.123')).toBe(true);
        expect(decimalNumberRegex.test('123')).toBe(true);
        expect(decimalNumberRegex.test('123.')).toBe(false);
        expect(decimalNumberRegex.test('.45')).toBe(false);
    });

    test('should validate alphabets only correctly', () => {
        const alphabetsRegex = RegexGenerator.alphabets();
        expect(alphabetsRegex.test('abc')).toBe(true);
        expect(alphabetsRegex.test('ABC')).toBe(true);
        expect(alphabetsRegex.test('abc123')).toBe(false);
        expect(alphabetsRegex.test('abc ')).toBe(false);
    });

    test('should validate dates in specific formats correctly', () => {
        const dateFormat = 'YYYY-MM-DD';
        const dateRegex = RegexGenerator.date(dateFormat);
        expect(dateRegex.test('2024-08-01')).toBe(true);
        expect(dateRegex.test('2024-02-29')).toBe(true); // Non-leap year date
        expect(dateRegex.test('2024-13-01')).toBe(false); // Invalid month
    });

    test('should validate any date format correctly', () => {
        const anyDateRegex = RegexGenerator.anyDate();
        expect(anyDateRegex.test('2024-08-01')).toBe(true); // Valid ISO 8601
        expect(anyDateRegex.test('01/08/2024')).toBe(true); // Valid MM/DD/YYYY
        expect(anyDateRegex.test('08/01/2024')).toBe(true); // Valid DD/MM/YYYY
        expect(anyDateRegex.test('2024-08-32')).toBe(true); // Recognized format but invalid date
        expect(anyDateRegex.test('Wed, 14 Jun 2017 07:00:00 GMT')).toBe(true); // Valid RFC 2822
        expect(anyDateRegex.test('31-Dec-2021')).toBe(true); // Valid date with month name
    });

    test('should validate URLs correctly', () => {
        const urlRegex = RegexGenerator.url();
        expect(urlRegex.test('https://www.example.com')).toBe(true);
        expect(urlRegex.test('http://example.com')).toBe(true);
        expect(urlRegex.test('example.com')).toBe(true);
        expect(urlRegex.test('ftp://example.com')).toBe(true); // Protocol is optional
    });

    test('should validate phone numbers correctly', () => {
        const phoneNumberRegex = RegexGenerator.phoneNumber();
        expect(phoneNumberRegex.test('+1-800-555-5555')).toBe(true); // International with country code and dashes
        expect(phoneNumberRegex.test('123-456-7890')).toBe(true); // Standard US format with dashes
        expect(phoneNumberRegex.test('555-5555')).toBe(true); // Local number without area code
        expect(phoneNumberRegex.test('1234567890')).toBe(true); // Continuous digits, valid length
        expect(phoneNumberRegex.test('123 456 7890')).toBe(true); // Spaces instead of dashes
        expect(phoneNumberRegex.test('+44 20 1234 5678')).toBe(true); // UK number with spaces
    });

    test('should validate UUIDs correctly', () => {
        const uuidRegex = RegexGenerator.uuid();
        expect(uuidRegex.test('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
        expect(uuidRegex.test('123e4567-e89b-12d3-a456-42661417400')).toBe(false); // Invalid UUID
    });

    test('should validate credit card numbers correctly', () => {
        const creditCardRegex = RegexGenerator.creditCard();
        expect(creditCardRegex.test('378282246310005')).toBe(true);
        expect(creditCardRegex.test('1234 5678 9012 3456')).toBe(false);
    });

    test('should validate IP addresses correctly', () => {
        const ipRegex = RegexGenerator.ipAddress();
        expect(ipRegex.test('192.168.1.1')).toBe(true); // IPv4
        expect(ipRegex.test('::1')).toBe(true); // IPv6
        expect(ipRegex.test('999.999.999.999')).toBe(false); // Invalid IPv4
        expect(ipRegex.test('12345::6789')).toBe(false); // Invalid IPv6
    });

    test('should validate Persian credit card numbers correctly', () => {
        expect(RegexGenerator.validatePersianCreditCard('6104338978668818')).toBe(true);
        expect(RegexGenerator.validatePersianCreditCard('6104338978668819')).toBe(false); // Invalid card number
        expect(RegexGenerator.validatePersianCreditCard('1234567812345678')).toBe(false); // Invalid card number
        expect(RegexGenerator.validatePersianCreditCard('6104 3389 7866 8818')).toBe(true); // With spaces
    });

});
