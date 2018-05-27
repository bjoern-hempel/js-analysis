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

    static get ERROR_WRONG_VECTOR_TYPE() {
        return [105, 'Vector: wrong given vector type', 'The given parameter vector must be an instance of Vector.'];
    }

    static get ERROR_WRONG_VECTOR_DIMENSIONS() {
        return [106, 'Vector: two given vectors with different dimensions', 'The given vector does not fit to this vector.'];
    }

    static get ERROR_WRONG_VECTOR_COUNT() {
        return [106, 'Vector: the number of given vectors is wrong', 'The number of given vectors is wrong.'];
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

    static get SUCCESS_ADDITION_TEST() {
        return [204, 'Vector: successful add test'];
    }

    static get SUCCESS_SUBTRACTION_TEST() {
        return [205, 'Vector: successful add test'];
    }

    static get SUCCESS_DOT_PRODUCT() {
        return [206, 'Vector: successful dot product test'];
    }

    static get SUCCESS_VECTOR_PRODUCT() {
        return [207, 'Vector: successful vector product test'];
    }

    static get SUCCESS_CALLBACK() {
        return [208, 'Vector: successful callback function test'];
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
     * Returns the result of adding the given vector with this vector.
     *
     * @param copy (optional)
     * @param vector
     * @returns {Vector}
     */
    add() {
        var args = this.buildArgumentList(arguments, ['vector']);

        this.assert(args.vector instanceof Vector, 'vector.add', this.constructor.ERROR_WRONG_VECTOR_TYPE);
        this.assert(this.size === args.vector.size, 'vector.add', this.constructor.ERROR_WRONG_VECTOR_DIMENSIONS);

        return this.doCalculate(args.copy, this.constructor.add, this.array, args.vector.array);
    }

    /**
     * Returns the result of subtracting the given vector with this vector.
     *
     * @param copy (optional)
     * @param vector
     * @returns {Vector}
     */
    subtract() {
        var args = this.buildArgumentList(arguments, ['vector']);

        this.assert(args.vector instanceof Vector, 'vector.subtract', this.constructor.ERROR_WRONG_VECTOR_TYPE);
        this.assert(this.size === args.vector.size, 'vector.subtract', this.constructor.ERROR_WRONG_VECTOR_DIMENSIONS);

        return this.doCalculate(args.copy, this.constructor.subtract, this.array, args.vector.array);
    }

    /**
     * Returns the result of subtracting the given vector with this vector.
     *
     * @param copy (optional)
     * @param vector
     * @returns {Number}
     */
    dotProduct() {
        var args = this.buildArgumentList(arguments, ['vector']);

        this.assert(args.vector instanceof Vector, 'vector.dotProduct', this.constructor.ERROR_WRONG_VECTOR_TYPE);
        this.assert(this.size === args.vector.size, 'vector.dotProduct', this.constructor.ERROR_WRONG_VECTOR_DIMENSIONS);

        return this.constructor.dotProduct(this.array, args.vector.array);
    }

    /**
     * Returns the result of the vector product of the given vectors.
     *
     * @param copy (optional)
     * @param vector
     * @returns {Vector}
     */
    vectorProduct() {
        var argumentList = [].slice.call(arguments);
        var args = {copy: false, vectors: []};

        if (typeof argumentList[0] === "boolean") {
            args.copy = argumentList[0];
            argumentList.shift();
        }

        var vectorDimension = this.size;

        this.assert(argumentList.length + 2 === vectorDimension, 'vector.vectorProduct', this.constructor.ERROR_WRONG_VECTOR_COUNT);

        args.vectors = argumentList;

        for (var i = 0; i < args.vectors.length; i++) {
            this.assert(args.vectors[i] instanceof Vector, 'vector.vectorProduct', this.constructor.ERROR_WRONG_VECTOR_TYPE);
            this.assert(args.vectors[i].size === vectorDimension, 'vector.vectorProduct', this.constructor.ERROR_WRONG_VECTOR_DIMENSIONS);

            args.vectors[i] = args.vectors[i].array;
        }

        argumentList.unshift(this.array);
        argumentList.unshift(this.constructor.vectorProduct);
        argumentList.unshift(args.copy);

        return this.doCalculate.apply(this, argumentList);
    }

    /**
     * Unshift a value to the internal vector (adds a value to the beginning).
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

    /**
     * Static function: Add a given vector to another one.
     *
     * @param vector1
     * @param vector2
     * @returns {Array}
     */
    static add(vector1, vector2) {
        var addedVector = vector1.map(function (value, index) {
            return value + vector2[index];
        });

        return addedVector;
    }

    /**
     * Static function: Subtract a given vector to another one.
     *
     * @param vector1
     * @param vector2
     * @returns {Array}
     */
    static subtract(vector1, vector2) {
        var addedVector = vector1.map(function (value, index) {
            return value - vector2[index];
        });

        return addedVector;
    }

    /**
     * Static function: Calculate the dot product from given two vectors.
     *
     * @param vector1
     * @param vector2
     * @returns {Number}
     */
    static dotProduct(vector1, vector2) {
        return vector1.map(function (cell, cellIndex) {
            return vector1[cellIndex] * vector2[cellIndex];
        }).reduce(function (number1, number2) {
            return number1 + number2;
        });
    }

    /**
     * Static function: vectorProduct of given vectors.
     *
     * @returns {Array}
     */
    static vectorProduct() {
        var array = [];

        [].slice.call(arguments).map(function(vector) { array.push(vector); });

        array = Matrix.transpose(array);

        var detArrays = [];

        array.map(function(row, index) {
            detArrays.push(Matrix.deleteRow(array.slice(), index));
        });

        return detArrays.map(function(matrix, index) { return Matrix.determinant(matrix) * Math.pow(-1, index); });
    }
}