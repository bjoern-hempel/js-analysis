/**
 * A class to create and calculates matrices
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-08)
 */
class Matrix {

    static get ERROR_ROWS_IS_NO_ARRAY() { return [1, 'rows are not an array']; }
    static get ERROR_ROWS_COUNT_ARRAY_WRONG() { return [2, 'count rows is wrong']; }
    static get ERROR_COLS_IS_NO_ARRAY() { return [3, 'cols are not an array']; }
    static get ERROR_COLS_COUNT_ARRAY_WRONG() { return [4, 'count cols is wrong']; }
    static get ERROR_WRONG_COL_NUMBER() { return [5, 'wrong col number test']; }
    static get ERROR_WRONG_MATRIX_TYPE() { return [6, 'wrong given matrix type']; }
    static get ERROR_WRONG_MATRIX_DIMENSIONS() { return [7, 'two given matrices with different dimensions']; }


    static get SUCCESS_INITIALIZE_MATRIX() { return [101, 'initialize matrix']; }
    static get SUCCESS_ADDITION_TEST() { return [102, 'successful addition test']; }

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

        this.rows   = matrix.length;
        this.cols   = 0;
        this.matrix = matrix;

        var self = this;

        /* check the rows and cols of matrix */
        matrix.map(function (row, rowNumber) {
            if (!(row instanceof Array)) {
                throw new MatrixException(
                    Matrix.ERROR_COLS_IS_NO_ARRAY[0],
                    String('Row %row of given parameter elements must be an instance of Array.').
                        replace(/%row/, rowNumber + 1)
                );
            }

            if (row.length <= 0) {
                throw new MatrixException(
                    Matrix.ERROR_COLS_COUNT_ARRAY_WRONG[0],
                    String('The number of cols in row %row from given parameter matrix must greater than 0.').
                        replace(/%row/, rowNumber)
                );
            }

            if (self.cols === 0) {
                self.cols = row.length;
            } else {
                if (self.cols !== row.length) {
                    throw new MatrixException(
                        Matrix.ERROR_WRONG_COL_NUMBER[0],
                        String('The number of cols in row %row from given parameter matrix must equal to %col.').
                            replace(/%row/, rowNumber + 1).
                            replace(/%col/, self.cols)

                    );
                }
            }

            row.map(function (col, colNumber) {
                if (isNaN(col)) {
                    throw new Error(
                        String('Cell %col in row %row of given parameter elements must be a number.').
                            replace(/%col/, colNumber + 1).
                            replace(/%row/, rowNumber + 1)
                    );
                }

                self.matrix[rowNumber][colNumber] = Number(col);
            });
        });
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
    get value() {
        return this.matrix;
    }

    /**
     * get the cell of matrix.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    get numberRows() {
        return this.rows;
    }

    /**
     * get the cell of matrix.
     *
     * @param x
     * @param y
     * @returns {*}
     */
    get numberCols() {
        return this.cols;
    }



    addition(matrix) {
        if (!(matrix instanceof Matrix)) {
            throw new MatrixException(
                Matrix.ERROR_WRONG_MATRIX_TYPE[0],
                'matrix.addition: The given parameter matrix must be an instance of Matrix.'
            );
        }

        if (this.cols !== matrix.numberCols || this.rows !== matrix.numberRows) {
            throw new MatrixException(
                Matrix.ERROR_WRONG_MATRIX_DIMENSIONS[0],
                'matrix.addition: The given matrix does not fit to this matrix.'
            );
        }

        var value = [];

        this.matrix.map(function (row, rowIndex) {
            var currentRow = [];

            row.map(function (col, colIndex) {
                currentRow.push(col + matrix.getCell(rowIndex, colIndex));
            });

            value.push(currentRow);
        });

        return new Matrix(value);
    }
}