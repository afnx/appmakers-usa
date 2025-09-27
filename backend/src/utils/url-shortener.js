// Simple in-memory URL shortener utility
let urlMap = {};


/**
 * Generates a random alphanumeric code.
 *
 * @param {number} [length=5] - The number of letter-digit pairs to generate.
 */
function generateCode(length = 5) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    let code = '';
    do {
        if (Math.random() < 0.5) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        } else {
            code += digits.charAt(Math.floor(Math.random() * digits.length));
        }
    } while (code.length < length);
    return code;
}

/**
 * Shortens a given URL and returns the unique code.
 *
 * @param {string} [host='http://localhost:3000'] - The host URL for constructing the short URL.
 * @param {string} originalUrl - The original URL to be shortened.
 */
export function shortenUrl(host = 'http://localhost:3000', originalUrl) {
    let code;
    do {
        code = generateCode();
    } while (urlMap[code]); // Ensure uniqueness
    urlMap[code] = originalUrl;
    return `${host}/${code}`;
}

/** 
 * Retrieves the original URL for a given code.
 *
 * @param {string} code - The code.
 */
export function getUrlFromCode(code) {
    return urlMap[code];
}