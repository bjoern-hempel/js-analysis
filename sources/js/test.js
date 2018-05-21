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

        console.log(String('%counter) Running %status test "%message" (Code: %code).').replace(/%counter/, Test.getTestCounter()).replace(/%status/, this.code >= 200 ? 'success' : 'error').replace(/%message/, this.message).replace(/%code/, this.code)
        );

        try {
            this.testOK = this.testFunction.call(this);
        } catch (err) {
            this.testOK = this.errorFunction.call(this, err);
            if (!this.testOK) {
                console.error(err.toString());
            }
        }

        this.testOK ? console.info('   Test succeeded.') : console.error('   Test failed.');

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
     * A static method to prints out the result of all tests.
     *
     */
    static resultTest() {
        console.log('');
        console.log('RESULT');

        Test.getErrorCounter() <= 0 ?
            console.info('-> All test succeeded.') :
            console.error('-> At least on test failed.');
    }
}