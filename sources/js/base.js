/**
 * A class to create and calculates matrices
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-13)
 */
class Base {

    /**
     * The constructor of the Base class.
     *
     */
    constructor() {
        this.name = 'Base';
    }

    /**
     * Check the assertion and throw an exception if the assertion is not satisfied.
     *
     * @param assertion
     * @param functionName
     * @param errorCode
     * @param errorText
     */
    assertionCheck(assertion, functionName, errorType, replace) {
        if (!assertion) {
            var errorText = errorType[2];

            if (typeof replace === "object") {
                Object.keys(replace).map(function(key) { errorText = errorText.replace('%' + key, replace[key]); });
            }

            throw new MatrixException(
                errorType[0],
                String('%functionName: %errorText').replace(/%functionName/, functionName).replace(/%errorText/, errorText)
            );
        }
    }

    /**
     * Extracts the copy argument from given argument list.
     *
     * @returns {{copy: boolean, matrix: Array}}
     */
    extractArguments() {
        var type = [].shift.apply(arguments);

        switch (type) {
            case 1:
                var copy   = false;
                var matrix = arguments[0] || [];

                /* Handle a copy situation */
                if (typeof matrix === "boolean") {
                    copy = matrix;
                    matrix = arguments[1] || [];
                }

                return {
                    copy:   copy,
                    matrix: matrix,
                };

                break;

            case 3:
                var copy  = false;
                var col   = arguments[0] || 0;
                var row   = arguments[1] || 0;
                var value = arguments[2] || 0;

                /* Handle a copy situation */
                if (typeof col === "boolean") {
                    copy  = col;
                    col   = arguments[1] || 0;
                    row   = arguments[2] || 0;
                    value = arguments[3] || 0;
                }

                return {
                    copy:  copy,
                    col:   col,
                    row:   row,
                    value: value
                };

                break
        }
    }

    /**
     * Extract the arguments.
     *
     * @param args
     * @returns {{copy: boolean, matrix: Array}}
     */
    buildArgumentList(args, type) {
        var args = [].slice.call(args);
        args.unshift(type);
        return this.extractArguments.apply(this, args);
    }

    /**
     * Doing the calculation.
     *
     * @returns {Matrix}
     */
    doCalculate() {
        var copy = [].shift.apply(arguments);
        var func = [].shift.apply(arguments);

        if (copy) {
            /* copy the argument list to avoid changes on the original object. */
            var args = JSON.parse(JSON.stringify([].slice.call(arguments)));

            return new Matrix(func.apply(this, args));
        }

        this.init(func.apply(this, arguments));
        return this;
    }

    /**
     * Check, if given value is a number.
     *
     * @param value
     * @returns {boolean}
     */
    isNumber(value) {
        if (Number(value) === value && value % 1 === 0) {
            return true;
        }

        if (Number(value) === value && value % 1 !== 0) {
            return true;
        }

        return false;
    }
}