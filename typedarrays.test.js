test('Create typed array using .of', () => {
    let arr = Uint8Array.of(1, 2, 3);
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBe(3);
});

test('Create typed array using .from', () => {
    let arr = Uint8Array.from([1, 2]);
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
});

test('Create typed array from array buffer', () => {
    let arrBuff = new ArrayBuffer(2);
    let arr = new Uint16Array(arrBuff);
    expect(arr.length).toBe(1);
    expect(arr[0]).toBe(0);
});

test('Typed arrays are iterable', () => {
    let arr = Uint8Array.of(1, 2, 3);
    expect(Array.from(arr)).toEqual([1, 2, 3]);
    expect([...arr]).toEqual([1, 2, 3]);
});

test('A Typed array is really a view of an Array buffer', () => {
    let arr = Uint8Array.of(1, 2, 4, 8);
    expect(arr.buffer.byteLength).toBe(4);
    let arr2 = new Uint16Array(arr.buffer);
    expect([...arr2]).toEqual([1 + Math.pow(2, 9), 4 + Math.pow(2, 11)]);
})

test('Typed arrays must have elements of their given type - setting does a cast', () => {
    let arr = Uint8Array.of(1, 2, 3);
    arr[1] = { value: 1000 };
    arr[2] = '5';
    expect([...arr]).toEqual([1, 0, 5]);
})

test('Dataview for accessing the Array buffer from a typed array', () => {
    let arr = Uint8Array.of(1, 2, 3);
    let dataView = new DataView(arr.buffer);
    expect(dataView.getUint8(1)).toBe(2);
    expect(dataView.getUint16(0)).toBe(Math.pow(2, 8) + 2);
    expect(dataView.getUint16(0, true)).toBe(1 + Math.pow(2, 9));  // little endian
})