/* eslint no-undef: 0 */

const asyncValidator = require('./asyncValidator');

describe('the asyncValidator', () => {

    describe('getPropsFromObj', () => {

        it('should be callable', () => {

            const result = asyncValidator.getPropsFromObj;

            return expect(typeof result).toBe('function');

        });

        it('should return an empty array when provided an empty object', () => {
            const mockData = [{}];

            const result = asyncValidator.getPropsFromObj(mockData);

            return expect(result).toEqual([]);
        });

        it('should return an array with a message when provided with an array with a single object with a message property', () => {
            const mockData = [
                { message: 'Testing is cool' }
            ];
            const propertyToGet = 'message';

            const result = asyncValidator.getPropsFromObj(mockData, propertyToGet);

            return expect(result).toEqual(['Testing is cool']);
        });

        it('should return an array with multiple messages when providing an array with multiple messages', () => {
            const mockData = [
                { message: 'Testing is cool' },
                { message: 'But Star Wars is cooler' }
            ];
            const propertyToGet = 'message';

            const result = asyncValidator.getPropsFromObj(mockData, propertyToGet);

            return expect(result).toEqual(['Testing is cool', 'But Star Wars is cooler']);
        });

    });

    describe('validateValidations', () => {
        it('should always return an object', () => {
            const specPromise = Promise.resolve({ success: false });
            const specMock = [specPromise];

            const result = asyncValidator.validateValidations(specMock);

            expect(typeof result).toBe('object');
        });

        it('should return success true when all validations are true', () => {
            const specMock = [{ success: true }, { success: true }, { success: true }];

            const result = asyncValidator.validateValidations(specMock);

            expect(result).resolves.toEqual({ success: true });
        });

        it('should return success false when provided with at least on false value', () => {
            const specMock = [{ success: false }, { success: true }];

            const result = asyncValidator.validateValidations(specMock);

            expect(result).resolves.toEqual({ messages: [], options: [], success: false });
        });

        it('should return success true when provided with an empty array', () => {
            const specMock = [];

            const result = asyncValidator.validateValidations(specMock);

            expect(result).resolves.toEqual({ success: true });
        })
    });

    describe('getAllvalidations', () => {
        it('should always return an array', () => {
            const specMock = { validations: [] };

            const result = asyncValidator.getAllValidations(specMock);

            expect(result).toEqual([]);
        });

        /* eslint-disable max-nested-callbacks */
        it('should return the validation() call results', () => {
            const validation = jest.fn(() => 0);
            const specMock = { validations: [{ validation }] };

            const result = asyncValidator.getAllValidations(specMock);

            expect(validation).toHaveBeenCalled();
            expect(result).toEqual([0]);
        });
        /* eslint-enable max-nested-callbacks */

        it('should fail when not passed an array', () => {
            const specMock = true;

            const fn = () => asyncValidator.getAllValidations(specMock);

            expect(fn).toThrow();
        });
    });

    describe('asyncValidator', () => {
        it('should always return a promise', () => {
            const specMock = '';

            const result = asyncValidator.asyncValidator(specMock);

            expect(typeof result).toBe('promise');
        })
    });

    describe('validatorWrapper', () => {
        it('should return a function', () => {
            const specMock = '';

            const result = asyncValidator.validatorWrapper(specMock);

            expect(typeof result).toBe('function');
        });
    });
});
