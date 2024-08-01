/**
 * Generates a regex for validating phone numbers.
 * Supports international formats.
 * @returns {RegExp} The regex for validating phone numbers.
 */
function phoneNumber() {
    return new RegExp(
        '^\\+?[1-9]\\d{0,2}[ -]?\\(?\\d{1,4}\\)?[ -]?\\d{1,4}[ -]?\\d{1,4}[ -]?\\d{0,4}$'
    );
}

module.exports = phoneNumber;