# Javascript Analysis Library

This javascript library provides some functions to do some analysis stuff.

## 1. Vectors

Coming soon.. (The first version only supports matrices)

## 2. Matrices

Here are some calculation examples with matrices with the help of the library `sources/js/matrix.js`:

### 2.1 Create a matrix

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
console.log(JSON.stringify(matrix.array)); // prints [[1,2,3],[4,5,6]]
```

### 2.2 Add two matrices

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);
var matrix3 = matrix1.add(matrix2);
console.log(JSON.stringify(matrix3.array)); // prints [[3,6,9],[12,15,18]]
```

### 2.3. Subtract two matrices

Coming soon..

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

### 2.6 Transpose a matrix

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = matrix1.transpose();
console.log(JSON.stringify(matrix2.array)); // prints [[1,4],[2,5],[3,6]]
```

### 2.7 Inverse a matrix

Coming soon..

## 3. Test the libraries

### 3.1 Matrix library

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
