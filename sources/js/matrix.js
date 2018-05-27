/**
 * A class to create and calculates matrices
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-13)
 */
class Matrix extends Base {

    static get ERROR_ROWS_IS_NO_ARRAY() {
        return [101, 'Matrix: rows are not an array', 'The given parameter matrix must be an instance of Array.'];
    }

    static get ERROR_ROWS_COUNT_ARRAY_WRONG() {
        return [102, 'Matrix: count rows is wrong', 'The number of rows from given parameter matrix must greater than 0.'];
    }

    static get ERROR_COLS_IS_NO_ARRAY() {
        return [103, 'Matrix: cols are not an array', 'Row %row of given parameter elements must be an instance of Array.'];
    }

    static get ERROR_COLS_COUNT_ARRAY_WRONG() {
        return [104, 'Matrix: count cols is wrong', 'The number of cols in row %row from given parameter matrix must greater than 0.'];
    }

    static get ERROR_WRONG_COL_NUMBER() {
        return [105, 'Matrix: wrong col number test', 'The number of cols in row %row from given parameter matrix must equal to %col.'];
    }

    static get ERROR_WRONG_MATRIX_TYPE() {
        return [106, 'Matrix: wrong given matrix type', 'The given parameter matrix must be an instance of Matrix.'];
    }

    static get ERROR_WRONG_MATRIX_DIMENSIONS() {
        return [107, 'Matrix: two given matrices with different dimensions', 'The given matrix does not fit to this matrix.'];
    }

    static get ERROR_WRONG_MATRIX_DIMENSIONS_QUADRATIC() {
        return [108, 'Matrix: the matrix is not quadratic', 'The matrix is not quadratic.'];
    }

    static get ERROR_NO_SCALAR() {
        return [109, 'Matrix: given parameter is not a scalar', 'The given parameter scalar must be a number (real, float, integer, ..).'];
    }

    static get ERROR_CELL_IS_NO_NUMBER() {
        return [110, 'Matrix: getCell from matrix is no number', 'Cell %col in row %row of given parameter elements must be a number.'];
    }

    static get ERROR_WRONG_CELL_ACCESS() {
        return [111, 'Matrix: getCell access is wrong', 'Cell %col in row %row of given parameter elements must the right access.'];
    }

    static get SUCCESS_INITIALISE_MATRIX() {
        return [201, 'Matrix: init matrix'];
    }

    static get SUCCESS_INITIALISE_MATRIX_FROM_VECTOR() {
        return [202, 'Matrix: init matrix from vector'];
    }

    static get SUCCESS_CHANGE_CELL_TEST() {
        return [203, 'Matrix: successful change value test'];
    }

    static get SUCCESS_ADDITION_TEST() {
        return [204, 'Matrix: successful add test'];
    }

    static get SUCCESS_SUBTRACTION_TEST() {
        return [205, 'Matrix: successful subtract test'];
    }

    static get SUCCESS_SCALAR_MULTIPLICATION_TEST() {
        return [206, 'Matrix: successful scalar multiplication test'];
    }

    static get SUCCESS_TRANSPOSE_TEST() {
        return [207, 'Matrix: successful transpose test'];
    }

    static get SUCCESS_MULTIPLICATION_MATRIX_TEST() {
        return [208, 'Matrix: successful multiplication test'];
    }

    static get SUCCESS_MULTIPLICATION_MATRIX_VECTOR_TEST() {
        return [209, 'Matrix: successful multiplication test with a vector'];
    }

    static get SUCCESS_DETERMINANT_TEST() {
        return [210, 'Matrix: successful determinant test'];
    }

    static get SUCCESS_INVERSE_TEST() {
        return [211, 'Matrix: successful inverse test'];
    }

    /**
     * The constructor of the meshHolder.
     *
     * @param matrix
     */
    constructor(matrix) {
        super();

        this.name = 'Matrix';

        this.init(matrix);
    }

    /**
     * Initialise this matrix
     *
     * @param matrix
     */
    init(matrix) {

        if (matrix instanceof Vector) {
            this.init(this.constructor.transpose([matrix.array]));
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

        return true;
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

        if (args.matrix instanceof Vector) {
            if (args.copy) {
                return new Vector(this.multiply(new Matrix([args.matrix.array]).transpose()).transpose().array[0]);
            }

            this.init(this.multiply(new Matrix([args.matrix.array]).transpose()).array);
            return this;
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
        return new Matrix(this.constructor.transpose(this.array));
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
        this.assert(this.cols === this.rows, 'matrix.inverse', this.constructor.ERROR_WRONG_MATRIX_DIMENSIONS_QUADRATIC);

        return new Matrix(this.constructor.inverse(this.array));
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
                return this.constructor.dotProduct(vector1, vector2);
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
     * Helper function to calculate the dot product from given two vectors.
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
}