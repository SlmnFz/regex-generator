const email = require('./generators/email');
const { wholeNumbers, decimalNumber } = require('./generators/number');
const alphabets = require('./generators/alphabets');
const { date, anyDate } = require('./generators/date');
const url = require('./generators/url');
const phoneNumber = require('./generators/phone');
const uuid = require('./generators/uuid');
const creditCard = require('./generators/creditCard');
const ip = require('./generators/ip');

/**
 * A class that generates various regular expressions for validation.
 */
class RegexGenerator {
    constructor() {
        this.patternParts = [];  // Array to store the pattern parts
        this.flags = '';         // String to store regex flags
    }

    /**
     * Adds a digit pattern to the regex.
     * 
     * @param {Object} options - Options for the digit pattern.
     * @param {number} [options.count=1] - The number of digits to include in the pattern.
     * @param {boolean} [options.optional=false] - Whether the digits are optional (default is false).
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addDigit({ count: 3 }); // Adds a pattern for exactly 3 digits.
     * reg.addDigit({ count: 2, optional: true }); // Adds an optional pattern for 2 digits.
     */
    addDigit({ count = 1, optional = false } = {}) {
        const part = `\\d{${count}}${optional ? '?' : ''}`;
        this.patternParts.push(part);
        return this;
    }

    /**
     * Adds a character pattern to the regex.
     * 
     * @param {Object} options - Options for the character pattern.
     * @param {string} options.value - The character value.
     * @param {boolean} [options.optional=false] - Whether the character is optional (default is false).
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addChar({ value: 'a' }); // Adds a pattern for the character 'a'.
     * reg.addChar({ value: 'b', optional: true }); // Adds an optional pattern for the character 'b'.
     */
    addChar({ value, optional = false } = {}) {
        const part = `${value}${optional ? '?' : ''}`;
        this.patternParts.push(part);
        return this;
    }

    /**
     * Adds a character range to the regex.
     * 
     * @param {Object} options - Options for the character range.
     * @param {string} options.from - The start of the character range.
     * @param {string} options.to - The end of the character range.
     * @param {boolean} [options.optional=false] - Whether the range is optional (default is false).
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addRange({ from: 'a', to: 'z' }); // Adds a pattern for characters from 'a' to 'z'.
     * reg.addRange({ from: '0', to: '9', optional: true }); // Adds an optional pattern for digits 0 to 9.
     */
    addRange({ from, to, optional = false } = {}) {
        const part = `[${from}-${to}]${optional ? '?' : ''}`;
        this.patternParts.push(part);
        return this;
    }


    /**
     * Adds custom text to the regex.
     * 
     * @param {string} text - The custom text to add to the regex pattern.
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addText('[abc]'); // Adds the text '[abc]' to the regex pattern.
     */
    addText(text) {
        this.patternParts.push(text);
        return this;
    }

    /**
     * Adds a repetition pattern to the regex.
     * 
     * @param {Object} options - Options for the repetition pattern.
     * @param {string} options.value - The pattern to repeat.
     * @param {number} options.min - The minimum number of repetitions.
     * @param {number} [options.max] - The maximum number of repetitions (optional).
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addRepeat({ value: '\\d', min: 2, max: 5 }); // Adds a pattern for 2 to 5 digits.
     */
    addRepeat({ value, min, max }) {
        const maxPart = max !== undefined ? `,${max}` : '';
        const part = `${value}{${min}${maxPart}}`;
        this.patternParts.push(part);
        return this;
    }

    /**
     * Sets flags for the regex.
     * 
     * @param {Object} options - Options for the regex flags.
     * @param {boolean} [options.caseInsensitive=false] - Case-insensitive matching (i flag).
     * @param {boolean} [options.global=false] - Global matching (g flag).
     * @param {boolean} [options.multiline=false] - Multiline mode (m flag).
     * @param {boolean} [options.unicode=false] - Unicode matching (u flag).
     * @param {boolean} [options.sticky=false] - Sticky mode (y flag).
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.setFlags({ caseInsensitive: true, global: true }); // Sets the regex to be case-insensitive and global.
     */
    setFlags({ caseInsensitive = false, global = false, multiline = false, unicode = false, sticky = false } = {}) {
        this.flags = `${caseInsensitive ? 'i' : ''}${global ? 'g' : ''}${multiline ? 'm' : ''}${unicode ? 'u' : ''}${sticky ? 'y' : ''}`;
        return this;
    }

    /**
     * Adds a capturing group to the regex.
     * 
     * @param {string} pattern - The pattern inside the capturing group.
     * @param {boolean} [optional=false] - Whether the group is optional (default is false).
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addCapturingGroup('\\d+', true); // Adds an optional capturing group for one or more digits.
     */
    addCapturingGroup(pattern, optional = false) {
        const part = `(${pattern})${optional ? '?' : ''}`;
        this.patternParts.push(part);
        return this;
    }

    /**
     * Adds a non-capturing group to the regex.
     * 
     * @param {string} pattern - The pattern inside the non-capturing group.
     * @param {boolean} [optional=false] - Whether the group is optional (default is false).
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addNonCapturingGroup('\\d+', true); // Adds an optional non-capturing group for one or more digits.
     */
    addNonCapturingGroup(pattern, optional = false) {
        const part = `(?:${pattern})${optional ? '?' : ''}`;
        this.patternParts.push(part);
        return this;
    }

    /**
     * Adds a lookahead assertion to the regex.
     * 
     * @param {string} pattern - The pattern for the lookahead assertion.
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addLookahead('\\d'); // Adds a lookahead assertion for a digit.
     */
    addLookahead(pattern) {
        const part = `(?=${pattern})`;
        this.patternParts.push(part);
        return this;
    }


    /**
     * Adds a negative lookahead assertion to the regex.
     * 
     * @param {string} pattern - The pattern for the negative lookahead assertion.
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addNegativeLookahead('\\d'); // Adds a negative lookahead assertion for a digit.
     */
    addNegativeLookahead(pattern) {
        const part = `(?!${pattern})`;
        this.patternParts.push(part);
        return this;
    }

    /**
     * Adds a lookbehind assertion to the regex.
     * 
     * @param {string} pattern - The pattern for the lookbehind assertion.
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addLookbehind('\\d'); // Adds a lookbehind assertion for a digit.
     */
    addLookbehind(pattern) {
        const part = `(?<=${pattern})`;
        this.patternParts.push(part);
        return this;
    }

    /**
     * Adds a negative lookbehind assertion to the regex.
     * 
     * @param {string} pattern - The pattern for the negative lookbehind assertion.
     * @returns {RegexGenerator} The current instance of RegexGenerator for chaining.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addNegativeLookbehind('\\d'); // Adds a negative lookbehind assertion for a digit.
     */
    addNegativeLookbehind(pattern) {
        const part = `(?<!${pattern})`;
        this.patternParts.push(part);
        return this;
    }


    /**
     * Builds and returns the final regex.
     * 
     * @returns {RegExp} The constructed regular expression based on the pattern parts and flags.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addDigit({ count: 3 }).setFlags({ caseInsensitive: true });
     * const regex = reg.build(); // Builds a regex for 3 digits with case-insensitive flag.
     */
    build() {
        this.validatePattern()
        const pattern = this.patternParts.join('');
        return new RegExp(pattern, this.flags);
    }

    /**
     * Validates the constructed regex pattern.
     * 
     * @throws {Error} Throws an error if the pattern is invalid.
     * 
     * @example
     * const reg = new RegexGenerator();
     * reg.addDigit({ count: 3 });
     * reg.validatePattern(); // Validates the constructed pattern.
     */
    validatePattern() {
        try {
            new RegExp(this.patternParts.join(''), this.flags);
        } catch (e) {
            throw new Error('Invalid regex pattern: ' + e.message);
        }
    }

    /**
     * Generates a regex for validating email addresses.
     * 
     * @returns {RegExp} The email validation regex.
     * 
     * @example
     * const emailRegex = RegexGenerator.email(); // Generates a regex for email validation.
     */
    static email() {
        return email();
    }

    /**
     * Generates a regex for validating whole numbers.
     * 
     * @returns {RegExp} The regex for validating whole numbers.
     * 
     * @example
     * const wholeNumberRegex = RegexGenerator.wholeNumbers(); // Generates a regex for whole number validation.
     */
    static wholeNumbers() {
        return wholeNumbers();
    }

    /**
     * Generates a regex for validating decimal numbers.
     * 
     * @returns {RegExp} The regex for validating decimal numbers.
     * 
     * @example
     * const decimalNumberRegex = RegexGenerator.decimalNumber(); // Generates a regex for decimal number validation.
     */
    static decimalNumber() {
        return decimalNumber();
    }

    /**
     * Generates a regex for validating alphabets only.
     * 
     * @returns {RegExp} The regex for validating alphabets.
     * 
     * @example
     * const alphabetsRegex = RegexGenerator.alphabets(); // Generates a regex for alphabet validation.
     */
    static alphabets() {
        return alphabets();
    }

    /**
     * Generates a regex for validating dates in a specified format.
     * 
     * @param {string} format - The date format (e.g., 'YYYY-MM-DD').
     * @returns {RegExp|null} The regex for validating dates in the specified format or null if format is unsupported.
     * 
     * @example
     * const dateRegex = RegexGenerator.date('YYYY-MM-DD'); // Generates a regex for dates in 'YYYY-MM-DD' format.
     */
    static date(format) {
        return date(format);
    }

    /**
     * Generates a regex for validating dates in common formats accepted by `new Date(input)`.
     * 
     * @returns {RegExp} The regex for validating dates in multiple formats.
     * 
     * @example
     * const anyDateRegex = RegexGenerator.anyDate(); // Generates a regex for dates in common formats.
     */
    static anyDate() {
        return anyDate();
    }

    /**
     * Composes multiple regex parts into a single regex pattern.
     * 
     * @param {Array} parts - Array of objects with pattern strings and descriptions.
     * @returns {RegExp} The composed regular expression.
     * 
     * @example
     * const composedRegex = RegexGenerator.compose([
     *     { pattern: '\\d+', description: 'one or more digits' },
     *     { pattern: '[A-Za-z]+', description: 'one or more letters' }
     * ]); // Generates a regex combining digits and letters.
     */
    static compose(parts) {
        const finalPattern = parts.map(part => part.pattern).join('');
        return new RegExp(finalPattern);
    }

    /**
     * Escapes special characters in a string to safely include it in a regex.
     * 
     * @param {string} str - The string to escape.
     * @returns {string} The escaped string.
     * 
     * @example
     * const escapedStr = RegexGenerator.escapeSpecialChars('a.b?*'); // Escapes special characters: 'a\\.b\\?\\*'
     */
    static escapeSpecialChars(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }


    /**
     * Generates a regex for validating a full URL (Protocol Optional).
     * 
     * @returns {RegExp} The regex for validating URLs.
     * 
     * @example
     * const urlRegex = RegexGenerator.url(); // Generates a regex for URL validation.
     */
    static url() {
        return url()
    }

    /**
     * Generates a regex for validating phone numbers.
     * 
     * @returns {RegExp} The regex for validating phone numbers.
     * 
     * @example
     * const phoneNumberRegex = RegexGenerator.phoneNumber(); // Generates a regex for phone number validation.
     */
    static phoneNumber() {
        return phoneNumber()
    }

    /**
     * Generates a regex for validating UUIDs.
     * 
     * @returns {RegExp} The regex for validating UUIDs.
     * 
     * @example
     * const uuidRegex = RegexGenerator.uuid(); // Generates a regex for UUID validation.
     */
    static uuid() {
        return uuid()
    }

    /**
     * Generates a regex for validating credit card numbers.
     * @returns {RegExp} The regex for validating credit card numbers.
     * 
     * @example
     * const creditCardRegex = RegexGenerator.creditCard(); // Generates a regex for Credit Card validation.
     */
    static creditCard() {
        return creditCard()
    }

    /**
     * Generates a regex for validating IP addresses (both v4 and v6).
     * 
     * @returns {RegExp} The regex for validating IP addresses.
     * 
     * @example
     * const ipAddressRegex = RegexGenerator.ipAddress(); // Generates a regex for IP address validation.
     */
    static ipAddress() {
        return ip()
    }

    /**
     * Validates a Persian credit card number.
     * 
     * @param {string} cardNumber - The credit card number to validate.
     * @returns {boolean} True if the card number is valid, otherwise false.
     * 
     * @example
     * const isValid = RegexGenerator.validatePersianCreditCard('6104338978668818'); // Validates the given Persian credit card number.
     */
    static validatePersianCreditCard(cardNumber) {
        // Remove non-numeric characters
        cardNumber = cardNumber.replace(/\D/g, '');

        if (cardNumber.length !== 16) {
            return false; // Persian credit card numbers are 16 digits long
        }

        let sum = 0;

        // Iterate over the digits and apply the validation algorithm
        for (let i = 0; i < 16; i++) {
            let digit = parseInt(cardNumber[i], 10);
            if (i % 2 === 0) { // Even index (0-based, means odd position in 1-based)
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
        }

        return (sum % 10 === 0);
    }
}

module.exports = RegexGenerator;
