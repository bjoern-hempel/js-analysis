# Javascript Numerical Analysis Library

This javascript library provides some functions to do some numerical analysis calculations.

## 1. Vectors

Create vectors and do some calculations with the library `sources/js/vector.js`.

### 1.1 Some basics

#### 1.1.1 Create a vector

<table>
    <tr>
        <th colspan="2" align="left"><code>Vector.constructor(array)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Array} array  An one-dimensional array that represents the vector.</code></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Vector}</code></td>
    </tr>
</table>

##### 1.1.1.1 Example

```javascript
var vector = new Vector([1, 2, 3]);
console.log(JSON.stringify(vector.array)); // prints [1,2,3]
```

### 1.2 Properties

#### 1.2.1 Length of the vector

Coming soon..

### 1.3 Calculations

#### 1.3.1 Change or copy the used vector

Normally all calculations refer to the used vector. That means that all calculations will change this vector.

##### 1.3.1.1 "Change" example:

The following example applies the calculation to the first matrix (`matrix1`).

```javascript
/* create two matrices */
var vector1 = new Vector([1, 2, 3]);
var vector2 = new Vector([2, 4, 6]);

/* do the calculation */
vector1.add(vector2);

/* The vector vector1 now contains the value [3,6,9]!
 * The old value [1,2,3] has changed.
 * The vector vector2 is unchanged.
 */
console.log(JSON.stringify(vector1.array)); // prints [3,6,9]
console.log(JSON.stringify(vector2.array)); // prints [2,4,6]
```

##### 1.3.1.2 "Copy" example:

If you want to keep the values from the used matrix `matrix1`, you can do a copy from the calculation result. Just add another parameter to the calculation function (the copy parameter):

```javascript
/* create two matrices */
var vector1 = new Vector([1, 2, 3]);
var vector2 = new Vector([2, 4, 6]);

/* Do the calculation and copy the result to vector3.
 * The first parameter must contain the value true.
 */
var vector3 = vector1.add(true, vector2);

/* The vector vector1 is unchanged.
 * The vector vector2 is unchanged.
 * The vector vector3 now contains the calculation result [3,6,9]!
 */
console.log(JSON.stringify(vector1.array)); // prints [1,2,3]
console.log(JSON.stringify(vector2.array)); // prints [2,4,6]
console.log(JSON.stringify(vector3.array)); // prints [3,6,9]
```

#### 1.3.2 Add two vectors

Coming soon..

#### 1.3.2 Subtract two vectors

Coming soon..

#### 1.3.4 Dot Product

Coming soon..

#### 1.3.5 Cross Product

Coming soon..

### 1.4 Manipulate the vector

#### 1.4.1 Change a value

Coming soon..

#### 1.4.2 Add a value

Coming soon..

#### 1.4.3 Delete a value

Coming soon..

## 2. Matrices

Here are some calculation examples with matrices with the help of the library `sources/js/matrix.js`:

### 2.1 Some basics

#### 2.1.1 Create a matrix

<table>
    <tr>
        <th colspan="2" align="left"><code>Matrix.constructor(array)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Array} array  A two-dimensional array that represents the matrix.</code></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Matrix}</code></td>
    </tr>
</table>

##### 2.1.1.1 Example

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
console.log(JSON.stringify(matrix.array)); // prints [[1,2,3],[4,5,6]]
```

### 2.2 Properties

### 2.3 Calculations

#### 2.3.1 Change or copy the used matrix

Normally all calculations refer to the used matrix. That means that all calculations will change this matrix.

##### 2.3.1.1 "Change" example:

The following example applies the calculation to the first matrix (`matrix1`).

```javascript
/* create two matrices */
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);

/* do the calculation */
matrix1.add(matrix2);

/* The matrix matrix1 now contains the value [[3,6,9],[12,15,18]]!
 * The old value [[1,2,3],[4,5,6]] has changed.
 * The matrix matrix2 is unchanged.
 */
console.log(JSON.stringify(matrix1.array)); // prints [[3,6,9],[12,15,18]]
console.log(JSON.stringify(matrix2.array)); // prints [[2,4,6],[8,10,12]]
```

##### 2.3.1.2 "Copy" example:

If you want to keep the values from the used matrix `matrix1`, you can do a copy from the calculation result. Just add another parameter to the calculation function (the copy parameter):

```javascript
/* create two matrices */
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);

/* Do the calculation and copy the result to matrix3.
 * The first parameter must contain the value true. */
var matrix3 = matrix1.add(true, matrix2);

/* The matrix matrix1 is unchanged.
 * The matrix matrix2 is unchanged.
 * The matrix matrix3 now contains the calculation result [[3,6,9],[12,15,18]]!
 */
console.log(JSON.stringify(matrix1.array)); // prints [[1,2,3],[4,5,6]]
console.log(JSON.stringify(matrix2.array)); // prints [[2,4,6],[8,10,12]]
console.log(JSON.stringify(matrix3.array)); // prints [[3,6,9],[12,15,18]]
```

#### 2.3.2 Add two matrices

<table>
    <tr>
        <th colspan="2" align="left"><code>Matrix.add([copy], matrix)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean} copy (optional)</code></td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Matrix} matrix</code></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Matrix}</code></td>
    </tr>
</table>

##### 2.3.2.1 Example

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);
matrix1.add(matrix2);
console.log(JSON.stringify(matrix1.array)); // prints [[3,6,9],[12,15,18]]
```

#### 2.3.3 Subtract two matrices

##### 2.3.3.1 Example

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);
matrix1.substract(matrix2);
console.log(JSON.stringify(matrix1.array)); // prints [[-1,-2,-3],[-4,-5,-6]]
```

#### 2.3.4 Scalar multiplication

##### 2.3.4.1 Example

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
var scalar = 2.5;
matrix.scalarMultiplication(scalar);
console.log(JSON.stringify(matrix.array)); // prints [[2.5,5,7.5],[10,12.5,15]]
```

#### 2.3.5 Multiply two matrices

##### 2.3.5.1 Example

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[1], [2], [3]]);
matrix1.multiply(matrix2);
console.log(JSON.stringify(matrix1.array)); // prints [[14],[32]]
```

#### 2.3.6 Multiply a matrix with a vector

##### 2.3.6.1 Example

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var vector1 = new Vector([1, 2 ,3]);
matrix1.multiply(vector1);
console.log(JSON.stringify(matrix1.array)); // prints [[14],[32]]
```

#### 2.3.7 Transpose a matrix

##### 2.3.7.1 Example

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = matrix1.transpose();
console.log(JSON.stringify(matrix2.array)); // prints [[1,4],[2,5],[3,6]]
```

#### 2.3.8 Calculate the determinant of the matrix

##### 2.3.8.1 Example

```javascript
var matrix = new Matrix([
    [1, 2, 3, 4, 0],
    [5, 6, 7, 8, 7],
    [9, 1, 2, 3, 8],
    [4, 5, 9, 7, -1],
    [7, 8, -2, -5, -3]
]);
var determinant = matrix.determinant();
console.log(determinant); // prints -8406
```

#### 2.3.9 Inverse a matrix

##### 2.3.9.1 Example

```javascript
var matrix1 = new Matrix([[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]);
var matrix2 = matrix1.inverse();
console.log(JSON.stringify(matrix2.array)); // prints [[0.22727272727272718,-0.0909090909090909,-0.40909090909090906],[0.27272727272727276,0.09090909090909091,-0.09090909090909093],[0.07575757575757576,-0.030303030303030307,0.196969696969697]]
```

### 2.4 Manipulate the matrix

#### 2.4.1 Change value

<table>
    <tr>
        <th colspan="2" align="left"><code>Matrix.changeCell([copy], col, row, value)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean} copy (optional)</code></td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Integer} col</code></td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Integer} row</code></td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Number} value</code></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Matrix}</code></td>
    </tr>
</table>

##### 2.4.1.1 Example

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
matrix.changeCell(0, 0, -1);
console.log(JSON.stringify(matrix1.array)); // prints [[-1,2,3],[4,5,6]]
```

#### 2.4.2 Change row

Coming soon..

#### 2.4.3 Change col

Coming soon..

#### 2.4.4 Add row

Coming soon..

#### 2.4.5 Add col

Coming soon..

#### 2.4.6 Delete row

Coming soon..

#### 2.4.7 Delete col

Coming soon..

## 3. Test the libraries

### 3.1 Vector library

Call `tests/vector.html` in your browser. It returns for example something like this:

```text
1) Running error test "Vector: given vector format is not an array" (Code: 101).
   Test succeeded (0.4 ms).
2) Running error test "Vector: the size of the given vector is wrong" (Code: 102).
   Test succeeded (0.2 ms).
3) Running error test "Vector: element from vector is no number" (Code: 103).
   Test succeeded (0.2 ms).
4) Running success test "init vector" (Code: 201).
   Test succeeded (0.2 ms).
5) Running success test "length of vector" (Code: 202).
   Test succeeded (0.1 ms).
6) Running success test "callback function" (Code: 203).
   Test succeeded (0.1 ms).

RESULT
-> All test succeeded (5.6 ms).
```

### 3.2 Matrix library

Call `tests/matrix.html` in your browser. It returns for example something like this:

```text
 1) Running error test "Matrix: rows are not an array" (Code: 101).
    Test succeeded (0.3 ms).
 2) Running error test "Matrix: count rows is wrong" (Code: 102).
    Test succeeded (0.2 ms).
 3) Running error test "Matrix: cols are not an array" (Code: 103).
    Test succeeded (0.1 ms).
 4) Running error test "Matrix: count cols is wrong" (Code: 104).
    Test succeeded (0.1 ms).
 5) Running error test "Matrix: wrong col number test" (Code: 105).
    Test succeeded (0.2 ms).
 6) Running success test "Matrix: init matrix" (Code: 201).
    Test succeeded (0.1 ms).
 7) Running error test "Matrix: wrong given matrix type" (Code: 106).
    Test succeeded (0.3 ms).
 8) Running error test "Matrix: two given matrices with different dimensions" (Code: 107).
    Test succeeded (0.2 ms).
 9) Running success test "Matrix: successful change value test" [mode: keep] (Code: 202).
    Test succeeded (0.3 ms).
10) Running success test "Matrix: successful change value test" [mode: copy] (Code: 202).
    Test succeeded (0.1 ms).
11) Running success test "Matrix: successful add test" [mode: keep] (Code: 203).
    Test succeeded (0.2 ms).
12) Running success test "Matrix: successful add test" [mode: copy] (Code: 203).
    Test succeeded (0.2 ms).
13) Running error test "Matrix: wrong given matrix type" (Code: 106).
    Test succeeded (0.1 ms).
14) Running error test "Matrix: two given matrices with different dimensions" (Code: 107).
    Test succeeded (0.1 ms).
15) Running success test "Matrix: successful subtract test" [mode: keep] (Code: 204).
    Test succeeded (0.2 ms).
16) Running success test "Matrix: successful subtract test" [mode: copy] (Code: 204).
    Test succeeded (0.2 ms).
17) Running error test "Matrix: given parameter is not a scalar" (Code: 109).
    Test succeeded (0.1 ms).
18) Running success test "Matrix: successful scalar multiplication test" [mode: keep] (Code: 205).
    Test succeeded (0.2 ms).
19) Running success test "Matrix: successful scalar multiplication test" [mode: copy] (Code: 205).
    Test succeeded (0.2 ms).
20) Running error test "Matrix: two given matrices with different dimensions" (Code: 107).
    Test succeeded (0 ms).
21) Running success test "Matrix: successful multiplication test" [mode: keep] (Code: 207).
    Test succeeded (0.4 ms).
22) Running success test "Matrix: successful multiplication test" [mode: copy] (Code: 207).
    Test succeeded (0.2 ms).
23) Running success test "Matrix: successful multiplication test with a vector" [mode: keep] (Code: 208).
    Test succeeded (0.5 ms).
24) Running success test "Matrix: successful multiplication test with a vector" [mode: copy] (Code: 208).
    Test succeeded (0.2 ms).
25) Running success test "Matrix: successful transpose test" (Code: 206).
    Test succeeded (0.2 ms).
26) Running error test "Matrix: the matrix is not quadratic" (Code: 108).
    Test succeeded (0.2 ms).
27) Running success test "Matrix: successful determinant test" (Code: 209).
    Test succeeded (0.1 ms).
28) Running success test "Matrix: successful determinant test" (Code: 209).
    Test succeeded (0.2 ms).
29) Running success test "Matrix: successful determinant test" (Code: 209).
    Test succeeded (0.5 ms).
30) Running success test "Matrix: successful inverse test" (Code: 210).
    Test succeeded (0.5 ms).

RESULT
-> All test succeeded (18.7 ms).
```

## A. Authors

* Björn Hempel <bjoern@hempel.li> - _Initial work_ - [https://github.com/bjoern-hempel](https://github.com/bjoern-hempel)

## B. License

This tutorial is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details
