/**
 * Generates a regex for validating whole numbers.
 * @returns {RegExp} The number validation regex.
 */
function wholeNumbers() {
    return /^\d+$/;
}

/**
 * Generates a regex for validating decimal numbers.
 * @returns {RegExp} The number validation regex.
 */
function decimalNumber() {
    return /^\d+(\.\d+)?$/;
}

module.exports = { wholeNumbers, decimalNumber }
