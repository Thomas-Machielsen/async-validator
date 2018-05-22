/* eslint-disable no-console */
const validator = require('validator');
const { asyncValidator, validatorWrapper } = require('./asyncValidator/asyncValidator');
const { biggerThanSixAsync, smallerThanTwentyAsync } = require('./asyncValidator/validations/validations');

/**
 * Consumers
 */
const testString = {
    data: 'superlowercase',
    validations: [
        { validation: validatorWrapper(validator.isLowercase) },
        { validation: validatorWrapper(validator.isEmail) }
    ]
};

const testStringLength = {
    data: 'superlowercase',
    validations: [
        { validation: biggerThanSixAsync },
        { validation: smallerThanTwentyAsync }
    ]
};

/**
 * Usage example
 */
asyncValidator(testString).then(value => console.log(value));
asyncValidator(testStringLength).then(value => console.log(value));
