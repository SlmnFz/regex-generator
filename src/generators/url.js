/**
 * Generates a regex for validating url.
 * @returns {RegExp} The url validation regex.
 */
function url() {
    return /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
}

module.exports = url;
