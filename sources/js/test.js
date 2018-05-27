/**
 * A class to test the matrix class.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-13)
 */
class Test {

    /**
     * The constructor of Test.
     *
     * @param message
     * @param code
     * @param testFunction
     * @param errorFunction
     */
    constructor(messageCode, testFunction, errorFunction) {
        this.mode = null;

        if (!(messageCode instanceof Array)) {
            this.mode = messageCode.mode;
            messageCode = messageCode.config;
        }

        this.message = messageCode[1];
        this.code = messageCode[0];
        this.testFunction = testFunction;
        this.errorFunction = typeof errorFunction === 'function' ? errorFunction : this.errFunc;
        this.testOK = false;

        /* start the test */
        this.start();
    }

    /**
     * This is the default error function if no one given.
     *
     * @param err
     * @returns {boolean}
     */
    errFunc(err) {
        /* This is a success test -> an exception should never be thrown. */
        if (this.code >= 200) {
            return false;
        }

        return (err instanceof MatrixException || err instanceof VectorException) && (err.code === this.code);
    }

    /**
     * The function to start the test.
     */
    start() {
        Test.increaseTestCounter();

        console.log(
            String('%counter) Running %status test "%message" %add(Code: %code).').
                replace(/%counter/, Test.getTestCounter()).
                replace(/%status/, this.code >= 200 ? 'success' : 'error').
                replace(/%message/, this.message).replace(/%code/, this.code).
                replace(/%add/, this.mode !== null ? '[mode: ' + this.mode + '] ' : '')
        );

        var timeStart = performance.now();
        try {
            this.testOK = this.testFunction.call(this);
        } catch (err) {
            this.testOK = this.errorFunction.call(this, err);
            if (!this.testOK) {
                console.error(err.toString());
            }
        }
        var timeFinished = performance.now();

        var timeNeeded = Math.round((timeFinished - timeStart) * 100000) / 100000;

        var message = this.testOK ? 'Test succeeded (%time).' : 'Test failed (%time).';

        message = '   ' + message.replace('%time', timeNeeded + ' ms');

        this.testOK ? console.info(message) : console.error(message);

        if (!this.testOK) {
            Test.increaseErrorCounter();
        }
    }

    /**
     * Increases the test counter.
     */
    static increaseTestCounter() {
        if (typeof this.testCounter === 'undefined') {
            this.testCounter = 0;
        }

        this.testCounter++;
    }

    /**
     * Returns the number of tests.
     *
     * @returns {number}
     */
    static getTestCounter() {
        return typeof this.testCounter === 'undefined' ? 0 : this.testCounter;
    }

    /**
     * Increases the error counter.
     */
    static increaseErrorCounter() {
        if (typeof this.errorCounter === 'undefined') {
            this.errorCounter = 0;
        }

        this.errorCounter++;
    }

    /**
     * Returns the number of errors.
     *
     * @returns {number}
     */
    static getErrorCounter() {
        return typeof this.errorCounter === 'undefined' ? 0 : this.errorCounter;
    }

    /**
     * Start the tests and measure the time.
     */
    static startTests(func) {
        this.timeStart = performance.now();

        if (typeof func === 'function') {
            func();
        }
    }

    /**
     * A static method to prints out the result of all tests.
     *
     */
    static resultTests() {

        this.timeFinished = performance.now();

        var timeNeeded = Math.round((this.timeFinished - this.timeStart) * 100000) / 100000;

        console.log('');
        console.log('RESULT');

        var message = Test.getErrorCounter() <= 0 ?
            '-> All test succeeded (%time).' :
            '-> At least on test failed.';

        message = message.replace('%time', timeNeeded + ' ms');

        Test.getErrorCounter() <= 0 ? console.info(message) : console.error(message);
    }

    /**
     * Compares two given arrays.
     *
     * @param {Array} array1
     * @param {Array} array2
     * @returns {boolean}
     */
    static arrayEqual(array1, array2) {

        if (!(array1 instanceof Array)) {
            return false;
        }

        if (!(array2 instanceof Array)) {
            return false;
        }

        if (array1.length != array2.length) {
            return false;
        }

        for (var i = 0; i < array1.length; i++) {
            if (array1[i] instanceof Array && array2[i] instanceof Array) {
                if (!this.arrayEqual(array1[i], array2[i])) {
                    return false;
                }
            } else if (array1[i] != array2[i]) {
                return false;
            }
        }

        return true;
    }
}