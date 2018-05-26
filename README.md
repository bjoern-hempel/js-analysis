# Javascript Numerical Analysis Library

This javascript library provides some functions to do some numerical analysis calculations.

## 1. Vectors

Here are some calculation examples with vectors with the help of the library `sources/js/vector.js`:

### 1.1 Create a vector

```javascript
var vector = new Vector([1, 2, 3]);
console.log(JSON.stringify(vector.array)); // prints [1,2,3]
```

### 1.2 Add two vectors

Coming soon..

### 1.3 Subtract two vectors

Coming soon..

### 1.4 Dot Product

Coming soon..

### 1.5 Cross Product

Coming soon..

### 1.6 Length of the vector

Coming soon..

### 1.7 Manipulate the vector

#### 1.7.1 Change a value

Coming soon..

#### 1.7.2 Add a value

Coming soon..

#### 1.7.3 Delete a value

Coming soon..

## 2. Matrices

Here are some calculation examples with matrices with the help of the library `sources/js/matrix.js`:

### 2.1 Create a matrix

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
console.log(JSON.stringify(matrix.array)); // prints [[1,2,3],[4,5,6]]
```

### 2.2 Change or copy the used matrix

Normally all calculations refer to the used matrix. That means the all calculations will change this matrix.

#### 2.2.1 "Change" example:

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

#### 2.2.2 "Copy" example:

If you want to keep the values from the used matrix `matrix1`, you can do a copy from the calculation result. Just add another parameter:

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

### 2.2 Add two matrices

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);
var matrix3 = matrix1.add(matrix2);
console.log(JSON.stringify(matrix3.array)); // prints [[3,6,9],[12,15,18]]
```

### 2.3 Subtract two matrices

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);
var matrix3 = matrix1.substract(matrix2);
console.log(JSON.stringify(matrix3.array)); // prints [[-1,-2,-3],[-4,-5,-6]]
```

### 2.4 Scalar multiplication

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var scalar = 2.5;
var matrix2 = matrix1.scalarMultiplication(scalar);
console.log(JSON.stringify(matrix2.array)); // prints [[2.5,5,7.5],[10,12.5,15]]
```

### 2.5 Multiply two matrices

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[1], [2], [3]]);
var matrix3 = matrix1.multiply(matrix2);
console.log(JSON.stringify(matrix3.array)); // prints [[14],[32]]
```

### 2.6 Multiply a matrix with a vector

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var vector1 = new Vector([1, 2 ,3]);
var matrix2 = matrix1.multiply(vector1);
console.log(JSON.stringify(matrix2.array)); // prints [[14],[32]]
```

### 2.7 Transpose a matrix

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = matrix1.transpose();
console.log(JSON.stringify(matrix2.array)); // prints [[1,4],[2,5],[3,6]]
```

### 2.8 Calculate the determinant of the matrix

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

### 2.9 Inverse a matrix

```javascript
var matrix1 = new Matrix([[1, 2, 3], [-4, 5, -6], [-1, 0, 3]]);
var matrix2 = matrix1.inverse();
console.log(JSON.stringify(matrix2.array)); // prints [[0.22727272727272718,-0.0909090909090909,-0.40909090909090906],[0.27272727272727276,0.09090909090909091,-0.09090909090909093],[0.07575757575757576,-0.030303030303030307,0.196969696969697]]
```

### 2.10 Manipulate the matrix

#### 2.10.1 Change value

Coming soon..

#### 2.10.2 Change row

Coming soon..

#### 2.10.3 Change col

Coming soon..

#### 2.10.4 Add row

Coming soon..

#### 2.10.5 Add col

Coming soon..

#### 2.10.6 Delete row

Coming soon..

#### 2.10.7 Delete col

Coming soon..

## 3. Test the libraries

### 3.1 Vector library

Call `tests/vector.html` in your browser. It returns for example something like this:

```text
1) Running error test "Vector: given vector format is not an array" (Code: 101).
   Test succeeded.
2) Running error test "Vector: the size of the given vector is wrong" (Code: 102).
   Test succeeded.
3) Running error test "Vector: element from vector is no number" (Code: 103).
   Test succeeded.
4) Running success test "initialize vector" (Code: 201).
   Test succeeded.

RESULT
-> All test succeeded.
```

### 3.2 Matrix library

Call `tests/matrix.html` in your browser. It returns for example something like this:

```text
1) Running error test "rows are not an array" (Code: 101).
   Test succeeded.
2) Running error test "count rows is wrong" (Code: 102).
   Test succeeded.
3) Running error test "cols are not an array" (Code: 103).
   Test succeeded.
4) Running error test "count cols is wrong" (Code: 104).
   Test succeeded.
5) Running error test "wrong col number test" (Code: 105).
   Test succeeded.
6) Running success test "initialize matrix" (Code: 201).
   Test succeeded.
7) Running error test "wrong given matrix type" (Code: 106).
   Test succeeded.
8) Running error test "two given matrices with different dimensions" (Code: 107).
   Test succeeded.
9) Running success test "successful add test" (Code: 202).
   Test succeeded.
10) Running error test "given parameter is not a scalar" (Code: 108).
   Test succeeded.
11) Running success test "successful scalar multiplication test" (Code: 203).
   Test succeeded.
12) Running success test "successful transpose test" (Code: 204).
   Test succeeded.
13) Running error test "two given matrices with different dimensions" (Code: 107).
   Test succeeded.
14) Running success test "successful multiplication test" (Code: 205).
   Test succeeded.

RESULT
-> All test succeeded.
```

## A. Authors

* Björn Hempel <bjoern@hempel.li> - _Initial work_ - [https://github.com/bjoern-hempel](https://github.com/bjoern-hempel)

## B. License

This tutorial is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details
