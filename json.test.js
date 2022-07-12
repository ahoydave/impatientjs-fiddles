test('JSON stringify', () => {
    expect(JSON.stringify({ a: [1, 2] })).toBe('{"a":[1,2]}');
});

test('JSON stringify with spacing', () => {
    expect(JSON.stringify({
        a: [1, 2]
    }, null, 2)).toBe(
`{
  "a": [
    1,
    2
  ]
}`);
});

test('Functions are not stringified', () => {
    expect(JSON.stringify(() => {})).toBeUndefined();
});

test('Stringify and parse combined', () => {
    const obj = {
        a: [1, 2, 3],
        b: {
            first: true,
        }
    };
    expect(JSON.parse(JSON.stringify(obj))).toEqual(obj);
});

