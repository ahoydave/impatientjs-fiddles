test('Object desctructuring on assignment', () => {
    const obj = {
        a: 1,
        b: 2
    };
    const { a: v1, b: v2 } = obj;
    expect(v1).toBe(1);
    expect(v2).toBe(2);
});

test('Object destructuring in function params', () => {
    const f = ({ a: v1, b: v2 }) => {
        expect(v1).toBe(1);
        expect(v2).toBe(2);
    };
    f({
        a: 1,
        b: 2
    });
});

test('Array desctructuring in for-of loop', () => {
    const arr = [1, 2];
    for (const [index, value] of arr.entries()) {
        expect(value).toBe(index + 1);
    }
});

test('Object desctructure strings (array-like)', () => {
    const str1 = 'abc';
    const { length: len } = str1;
    expect(len).toBe(3);
});

test('Object desctructure array elements', () => {
    const arr = ['a', 'b', 'c'];
    const { 0: v1, 2: v2 } = arr;
    expect(v1).toBe('a');
    expect(v2).toBe('c');
})

test('Object destructuring shorthand', () => {
    const obj = { a: 1, b: 2 };
    const { a, b } = obj;
    expect(a).toBe(1);
    expect(b).toBe(2);
});

test('Object desctructuring with rest operator', () => {
    const obj = { a: 1, b: 2 };
    const { a, ...everythingElse } = obj;
    expect(a).toBe(1);
    expect(everythingElse).toEqual({ b: 2 });
});

test('Array desctructuring', () => {
    const arr = [1, 2, 3];
    const f = ([first, , ...rest]) => {
        expect(first).toBe(1);
        expect(rest).toEqual([3]);
    };
    f(arr);
});

test('Destructuring null or missing values', () => {
    const obj = {a: 1, b: null};
    expect(() => {
        const { a, b, c } = obj;
        expect(a).toBe(1);
        expect(b).toBe(null);
        expect(c).toBeUndefined();
    }).not.toThrow();
});

test('Can\'t desctructure null or undefined', () => {
    expect(() => {
        const { a } = null;
    }).toThrow(TypeError);
    expect(() => {
        const { a } = undefined;
    }).toThrow(TypeError);
});

test('Nested destructuring', () => {
    const arr = [{a: 1}, {a: 2}];
    const [, { a }] = arr;
    expect(a).toBe(2)
});

test('Default values in destructuring (nested)', () => {
    const arr = [, {a: 1}];
    const [v1=2, { a: v2=3, b: v3=4 }] = arr;
    expect(v1).toBe(2);
    expect(v2).toBe(1);
    expect(v3).toBe(4);
})