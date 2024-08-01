/**
 * Generates a regex for validating email addresses.
 * @returns {RegExp} The email validation regex.
 */
function email() {
    return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
}

module.exports = email;
