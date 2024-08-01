/**
 * Generates a regex for validating UUIDs (Universally Unique Identifiers).
 * @returns {RegExp} The regex for validating UUIDs.
 */
function uuid() {
    return new RegExp(
        '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    );
}

module.exports = uuid;