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
    assert(assertion, functionName, errorType, replace) {
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
     * Build the argument list.
     *
     * @param args
     * @param argumentNames
     * @returns {Object}
     */
    buildArgumentList(args, argumentNames) {
        var args = [].slice.call(args);

        var index = 0;
        var argumentList = {copy: false};

        if (typeof args[index] === "boolean") {
            argumentList.copy = args[index];
            index++;
        }

        argumentNames.map(function(name) {
            argumentList[name] = args[index];
            index++;
        });

        return argumentList;
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