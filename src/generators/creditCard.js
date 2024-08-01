/**
 * Generates a regex for validating credit card numbers.
 * Supports common credit card types and more flexible prefixes.
 * @returns {RegExp} The regex for validating credit card numbers.
 */
function creditCard() {
    return new RegExp(
        '^(?:4[0-9]{12}(?:[0-9]{3})?' +       // Visa
        '|5[1-5][0-9]{14}' +                  // MasterCard
        '|6(?:011|5[0-9]{2})[0-9]{12}' +      // Discover
        '|3[47][0-9]{13}' +                   // American Express
        '|3(?:0[0-5]|[68][0-9])[0-9]{11}' +   // Diners Club
        '|2(?:014|149)[0-9]{11}' +            // JCB
        '|[1-9][0-9]{15})$'                   // Matches additional formats
    );
}

module.exports = creditCard;