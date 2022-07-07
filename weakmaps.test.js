test('Weak map keys must be objects', () => {
    const wm = new WeakMap();
    const obj = {};
    wm.set(obj, 'hello');
    expect(() => wm.set(1, 'hi')).toThrow(TypeError);
    expect(wm.get(obj)).toBe('hello');
});

// hmmmm not sure how to show that a weak map's keys can be garbage collected. But they can - just removed from map then