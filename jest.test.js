// Fiddling with how jest works

test('toEqual vs toStrictEqual for classes vs object literals', () => {
    let obj1 = {a: 1};
    let obj2 = new class {
        a = 1
    }();
    obj3 = {}
    obj3.a = 1;
    expect(obj1).toEqual({a: 1});
    expect(obj1).toStrictEqual({a: 1});
    expect(obj1).toEqual(obj2);
    expect(obj1).not.toStrictEqual(obj2);
    expect(obj1).toEqual(obj3);
    expect(obj1).toStrictEqual(obj3);
    expect(obj2).toEqual(obj3);
    expect(obj2).not.toStrictEqual(obj3);
})