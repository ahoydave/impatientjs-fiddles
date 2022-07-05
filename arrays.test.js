let arr = [1, 2, 3, 4];
arr.length = 2;
arr.length = 4;
test('Contraction removes elements', () => {
    expect(arr).toEqual([1, 2]);
    expect(arr.length).toBe(4);
    expect(arr[2]).toBe(undefined);
    expect(arr[3]).toBe(undefined);
});

test('Do a map on array', () => {
    expect(arr.map(x => [x, x])).toEqual([[1, 1], [2, 2]]);
});
test('Do a flatmap on array', () => {
    expect(arr.flatMap(x => [x, x])).toEqual([1, 1, 2, 2]);
});

const arrCopy = [...arr];
test('Copy array via spreading', () => {
    expect(arrCopy).toEqual(arr);
});

const { myIterable } = require('./iterators.test.js');
test('Array from to copy an iterable to an array', () => {
    expect(Array.from(myIterable)).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19]);
});

test('Array from an objects properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(Array.from(Object.entries(obj))).toEqual([['a', 1], ['b', 2], ['c', 3]]);
});

test('Fill with primitives', () => {
    expect([].fill(1, 0, 3)).not.toEqual([1, 1, 1]);
    expect(Array(3).fill(1)).toEqual([1, 1, 1]);
});

test('Fill with objects', () => {
    let arr = Array(3).fill({});
    arr[0].a = 1;
    expect(arr).toEqual([{a: 1}, {a: 1}, {a: 1}]);
    // can use an array-like object combined with the map operation in .from
    let arr2 = Array.from({length: 3}, () => ({}));  // don't forget the () to differentiate obj literal from code block
    arr2[0].a = 1;
    expect(arr2).toEqual([{a: 1}, {}, {}]);
})