# Javascript Analysis Library

This javascript library provides some functions to do some analysis stuff.

## 1. Matrices

Here are some calculation examples with matrices with the help of the library `sources/js/matrix.js`:

### 1.1 Create a matrix

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
console.log(JSON.stringify(matrix.array)); // prints [[1,2,3],[4,5,6]]
```

### 1.2 Adds to matrices

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);
var matrix3 = matrix1.add(matrix2);
console.log(JSON.stringify(matrix3.array)); // prints [[3,6,9],[12,15,18]]
```

### 1.3 Scalar multiplication

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var scalar = 2.5;
var matrix2 = matrix1.scalarMultiplication(scalar);
console.log(JSON.stringify(matrix2.array)); // prints [[2.5,5,7.5],[10,12.5,15]]
```

### 1.4 Transpose a matrix

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = matrix1.transpose();
console.log(JSON.stringify(matrix2.array)); // prints [[1,4],[2,5],[3,6]]
```

### 1.5 Multiply two matrices

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[1], [2], [3]]);
var matrix3 = matrix1.multiply(matrix2);
console.log(JSON.stringify(matrix3.array)); // prints [[14],[32]]
```

## A. Authors

* Björn Hempel <bjoern@hempel.li> - _Initial work_ - [https://github.com/bjoern-hempel](https://github.com/bjoern-hempel)

## B. License

This tutorial is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details
