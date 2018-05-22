/**
 * Helper function to catch error messages, or error options on false
 * @returns {Object} - array of promises, which result in true or false
 * @param {Object} arr - am array which sometimes has messages or options, when the success is false
 * @param {Object} prop - possible properties on the object
 */
const getPropsFromObj = (arr, prop) => {
    return arr
        .filter(obj => !obj.success)
        .map(obj => obj[prop]);
};

/**
 * Returns a promise which will resolve with success: false and messages/options or success: true
 * @param {Object} allValidations - array containing all the validation-promises
 * @returns {Promise} - returns promise
 */
const validateValidations = allValidations => {
    return Promise.all(allValidations).then(item => {
        if (item.every(value => value.success)) {
            return {
                success: true
            };
        }

        return {
            success: false,
            messages: getPropsFromObj(item, 'message'),
            options: getPropsFromObj(item, 'option')
        };

    });
};

/**
 * @param {Object} obj - an object which contains validations and data which has to be validated
 * @returns {Array} - returns an array with functions (the validations)
 */
const getAllValidations = obj => {
    return obj.validations.map(validation => validation.validation(obj.data));
};

/**
 * grab all the validation functions
 * then validate them with the data
 * @param {Object} obj - an object containing the data to be validated and an array of validations
 * @returns {Promise} - returns a promise whcih contains whether the validation is passed or not
 */
const asyncValidator = obj => {
    const allValidations = getAllValidations(obj);

    return validateValidations(allValidations);
};

/**
 * an adaptar to also allow validatorJS functions into the asyncValidator
 * @param {function} fn - the validation function from validatorJS
 * @returns {Object} - data to be validated, which is a function which returns a promise
 */
const validatorWrapper = fn => {
    return data => {
        return new Promise(resolve => {
            resolve({ success: fn(data) });
        });
    };
};

module.exports = { asyncValidator, validatorWrapper };
