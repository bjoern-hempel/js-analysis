/**
 * A class to create and calculates vectors
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-21)
 */
class Vector {

    static get ERROR_VECTOR_IS_NO_ARRAY() {
        return [101, 'Vector: given vector format is not an array', 'The given parameter vector must be an instance of Array.'];
    }

    static get ERROR_VECTOR_SIZE_WRONG() {
        return [102, 'Vector: the size of the given vector is wrong', 'The given parameter vector must be greater then 0.'];
    }

    static get ERROR_ELEMENT_IS_NO_NUMBER() {
        return [103, 'Vector: element from vector is no number', 'Element %element of given parameter vector must be a number.'];
    }

    static get SUCCESS_INITIALIZE_VECTOR() {
        return [201, 'initialize vector'];
    }

    static get SUCCESS_CALLBACK() {
        return [202, 'callback function'];
    }

    /**
     * The constructor of the meshHolder.
     *
     * @param vector {Array}
     * @returns {null}
     */
    constructor(vector) {

        this.name = 'Vector';

        return this.initialize(vector);
    }

    /**
     * Initialize this class.
     *
     * @param vector {Array}
     * @returns {null}
     */
    initialize(vector) {

        /* check assertions of given vector */
        this.assertionCheck(vector instanceof Array, 'vector.constructor', Vector.ERROR_VECTOR_IS_NO_ARRAY);
        this.assertionCheck(vector.length > 0, 'vector.constructor', Vector.ERROR_VECTOR_SIZE_WRONG);

        this.vector = vector;

        /* check the rows and cols of vector */
        vector.map(function (element, elementNumber) {
            this.assertionCheck(
                !isNaN(element),
                'vector.constructor',
                Vector.ERROR_ELEMENT_IS_NO_NUMBER,
                {'element': elementNumber + 1}
            );
        }, this);

        return;
    }

    /**
     * get the element of vector.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    getElement(element) {
        return this.vector[element];
    }

    /**
     * Returns the current vector.
     *
     * @returns {Array|*}
     */
    get array() {
        return this.vector;
    }

    /**
     * returns the size of vector.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    get size() {
        return this.vector.length;
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

            throw new VectorException(
                errorType[0],
                String('%functionName: %errorText').replace(/%functionName/, functionName).replace(/%errorText/, errorText)
            );
        }
    }

    /**
     * Unshift a value to the internal vector.
     *
     * @param value
     * @returns {Vector}
     */
    unshift(value) {
        this.vector.unshift(value);
        return this;
    }

    /**
     * Apply the given callback function to this vector.
     *
     * @param func
     * @returns {Vector}
     */
    callback(func) {
        return new Vector(this.array.map(func));
    }
}