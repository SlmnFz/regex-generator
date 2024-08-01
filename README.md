# RegexGenerator

`RegexGenerator` is a JavaScript class that helps in constructing various regular expressions for validation purposes. It provides methods to build regex patterns dynamically with options for digits, characters, ranges, repetitions, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Methods](#methods)
- [Static Methods](#static-methods)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [FAQ](#faq)

## Features

- **Digit Patterns**: Add patterns for digits with specific counts and optional settings.
- **Character Patterns**: Add specific characters or character ranges.
- **Custom Text**: Include custom text in the regex.
- **Repetitions**: Add patterns for repeated sequences.
- **Flags**: Set regex flags for case-insensitivity, global matching, and more.
- **Groups**: Include capturing and non-capturing groups, as well as lookaheads and lookbehinds.
- **Static Methods**: Predefined regex generators for email, numbers, alphabets, dates, URLs, phone numbers, UUIDs, credit cards, and IP addresses.
- **Persian Credit Card Validation**: Validate Persian credit card numbers using a specific algorithm.

## Installation

You can install `RegexGenerator` via npm:

```sh
npm install regex-gen
```

## Usage

Here's a quick overview of how to use `RegexGenerator`:

### Creating a Regex Pattern

```javascript
const RegexGenerator = require('regex-gen');

const reg = new RegexGenerator();
reg.addDigit({ count: 3 })
   .addChar({ value: '-' })
   .addDigit({ count: 2, optional: true })
   .setFlags({ caseInsensitive: true });

const regex = reg.build(); // Builds regex: /\\d{3}-\\d{2}?/i
```

### Using Static Methods

```javascript
const emailRegex = RegexGenerator.email();
const urlRegex = RegexGenerator.url();
const isValid = RegexGenerator.validatePersianCreditCard('6104338978668818');
```

## Methods

### `addDigit({ count, optional })`
Adds a digit pattern to the regex.

### `addChar({ value, optional })`
Adds a character pattern to the regex.

### `addRange({ from, to, optional })`
Adds a character range to the regex.

### `addText(text)`
Adds custom text to the regex.

### `addRepeat({ value, min, max })`
Adds a repetition pattern to the regex.

### `setFlags({ caseInsensitive, global, multiline, unicode, sticky })`
Sets flags for the regex.

### `addCapturingGroup(pattern, optional)`
Adds a capturing group to the regex.

### `addNonCapturingGroup(pattern, optional)`
Adds a non-capturing group to the regex.

### `addLookahead(pattern)`
Adds a lookahead assertion to the regex.

### `addNegativeLookahead(pattern)`
Adds a negative lookahead assertion to the regex.

### `addLookbehind(pattern)`
Adds a lookbehind assertion to the regex.

### `addNegativeLookbehind(pattern)`
Adds a negative lookbehind assertion to the regex.

### `build()`
Builds and returns the final regex.

### `validatePattern()`
Validates the constructed regex pattern.

## Static Methods

- **`email()`**: Generates a regex for validating email addresses.
- **`wholeNumbers()`**: Generates a regex for validating whole numbers.
- **`decimalNumber()`**: Generates a regex for validating decimal numbers.
- **`alphabets()`**: Generates a regex for validating alphabets.
- **`date(format)`**: Generates a regex for validating dates in a specified format.
- **`anyDate()`**: Generates a regex for validating dates in common formats.
- **`compose(parts)`**: Composes multiple regex parts into a single pattern.
- **`escapeSpecialChars(str)`**: Escapes special characters in a string.
- **`url()`**: Generates a regex for validating URLs.
- **`phoneNumber()`**: Generates a regex for validating phone numbers.
- **`uuid()`**: Generates a regex for validating UUIDs.
- **`creditCard()`**: Generates a regex for validating credit card numbers.
- **`ipAddress()`**: Generates a regex for validating IP addresses.
- **`validatePersianCreditCard(cardNumber)`**: Validates a Persian credit card number.

## Contributing

We welcome contributions to `RegexGenerator`. To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

Please ensure your code adheres to our [coding standards](CONTRIBUTING.md) and includes tests where applicable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [salmanfz1681](mailto:salmanfz1681@gmail.com).

## FAQ

**Q: How do I use the `addDigit` method?**

A: Use `addDigit({ count, optional })` to add a digit pattern to your regex. For example, `addDigit({ count: 3 })` adds a pattern for exactly 3 digits.

**Q: Can I combine multiple patterns?**

A: Yes, you can use methods like `addText`, `addRange`, and `addRepeat` to combine various patterns into a single regex.