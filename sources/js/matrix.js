/**
 * A class to create and calculates matrices
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-13)
 */
class Matrix {

    static get ERROR_ROWS_IS_NO_ARRAY() {
        return [101, 'rows are not an array'];
    }

    static get ERROR_ROWS_COUNT_ARRAY_WRONG() {
        return [102, 'count rows is wrong'];
    }

    static get ERROR_COLS_IS_NO_ARRAY() {
        return [103, 'cols are not an array'];
    }

    static get ERROR_COLS_COUNT_ARRAY_WRONG() {
        return [104, 'count cols is wrong'];
    }

    static get ERROR_WRONG_COL_NUMBER() {
        return [105, 'wrong col number test'];
    }

    static get ERROR_WRONG_MATRIX_TYPE() {
        return [106, 'wrong given matrix type'];
    }

    static get ERROR_WRONG_MATRIX_DIMENSIONS() {
        return [107, 'two given matrices with different dimensions'];
    }

    static get ERROR_NO_SCALAR() {
        return [108, 'given parameter is not a scalar'];
    }

    static get SUCCESS_INITIALIZE_MATRIX() {
        return [201, 'initialize matrix'];
    }

    static get SUCCESS_ADDITION_TEST() {
        return [202, 'successful add test'];
    }

    static get SUCCESS_SCALAR_MULTIPLICATION_TEST() {
        return [203, 'successful scalar multiplication test'];
    }

    static get SUCCESS_TRANSPOSE_TEST() {
        return [204, 'successful transpose test'];
    }

    static get SUCCESS_MULTIPLICATION_TEST() {
        return [205, 'successful multiplication test'];
    }

    /**
     * The constructor of the meshHolder.
     */
    constructor(matrix) {

        this.name = 'Matrix';

        /* check parameter matrix */
        if (!(matrix instanceof Array)) {
            throw new MatrixException(
                Matrix.ERROR_ROWS_IS_NO_ARRAY[0],
                'The given parameter matrix must be an instance of Array.'
            );
        }

        if (matrix.length <= 0) {
            throw new MatrixException(
                Matrix.ERROR_ROWS_COUNT_ARRAY_WRONG[0],
                'The number of rows from given parameter matrix must greater than 0.'
            );
        }

        this.rows = matrix.length;
        this.cols = 0;
        this.matrix = matrix;

        /* check the rows and cols of matrix */
        matrix.map(function (row, rowNumber) {
            if (!(row instanceof Array)) {
                throw new MatrixException(
                    Matrix.ERROR_COLS_IS_NO_ARRAY[0],
                    String('Row %row of given parameter elements must be an instance of Array.').replace(/%row/, rowNumber + 1)
                );
            }

            if (row.length <= 0) {
                throw new MatrixException(
                    Matrix.ERROR_COLS_COUNT_ARRAY_WRONG[0],
                    String('The number of cols in row %row from given parameter matrix must greater than 0.').replace(/%row/, rowNumber)
                );
            }

            if (this.cols === 0) {
                this.cols = row.length;
            } else {
                if (this.cols !== row.length) {
                    throw new MatrixException(
                        Matrix.ERROR_WRONG_COL_NUMBER[0],
                        String('The number of cols in row %row from given parameter matrix must equal to %col.').replace(/%row/, rowNumber + 1).replace(/%col/, this.cols)
                    );
                }
            }

            row.map(function (col, colNumber) {
                if (isNaN(col)) {
                    throw new Error(
                        String('Cell %col in row %row of given parameter elements must be a number.').replace(/%col/, colNumber + 1).replace(/%row/, rowNumber + 1)
                    );
                }

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
     * Returns the matrix add from this matrix with the given matrix.
     *
     * @param matrix
     * @returns {Matrix}
     */
    add(matrix) {
        if (!(matrix instanceof Matrix)) {
            throw new MatrixException(
                Matrix.ERROR_WRONG_MATRIX_TYPE[0],
                'matrix.add: The given parameter matrix must be an instance of Matrix.'
            );
        }

        if (this.cols !== matrix.numberCols || this.rows !== matrix.numberRows) {
            throw new MatrixException(
                Matrix.ERROR_WRONG_MATRIX_DIMENSIONS[0],
                'matrix.add: The given matrix does not fit to this matrix.'
            );
        }

        var array = this.matrix.map(function (row, rowIndex) {
            return row.map(function (col, colIndex) {
                return col + matrix.getCell(rowIndex, colIndex);
            });
        });

        return new Matrix(array);
    }

    /**
     * Does a scalar multiplication.
     *
     * @param scalar
     * @returns {Matrix}
     */
    scalarMultiplication(scalar) {
        if (isNaN(scalar)) {
            throw new MatrixException(
                Matrix.ERROR_NO_SCALAR[0],
                'matrix.scalarMultiplication: The given parameter scalar must be a number (real, float, integer, ..).'
            );
        }

        var array = this.matrix.map(function (row) {
            return row.map(function (col) {
                return scalar * col;
            });
        });

        return new Matrix(array);
    }

    /**
     * Calculate the transposed matrix from this matrix.
     *
     * @returns {Matrix}
     */
    transpose() {
        return new Matrix(this.helperTranspose(this.matrix));
    }

    /**
     * Calculate the matrix multiplication from this matrix and the given matrix.
     *
     * @param matrix
     * @returns {Matrix}
     */
    multiply(matrix) {
        if (!(matrix instanceof Matrix)) {
            throw new MatrixException(
                Matrix.ERROR_WRONG_MATRIX_TYPE[0],
                'matrix.add: The given parameter matrix must be an instance of Matrix.'
            );
        }

        if (this.cols !== matrix.numberRows) {
            throw new MatrixException(
                Matrix.ERROR_WRONG_MATRIX_DIMENSIONS[0],
                'matrix.multiplication: The given matrix does not fit to this matrix.'
            );
        }

        var array = this.matrix.map(function (vector1) {
            return this.helperTranspose(matrix.array).map(function (vector2) {
                return this.helperDotProduct(vector1, vector2);
            }, this);
        }, this);

        return new Matrix(array);
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
}