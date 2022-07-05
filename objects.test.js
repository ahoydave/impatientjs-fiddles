let mySymbol = Symbol('b');
let obj = {a: 1, [mySymbol]: 2, [3]: 3, [{name: 'key'}]: 4};
test('Using different keys for an object\'s properties', () => {
    expect(obj.a).toBe(1);
    expect(obj['a']).toBe(1);
    expect(obj[Symbol('b')]).toBeUndefined();
    expect(obj[mySymbol]).toBe(2);
    expect(obj[3]).toBe(3);
    expect(obj[{name: 'key'}]).toBe(4);
});