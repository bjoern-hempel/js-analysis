/**
 * Own matrix exception.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-08)
 */
function MatrixException (code, message) {
    this.code = code;
    this.message = message;

    this.name = 'MatrixException';
}

/**
 * toString method to create a nice readable message.
 *
 * @returns {string}
 */
MatrixException.prototype.toString = function () {
    return this.name + ': "' + this.message + '"';
};