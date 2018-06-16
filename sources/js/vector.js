/**
 * A class to create and calculates vectors
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-21)
 */
class Vector extends Base {

    static get ERROR_VECTOR_IS_NO_ARRAY() {
        return [new JsTestException(101, 'Given vector format is not an array', 'The given parameter vector must be an instance of Array.'), this];
    }

    static get ERROR_VECTOR_SIZE_WRONG() {
        return [new JsTestException(102, 'The size of the given vector is wrong', 'The given parameter vector must be greater then 0.'), this];
    }

    static get ERROR_ELEMENT_IS_NO_NUMBER() {
        return [new JsTestException(103, 'Element from vector is no number', 'Element %element of given parameter vector must be a number.'), this];
    }

    static get ERROR_WRONG_CELL_ACCESS() {
        return [new JsTestException(104, 'Execution of getCell access is wrong', 'Cell %index does not exist.'), this];
    }

    static get ERROR_WRONG_VECTOR_TYPE() {
        return [new JsTestException(105, 'Wrong given vector type', 'The given parameter vector must be an instance of Vector.'), this];
    }

    static get ERROR_WRONG_VECTOR_DIMENSIONS() {
        return [new JsTestException(106, 'Two given vectors with different dimensions', 'The given vector does not fit to this vector.'), this];
    }

    static get ERROR_WRONG_VECTOR_COUNT() {
        return [new JsTestException(106, 'The number of given vectors is wrong', 'The number of given vectors is wrong.'), this];
    }

    static get ERROR_SIZE_LIMIT_REACHED() {
        return [new JsTestException(107, 'The vector must contain at least two elements.', 'The vector must contain at least two elements.'), this];
    }

    static get SUCCESS_INITIALIZE_VECTOR() {
        return [new JsTestException(201, 'Init vector'), this];
    }

    static get SUCCESS_LENGTH_VECTOR() {
        return [new JsTestException(202, 'Successful length of vector test'), this];
    }

    static get SUCCESS_CHANGE_CELL_TEST() {
        return [new JsTestException(203, 'Successful change value test'), this];
    }

    static get SUCCESS_ADDITION_TEST() {
        return [new JsTestException(204, 'Successful add test'), this];
    }

    static get SUCCESS_SUBTRACTION_TEST() {
        return [new JsTestException(205, 'Successful add test'), this];
    }

    static get SUCCESS_DOT_PRODUCT() {
        return [new JsTestException(206, 'Successful dot product test'), this];
    }

    static get SUCCESS_VECTOR_PRODUCT() {
        return [new JsTestException(207, 'Successful vector product test'), this];
    }

    static get SUCCESS_ROW_MULTIPLICATION() {
        return [new JsTestException(208, 'Successful row multiplication test'), this];
    }

    static get SUCCESS_DYADIC_MULTIPLICATION() {
        return [new JsTestException(209, 'Successful dyadic multiplication test'), this];
    }

    static get SUCCESS_UNSHIFT() {
        return [new JsTestException(210, 'Successful unshift test'), this];
    }

    static get SUCCESS_SHIFT() {
        return [new JsTestException(211, 'Successful shift test'), this];
    }

    static get SUCCESS_CALLBACK() {
        return [new JsTestException(212, 'Successful callback function test'), this];
    }

    static get CLASS_NAME() {
        return 'Vector';
    }

    /**
     * The constructor of the Vector class.
     *
     * @param vector
     */
    constructor(vector) {
        super();

        this.name = this.constructor.CLASS_NAME;

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

        /* copy the given vector to avoid changes on this object */
        this.vector = vector.slice();

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
     * Multiplies each row of each vector.
     *
     * @param copy (optional)
     * @param {Vector} vector
     * @returns {Vector}
     */
    rowMultiply() {
        var args = this.buildArgumentList(arguments, ['vector']);

        this.assert(args.vector instanceof Vector, 'vector.rowMultiply', this.constructor.ERROR_WRONG_VECTOR_TYPE);
        this.assert(this.size === args.vector.size, 'vector.rowMultiply', this.constructor.ERROR_WRONG_VECTOR_DIMENSIONS);

        return this.doCalculate(args.copy, this.constructor.rowMultiply, this.array, args.vector.array);
    }

    /**
     * Calculates the dyadic product (outer product).
     *
     * @param copy (optional)
     * @param {Vector} vector
     * @returns {Matrix}
     */
    multiplyDyadic() {
        var args = this.buildArgumentList(arguments, ['vector']);

        this.assert(args.vector instanceof Vector, 'vector.multiplyDyadic', this.constructor.ERROR_WRONG_VECTOR_TYPE);

        return new Matrix(this.constructor.multiplyDyadic(this.array, args.vector.array));
    }


    /**
     * Unshift a value to the internal vector (adds a value to the beginning).
     *
     * @param value
     * @returns {Vector}
     */
    unshift(value) {
        var args = this.buildArgumentList(arguments, ['value']);

        this.assert(!isNaN(args.value), 'vector.unshift', Vector.ERROR_ELEMENT_IS_NO_NUMBER, {'element': 0});

        return this.doCalculate(args.copy, this.constructor.unshift, this.array, args.value);
    }


    /**
     * Remove the first element.
     *
     * @param value
     * @returns {Vector}
     */
    shift(value) {
        var args = this.buildArgumentList(arguments, ['value']);

        this.assert(this.size > 1, 'vector.shift', Vector.ERROR_SIZE_LIMIT_REACHED);

        return this.doCalculate(args.copy, this.constructor.shift, this.array);
    }

    /**
     * Apply the given callback function to this vector.
     *
     * @param func
     * @returns {Vector}
     */
    callback() {
        var args = this.buildArgumentList(arguments, ['func']);

        var array = this.array.map(args.func);

        if (args.copy) {
            return new Vector(array);
        }

        this.init(array);
        return this;
    }

    /**
     * Static function: Change a cell from given vector.
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

    /**
     * Static function: multiply each row with each other.
     *
     * @param {Array} vector1
     * @param {Array} vector2
     * @returns {Array}
     */
    static rowMultiply(vector1, vector2) {
        return vector1.map(function (cell, cellIndex) {
            return vector1[cellIndex] * vector2[cellIndex];
        });
    }

    /**
     * Static function: multiply each row with each other.
     *
     * @param {Array} vector1
     * @param {Array} vector2
     * @returns {Array}
     */
    static multiplyDyadic(vector1, vector2) {
        var result = [];

        vector1.map(function (cell1) {
            var row = [];

            vector2.map(function (cell2) {
                row.push(cell1 * cell2);
            });

            result.push(row);
        });

        return result;
    }

    /**
     * Static function: add a value at the beginning of the given vector.
     *
     * @param vector
     * @param value
     * @returns {Array}
     */
    static unshift(vector, value) {
        vector.unshift(value);

        return vector;
    }

    /**
     * Helper function: remove the first element from this vector.
     *
     * @param vector
     * @returns {Array}
     */
    static shift(vector) {
        vector.shift();
        return vector;
    }
}