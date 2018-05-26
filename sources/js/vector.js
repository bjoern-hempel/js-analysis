/**
 * A class to create and calculates vectors
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-21)
 */
class Vector extends Base {

    static get ERROR_VECTOR_IS_NO_ARRAY() {
        return [101, 'Vector: given vector format is not an array', 'The given parameter vector must be an instance of Array.'];
    }

    static get ERROR_VECTOR_SIZE_WRONG() {
        return [102, 'Vector: the size of the given vector is wrong', 'The given parameter vector must be greater then 0.'];
    }

    static get ERROR_ELEMENT_IS_NO_NUMBER() {
        return [103, 'Vector: element from vector is no number', 'Element %element of given parameter vector must be a number.'];
    }

    static get ERROR_WRONG_CELL_ACCESS() {
        return [104, 'Vector: getCell access is wrong', 'Cell %index does not exist.'];
    }

    static get SUCCESS_INITIALIZE_VECTOR() {
        return [201, 'init vector'];
    }

    static get SUCCESS_LENGTH_VECTOR() {
        return [202, 'length of vector'];
    }

    static get SUCCESS_CHANGE_CELL_TEST() {
        return [203, 'Vector: successful change value test'];
    }

    static get SUCCESS_CALLBACK() {
        return [204, 'callback function'];
    }

    /**
     * The constructor of the Vector class.
     *
     * @param vector
     */
    constructor(vector) {
        super();

        this.name = 'Vector';

        this.init(vector);
    }

    /**
     * Initialise this class.
     *
     * @param vector {Array}
     * @returns {null}
     */
    init(vector) {
        /* check assertions of given vector */
        this.assert(vector instanceof Array, 'vector.constructor', Vector.ERROR_VECTOR_IS_NO_ARRAY);
        this.assert(vector.length > 0, 'vector.constructor', Vector.ERROR_VECTOR_SIZE_WRONG);

        this.vector = vector;

        /* check the rows and cols of vector */
        vector.map(function (element, elementNumber) {
            this.assert(
                !isNaN(element),
                'vector.constructor',
                Vector.ERROR_ELEMENT_IS_NO_NUMBER,
                {'element': elementNumber + 1}
            );
        }, this);
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
     * calculates the length of this vector.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    get length() {
        var square = this.vector.reduce(function(sum, currentValue) { return sum + Math.pow(currentValue, 2); }, 0);

        return Math.sqrt(square);
    }

    /**
     * get the element of vector.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    getCell(element) {
        return this.vector[element];
    }

    /**
     * Change value of a getCell of this matrix.
     *
     * @param col
     * @param row
     * @param value
     */
    changeCell() {
        var args = this.buildArgumentList(arguments, ['index', 'value']);

        this.assert(args.index < this.size, 'vector.changeCell', this.constructor.ERROR_WRONG_CELL_ACCESS);

        return this.doCalculate(args.copy, this.constructor.changeCell, this.array, args.index, args.value);
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

    /**
     * Static function: Change a cell from given matrix.
     *
     * @param vector
     * @param index
     * @param value
     * @returns {Array}
     */
    static changeCell(vector, index, value) {
        vector[index] = value;

        return vector;
    }
}