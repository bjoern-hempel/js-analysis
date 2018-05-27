function startVectorTest() {

    /* Vector: init vector wrong given values */
    new Test(
        Vector.ERROR_VECTOR_IS_NO_ARRAY,
        function () {
            var vector = new Vector(1);
            console.log(vector.array);
            return false;
        }
    );

    /* Vector: init vector wrong given values */
    new Test(
        Vector.ERROR_VECTOR_SIZE_WRONG,
        function () {
            var vector = new Vector([]);
            console.log(vector.array);
            return false;
        }
    );

    /* Vector: init vector wrong given values */
    new Test(
        Vector.ERROR_ELEMENT_IS_NO_NUMBER,
        function () {
            var vector = new Vector([1, [1, 2]]);
            console.log(vector.array);
            return false;
        }
    );

    /* Vector: start initial test */
    new Test(
        Vector.SUCCESS_INITIALIZE_VECTOR,
        function () {
            var vector = new Vector([1, 2, 3]);
            return (
                vector.getCell(0) === 1 &&
                vector.getCell(1) === 2 &&
                vector.getCell(2) === 3 &&
                vector.size === 3
            );
        }
    );

    /* Vector: start change getCell test (correct - keep) */
    new Test(
        {config: Vector.SUCCESS_CHANGE_CELL_TEST, mode: 'keep'},
        function () {
            var vector = new Vector([1, 2, 3]);

            vector.changeCell(0, -1);

            return (
                vector instanceof Vector &&
                vector.getCell(0) === -1 &&
                vector.getCell(1) === 2 &&
                vector.getCell(2) === 3 &&
                vector.size === 3
            );
        }
    );

    /* Vector: start change getCell test (correct - copy) */
    new Test(
        {config: Vector.SUCCESS_CHANGE_CELL_TEST, mode: 'copy'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = vector1.changeCell(true, 0, -1);

            return (
                vector1 instanceof Vector &&
                vector1.getCell(0) === 1 &&
                vector1.getCell(1) === 2 &&
                vector1.getCell(2) === 3 &&
                vector1.size === 3 &&
                vector2 instanceof Vector &&
                vector2.getCell(0) === -1 &&
                vector2.getCell(1) === 2 &&
                vector2.getCell(2) === 3 &&
                vector2.size === 3
            );
        }
    );

    /* Vector: start add test (wrong vector type) */
    new Test(
        Vector.ERROR_WRONG_VECTOR_TYPE,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = 1;
            /* this is not a matrix */

            vector1.add(vector2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Vector: start add test (wrong vector dimension) */
    new Test(
        Vector.ERROR_WRONG_VECTOR_DIMENSIONS,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([2, 4]);
            /* this matrix has the wrong dimensions */

            vector1.add(vector2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Vector: start add test (correct - keep) */
    new Test(
        {config: Vector.SUCCESS_ADDITION_TEST, mode: 'keep'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([2, 4, 6]);

            vector1.add(vector2);

            return (
                vector1 instanceof Vector &&
                vector1.getCell(0) === 3 &&
                vector1.getCell(1) === 6 &&
                vector1.getCell(2) === 9 &&
                vector1.size === 3
            );
        }
    );

    /* Vector: start add test (correct - copy) */
    new Test(
        {config: Vector.SUCCESS_ADDITION_TEST, mode: 'copy'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([2, 4, 6]);

            var vector3 = vector1.add(true, vector2);

            return (
                vector1 instanceof Vector &&
                vector1.getCell(0) === 1 &&
                vector1.getCell(1) === 2 &&
                vector1.getCell(2) === 3 &&
                vector1.size === 3 &&
                vector2 instanceof Vector &&
                vector2.getCell(0) === 2 &&
                vector2.getCell(1) === 4 &&
                vector2.getCell(2) === 6 &&
                vector2.size === 3 &&
                vector3 instanceof Vector &&
                vector3.getCell(0) === 3 &&
                vector3.getCell(1) === 6 &&
                vector3.getCell(2) === 9 &&
                vector3.size === 3
            );
        }
    );

    /* Vector: start subtraction test (wrong vector type) */
    new Test(
        Vector.ERROR_WRONG_VECTOR_TYPE,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = 1;
            /* this is not a matrix */

            vector1.subtract(vector2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Vector: start subtraction test (wrong vector dimension) */
    new Test(
        Vector.ERROR_WRONG_VECTOR_DIMENSIONS,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([2, 4]);
            /* this matrix has the wrong dimensions */

            vector1.subtract(vector2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Vector: start subtraction test (correct - keep) */
    new Test(
        {config: Vector.SUCCESS_SUBTRACTION_TEST, mode: 'keep'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([2, 4, 6]);

            vector1.subtract(vector2);

            return (
                vector1 instanceof Vector &&
                vector1.getCell(0) === -1 &&
                vector1.getCell(1) === -2 &&
                vector1.getCell(2) === -3 &&
                vector1.size === 3
            );
        }
    );

    /* Vector: start subtraction test (correct - copy) */
    new Test(
        {config: Vector.SUCCESS_SUBTRACTION_TEST, mode: 'copy'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([2, 4, 6]);

            var vector3 = vector1.subtract(true, vector2);

            return (
                vector1 instanceof Vector &&
                vector1.getCell(0) === 1 &&
                vector1.getCell(1) === 2 &&
                vector1.getCell(2) === 3 &&
                vector1.size === 3 &&
                vector2 instanceof Vector &&
                vector2.getCell(0) === 2 &&
                vector2.getCell(1) === 4 &&
                vector2.getCell(2) === 6 &&
                vector2.size === 3 &&
                vector3 instanceof Vector &&
                vector3.getCell(0) === -1 &&
                vector3.getCell(1) === -2 &&
                vector3.getCell(2) === -3 &&
                vector3.size === 3
            );
        }
    );

    /* Vector: start dot product test (wrong vector type) */
    new Test(
        Vector.ERROR_WRONG_VECTOR_TYPE,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = 1;
            /* this is not a matrix */

            vector1.dotProduct(vector2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Vector: start dot product test (wrong vector dimension) */
    new Test(
        Vector.ERROR_WRONG_VECTOR_DIMENSIONS,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([2, 4]);
            /* this matrix has the wrong dimensions */

            vector1.dotProduct(vector2);

            /* the method add should throw an exception */
            return false;
        }
    );

    /* Vector: start subtraction test (correct - keep) */
    new Test(
        {config: Vector.SUCCESS_DOT_PRODUCT, mode: 'keep'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([2, 4, 6]);

            var product = vector1.dotProduct(vector2);

            return (
                Test.objectInstance(vector1, Vector) &&
                Test.arrayEqual(vector1.array, [1, 2, 3]) &&
                Test.objectInstance(vector2, Vector) &&
                Test.arrayEqual(vector2.array, [2, 4, 6]) &&
                product === 28
            );
        }
    );

    /* Vector: start subtraction test (correct - keep) */
    new Test(
        {config: Vector.SUCCESS_DOT_PRODUCT, mode: 'keep'},
        function () {
            var vector1 = new Vector([1, 2, 3, 4]);
            var vector2 = new Vector([2, 4, 6, 8]);

            var product = vector1.dotProduct(vector2);

            return (
                Test.objectInstance(vector1, Vector) &&
                Test.arrayEqual(vector1.array, [1, 2, 3, 4]) &&
                Test.objectInstance(vector2, Vector) &&
                Test.arrayEqual(vector2.array, [2, 4, 6, 8]) &&
                product === 60
            );
        }
    );

    /* Vector: start dot product test (correct - copy) */
    new Test(
        {config: Vector.SUCCESS_DOT_PRODUCT, mode: 'copy'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([2, 4, 6]);

            var product = vector1.dotProduct(true, vector2);

            return (
                Test.objectInstance(vector1, Vector) &&
                Test.arrayEqual(vector1.array, [1, 2, 3]) &&
                Test.objectInstance(vector2, Vector) &&
                Test.arrayEqual(vector2.array, [2, 4, 6]) &&
                product === 28
            );
        }
    );

    /* Vector: start vector product (cross product) test */
    new Test(
        Vector.ERROR_WRONG_VECTOR_DIMENSIONS,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([-1, 5]);

            vector1.vectorProduct(vector2);

            return false;
        }
    );

    /* Vector: start vector product (cross product) test */
    new Test(
        Vector.ERROR_WRONG_VECTOR_COUNT,
        function () {
            var vector1 = new Vector([1, 2, 3, 4]);
            var vector2 = new Vector([-1, 5, -2, 1]);

            /* one vector is missing */
            vector1.vectorProduct(vector2);

            return false;
        }
    );

    /* Vector: start vector product (cross product) test (correct - keep) */
    new Test(
        {config: Vector.SUCCESS_VECTOR_PRODUCT, mode: 'keep'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([-1, 5, -2]);

            vector1.vectorProduct(vector2);

            return (
                vector1 instanceof Vector &&
                vector1.getCell(0) === -19 &&
                vector1.getCell(1) === -1 &&
                vector1.getCell(2) === 7 &&
                vector1.size === 3 &&
                vector2 instanceof Vector &&
                vector2.getCell(0) === -1 &&
                vector2.getCell(1) === 5 &&
                vector2.getCell(2) === -2 &&
                vector2.size === 3
            );
        }
    );

    /* Vector: start vector product (cross product) test (correct - copy) */
    new Test(
        {config: Vector.SUCCESS_VECTOR_PRODUCT, mode: 'copy'},
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = new Vector([-1, 5, -2]);

            var vector3 = vector1.vectorProduct(true, vector2);

            return (
                vector1 instanceof Vector &&
                vector1.getCell(0) === 1 &&
                vector1.getCell(1) === 2 &&
                vector1.getCell(2) === 3 &&
                vector1.size === 3 &&
                vector2 instanceof Vector &&
                vector2.getCell(0) === -1 &&
                vector2.getCell(1) === 5 &&
                vector2.getCell(2) === -2 &&
                vector2.size === 3 &&
                vector3 instanceof Vector &&
                vector3.getCell(0) === -19 &&
                vector3.getCell(1) === -1 &&
                vector3.getCell(2) === 7 &&
                vector3.size === 3
            );
        }
    );

    /* Vector: start vector product (cross product) test (correct - copy) */
    new Test(
        {config: Vector.SUCCESS_VECTOR_PRODUCT, mode: 'copy'},
        function () {
            var vector1 = new Vector([1, 2, 3, 4]);
            var vector2 = new Vector([-1, 5, -2, 1]);
            var vector3 = new Vector([0, 4, 2, 10]);

            var vector4 = vector1.vectorProduct(true, vector2, vector3);

            return (
                vector1 instanceof Vector &&
                vector1.getCell(0) === 1 &&
                vector1.getCell(1) === 2 &&
                vector1.getCell(2) === 3 &&
                vector1.getCell(3) === 4 &&
                vector1.size === 4 &&
                vector2 instanceof Vector &&
                vector2.getCell(0) === -1 &&
                vector2.getCell(1) === 5 &&
                vector2.getCell(2) === -2 &&
                vector2.getCell(3) === 1 &&
                vector2.size === 4 &&
                vector3 instanceof Vector &&
                vector3.getCell(0) === 0 &&
                vector3.getCell(1) === 4 &&
                vector3.getCell(2) === 2 &&
                vector3.getCell(3) === 10 &&
                vector3.size === 4 &&
                vector4 instanceof Vector &&
                vector4.getCell(0) === -110 &&
                vector4.getCell(1) === 0 &&
                vector4.getCell(2) === 50 &&
                vector4.getCell(3) === -10 &&
                vector4.size === 4
            );
        }
    );

    /* Vector: start vector product (cross product) test (correct - copy) */
    new Test(
        {config: Vector.SUCCESS_VECTOR_PRODUCT, mode: 'copy'},
        function () {
            var vector1 = new Vector([1, 2, 3, 4, 5]);
            var vector2 = new Vector([-1, 5, -2, 1, 0]);
            var vector3 = new Vector([0, 4, 2, 10, -9]);
            var vector4 = new Vector([7, 3, -5, 20, -3]);

            var vector5 = vector1.vectorProduct(true, vector2, vector3, vector4);

            return (
                Test.objectInstance(vector1, Vector) &&
                Test.arrayEqual(vector1.array, [1, 2, 3, 4, 5]) &&
                vector1.size === 5 &&
                Test.objectInstance(vector2, Vector) &&
                Test.arrayEqual(vector2.array, [-1, 5, -2, 1, 0]) &&
                vector2.size === 5 &&
                Test.objectInstance(vector3, Vector) &&
                Test.arrayEqual(vector3.array, [0, 4, 2, 10, -9]) &&
                vector3.size === 5 &&
                Test.objectInstance(vector4, Vector) &&
                Test.arrayEqual(vector4.array, [7, 3, -5, 20, -3]) &&
                vector4.size === 5 &&
                Test.objectInstance(vector5, Vector) &&
                Test.arrayEqual(vector5.array, [-6223, -2318, -1519, 2329, 1220]) &&
                vector5.size === 5
            );
        }
    );

    /* Vector: start vector length test */
    new Test(
        Vector.SUCCESS_LENGTH_VECTOR,
        function () {
            var vector = new Vector([1, 2, 3]);

            return (
                vector.length === Math.sqrt(14)
            );
        }
    );

    /* Vector: start initial test */
    new Test(
        Vector.SUCCESS_CALLBACK,
        function () {
            var vector1 = new Vector([1, 2, 3]);
            var vector2 = vector1.callback(function (element) { return Math.pow(element, 2); });
            return (
                vector2.getCell(0) === 1 &&
                vector2.getCell(1) === 4 &&
                vector2.getCell(2) === 9 &&
                vector2.size === 3
            );
        }
    );
}