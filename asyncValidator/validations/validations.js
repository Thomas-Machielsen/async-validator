const biggerThanSixAsync = number => {
    return new Promise(resolve => {
        resolve({
            success: number > 6,
            message: number > 6 ? '' : 'Number is not bigger than six.',
            option: 'some random option'
        });
    });
};

const smallerThanTwentyAsync = number => {
    return new Promise(resolve => {
        resolve({
            success: number > 20,
            message: number > 20 ? '' : 'Number is not smaller than twenty.'
        });
    });
};

module.exports = { biggerThanSixAsync, smallerThanTwentyAsync };
