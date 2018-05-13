/**
 * A class to test the matrix class.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-13)
 */
class MatrixTest {

    /**
     * The constructor of MatrixTest.
     *
     * @param testContainer
     * @param message
     * @param code
     * @param testFunction
     * @param errorFunction
     */
    constructor(testContainer, messageCode, testFunction, errorFunction) {

        this.testContainer = testContainer;
        this.message = messageCode[1];
        this.code = messageCode[0];
        this.testFunction = testFunction;
        this.errorFunction = typeof errorFunction === 'function' ? errorFunction : this.errFunc;
        this.testOK = false;
    }

    /**
     * This is the default error function if no one given.
     *
     * @param err
     * @returns {boolean}
     */
    errFunc (err) {
        /* This is a success test -> an exception should never be thrown. */
        if (this.code >= 200) {
            return false;
        }

        return (err instanceof MatrixException) && (err.code === this.code);
    }

    /**
     * The function to start the test.
     */
    start () {
        this.testContainer.counterTests++;



        console.log(String('%counter) Running %status test "%message" (Code: %code).').
            replace(/%counter/, this.testContainer.counterTests).
            replace(/%status/, this.code >= 200 ? 'success' : 'error').
            replace(/%message/, this.message).
            replace(/%code/, this.code)
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
        this.testContainer.allTestsOK = this.testOK ? this.testContainer.allTestsOK : false;
    }

    /**
     * A static method to prints out the result of all tests.
     *
     * @param testContainer
     */
    static resultTest(testContainer) {
        console.log('');
        console.log('RESULT');
        testContainer.allTestsOK ? console.info('-> All test succeeded.') : console.error('-> At least on test failed.');
    }
}