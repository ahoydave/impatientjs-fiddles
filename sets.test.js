test('Basic usage of sets', () => {
    const s1 = new Set();
    expect(s1.size).toBe(0);
    expect([...s1]).toEqual([]);
    s1.add('a').add('b');
    expect(s1.size).toBe(2);
    // insertion order is preserved
    expect([...s1]).toEqual(['a', 'b']);
    s2 = new Set(s1);
    s3 = new Set([...s1]);
    expect(s2).toEqual(s3);
    expect(s1.has('a')).toBe(true);
    s1.delete('a');
    expect(s1.has('a')).toBe(false);
    s1.clear();
    expect(s1.size).toBe(0);
});

test('Example usage finding letters in a string', () => {
    const str1 = 'aabbabaabccaadaa aa acbd';
    expect([...new Set(str1)]).toEqual(['a', 'b', 'c', 'd', ' ']);
});

test('Sets treat NaN as equal to itself', () => {
    const s1 = new Set();
    const myNan = NaN;
    expect(myNan === myNan).toBe(false);
    s1.add(myNan);
    s1.add(NaN);
    expect(s1.size).toBe(1);
});

test('DIY set union', () => {
    const s1 = new Set(['a', 'b']);
    const s2 = new Set(['b', 'c']);
    const union = new Set([...s1, ...s2]);
    expect(union.size).toBe(3);
    expect(union.has('a')).toBe(true);
    expect(union.has('b')).toBe(true);
    expect(union.has('c')).toBe(true);
});

test('DIY set intersection', () => {
    const s1 = new Set(['a', 'b']);
    const s2 = new Set(['b', 'c']);
    const intersection = new Set(Array.from(s1).filter(x => s2.has(x)));
    expect(intersection.size).toBe(1);
    expect(intersection.has('b')).toBe(true);
});

test('DIY set difference', () => {
    const s1 = new Set(['a', 'b']);
    const s2 = new Set(['b', 'c']);
    const diff = new Set(Array.from(s1).filter(x => !s2.has(x)));
    expect(diff.size).toBe(1);
    expect(diff.has('a')).toBe(true);
});

test('Sets have .entries, .values and .keys similar to Map', () => {
    const s1 = new Set(['a', 'b']);
    expect([...s1.keys()]).toEqual(['a', 'b']);
    expect([...s1.values()]).toEqual(['a', 'b']);
    expect([...s1.entries()]).toEqual([['a', 'a'], ['b', 'b']]);
});

// Weak sets also exist and work almost exactly the same as WeakMaps

test('Sets are equal if they have the same elements', () => {
    const s1 = new Set(['a', 'b']);
    const s2 = new Set(['b', 'a']);
    expect(s1).toEqual(s2);
    expect([...s1]).not.toEqual([...s2]);
});