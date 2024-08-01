/**
 * Generates a regex for validating alphabets only.
 * @returns {RegExp} The alphabets validation regex.
 */
function alphabets() {
    return /^[A-Za-z]+$/;
}

module.exports = alphabets;
