/**
 * A class to create and calculates matrices
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-13)
 */
class Matrix extends Base {

    static get ERROR_ROWS_IS_NO_ARRAY() {
        return [new JsTestException(101, 'Rows are not an array', 'The given parameter matrix must be an instance of Array.'), this];
    }

    static get ERROR_ROWS_COUNT_ARRAY_WRONG() {
        return [new JsTestException(102, 'Count rows is wrong', 'The number of rows from given parameter matrix must greater than 0.'), this];
    }

    static get ERROR_COLS_IS_NO_ARRAY() {
        return [new JsTestException(103, 'Cols are not an array', 'Row %row of given parameter elements must be an instance of Array.'), this];
    }

    static get ERROR_COLS_COUNT_ARRAY_WRONG() {
        return [new JsTestException(104, 'Count cols is wrong', 'The number of cols in row %row from given parameter matrix must greater than 0.'), this];
    }

    static get ERROR_WRONG_COL_NUMBER() {
        return [new JsTestException(105, 'Wrong col number test', 'The number of cols in row %row from given parameter matrix must equal to %col.'), this];
    }

    static get ERROR_WRONG_MATRIX_TYPE() {
        return [new JsTestException(106, 'Wrong given matrix type', 'The given parameter matrix must be an instance of Matrix.'), this];
    }

    static get ERROR_WRONG_MATRIX_DIMENSIONS() {
        return [new JsTestException(107, 'Two given matrices with different dimensions', 'The given matrix does not fit to this matrix.'), this];
    }

    static get ERROR_WRONG_MATRIX_DIMENSIONS_QUADRATIC() {
        return [new JsTestException(108, 'The matrix is not quadratic', 'The matrix is not quadratic.'), this];
    }

    static get ERROR_NO_SCALAR() {
        return [new JsTestException(109, 'Given parameter is not a scalar', 'The given parameter scalar must be a number (real, float, integer, ..).'), this];
    }

    static get ERROR_CELL_IS_NO_NUMBER() {
        return [new JsTestException(110, 'The value of getCell from matrix is no number', 'Cell %col in row %row of given parameter elements must be a number.'), this];
    }

    static get ERROR_WRONG_CELL_ACCESS() {
        return [new JsTestException(111, 'The access of getCell is wrong', 'Cell %col in row %row of given parameter elements must the right access.'), this];
    }

    static get ERROR_WRONG_ROW_ACCESS() {
        return [new JsTestException(112, 'Row access is wrong', 'Row %row does not fit to this matrix.'), this];
    }

    static get ERROR_WRONG_MATRIX_COL_LIMIT_REACHED() {
        return [new JsTestException(113, 'The matrix must contain at least two columns.', 'The matrix must contain at least two columns.'), this];
    }

    static get ERROR_WRONG_MATRIX_ROW_LIMIT_REACHED() {
        return [new JsTestException(113, 'The matrix must contain at least two rows.', 'The matrix must contain at least two rows.'), this];
    }

    static get SUCCESS_INITIALISE_MATRIX() {
        return [new JsTestException(201, 'Init matrix'), this];
    }

    static get SUCCESS_INITIALISE_MATRIX_FROM_VECTOR() {
        return [new JsTestException(202, 'Init matrix from vector'), this];
    }

    static get SUCCESS_INITIALISE_MATRIX_FROM_VECTORS() {
        return [new JsTestException(203, 'Init matrix from vectors'), this];
    }

    static get SUCCESS_CHANGE_CELL_TEST() {
        return [new JsTestException(204, 'Successful change value test'), this];
    }

    static get SUCCESS_DELETE_ROW_TEST() {
        return [new JsTestException(205, 'Successful delete row test'), this];
    }

    static get SUCCESS_ADDITION_TEST() {
        return [new JsTestException(206, 'Successful add test'), this];
    }

    static get SUCCESS_SUBTRACTION_TEST() {
        return [new JsTestException(207, 'Successful subtract test'), this];
    }

    static get SUCCESS_SCALAR_MULTIPLICATION_TEST() {
        return [new JsTestException(208, 'Successful scalar multiplication test'), this];
    }

    static get SUCCESS_TRANSPOSE_TEST() {
        return [new JsTestException(209, 'Successful transpose test'), this];
    }

    static get SUCCESS_MULTIPLICATION_MATRIX_TEST() {
        return [new JsTestException(210, 'Successful multiplication test'), this];
    }

    static get SUCCESS_MULTIPLICATION_MATRIX_VECTOR_TEST() {
        return [new JsTestException(211, 'Successful multiplication test with a vector'), this];
    }

    static get SUCCESS_DETERMINANT_TEST() {
        return [new JsTestException(212, 'Successful determinant test'), this];
    }

    static get SUCCESS_INVERSE_TEST() {
        return [new JsTestException(213, 'Successful inverse test'), this];
    }

    static get SUCCESS_MANIPULATE_SHIFT_COL() {
        return [new JsTestException(214, 'Successful manipulate test: shift col'), this];
    }

    static get SUCCESS_MANIPULATE_SHIFT_ROW() {
        return [new JsTestException(215, 'Successful manipulate test: shift row'), this];
    }

    static get CLASS_NAME() {
        return 'Matrix';
    }

    /**
     * The constructor of this matrix class.
     *
     * @param matrix
     */
    constructor() {
        super();

        this.name = this.constructor.CLASS_NAME;

        this.init.apply(this, arguments);
    }

    /**
     * Initialise this matrix
     *
     * @param matrix
     */
    init(matrix) {

        /* Create Matrix from given vectors. */
        if (matrix instanceof Vector) {
            var array = [];

            [].slice.call(arguments).map(function (argument) {
                if (argument instanceof Vector) {
                    array.push(argument.array);
                }
            });

            this.init(this.constructor.transpose(array));
            return;
        }

        /* check assertions of given matrix */
        this.assert(matrix instanceof Array, 'matrix.constructor', this.constructor.ERROR_ROWS_IS_NO_ARRAY);
        this.assert(matrix.length > 0, 'matrix.constructor', this.constructor.ERROR_ROWS_COUNT_ARRAY_WRONG);

        this.numberRows = matrix.length;
        this.numberCols = 0;
        this.matrix = matrix;

        /* check the rows and cols of matrix */
        matrix.map(function (row, rowNumber) {
            this.assert(
                row instanceof Array,
                'matrix.constructor',
                this.constructor.ERROR_COLS_IS_NO_ARRAY,
                {'row': rowNumber + 1}
            );
            this.assert(
                row.length > 0,
                'matrix.constructor',
                this.constructor.ERROR_COLS_COUNT_ARRAY_WRONG,
                {'row': rowNumber}
            );

            if (this.numberCols === 0) {
                this.numberCols = row.length;
            } else {
                this.assert(
                    this.numberCols === row.length,
                    'matrix.constructor',
                    this.constructor.ERROR_WRONG_COL_NUMBER,
                    {'row': rowNumber + 1, 'col': this.numberCols}
                );
            }

            row.map(function (col, colNumber) {
                this.assert(
                    !isNaN(col),
                    'matrix.constructor',
                    this.constructor.ERROR_CELL_IS_NO_NUMBER,
                    {'col': colNumber + 1, 'row': rowNumber + 1}
                );

                this.matrix[rowNumber][colNumber] = Number(col);
            }, this);
        }, this);

        return matrix;
    }

    /**
     * Returns the current matrix.
     *
     * @returns {Array|*}
     */
    get array() {
        return this.matrix;
    }

    /**
     * returns the number of rows of this matrix.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    get rows() {
        return this.numberRows;
    }

    /**
     * returns the number of cols of this matrix.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    get cols() {
        return this.numberCols;
    }

    /**
     * returns the size of vector.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    get size() {
        return [this.rows, this.cols];
    }

    /**
     * get the getCell of matrix.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    getCell(row, col) {
        return this.matrix[row][col];
    }

    /**
     * Change value of a getCell of this matrix.
     *
     * @param col
     * @param row
     * @param value
     */
    changeCell() {
        var args = this.buildArgumentList(arguments, ['col', 'row', 'value']);

        this.assert(args.col < this.numberCols, 'matrix.changeCell', this.constructor.ERROR_WRONG_CELL_ACCESS);
        this.assert(args.row < this.numberRows, 'matrix.changeCell', this.constructor.ERROR_WRONG_CELL_ACCESS);

        return this.doCalculate(args.copy, this.constructor.changeCell, this.array, args.col, args.row, args.value);
    }

    /**
     * Delete a row of this matrix.
     *
     * @param col
     * @param row
     * @param value
     */
    deleteRow() {
        var args = this.buildArgumentList(arguments, ['row']);

        this.assert(args.row < this.numberRows, 'matrix.changeCell', this.constructor.ERROR_WRONG_ROW_ACCESS, {'row': args.row});

        return this.doCalculate(args.copy, this.constructor.deleteRow, this.array, args.row);
    }

    /**
     * Returns the result of adding the given matrix with this matrix.
     *
     * @param copy
     * @param matrix
     * @returns {Matrix}
     */
    add() {
        var args = this.buildArgumentList(arguments, ['matrix']);

        this.assert(args.matrix instanceof Matrix, 'matrix.add', this.constructor.ERROR_WRONG_MATRIX_TYPE);
        this.assert(this.cols === args.matrix.numberCols && this.rows === args.matrix.numberRows, 'matrix.add', this.constructor.ERROR_WRONG_MATRIX_DIMENSIONS);

        return this.doCalculate(args.copy, this.constructor.add, this.array, args.matrix.array);
    }

    /**
     * Returns the result subtracting the given matrix from this matrix.
     *
     * @param copy
     * @param matrix
     * @returns {Matrix}
     */
    subtract() {
        var args = this.buildArgumentList(arguments, ['matrix']);

        this.assert(args.matrix instanceof Matrix, 'matrix.subtract', this.constructor.ERROR_WRONG_MATRIX_TYPE);
        this.assert(this.cols === args.matrix.numberCols && this.rows === args.matrix.numberRows, 'matrix.subtract', this.constructor.ERROR_WRONG_MATRIX_DIMENSIONS);

        return this.doCalculate(args.copy, this.constructor.subtract, this.array, args.matrix.array);
    }

    /**
     * Calculate the matrix multiplication from this matrix and the given matrix.
     *
     * @param copy
     * @param matrix
     * @returns {Matrix|Vector}
     */
    multiply() {
        var args = this.buildArgumentList(arguments,  ['matrix']);


        if (this.isNumber(args.matrix)) {
            return this.doCalculate(args.copy, this.constructor.scalarMultiplication, args.matrix, this.array);
        }

        /* convert the vector to matrix before -> then call multiply again */
        if (args.matrix instanceof Vector) {
            if (args.copy) {
                return new Vector(this.multiply(args.copy, new Matrix(args.matrix)).transpose().array[0]);
            }

            return this.init(this.multiply(args.copy, new Matrix(args.matrix)).array);
        }

        this.assert(args.matrix instanceof Matrix, 'matrix.multiply', this.constructor.ERROR_WRONG_MATRIX_TYPE);
        this.assert(this.cols === args.matrix.numberRows, 'matrix.multiply', this.constructor.ERROR_WRONG_MATRIX_DIMENSIONS);

        return this.doCalculate(args.copy, this.constructor.multiply, this.array, args.matrix.array);
    }

    /**
     * Does a scalar multiplication.
     *
     * @param copy
     * @param scalar
     * @returns {Matrix}
     */
    scalarMultiplication() {
        var args = this.buildArgumentList(arguments, ['matrix']);

        this.assert(this.isNumber(args.matrix), 'matrix.scalarMultiplication', this.constructor.ERROR_NO_SCALAR);

        return this.doCalculate(args.copy, this.constructor.scalarMultiplication, args.matrix, this.array);
    }

    /**
     * Calculate the transposed matrix from this matrix.
     *
     * @returns {Matrix}
     */
    transpose() {
        var args = this.buildArgumentList(arguments, []);

        return this.doCalculate(args.copy, this.constructor.transpose, this.array);
    }

    /**
     * Calculate the determinant of this matrix.
     *
     * @returns {Number}
     */
    determinant() {
        this.assert(this.cols === this.rows, 'matrix.determinant', this.constructor.ERROR_WRONG_MATRIX_DIMENSIONS_QUADRATIC);

        return this.constructor.determinant(this.array);
    }

    /**
     * Calculate the inverse of this matrix.
     *
     * @returns {Matrix}
     */
    inverse() {
        var args = this.buildArgumentList(arguments, []);

        this.assert(this.cols === this.rows, 'matrix.inverse', this.constructor.ERROR_WRONG_MATRIX_DIMENSIONS_QUADRATIC);

        return this.doCalculate(args.copy, this.constructor.inverse, this.array);
    }

    /**
     * Manipulate: Remove the first column.
     *
     * @returns {Matrix}
     */
    shiftCol() {
        var args = this.buildArgumentList(arguments, []);

        this.assert(this.cols > 1, 'matrix.shiftCol', this.constructor.ERROR_WRONG_MATRIX_COL_LIMIT_REACHED);

        return this.doCalculate(args.copy, this.constructor.shiftCol, this.array);
    }

    /**
     * Manipulate: Remove the first row.
     *
     * @returns {Matrix}
     */
    shiftRow() {
        var args = this.buildArgumentList(arguments, []);

        this.assert(this.rows > 1, 'matrix.shiftRow', this.constructor.ERROR_WRONG_MATRIX_ROW_LIMIT_REACHED);

        return this.doCalculate(args.copy, this.constructor.shiftRow, this.array);
    }

    /**
     * Static function: Change a cell from given matrix.
     *
     * @param matrix
     * @param col
     * @param row
     * @param value
     * @returns {Array}
     */
    static changeCell(matrix, col, row, value) {
        matrix[row][col] = value;

        return matrix;
    }

    /**
     * Static function: Delete a row from given matrix.
     *
     * @param matrix
     * @param row
     * @returns {Array}
     */
    static deleteRow(matrix, row) {
        matrix.splice(row, 1);

        return matrix;
    }

    /**
     * Static function: Add a given matrix to another one.
     *
     * @param matrix1
     * @param matrix2
     * @returns {Array}
     */
    static add(matrix1, matrix2) {
        var addedMatrix = matrix1.map(function (row, rowIndex) {
            return row.map(function (col, colIndex) {
                return col + matrix2[rowIndex][colIndex];
            });
        });

        return addedMatrix;
    }

    /**
     * Static function: Subtract a given matrix from another one.
     *
     * @param matrix1
     * @param matrix2
     * @returns {Array}
     */
    static subtract(matrix1, matrix2) {
        var addedMatrix = matrix1.map(function (row, rowIndex) {
            return row.map(function (col, colIndex) {
                return col - matrix2[rowIndex][colIndex];
            });
        });

        return addedMatrix;
    }

    /**
     * Helper function to multiply the given two matrices.
     *
     * @param matrix1
     * @param matrix2
     * @returns {Array}
     */
    static multiply(matrix1, matrix2) {
        var matrix = matrix1.map(function (vector1) {
            return this.constructor.transpose(matrix2 ).map(function (vector2) {
                return Vector.dotProduct(vector1, vector2);
            }, this);
        }, this);

        return matrix;
    }

    /**
     * Helper function to calculate a scalar multiplication.
     *
     * @param scalar
     * @param matrix
     * @returns {Array}
     */
    static scalarMultiplication(scalar, matrix) {
        var matrix = matrix.map(function (row) {
            return row.map(function (col) {
                return scalar * col;
            });
        });

        return matrix;
    }

    /**
     * Helper function to calculate the transposed matrix from this matrix.
     *
     * @param matrix
     * @returns {Array}
     */
    static transpose(matrix) {
        var transposedMatrix = matrix[0].map(function (col, colIndex) {
            return matrix.map(function (row) {
                return row[colIndex];
            });
        });

        return transposedMatrix;
    }

    /**
     * Helper function to calculate the determinant.
     *
     * @param matrix
     * @returns {Number}
     */
    static determinant(matrix) {
        if (matrix.length == 1) {
            return matrix[0][0];
        }

        var determinant = 0;

        for (var i = 0; i < matrix.length; i++) {
            determinant += Math.pow(-1, i) * matrix[0][i] * this.determinant(this.deleteRowAndColumn(matrix, 0, i));
        }

        return determinant;
    }

    /**
     * Helper function to remove the given row and column.
     *
     * @param matrix
     * @param row
     * @param column
     * @returns {Array}
     */
    static deleteRowAndColumn(matrix, row, column) {
        var reducedMatrix = [];

        /* copy the rows from matrix to reducedMatrix */
        for (var i = 0; i < matrix.length; i++) {
            if (row === i) {
                continue;
            }

            reducedMatrix.push(matrix[i].slice(0));
        }

        /* remove column from each row */
        for (var i = 0; i < reducedMatrix.length; i++) {
            reducedMatrix[i].splice(column, 1);
        }

        return reducedMatrix;
    }

    /**
     * Helper function to inverse the matrix (Gaussian elimination).
     *
     * @param matrix
     * @returns {*}
     */
    static inverse(matrix) {
        var temp;
        var matrixRows = matrix.length;
        var inversedMatrix = [];

        /* initialise the output matrix */
        for (var i = 0; i < matrixRows; i++) {
            inversedMatrix[i] = [];
        }

        /* create the identity matrix */
        for (var i = 0; i < matrixRows; i++) {
            for (var j = 0; j < matrixRows; j++) {
                inversedMatrix[i][j] = 0;
                if (i == j) {
                    inversedMatrix[i][j] = 1;
                }
            }
        }

        /* eliminate from left */
        for (var k = 0; k < matrixRows; k++) {
            temp = matrix[k][k];

            for (var j = 0; j < matrixRows; j++) {
                matrix[k][j] /= temp;
                inversedMatrix[k][j] /= temp;
            }

            for (var i = k + 1; i < matrixRows; i++) {
                temp = matrix[i][k];

                for (var j = 0; j < matrixRows; j++) {
                    matrix[i][j] -= matrix[k][j] * temp;
                    inversedMatrix[i][j] -= inversedMatrix[k][j] * temp;
                }
            }
        }

        /* eliminate from right */
        for (var k = matrixRows - 1; k > 0; k--) {
            for (var i = k - 1; i >= 0; i--) {
                temp = matrix[i][k];

                for (var j = 0; j < matrixRows; j++) {
                    matrix[i][j] -= matrix[k][j] * temp;
                    inversedMatrix[i][j] -= inversedMatrix[k][j] * temp;
                }
            }
        }

        return inversedMatrix;
    }

    /**
     * Helper function to shift the first column (remove the first column).
     *
     * @param matrix
     * @returns {Array}
     */
    static shiftCol(matrix) {
        return matrix.map(function (row) {
            row.shift();
            return row;
        });
    }

    /**
     * Helper function to shift the first row (remove the first row).
     *
     * @param matrix
     * @returns {Array}
     */
    static shiftRow(matrix) {
        matrix.shift();
        return matrix;
    }
}