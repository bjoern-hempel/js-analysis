# Javascript Numerical Analysis Library

This javascript library provides some numerical analysis calculation functions.

## 0. Preparations

This library needs an external git repository:

* [js-testing-framework](https://github.com/bjoern-hempel/js-testing-framework)

### 0.1 Checkout this project with submodules

```bash
user$ git clone git@github.com:bjoern-hempel/js-analysis.git && cd js-analysis
user$ git submodule init
user$ git submodule update
```

## 1. Vectors

Create vectors and do some calculations with them. It uses the library `sources/js/vector.js`.

### 1.1 Some basics

#### 1.1.1 Create a vector

<table>
    <tr>
        <th colspan="4" align="left"><code>Vector.constructor(array)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Array}</code></td>
        <td><code>array</code></td>
        <td>An one-dimensional array that represents the vector.</td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Vector}</code></td>
        <td></td>
    </tr>
</table>

##### 1.1.1.1 Example (Create from given array)

```javascript
var vector = new Vector([1, 2, 3]);
console.log(JSON.stringify(vector.array)); // prints [1,2,3]
```

### 1.2 Properties

#### 1.2.1 Size of the vector

<table>
    <tr>
        <th colspan="3" align="left"><code>Vector.size</code></th>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Integer}</code></td>
        <td>Returns number of elements that this vector consists of.</td>
    </tr>
</table>

##### 1.2.1.1 Example

```javascript
var vector = new Vector([1, 2, 3]);
console.log(vector.size); // prints 3
```

#### 1.2.2 Length of the vector

<table>
    <tr>
        <th colspan="3" align="left"><code>Vector.length</code></th>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Number}</code></td>
        <td>Returns the length of this vector.</td>
    </tr>
</table>

##### 1.2.2.1 Example

```javascript
var vector = new Vector([1, 2, 3]);
console.log(vector.length); // prints 3,741657386773941
```

#### 1.2.3 Array of the vector

<table>
    <tr>
        <th colspan="3" align="left"><code>Vector.array</code></th>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Array}</code></td>
        <td>Returns the array representation of this vector.</td>
    </tr>
</table>

##### 1.2.3.1 Example

```javascript
var vector = new Vector([1, 2, 3]);
console.log(JSON.stringify(vector.array)); // prints [1,2,3]
```

### 1.3 Calculations

#### 1.3.1 **Calculation mode:** Change or copy the used vector

Normally all calculations refer to the used vector. That means that all calculations will change the vector to which the calculations are performed. 

##### 1.3.1.1 "Change" example:

The following example applies the calculation to the first vector (`vector1`).

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

If you want to keep the values from the used vector `vector1`, you can do a copy from the calculation result. Just add another parameter to the calculation function (the copy parameter):

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

<table>
    <tr>
        <th colspan="4" align="left"><code>Vector.add([copy], vector)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Vector}</code></td>
        <td><code>vector</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Vector}</code></td>
        <td></td>
    </tr>
</table>

##### 1.3.2.1 Example

```javascript
var vector1 = new Vector([1, 2, 3]);
var vector2 = new Vector([2, 4, 6]);
vector1.add(vector2);
console.log(JSON.stringify(vector1.array)); // prints [3,6,9]
```

#### 1.3.3 Subtract two vectors

<table>
    <tr>
        <th colspan="4" align="left"><code>Vector.subtract([copy], vector)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Vector}</code></td>
        <td><code>vector</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Vector}</code></td>
        <td></td>
    </tr>
</table>

##### 1.3.3.1 Example

```javascript
var vector1 = new Vector([1, 2, 3]);
var vector2 = new Vector([2, 4, 6]);
vector1.subtract(vector2);
console.log(JSON.stringify(vector1.array)); // prints [-1,-2,-3]
```

#### 1.3.4 Dot Product (Inner Product)

<table>
    <tr>
        <th colspan="4" align="left"><code>Vector.dotProduct([copy], vector)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional) The copy parameter has no effect in here.</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Vector}</code></td>
        <td><code>vector</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Number}</code></td>
        <td></td>
    </tr>
</table>

##### 1.3.4.1 Example 1

```javascript
var vector1 = new Vector([1, 2, 3]);
var vector2 = new Vector([2, 4, 6]);
var product = vector1.dotProduct(vector2);
console.log(product); // prints 28
```

##### 1.3.4.1 Example 2

```javascript
var vector1 = new Vector([1, 2, 3, 4]);
var vector2 = new Vector([2, 4, 6, 8]);
var product = vector1.dotProduct(vector2);
console.log(product); // prints 60
```

#### 1.3.5 Vector Product (Cross Product)

<table>
    <tr>
        <th colspan="4" align="left"><code>Vector.vectorProduct([copy], vector, [vector2, [vector3, [...]]])</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Vector}</code></td>
        <td><code>vector</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Vector}</code></td>
        <td><code>vector2</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Vector}</code></td>
        <td><code>vector3</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Vector}</code></td>
        <td></td>
    </tr>
</table>

##### 1.3.5.1 Example 1

```javascript
var vector1 = new Vector([1, 2, 3]);
var vector2 = new Vector([-1, 5, -2]);
var vector3 = vector1.vectorProduct(true, vector2);
console.log(JSON.stringify(vector4.array)); // prints [-19,-1,7]
```

##### 1.3.5.2 Example 2

```javascript
var vector1 = new Vector([1, 2, 3, 4]);
var vector2 = new Vector([-1, 5, -2, 1]);
var vector3 = new Vector([0, 4, 2, 10]);
var vector4 = vector1.vectorProduct(true, vector2, vector3);
console.log(JSON.stringify(vector4.array)); // prints [-110,0,50,-10]
```

##### 1.3.5.3 Example 3

```javascript
var vector1 = new Vector([1, 2, 3, 4, 5]);
var vector2 = new Vector([-1, 5, -2, 1, 0]);
var vector3 = new Vector([0, 4, 2, 10, -9]);
var vector4 = new Vector([7, 3, -5, 20, -3]);
var vector5 = vector1.vectorProduct(true, vector2, vector3, vector4);
console.log(JSON.stringify(vector5.array)); // prints [-6223,-2318,-1519,2329,1220]
```

#### 1.3.6 Row multiplication from two vectors

<table>
    <tr>
        <th colspan="4" align="left"><code>Vector.rowMultiply([copy], vector)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Vector}</code></td>
        <td><code>vector</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Vector}</code></td>
        <td></td>
    </tr>
</table>

##### 1.3.6.1 Example

```javascript
var vector1 = new Vector([1, 2, 3, 4]);
var vector2 = new Vector([2, 4, 6, 8]);
vector1.rowMultiply(vector2);
console.log(JSON.stringify(vector1.array)); // prints [2,6,18,32]
```

#### 1.3.7 Dyadic Product (Outer Product) from two vectors

<table>
    <tr>
        <th colspan="4" align="left"><code>Vector.multiplyDyadic([copy], vector)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional) The copy parameter has no effect in here.</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Vector}</code></td>
        <td><code>vector</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Matrix}</code></td>
        <td></td>
    </tr>
</table>

##### 1.3.7.1 Example

```javascript
var vector1 = new Vector([1, 2, 3, 4]);
var vector2 = new Vector([2, 4, 6, 8]);
var matrix  = vector1.rowMultiply(multiplyDyadic);
console.log(JSON.stringify(matrix.array)); // prints [[2,4,6,8],[4,8,12,16],[6,12,18,24],[8,16,24,32]]
```

### 1.4 Manipulate the vector

#### 1.4.1 Change a value

<table>
    <tr>
        <th colspan="4" align="left"><code>Vector.changeCell([copy], index, value)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Integer}</code></td>
        <td><code>index</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Number}</code></td>
        <td><code>value</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Vector}</code></td>
        <td></td>
    </tr>
</table>

##### 1.4.1.1 Example

```javascript
var vector = new Vector([1, 2, 3]);
vector.changeCell(0, -1);
console.log(JSON.stringify(vector.array)); // prints [-1,2,3]
```

#### 1.4.2 Add a value

Coming soon..

#### 1.4.3 Delete a value

Coming soon..

## 2. Matrices

Create vectors and do some calculations with them. It uses the library `sources/js/vector.js`.

### 2.1 Some basics

#### 2.1.1 Create a matrix

<table>
    <tr>
        <th colspan="4" align="left"><code>Matrix.constructor(array)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Array}</code></td>
        <td><code>array</code></td>
        <td>A two-dimensional array that represents the matrix.</td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Matrix}</code></td>
        <td></td>
    </tr>
</table>

##### 2.1.1.1 Example 1 (Create from given array)

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
console.log(JSON.stringify(matrix.array)); // prints [[1,2,3],[4,5,6]]
```

##### 2.1.1.2 Example 2 (Create from given vector)

```javascript
var vector = new Vector([1, 2, 3]);
var matrix = new Matrix(vector);
console.log(JSON.stringify(matrix.array)); // prints [[1],[2],[3]]
```

##### 2.1.1.3 Example 3 (Create from given vectors)

```javascript
var vector1 = new Vector([1, 2, 3]);
var vector2 = new Vector([4, 5, 6]);
var vector3 = new Vector([7, 8, 9]);
var matrix = new Matrix(vector1, vector2, vector3);
console.log(JSON.stringify(matrix.array)); // prints [[1,4,7],[2,5,8],[3,6,9]]
```

### 2.2 Properties

#### 2.2.1 Size of the matrix

<table>
    <tr>
        <th colspan="3" align="left"><code>Matrix.size</code></th>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Array}</code></td>
        <td>Returns the number of rows and cols that this matrix consists of.</td>
    </tr>
</table>

##### 2.2.1.1 Example

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
console.log(JSON.stringify(vector.size)); // prints [2,3]
```

#### 2.2.2 Rows of the matrix

<table>
    <tr>
        <th colspan="3" align="left"><code>Matrix.rows</code></th>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Integer}</code></td>
        <td>Returns the number of rows that this matrix consists of.</td>
    </tr>
</table>

##### 2.2.2.1 Example

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
console.log(vector.rows); // prints 2
```

#### 2.2.3 Cols of the matrix

<table>
    <tr>
        <th colspan="3" align="left"><code>Matrix.cols</code></th>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Integer}</code></td>
        <td>Returns the number of cols that this matrix consists of.</td>
    </tr>
</table>

##### 2.2.3.1 Example

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
console.log(vector.cols); // prints 3
```

#### 2.2.4 Array of the matrix

<table>
    <tr>
        <th colspan="3" align="left"><code>Matrix.array</code></th>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td><code>{Array}</code></td>
        <td>Returns the array representation of this matrix.</td>
    </tr>
</table>

##### 2.2.4.1 Example

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
console.log(JSON.stringify(vector.array)); // prints [[1,2,3],[4,5,6]]
```

### 2.3 Calculations

#### 2.3.1 **Calculation mode:** Change or copy the used matrix

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
        <th colspan="4" align="left"><code>Matrix.add([copy], matrix)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Matrix}</code></td>
        <td><code>matrix</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Matrix}</code></td>
        <td></td>
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

<table>
    <tr>
        <th colspan="4" align="left"><code>Matrix.substract([copy], matrix)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Matrix}</code></td>
        <td><code>matrix</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Matrix}</code></td>
        <td></td>
    </tr>
</table>

##### 2.3.3.1 Example

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[2, 4, 6], [8, 10, 12]]);
matrix1.substract(matrix2);
console.log(JSON.stringify(matrix1.array)); // prints [[-1,-2,-3],[-4,-5,-6]]
```

#### 2.3.4 Scalar multiplication

<table>
    <tr>
        <th colspan="4" align="left"><code>Matrix.multiply([copy], scalar)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Number}</code></td>
        <td><code>scalar</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Matrix}</code></td>
        <td></td>
    </tr>
</table>

##### 2.3.4.1 Example 1

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
var scalar = 2.5;
matrix.multiply(scalar);
console.log(JSON.stringify(matrix.array)); // prints [[2.5,5,7.5],[10,12.5,15]]
```

#### 2.3.5 Multiply two matrices

<table>
    <tr>
        <th colspan="4" align="left"><code>Matrix.multiply([copy], matrix)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Matrix}</code></td>
        <td><code>matrix</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Matrix}</code></td>
        <td></td>
    </tr>
</table>

##### 2.3.5.1 Example

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var matrix2 = new Matrix([[1], [2], [3]]);
matrix1.multiply(matrix2);
console.log(JSON.stringify(matrix1.array)); // prints [[14],[32]]
```

#### 2.3.6 Multiply a matrix with a vector

<table>
    <tr>
        <th colspan="4" align="left"><code>Matrix.multiply([copy], vector)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Vector}</code></td>
        <td><code>vector</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Matrix}</code></td>
        <td></td>
    </tr>
</table>

##### 2.3.6.1 Example

```javascript
var matrix1 = new Matrix([[1, 2, 3], [4, 5, 6]]);
var vector1 = new Vector([1, 2 ,3]);
matrix1.multiply(vector1);
console.log(JSON.stringify(matrix1.array)); // prints [[14],[32]]
```

#### 2.3.7 Transpose a matrix

<table>
    <tr>
        <th colspan="4" align="left"><code>Matrix.transpose([copy])</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Matrix}</code></td>
        <td></td>
    </tr>
</table>

##### 2.3.7.1 Example

```javascript
var matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
matrix.transpose();
console.log(JSON.stringify(matrix.array)); // prints [[1,4],[2,5],[3,6]]
```

#### 2.3.8 Calculate the determinant of the matrix

<table>
    <tr>
        <th colspan="4" align="left"><code>Matrix.determinant([copy])</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional) The copy parameter has no effect in here.</td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Number}</code></td>
        <td></td>
    </tr>
</table>

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

#### 2.3.10 Diagonalise a matrix

TODO..

##### 2.3.10.1 Example

TODO..

### 2.4 Manipulate the matrix

#### 2.4.1 Change value

<table>
    <tr>
        <th colspan="4" align="left"><code>Matrix.changeCell([copy], col, row, value)</code></th>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Boolean}</code></td>
        <td><code>copy</code></td>
        <td>(optional)</td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Integer}</code></td>
        <td><code>col</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Integer}</code></td>
        <td><code>row</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@param</code></td>
        <td><code>{Number}</code></td>
        <td><code>value</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>@returns</code></td>
        <td colspan="2"><code>{Matrix}</code></td>
        <td></td>
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

Call `tests/vector.html` in your browser. It adds a div element with id testResult to your body and returns for example something like this:

```text
----------------------------------------
Start test "js-analysis - Vector - Test"
----------------------------------------
 
  1) Vector: Running error test "Given vector format is not an array" (Code: 101).
     Test succeeded (0.7 ms).
  2) Vector: Running error test "The size of the given vector is wrong" (Code: 102).
     Test succeeded (0.1 ms).
  3) Vector: Running error test "Element from vector is no number" (Code: 103).
     Test succeeded (0.2 ms).
  4) Vector: Running success test "Init vector" (Code: 201).
     Test succeeded (0.1 ms).
  5) Vector: Running success test "Successful change value test" [mode: keep] (Code: 203).
     Test succeeded (0.3 ms).
  6) Vector: Running success test "Successful change value test" [mode: copy] (Code: 203).
     Test succeeded (0.2 ms).
  7) Vector: Running error test "Wrong given vector type" (Code: 105).
     Test succeeded (0.2 ms).
  8) Vector: Running error test "Two given vectors with different dimensions" (Code: 106).
     Test succeeded (0.1 ms).
  9) Vector: Running success test "Successful add test" [mode: keep] (Code: 204).
     Test succeeded (0.3 ms).
 10) Vector: Running success test "Successful add test" [mode: copy] (Code: 204).
     Test succeeded (0.1 ms).
 11) Vector: Running error test "Wrong given vector type" (Code: 105).
     Test succeeded (0.2 ms).
 12) Vector: Running error test "Two given vectors with different dimensions" (Code: 106).
     Test succeeded (0.1 ms).
 13) Vector: Running success test "Successful add test" [mode: keep] (Code: 205).
     Test succeeded (0 ms).
 14) Vector: Running success test "Successful add test" [mode: copy] (Code: 205).
     Test succeeded (0.1 ms).
 15) Vector: Running error test "Wrong given vector type" (Code: 105).
     Test succeeded (0.3 ms).
 16) Vector: Running error test "Two given vectors with different dimensions" (Code: 106).
     Test succeeded (0.2 ms).
 17) Vector: Running success test "Successful dot product test" [mode: keep] (Code: 206).
     Test succeeded (0.1 ms).
 18) Vector: Running success test "Successful dot product test" [mode: keep] (Code: 206).
     Test succeeded (0.1 ms).
 19) Vector: Running success test "Successful dot product test" [mode: copy] (Code: 206).
     Test succeeded (0 ms).
 20) Vector: Running error test "Two given vectors with different dimensions" (Code: 106).
     Test succeeded (1.2 ms).
 21) Vector: Running error test "The number of given vectors is wrong" (Code: 106).
     Test succeeded (0.1 ms).
 22) Vector: Running success test "Successful vector product test" [mode: keep] (Code: 207).
     Test succeeded (0.4 ms).
 23) Vector: Running success test "Successful vector product test" [mode: copy] (Code: 207).
     Test succeeded (0.2 ms).
 24) Vector: Running success test "Successful vector product test" [mode: copy] (Code: 207).
     Test succeeded (0.1 ms).
 25) Vector: Running success test "Successful vector product test" [mode: copy] (Code: 207).
     Test succeeded (0.5 ms).
 26) Vector: Running error test "Wrong given vector type" (Code: 105).
     Test succeeded (0.3 ms).
 27) Vector: Running error test "Two given vectors with different dimensions" (Code: 106).
     Test succeeded (0 ms).
 28) Vector: Running success test "Successful row multiplication test" [mode: keep] (Code: 208).
     Test succeeded (0.1 ms).
 29) Vector: Running success test "Successful row multiplication test" [mode: copy] (Code: 208).
     Test succeeded (0.1 ms).
 30) Vector: Running error test "Wrong given vector type" (Code: 105).
     Test succeeded (0 ms).
 31) Vector: Running success test "Successful dyadic multiplication test" [mode: keep] (Code: 209).
     Test succeeded (0.8 ms).
 32) Vector: Running success test "Successful dyadic multiplication test" [mode: copy] (Code: 209).
     Test succeeded (0.2 ms).
 33) Vector: Running success test "Successful unshift test" [mode: keep] (Code: 210).
     Test succeeded (0.2 ms).
 34) Vector: Running success test "Successful unshift test" [mode: copy] (Code: 210).
     Test succeeded (0.2 ms).
 35) Vector: Running success test "Successful shift test" [mode: keep] (Code: 211).
     Test succeeded (0.1 ms).
 36) Vector: Running success test "Successful shift test" [mode: copy] (Code: 211).
     Test succeeded (0.1 ms).
 37) Vector: Running success test "Successful callback function test" [mode: keep] (Code: 212).
     Test succeeded (0.2 ms).
 38) Vector: Running success test "Successful callback function test" [mode: copy] (Code: 212).
     Test succeeded (0.2 ms).
 39) Vector: Running success test "Successful length of vector test" (Code: 202).
     Test succeeded (0.1 ms).
 
-----------------------------------------------------------------
RESULT
-> All test succeeded (15.2 ms) [success: 39; error: 0; all: 39].
-----------------------------------------------------------------
```

### 3.2 Matrix library

Call `tests/matrix.html` in your browser. It adds a div element with id testResult to your body and returns for example something like this:

```text
----------------------------------------
Start test "js-analysis - Matrix - Test"
----------------------------------------
 
  1) Matrix: Running error test "Rows are not an array" (Code: 101).
     Test succeeded (0.1 ms).
  2) Matrix: Running error test "Count rows is wrong" (Code: 102).
     Test succeeded (0.1 ms).
  3) Matrix: Running error test "Cols are not an array" (Code: 103).
     Test succeeded (0.1 ms).
  4) Matrix: Running error test "Count cols is wrong" (Code: 104).
     Test succeeded (0 ms).
  5) Matrix: Running error test "Wrong col number test" (Code: 105).
     Test succeeded (0.1 ms).
  6) Matrix: Running success test "Init matrix" (Code: 201).
     Test succeeded (0 ms).
  7) Matrix: Running success test "Init matrix from vector" (Code: 202).
     Test succeeded (0.1 ms).
  8) Matrix: Running success test "Init matrix from vectors" (Code: 203).
     Test succeeded (0.1 ms).
  9) Matrix: Running success test "Successful change value test" [mode: keep] (Code: 204).
     Test succeeded (0.3 ms).
 10) Matrix: Running success test "Successful change value test" [mode: copy] (Code: 204).
     Test succeeded (0.1 ms).
 11) Matrix: Running error test "Row access is wrong" (Code: 112).
     Test succeeded (0.1 ms).
 12) Matrix: Running success test "Successful delete row test" [mode: keep] (Code: 205).
     Test succeeded (0.1 ms).
 13) Matrix: Running success test "Successful delete row test" [mode: copy] (Code: 205).
     Test succeeded (0.3 ms).
 14) Matrix: Running error test "Wrong given matrix type" (Code: 106).
     Test succeeded (0.1 ms).
 15) Matrix: Running error test "Two given matrices with different dimensions" (Code: 107).
     Test succeeded (0.1 ms).
 16) Matrix: Running success test "Successful add test" [mode: keep] (Code: 206).
     Test succeeded (0.1 ms).
 17) Matrix: Running success test "Successful add test" [mode: copy] (Code: 206).
     Test succeeded (0.1 ms).
 18) Matrix: Running error test "Wrong given matrix type" (Code: 106).
     Test succeeded (0.3 ms).
 19) Matrix: Running error test "Two given matrices with different dimensions" (Code: 107).
     Test succeeded (0.1 ms).
 20) Matrix: Running success test "Successful subtract test" [mode: keep] (Code: 207).
     Test succeeded (0.2 ms).
 21) Matrix: Running success test "Successful subtract test" [mode: copy] (Code: 207).
     Test succeeded (0.4 ms).
 22) Matrix: Running error test "Given parameter is not a scalar" (Code: 109).
     Test succeeded (0.2 ms).
 23) Matrix: Running success test "Successful scalar multiplication test" [mode: keep] (Code: 208).
     Test succeeded (0.3 ms).
 24) Matrix: Running success test "Successful scalar multiplication test" [mode: copy] (Code: 208).
     Test succeeded (0.2 ms).
 25) Matrix: Running error test "Two given matrices with different dimensions" (Code: 107).
     Test succeeded (0.1 ms).
 26) Matrix: Running success test "Successful multiplication test" [mode: keep] (Code: 210).
     Test succeeded (0.2 ms).
 27) Matrix: Running success test "Successful multiplication test" [mode: copy] (Code: 210).
     Test succeeded (0.2 ms).
 28) Matrix: Running success test "Successful multiplication test with a vector" [mode: keep] (Code: 211).
     Test succeeded (0.1 ms).
 29) Matrix: Running success test "Successful multiplication test with a vector" [mode: copy] (Code: 211).
     Test succeeded (0.2 ms).
 30) Matrix: Running success test "Successful transpose test" [mode: keep] (Code: 209).
     Test succeeded (0.1 ms).
 31) Matrix: Running success test "Successful transpose test" [mode: copy] (Code: 209).
     Test succeeded (0.1 ms).
 32) Matrix: Running error test "The matrix is not quadratic" (Code: 108).
     Test succeeded (0.1 ms).
 33) Matrix: Running success test "Successful determinant test" (Code: 212).
     Test succeeded (0.1 ms).
 34) Matrix: Running success test "Successful determinant test" (Code: 212).
     Test succeeded (0.2 ms).
 35) Matrix: Running success test "Successful determinant test" (Code: 212).
     Test succeeded (0.9 ms).
 36) Matrix: Running success test "Successful inverse test" [mode: keep] (Code: 213).
     Test succeeded (0.3 ms).
 37) Matrix: Running success test "Successful inverse test" [mode: copy] (Code: 213).
     Test succeeded (0.1 ms).
 38) Matrix: Running success test "Successful manipulate test: shift col" [mode: keep] (Code: 214).
     Test succeeded (0.1 ms).
 39) Matrix: Running success test "Successful manipulate test: shift col" [mode: copy] (Code: 214).
     Test succeeded (0.2 ms).
 40) Matrix: Running success test "Successful manipulate test: shift row" [mode: keep] (Code: 215).
     Test succeeded (0.2 ms).
 41) Matrix: Running success test "Successful manipulate test: shift row" [mode: copy] (Code: 215).
     Test succeeded (0.1 ms).
 
-----------------------------------------------------------------
RESULT
-> All test succeeded (12.1 ms) [success: 41; error: 0; all: 41].
-----------------------------------------------------------------
```

## A. Authors

* Björn Hempel <bjoern@hempel.li> - _Initial work_ - [https://github.com/bjoern-hempel](https://github.com/bjoern-hempel)

## B. License

This library is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details
