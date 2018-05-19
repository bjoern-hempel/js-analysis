/**
 * A class to create and calculates matrices
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-13)
 */
class Matrix {

    static get ERROR_ROWS_IS_NO_ARRAY() {
        return [101, 'rows are not an array', 'The given parameter matrix must be an instance of Array.'];
    }

    static get ERROR_ROWS_COUNT_ARRAY_WRONG() {
        return [102, 'count rows is wrong', 'The number of rows from given parameter matrix must greater than 0.'];
    }

    static get ERROR_COLS_IS_NO_ARRAY() {
        return [103, 'cols are not an array', 'Row %row of given parameter elements must be an instance of Array.'];
    }

    static get ERROR_COLS_COUNT_ARRAY_WRONG() {
        return [104, 'count cols is wrong', 'The number of cols in row %row from given parameter matrix must greater than 0.'];
    }

    static get ERROR_WRONG_COL_NUMBER() {
        return [105, 'wrong col number test', 'The number of cols in row %row from given parameter matrix must equal to %col.'];
    }

    static get ERROR_WRONG_MATRIX_TYPE() {
        return [106, 'wrong given matrix type', 'The given parameter matrix must be an instance of Matrix.'];
    }

    static get ERROR_WRONG_MATRIX_DIMENSIONS() {
        return [107, 'two given matrices with different dimensions', 'The given matrix does not fit to this matrix.'];
    }

    static get ERROR_WRONG_MATRIX_DIMENSIONS_QUADRATIC() {
        return [108, 'the matrix is not quadratic', 'The matrix is not quadratic.'];
    }

    static get ERROR_NO_SCALAR() {
        return [109, 'given parameter is not a scalar', 'The given parameter scalar must be a number (real, float, integer, ..).'];
    }

    static get ERROR_CELL_IS_NO_NUMBER() {
        return [110, 'cell from matrix is no number', 'Cell %col in row %row of given parameter elements must be a number.'];
    }

    static get SUCCESS_INITIALIZE_MATRIX() {
        return [201, 'initialize matrix'];
    }

    static get SUCCESS_ADDITION_TEST() {
        return [202, 'successful add test'];
    }

    static get SUCCESS_SUBTRACTION_TEST() {
        return [203, 'successful subtract test'];
    }

    static get SUCCESS_SCALAR_MULTIPLICATION_TEST() {
        return [204, 'successful scalar multiplication test'];
    }

    static get SUCCESS_TRANSPOSE_TEST() {
        return [205, 'successful transpose test'];
    }

    static get SUCCESS_MULTIPLICATION_TEST() {
        return [206, 'successful multiplication test'];
    }

    static get SUCCESS_DETERMINANT_TEST() {
        return [207, 'successful determinant test'];
    }

    /**
     * The constructor of the meshHolder.
     */
    constructor(matrix) {

        this.name = 'Matrix';

        /* check assertions of given matrix */
        this.assertionCheck(matrix instanceof Array, 'matrix.constructor', Matrix.ERROR_ROWS_IS_NO_ARRAY);
        this.assertionCheck(matrix.length > 0, 'matrix.constructor', Matrix.ERROR_ROWS_COUNT_ARRAY_WRONG);

        this.rows = matrix.length;
        this.cols = 0;
        this.matrix = matrix;

        /* check the rows and cols of matrix */
        matrix.map(function (row, rowNumber) {
            this.assertionCheck(
                row instanceof Array,
                'matrix.constructor',
                Matrix.ERROR_COLS_IS_NO_ARRAY,
                {'row': rowNumber + 1}
            );
            this.assertionCheck(
                row.length > 0,
                'matrix.constructor',
                Matrix.ERROR_COLS_COUNT_ARRAY_WRONG,
                {'row': rowNumber}
            );

            if (this.cols === 0) {
                this.cols = row.length;
            } else {
                this.assertionCheck(
                    this.cols === row.length,
                    'matrix.constructor',
                    Matrix.ERROR_WRONG_COL_NUMBER,
                    {'row': rowNumber + 1, 'col': this.cols}
                );
            }

            row.map(function (col, colNumber) {
                this.assertionCheck(
                    !isNaN(col),
                    'matrix.constructor',
                    Matrix.ERROR_CELL_IS_NO_NUMBER,
                    {'col': colNumber + 1, 'row': rowNumber + 1}
                );

                this.matrix[rowNumber][colNumber] = Number(col);
            }, this);
        }, this);
    }

    /**
     * get the cell of matrix.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    getCell(row, col) {
        return this.matrix[row][col];
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
    get numberRows() {
        return this.rows;
    }

    /**
     * returns the number of cols of this matrix.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    get numberCols() {
        return this.cols;
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
     * Returns the result of adding the given matrix with this matrix.
     *
     * @param matrix
     * @returns {Matrix}
     */
    add(matrix) {
        this.assertionCheck(matrix instanceof Matrix, 'matrix.add', Matrix.ERROR_WRONG_MATRIX_TYPE);
        this.assertionCheck(this.cols === matrix.numberCols && this.rows === matrix.numberRows, 'matrix.add', Matrix.ERROR_WRONG_MATRIX_DIMENSIONS);

        return new Matrix(this.helperAdd(this.array, matrix.array));
    }

    /**
     * Returns the result subtracting the given matrix from this matrix.
     *
     * @param matrix
     * @returns {Matrix}
     */
    subtract(matrix) {
        this.assertionCheck(matrix instanceof Matrix, 'matrix.subtract', Matrix.ERROR_WRONG_MATRIX_TYPE);
        this.assertionCheck(this.cols === matrix.numberCols && this.rows === matrix.numberRows, 'matrix.subtract', Matrix.ERROR_WRONG_MATRIX_DIMENSIONS);

        return new Matrix(this.helperSubtract(this.matrix, matrix.array));
    }

    /**
     * Does a scalar multiplication.
     *
     * @param scalar
     * @returns {Matrix}
     */
    scalarMultiplication(scalar) {
        this.assertionCheck(!isNaN(scalar), 'matrix.scalarMultiplication', Matrix.ERROR_NO_SCALAR);

        return new Matrix(this.helperScalarMultiplication(scalar, this.array));
    }

    /**
     * Calculate the transposed matrix from this matrix.
     *
     * @returns {Matrix}
     */
    transpose() {
        return new Matrix(this.helperTranspose(this.array));
    }

    /**
     * Calculate the matrix multiplication from this matrix and the given matrix.
     *
     * @param matrix
     * @returns {Matrix}
     */
    multiply(matrix) {
        this.assertionCheck(matrix instanceof Matrix, 'matrix.multiply', Matrix.ERROR_WRONG_MATRIX_TYPE);
        this.assertionCheck(this.cols === matrix.numberRows, 'matrix.multiply', Matrix.ERROR_WRONG_MATRIX_DIMENSIONS);

        return new Matrix(this.helperMultiply(this.array, matrix.array));
    }

    /**
     * Calculate the determinant of this matrix.
     *
     * @returns {Number}
     */
    determinant() {
        this.assertionCheck(this.cols === this.rows, 'matrix.determinant', Matrix.ERROR_WRONG_MATRIX_DIMENSIONS_QUADRATIC);

        return this.helperDeterminant(this.array);
    }

    /**
     * Helper function to add to matrices.
     *
     * @param matrix1
     * @param matrix2
     * @returns {Array}
     */
    helperAdd(matrix1, matrix2) {
        var addedMatrix = matrix1.map(function (row, rowIndex) {
            return row.map(function (col, colIndex) {
                return col + matrix2[rowIndex][colIndex];
            });
        });

        return addedMatrix;
    }

    /**
     * Helper function to add to matrices.
     *
     * @param matrix1
     * @param matrix2
     * @returns {Array}
     */
    helperSubtract(matrix1, matrix2) {
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
    helperMultiply(matrix1, matrix2) {
        var matrix = matrix1.map(function (vector1) {
            return this.helperTranspose(matrix2 ).map(function (vector2) {
                return this.helperDotProduct(vector1, vector2);
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
    helperScalarMultiplication(scalar, matrix) {
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
    helperTranspose(matrix) {
        var transposedMatrix = matrix[0].map(function (col, colIndex) {
            return matrix.map(function (row) {
                return row[colIndex];
            });
        });

        return transposedMatrix;
    }

    /**
     * Helper function to calculate the dot product from given two vectors.
     *
     * @param vector1
     * @param vector2
     * @returns {Number}
     */
    helperDotProduct(vector1, vector2) {
        return vector1.map(function (cell, cellIndex) {
            return vector1[cellIndex] * vector2[cellIndex];
        }).reduce(function (number1, number2) {
            return number1 + number2;
        });
    }

    /**
     * Helper function to calculate the determinant.
     *
     * @param matrix
     * @returns {Number}
     */
    helperDeterminant(matrix) {
        if (matrix.length == 1) {
            return matrix[0][0];
        }

        var determinant = 0;

        for (var i = 0; i < matrix.length; i++) {
            determinant += Math.pow(-1, i) * matrix[0][i] * this.helperDeterminant(this.helperDeleteRowAndColumn(matrix, 0, i));
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
    helperDeleteRowAndColumn(matrix, row, column) {
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
}