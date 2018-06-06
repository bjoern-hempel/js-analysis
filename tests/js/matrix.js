function startMatrixTest() {

    /* Matrix: start given rows are not an array */
    new JsTest(
        Matrix.ERROR_ROWS_IS_NO_ARRAY,
        function () {
            var matrix = new Matrix('test');
            console.log(matrix.array);
            return false;
        }
    );

    /* Matrix: start given rows are not higher than 0 */
    new JsTest(
        Matrix.ERROR_ROWS_COUNT_ARRAY_WRONG,
        function () {
            var matrix = new Matrix([]);
            console.log(matrix.array);
            return false;
        }
    );

    /* Matrix: given cols are not an array */
    new JsTest(
        Matrix.ERROR_COLS_IS_NO_ARRAY,
        function () {
            var matrix = new Matrix(['string']);
            console.log(matrix.array);
            return false;
        }
    );

    /* Matrix: given cols are not an array */
    new JsTest(
        Matrix.ERROR_COLS_COUNT_ARRAY_WRONG,
        function () {
            var matrix = new Matrix([[], []]);
            console.log(matrix.array);
            return false;
        }
    );

    /* Matrix: start wrong col number test */
    new JsTest(
        Matrix.ERROR_WRONG_COL_NUMBER,
        function () {
            var matrix = new Matrix([[1, 2], [2]]);
            console.log(matrix.array);
            return false;
        }
    );

    /* Matrix: start initial test */
    new JsTest(
        Matrix.SUCCESS_INITIALISE_MATRIX,
        function () {
            var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
            return (
                JsTest.equalArrayValues(matrix.array, [[1, 2, 3], [4, 5, 6]]) &&
                JsTest.equalArrayValues(matrix.size, [2, 3])
            );
        }
    );

    /* Matrix: start initial test with vector */
    new JsTest(
        Matrix.SUCCESS_INITIALISE_MATRIX_FROM_VECTOR,
        function () {
            var vector = new Vector([1, 2, 3]);
            var matrix = new Matrix(vector);

            return (
                JsTest.equalArrayValues(matrix.array, [[1], [2], [3]]) &&
                JsTest.equalArrayValues(matrix.size, [3, 1])
            );
        }
    );

    /* Matrix: start initial test with vectors */
    new JsTest(
        Matrix.SUCCESS_INITIALISE_MATRIX_FROM_VECTORS,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([4, 5, 6]);
            var vector3 = new Vector([7, 8, 9]);
            var matrix = new Matrix(vector1, vector2, vector3);

            return (
                JsTest.equalArrayValues(matrix.array, [[1, 4, 7], [2, 5, 8], [3, 6, 9]]) &&
                JsTest.equalArrayValues(matrix.size, [3, 3])
            );
        }
    );

    /* Matrix: start change getCell test (correct - keep) */
    new JsTest(
        {config: Matrix.SUCCESS_CHANGE_CELL_TEST, mode: 'keep'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);

            matrix1.changeCell(0, 0, -1);

            return (
                JsTest.equalObjectInstance(matrix1, Matrix) &&
                JsTest.equalArrayValues(matrix1.array, [[-1, 2, 3], [4, 5, 6]]) &&
                JsTest.equalArrayValues(matrix1.size, [2, 3])
            );
        }
    );

    /* Matrix: start change getCell test (correct - keep) */
    new JsTest(
        {config: Matrix.SUCCESS_CHANGE_CELL_TEST, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);

            var matrix2 = matrix1.changeCell(true, 0, 0, -1);

            return (
                JsTest.equalObjectInstance(matrix1, Matrix) &&
                JsTest.equalArrayValues(matrix1.array, [[1, 2, 3], [4, 5, 6]]) &&
                JsTest.equalArrayValues(matrix1.size, [2, 3]) &&
                JsTest.equalObjectInstance(matrix2, Matrix) &&
                JsTest.equalArrayValues(matrix2.array, [[-1, 2, 3], [4, 5, 6]]) &&
                JsTest.equalArrayValues(matrix2.size, [2, 3])
            );
        }
    );

    /* Matrix: start delete row test */
    new JsTest(
        Matrix.ERROR_WRONG_ROW_ACCESS,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([4, 5, 6]);
            var matrix = new Matrix(vector1, vector2);

            /* row 3 does not exists */
            matrix.deleteRow(3);
            return false;
        }
    );

    /* Matrix: start delete row test (correct - keep) */
    new JsTest(
        {config: Matrix.SUCCESS_DELETE_ROW_TEST, mode: 'keep'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([4, 5, 6]);
            var matrix = new Matrix(vector1, vector2);

            matrix.deleteRow(1);

            return (
                matrix instanceof Matrix &&
                matrix.getCell(0, 0) === 1 &&
                matrix.getCell(1, 0) === 3 &&
                matrix.getCell(0, 1) === 4 &&
                matrix.getCell(1, 1) === 6 &&
                matrix.cols === 2 &&
                matrix.rows === 2
            );
        }
    );

    /* Matrix: start delete row test (correct - keep) */
    new JsTest(
        {config: Matrix.SUCCESS_DELETE_ROW_TEST, mode: 'copy'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([4, 5, 6]);
            var matrix1 = new Matrix(vector1, vector2);

            var matrix2 = matrix1.deleteRow(true, 1);

            return (
                vector1 instanceof Vector &&
                vector1.getCell(0) === 1 &&
                vector1.getCell(1) === 2 &&
                vector1.getCell(2) === 3 &&
                vector1.size === 3 &&
                vector2 instanceof Vector &&
                vector2.getCell(0) === 4 &&
                vector2.getCell(1) === 5 &&
                vector2.getCell(2) === 6 &&
                vector2.size === 3 &&
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 1 &&
                matrix1.getCell(1, 0) === 2 &&
                matrix1.getCell(2, 0) === 3 &&
                matrix1.getCell(0, 1) === 4 &&
                matrix1.getCell(1, 1) === 5 &&
                matrix1.getCell(2, 1) === 6 &&
                matrix1.cols === 2 &&
                matrix1.rows === 3 &&
                matrix2 instanceof Matrix &&
                matrix2.getCell(0, 0) === 1 &&
                matrix2.getCell(1, 0) === 3 &&
                matrix2.getCell(0, 1) === 4 &&
                matrix2.getCell(1, 1) === 6 &&
                matrix2.cols === 2 &&
                matrix2.rows === 2
            );
        }
    );

    /* Matrix: start add test (wrong matrix type) */
    new JsTest(
        Matrix.ERROR_WRONG_MATRIX_TYPE,
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = 1;
            /* this is not a matrix */

            matrix1.add(matrix2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Matrix: start add test (wrong matrix dimension) */
    new JsTest(
        Matrix.ERROR_WRONG_MATRIX_DIMENSIONS,
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[2, 4], [8, 10]]);
            /* this matrix has the wrong dimensions */

            matrix1.add(matrix2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Matrix: start add test (correct - keep) */
    new JsTest(
        {config: Matrix.SUCCESS_ADDITION_TEST, mode: 'keep'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);

            matrix1.add(matrix2);

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 3 &&
                matrix1.getCell(0, 1) === 6 &&
                matrix1.getCell(0, 2) === 9 &&
                matrix1.getCell(1, 0) === 12 &&
                matrix1.getCell(1, 1) === 15 &&
                matrix1.getCell(1, 2) === 18 &&
                matrix1.cols === 3 &&
                matrix1.rows === 2 &&
                matrix2 instanceof Matrix &&
                matrix2.getCell(0, 0) === 2 &&
                matrix2.getCell(0, 1) === 4 &&
                matrix2.getCell(0, 2) === 6 &&
                matrix2.getCell(1, 0) === 8 &&
                matrix2.getCell(1, 1) === 10 &&
                matrix2.getCell(1, 2) === 12 &&
                matrix2.cols === 3 &&
                matrix2.rows === 2
            );
        }
    );

    /* Matrix: start add test (correct - copy) */
    new JsTest(
        {config: Matrix.SUCCESS_ADDITION_TEST, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);

            var matrix3 = matrix1.add(true, matrix2);

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 1 &&
                matrix1.getCell(0, 1) === 2 &&
                matrix1.getCell(0, 2) === 3 &&
                matrix1.getCell(1, 0) === 4 &&
                matrix1.getCell(1, 1) === 5 &&
                matrix1.getCell(1, 2) === 6 &&
                matrix2 instanceof Matrix &&
                matrix2.getCell(0, 0) === 2 &&
                matrix2.getCell(0, 1) === 4 &&
                matrix2.getCell(0, 2) === 6 &&
                matrix2.getCell(1, 0) === 8 &&
                matrix2.getCell(1, 1) === 10 &&
                matrix2.getCell(1, 2) === 12 &&
                matrix3 instanceof Matrix &&
                matrix3.getCell(0, 0) === 3 &&
                matrix3.getCell(0, 1) === 6 &&
                matrix3.getCell(0, 2) === 9 &&
                matrix3.getCell(1, 0) === 12 &&
                matrix3.getCell(1, 1) === 15 &&
                matrix3.getCell(1, 2) === 18 &&
                matrix3.cols === matrix1.cols &&
                matrix3.rows === matrix1.rows
            );
        }
    );

    /* Matrix: start subtraction test (wrong matrix type) */
    new JsTest(
        Matrix.ERROR_WRONG_MATRIX_TYPE,
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = 1;
            /* this is not a matrix */

            matrix1.subtract(matrix2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Matrix: start subtraction test (wrong matrix dimension) */
    new JsTest(
        Matrix.ERROR_WRONG_MATRIX_DIMENSIONS,
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[2, 4], [8, 10]]);
            /* this matrix has the wrong dimensions */

            matrix1.subtract(matrix2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Matrix: start subtraction test (correct - keep) */
    new JsTest(
        {config: Matrix.SUCCESS_SUBTRACTION_TEST, mode: 'keep'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);

            matrix1.subtract(matrix2);

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === -1 &&
                matrix1.getCell(0, 1) === -2 &&
                matrix1.getCell(0, 2) === -3 &&
                matrix1.getCell(1, 0) === -4 &&
                matrix1.getCell(1, 1) === -5 &&
                matrix1.getCell(1, 2) === -6 &&
                matrix1.cols === 3 &&
                matrix1.rows === 2 &&
                matrix2.getCell(0, 0) === 2 &&
                matrix2.getCell(0, 1) === 4 &&
                matrix2.getCell(0, 2) === 6 &&
                matrix2.getCell(1, 0) === 8 &&
                matrix2.getCell(1, 1) === 10 &&
                matrix2.getCell(1, 2) === 12 &&
                matrix2.cols === 3 &&
                matrix2.rows === 2
            );
        }
    );

    /* Matrix: start subtraction test (correct - copy) */
    new JsTest(
        {config: Matrix.SUCCESS_SUBTRACTION_TEST, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);

            var matrix3 = matrix1.subtract(true, matrix2);

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 1 &&
                matrix1.getCell(0, 1) === 2 &&
                matrix1.getCell(0, 2) === 3 &&
                matrix1.getCell(1, 0) === 4 &&
                matrix1.getCell(1, 1) === 5 &&
                matrix1.getCell(1, 2) === 6 &&
                matrix2 instanceof Matrix &&
                matrix2.getCell(0, 0) === 2 &&
                matrix2.getCell(0, 1) === 4 &&
                matrix2.getCell(0, 2) === 6 &&
                matrix2.getCell(1, 0) === 8 &&
                matrix2.getCell(1, 1) === 10 &&
                matrix2.getCell(1, 2) === 12 &&
                matrix3 instanceof Matrix &&
                matrix3.getCell(0, 0) === -1 &&
                matrix3.getCell(0, 1) === -2 &&
                matrix3.getCell(0, 2) === -3 &&
                matrix3.getCell(1, 0) === -4 &&
                matrix3.getCell(1, 1) === -5 &&
                matrix3.getCell(1, 2) === -6 &&
                matrix3.cols === matrix1.cols &&
                matrix3.rows === matrix1.rows
            );
        }
    );

    /* Matrix: start scalar multiplication test (no scalar) */
    new JsTest(
        Matrix.ERROR_NO_SCALAR,
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);

            matrix1.scalarMultiplication(matrix2);

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 3 &&
                matrix1.getCell(0, 1) === 6 &&
                matrix1.getCell(0, 2) === 9 &&
                matrix1.getCell(1, 0) === 12 &&
                matrix1.getCell(1, 1) === 15 &&
                matrix1.getCell(1, 2) === 18 &&
                matrix1.cols === matrix1.cols &&
                matrix1.rows === matrix1.rows
            );
        }
    );

    /* Matrix: start scalar multiplication test (keep) */
    new JsTest(
        {config: Matrix.SUCCESS_SCALAR_MULTIPLICATION_TEST, mode: 'keep'},
        function () {
            var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var scalar = 2.5;

            matrix.multiply(scalar);

            return (
                matrix instanceof Matrix &&
                matrix.getCell(0, 0) === 2.5 &&
                matrix.getCell(0, 1) === 5 &&
                matrix.getCell(0, 2) === 7.5 &&
                matrix.getCell(1, 0) === 10 &&
                matrix.getCell(1, 1) === 12.5 &&
                matrix.getCell(1, 2) === 15 &&
                matrix.cols === 3 &&
                matrix.rows === 2 &&
                scalar === 2.5
            );
        }
    );

    /* Matrix: start scalar multiplication test (copy) */
    new JsTest(
        {config: Matrix.SUCCESS_SCALAR_MULTIPLICATION_TEST, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var scalar = 2.5;

            var matrix2 = matrix1.multiply(true, scalar);

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 1 &&
                matrix1.getCell(0, 1) === 2 &&
                matrix1.getCell(0, 2) === 3 &&
                matrix1.getCell(1, 0) === 4 &&
                matrix1.getCell(1, 1) === 5 &&
                matrix1.getCell(1, 2) === 6 &&
                matrix1.cols === matrix1.cols &&
                matrix1.rows === matrix1.rows &&
                matrix2 instanceof Matrix &&
                matrix2.getCell(0, 0) === 2.5 &&
                matrix2.getCell(0, 1) === 5 &&
                matrix2.getCell(0, 2) === 7.5 &&
                matrix2.getCell(1, 0) === 10 &&
                matrix2.getCell(1, 1) === 12.5 &&
                matrix2.getCell(1, 2) === 15 &&
                matrix2.cols === matrix1.cols &&
                matrix2.rows === matrix1.rows
            );
        }
    );

    /* Matrix: start matrix multiplication test (wrong matrix dimension) */
    new JsTest(
        Matrix.ERROR_WRONG_MATRIX_DIMENSIONS,
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[1], [2]]);

            matrix1.multiply(matrix2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Matrix: start matrix multiplication test (keep) */
    new JsTest(
        {config: Matrix.SUCCESS_MULTIPLICATION_MATRIX_TEST, mode: 'keep'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[1], [2], [3]]);

            matrix1.multiply(matrix2);

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 14 &&
                matrix1.getCell(1, 0) === 32 &&
                matrix1.cols === 1 &&
                matrix1.rows === 2 &&
                matrix2 instanceof Matrix &&
                matrix2.getCell(0, 0) === 1 &&
                matrix2.getCell(1, 0) === 2 &&
                matrix2.getCell(2, 0) === 3 &&
                matrix2.cols === 1 &&
                matrix2.rows === 3
            );
        }
    );

    /* Matrix: start matrix multiplication test (copy) */
    new JsTest(
        {config: Matrix.SUCCESS_MULTIPLICATION_MATRIX_TEST, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = new Matrix([[1], [2], [3]]);
            var matrix3 = matrix1.multiply(true, matrix2);

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 1 &&
                matrix1.getCell(0, 1) === 2 &&
                matrix1.getCell(0, 2) === 3 &&
                matrix1.getCell(1, 0) === 4 &&
                matrix1.getCell(1, 1) === 5 &&
                matrix1.getCell(1, 2) === 6 &&
                matrix1.cols === 3 &&
                matrix1.rows === 2 &&
                matrix2 instanceof Matrix &&
                matrix2.getCell(0, 0) === 1 &&
                matrix2.getCell(1, 0) === 2 &&
                matrix2.getCell(2, 0) === 3 &&
                matrix2.cols === 1 &&
                matrix2.rows === 3 &&
                matrix3 instanceof Matrix &&
                matrix3.getCell(0, 0) === 14 &&
                matrix3.getCell(1, 0) === 32 &&
                matrix3.cols === 1 &&
                matrix3.rows === 2
            );
        }
    );

    /* Matrix: start vector multiplication test (keep) */
    new JsTest(
        {config: Matrix.SUCCESS_MULTIPLICATION_MATRIX_VECTOR_TEST, mode: 'keep'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var vector1 = new Vector([1, 2, 3]);

            matrix1.multiply(vector1);

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 14 &&
                matrix1.getCell(1, 0) === 32 &&
                matrix1.cols === 1 &&
                matrix1.rows === 2
            );
        }
    );

    /* Matrix: start vector multiplication test (copy) */
    new JsTest(
        {config: Matrix.SUCCESS_MULTIPLICATION_MATRIX_VECTOR_TEST, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = matrix1.multiply(true, vector1);

            return (
                JsTest.equalObjectInstance(matrix1, Matrix) &&
                JsTest.equalArrayValues(matrix1.array, [[1, 2, 3], [4, 5, 6]]) &&
                JsTest.equalArrayValues(matrix1.size, [2, 3]) &&
                JsTest.equalObjectInstance(vector1, Vector) &&
                JsTest.equalArrayValues(vector1.array, [1, 2, 3]) &&
                vector1.size === 3 &&
                JsTest.equalObjectInstance(vector2, Vector) &&
                JsTest.equalArrayValues(vector2.array, [14, 32]) &&
                vector2.size === 2
            );
        }
    );

    /* Matrix: start transpose test (keep) */
    new JsTest(
        {config: Matrix.SUCCESS_TRANSPOSE_TEST, mode: 'keep'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            matrix1.transpose();

            return (
                matrix1 instanceof Matrix &&
                matrix1.getCell(0, 0) === 1 &&
                matrix1.getCell(0, 1) === 4 &&
                matrix1.getCell(1, 0) === 2 &&
                matrix1.getCell(1, 1) === 5 &&
                matrix1.getCell(2, 0) === 3 &&
                matrix1.getCell(2, 1) === 6 &&
                matrix1.cols === 2 &&
                matrix1.rows === 3
            );
        }
    );

    /* Matrix: start transpose test (copy) */
    new JsTest(
        {config: Matrix.SUCCESS_TRANSPOSE_TEST, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
            var matrix2 = matrix1.transpose(true);

            return (
                matrix2 instanceof Matrix &&
                matrix2.getCell(0, 0) === 1 &&
                matrix2.getCell(0, 1) === 4 &&
                matrix2.getCell(1, 0) === 2 &&
                matrix2.getCell(1, 1) === 5 &&
                matrix2.getCell(2, 0) === 3 &&
                matrix2.getCell(2, 1) === 6 &&
                matrix2.cols === matrix1.rows &&
                matrix2.rows === matrix1.cols
            );
        }
    );

    /* Matrix: start matrix determinant calculation test (wrong matrix dimension) */
    new JsTest(
        Matrix.ERROR_WRONG_MATRIX_DIMENSIONS_QUADRATIC,
        function () {
            var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);

            matrix.determinant();

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Matrix: start matrix determinant calculation test */
    new JsTest(
        Matrix.SUCCESS_DETERMINANT_TEST,
        function () {
            var matrix = new Matrix([[1]]);
            var determinant = matrix.determinant();

            /* the method add should throw an exception */
            return determinant === 1;
        }
    );

    /* Matrix: start matrix determinant calculation test */
    new JsTest(
        Matrix.SUCCESS_DETERMINANT_TEST,
        function () {
            var matrix = new Matrix([[1, 1], [2, 3]]);
            var determinant = matrix.determinant();

            /* the method add should throw an exception */
            return determinant === 1;
        }
    );

    /* Matrix: start matrix determinant calculation test */
    new JsTest(
        Matrix.SUCCESS_DETERMINANT_TEST,
        function () {
            var matrix = new Matrix([[1, 2, 3, 4, 0], [5, 6, 7, 8, 7], [9, 1, 2, 3, 8], [4, 5, 9, 7, -1], [7, 8, -2, -5, -3]]);
            var determinant = matrix.determinant();

            /* the method add should throw an exception */
            return determinant === -8406;
        }
    );

    /* Matrix: start matrix inverse calculation test (keep) */
    new JsTest(
        {config: Matrix.SUCCESS_INVERSE_TEST, mode: 'keep'},
        function () {
            var matrix = new Matrix([[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]);
            matrix.inverse();
            var precision = 5;

            return (
                matrix instanceof Matrix &&
                Math.round(precision * matrix.getCell(0, 0)) === Math.round(precision * 5 / 22) &&
                Math.round(precision * matrix.getCell(0, 1)) === Math.round(precision * -1 / 11) &&
                Math.round(precision * matrix.getCell(0, 2)) === Math.round(precision * -9 / 22) &&
                Math.round(precision * matrix.getCell(1, 0)) === Math.round(precision * 3 / 11) &&
                Math.round(precision * matrix.getCell(1, 1)) === Math.round(precision * 1 / 11) &&
                Math.round(precision * matrix.getCell(1, 2)) === Math.round(precision * -1 / 11) &&
                Math.round(precision * matrix.getCell(2, 0)) === Math.round(precision * 5 / 66) &&
                Math.round(precision * matrix.getCell(2, 1)) === Math.round(precision * -1 / 33) &&
                Math.round(precision * matrix.getCell(2, 2)) === Math.round(precision * 13 / 66) &&
                matrix.cols === 3 &&
                matrix.rows === 3
            );
        }
    );

    /* Matrix: start matrix inverse calculation test (copy) */
    new JsTest(
        {config: Matrix.SUCCESS_INVERSE_TEST, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]);
            var matrix2 = matrix1.inverse(true);
            var precision = 5;

            return (
                matrix1 instanceof Matrix &&
                JsTest.equalArrayValues(matrix1.array, [[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]) &&
                JsTest.equalArrayValues(matrix1.size, [3, 3]) &&
                matrix2 instanceof Matrix &&
                Math.round(precision * matrix2.getCell(0, 0)) === Math.round(precision * 5 / 22) &&
                Math.round(precision * matrix2.getCell(0, 1)) === Math.round(precision * -1 / 11) &&
                Math.round(precision * matrix2.getCell(0, 2)) === Math.round(precision * -9 / 22) &&
                Math.round(precision * matrix2.getCell(1, 0)) === Math.round(precision * 3 / 11) &&
                Math.round(precision * matrix2.getCell(1, 1)) === Math.round(precision * 1 / 11) &&
                Math.round(precision * matrix2.getCell(1, 2)) === Math.round(precision * -1 / 11) &&
                Math.round(precision * matrix2.getCell(2, 0)) === Math.round(precision * 5 / 66) &&
                Math.round(precision * matrix2.getCell(2, 1)) === Math.round(precision * -1 / 33) &&
                Math.round(precision * matrix2.getCell(2, 2)) === Math.round(precision * 13 / 66) &&
                matrix2.cols === 3 &&
                matrix2.rows === 3
            );
        }
    );

    /* Matrix: start matrix manipulate shift test (keep) */
    new JsTest(
        {config: Matrix.SUCCESS_MANIPULATE_SHIFT_COL, mode: 'keep'},
        function () {
            var matrix = new Matrix([[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]);
            matrix.shiftCol();

            return (
                matrix instanceof Matrix &&
                JsTest.equalArrayValues(matrix.array, [[2, 3], [5, -6], [0, 3]]) &&
                JsTest.equalArrayValues(matrix.size, [3, 2])
            );
        }
    );

    /* Matrix: start matrix manipulate shift test (copy) */
    new JsTest(
        {config: Matrix.SUCCESS_MANIPULATE_SHIFT_COL, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]);
            var matrix2 = matrix1.shiftCol(true);

            return (
                matrix1 instanceof Matrix &&
                JsTest.equalArrayValues(matrix1.array, [[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]) &&
                JsTest.equalArrayValues(matrix1.size, [3, 3]) &&
                matrix2 instanceof Matrix &&
                JsTest.equalArrayValues(matrix2.array, [[2, 3], [5, -6], [0, 3]]) &&
                JsTest.equalArrayValues(matrix2.size, [3, 2])
            );
        }
    );

    /* Matrix: start matrix manipulate shift test (keep) */
    new JsTest(
        {config: Matrix.SUCCESS_MANIPULATE_SHIFT_ROW, mode: 'keep'},
        function () {
            var matrix = new Matrix([[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]);
            matrix.shiftRow();

            return (
                matrix instanceof Matrix &&
                JsTest.equalArrayValues(matrix.array, [[-4, 5, -6], [-1, 0, 3]]) &&
                JsTest.equalArrayValues(matrix.size, [2, 3])
            );
        }
    );

    /* Matrix: start matrix manipulate shift test (copy) */
    new JsTest(
        {config: Matrix.SUCCESS_MANIPULATE_SHIFT_ROW, mode: 'copy'},
        function () {
            var matrix1 = new Matrix([[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]);
            var matrix2 = matrix1.shiftRow(true);

            return (
                matrix1 instanceof Matrix &&
                JsTest.equalArrayValues(matrix1.array, [[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]) &&
                JsTest.equalArrayValues(matrix1.size, [3, 3]) &&
                matrix2 instanceof Matrix &&
                JsTest.equalArrayValues(matrix2.array, [[-4, 5, -6], [-1, 0, 3]]) &&
                JsTest.equalArrayValues(matrix2.size, [2, 3])
            );
        }
    );
}