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
    expect(arr).toEqual([{ a: 1 }, { a: 1 }, { a: 1 }]);
    // can use an array-like object combined with the map operation in .from
    let arr2 = Array.from({ length: 3 }, () => ({}));  // don't forget the () to differentiate obj literal from code block
    arr2[0].a = 1;
    expect(arr2).toEqual([{ a: 1 }, {}, {}]);
})

test('objects with positive number keys are array-like', () => {
    let obj = { 0: 'a', 1: 'b', length: 2 };
    expect(obj[0]).toBe('a');
    expect(Array.from(obj)).toEqual(['a', 'b']);
});

test('arrays are (kind of) objects with special keys (indices)', () => {
    let arr = ['a', 'b'];
    arr.myProp = 'myProp';
    expect(arr['0']).toBe('a');
    expect(Object.keys(arr)).toEqual(['0', '1', 'myProp']);
    expect(Array.from(arr.keys())).toEqual([0, 1]); // use Array.from to collect iterable
    expect(arr.keys()[Symbol.iterator]().next().value).toBe(0);
});

test('Arrays can have holes', () => {
    let arr = ['a', , 'c'];
    expect(Object.keys(arr)).toEqual(['0', '2']);
    expect(arr.length).toBe(3);
    expect(arr[1]).toBeUndefined();
});

test('How array holes are treated', () => {
    const arr = ['a', , 'c'];
    expect(arr.filter(x => true)).toEqual(['a', 'c']);
    expect(arr.map(x => x)).toEqual(['a', undefined, 'c']);
    expect(Array.from(arr, x => x)).toEqual(['a', undefined, 'c']);
    expect(arr.every(x => x == 'a' || x == 'c')).toBe(true);
});

test('Mutate an array', () => {
    let arr = ['a', 'b'];
    arr.unshift('c', 'd');
    expect(arr).toEqual(['c', 'd', 'a', 'b']);
    arr.push('e', 'f');
    expect(arr).toEqual(['c', 'd', 'a', 'b', 'e', 'f']);
    expect(arr.shift()).toBe('c');
    expect(arr.pop()).toBe('f');
    expect(arr).toEqual(['d', 'a', 'b', 'e']);
    expect(arr.splice(1, 1)).toEqual(['a']);
    expect(arr).toEqual(['d', 'b', 'e']);
});

test('Derive a new array from an existing one', () => {
    let arr = ['a', 'b'];
    expect(['c', ...arr]).toEqual(['c', 'a', 'b']);
    expect([...arr, 'c']).toEqual(['a', 'b', 'c']);
    expect(arr).toEqual(['a', 'b']);
    const [, ...arr2] = arr; // the rest ... operator
    expect(arr2).toEqual(['b']);
});

test('find in an array', () => {
    let arr = ['a', 'b', 'c'];
    expect(arr.find(x => x > 'a')).toBe('b');
    expect(arr.findIndex(x => x > 'a')).toBe(1);
});

test('Fold left and right on arrays', () => {
    let arr = [5, 3, 7, 6];
    expect(arr.reduce((acc, val, _ind, _wholeArray) => acc + String(val),
        '<initial string>')).toEqual('<initial string>5376');
    expect(arr.reduceRight((acc, val, _ind, _wholeArray) => acc + String(val),
        '<initial string>')).toEqual('<initial string>6735');
});

test('Sorting an array', () => {
    let arr = ['three', 'two', 'one'];
    arr.sort();
    expect(arr).toEqual(['one', 'three', 'two']);
    const intCompare = (a, b) => {
        if (a < b) {
            return -1;
        } else if (a === b) {
            return 0;
        } else {
            return 1;
        }
    }
    expect(intCompare(0, 1)).toBe(-1);
    expect(intCompare(1, 1)).toBe(0);
    expect(intCompare(1, 0)).toBe(1);
    arr.sort((a, b) => intCompare(a.length, b.length));
    expect(arr).toEqual(['one', 'two', 'three']);
});

test('forEach on array', () => {
    let arr = ['a', 'b', 'c'];
    let acc = '';
    arr.forEach((val, _index, _wholeArray) => {
        acc += val;
    });
    expect(acc).toEqual('abc');
});