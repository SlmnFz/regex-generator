/**
 * Generates a regex for validating dates in specified format.
 * @param {string} format - The date format (e.g., 'YYYY-MM-DD').
 * @returns {RegExp|null} The date validation regex or null if format is unsupported.
 */
function date(format) {
    switch (format) {
        case 'YYYY-MM-DD':
            // Matches YYYY-MM-DD with basic validation for months and days.
            return /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        case 'MM/DD/YYYY':
            // Matches MM/DD/YYYY with basic validation for months and days.
            return /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
        case 'DD-MM-YYYY':
            // Matches DD-MM-YYYY with basic validation for days and months.
            return /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
        default:
            return null;
    }
}

/**
 * Generates a regex for validating dates in common formats accepted by `new Date(input)`.
 * This regex will broadly match common date formats but may not be exhaustive.
 * @returns {RegExp} The regex for validating dates in common formats.
 */
function anyDate() {
    return new RegExp(
        '^' +
        // ISO 8601 format YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS.sssZ
        '((\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?)?)|' +
        // RFC 2822 format, e.g., "Wed, 14 Jun 2017 07:00:00 GMT"
        '((Mon|Tue|Wed|Thu|Fri|Sat|Sun),\\s\\d{1,2}\\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s\\d{4}\\s\\d{2}:\\d{2}:\\d{2}\\s(GMT|UTC|[+-]\\d{4}))|' +
        // Date and time string, e.g., "December 31, 2021", "12/31/2021", "31-Dec-2021"
        '(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\\s)?\\d{1,2},?\\s?\\d{4})|' +
        '((\\d{1,2})(/|\\-|\\s)(\\d{1,2})(/|\\-|\\s)(\\d{2}|\\d{4}))|' +
        '((\\d{1,2})(\\s)?-(\\s)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\\s)?-(\\s)?\\d{4})))' +
        '$'
    );
}

module.exports = { date, anyDate };
