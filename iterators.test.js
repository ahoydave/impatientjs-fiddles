let myIterable = {
    [Symbol.iterator]: () => {
        let count = 10;
        return {
            next: () => {
                count++;
                if (count < 20) {
                    return {
                        value: count,
                        done: false
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        };
    }
};

test('Example iterable iterates', () => {
    expect([...myIterable]).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19]);
});

module.exports = { myIterable };



