function MatrixException (code, message) {
    this.code = code;
    this.message = message;

    this.name = 'MatrixException';
}

MatrixException.prototype.toString = function () {
    return this.name + ': "' + this.message + '"';
}

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
    static get SUCCESS_CELL() { return [6, 'right cell']; }

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

    get value () {
        return this.matrix;
    }

    getCell (x, y) {
        return this.matrix[x][y];
    }
}