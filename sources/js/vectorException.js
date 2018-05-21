/**
 * Own vector exception.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-21)
 */
function VectorException(code, message) {
    this.code = code;
    this.message = message;

    this.name = 'VectorException';
}

/**
 * toString method to create a nice readable message.
 *
 * @returns {string}
 */
VectorException.prototype.toString = function () {
    return this.name + ': "' + this.message + '"';
};