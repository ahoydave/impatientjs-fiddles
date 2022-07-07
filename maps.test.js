test('Creating arrays from an iterable of pairs', () => {
    const m1 = new Map();
    m1.set('a', 1)
        .set('b', 2);
    // maps themselves are iterable
    const m2 = new Map([...m1, ['c', 3]]);
    const mapEntries = [['a', 1], ['b', 2], ['c', 3]];
    expect(m2).toEqual(new Map(mapEntries));
    // Note they're kept in insertion order
    expect(Array.from(m2)).toEqual(mapEntries);
    expect(Array.from(m2.keys())).toEqual(['a', 'b', 'c']);
    expect(Array.from(m2.values())).toEqual([1, 2, 3]);
});

test('Converting to and from objects', () => {
    const obj = {
        a: 1, b: 2, c: 3
    };
    const m = new Map(Object.entries(obj));
    const obj2 = Object.fromEntries(m);
    expect(obj).toEqual(obj2);
    expect(m.get('a')).toBe(1);
});

test('Map keys can be anything and use normal equality (pretty much)', () => {
    const m = new Map();
    const obj1 = {};
    const obj2 = {};
    m.set(obj1, 1);
    m.set(obj2, 2);
    expect(m.get(obj1)).toBe(1);
    expect(m.get(obj2)).toBe(2);
    expect(m.get({})).toBeUndefined();
});

test('Map keys treat NaN as equal to itself', () => {
    const myNan = NaN;
    expect(myNan === myNan).toBe(false);
    const m = new Map();
    m.set(myNan, 10);
    expect(m.get(NaN)).toBe(10);
    expect(m.get(myNan)).toBe(10);
});

test('Map values and keys can be arbitrary types', () => {
    const myFn = () => 'two';
    const m = new Map([[1, 'hello'], [myFn, { value: 2 }]]);
    expect(m.get(1)).toBe('hello');
    expect(m.get(myFn)).toEqual({ value: 2 });
})

test('Use arrays to map/filter Maps', () => {
    const m1 = new Map([['a', 1], ['b', 2]]);
    const m2 = new Map(Array.from(m1).map(([k, v]) => [k + 'c', v + 5]));
    const expectedMap1 = new Map([['ac', 6], ['bc', 7]]);
    expect(m2).toEqual(expectedMap1);
    const m3 = new Map(Array.from(m2).filter(([k, _v]) => k === 'ac'));
    const expectedMap2 = new Map([['ac', 6]]);
    expect(m3).toEqual(expectedMap2);
});

test('Combine maps using iteration', () => {
    const m1 = new Map([['a', 1], ['b', 2]]);
    const m2 = new Map([['b', 3]]);
    const mCombined = new Map([...m1, ...m2]);
    // Entries are applied in order presented
    expect([...mCombined]).toEqual([['a', 1], ['b', 3]]);
})
