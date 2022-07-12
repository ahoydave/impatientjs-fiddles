test('Regex object', () => {
    const ex = new RegExp('[a-c]');
    expect(ex.test('bd')).toBe(true);
    expect(ex.test('def')).toBe(false);
})

test('Regex literal', () => {
    const ex = /[a-c]/;
    expect(ex.test('bd')).toBe(true);
    expect(ex.test('def')).toBe(false);
});

test('Regex obj with options', () => {
    const ex = new RegExp('[a-c]', 'i'); // case insensitive option
    expect(ex.test('BDEF')).toBe(true);
});

test('Regex literal with options', () => {
    const ex = /[a-c]/i;
    expect(ex.test('BDEF')).toBe(true);
});

test('Copy regex to change flags', () => {
    const ex1 = /[a-c]/;
    const ex2 = new RegExp(ex1, 'i');
    expect(ex1.test('BDEF')).toBe(false);
    expect(ex2.test('BDEF')).toBe(true);
});

test('Use ? to switch from greedy to reluctant matching', () => {
    const result1 = /".*"/.exec('"hi""there""mate"')[0];
    const result2 = /".*?"/.exec('"hi""there""mate"')[0];
    expect(result1).toBe('"hi""there""mate"');
    expect(result2).toBe('"hi"');
});

test('Repeated calls to exec (with /g flag) returns the matches in a weird object', () => {
    const ex = /[a-z]{3}/g;
    const r1 = ex.exec('abcdefgab')[0];
    const r2 = ex.exec('abcdefgab')[0];
    const r3 = ex.exec('abcdefgab')[0];
    expect([r1, r2, r3]).toEqual(['abc', 'def', 'gab']);
});

test('Using String.prototype.match() to match multiple occurs', () => {
    const result = 'abcd'.match(/[abd]/g);
    expect(result).toEqual(['a', 'b', 'd']);
});

test('Using String.prototype.matchAll() to match multiple times - returns weird objects', () => {
    const result = 'abcd'.matchAll(/[abd]/g);
    expect(Array.from(result, x => x[0])).toEqual(['a', 'b', 'd']);
});

test('/y option requires no gaps between matches', () => {
    const result = 'abcd'.match(/[abd]/gy);
    expect(result).toEqual(['a', 'b']);
});

test('Regex is mutated by exec', () => {
    const re = /[abc]/g; // only if g is set
    re.exec('hallo');
    expect(re.lastIndex).toBe(2);
});

test('Replace in string with Regex', () => {
    const result = 'I like cats and dogs'.replace(/\w{3}s/, 'bats');
    expect(result).toBe('I like bats and dogs');
});

test('Replace all string with Regex', () => {
    const result = 'I like cats and dogs'.replace(/\w{3}s/g, 'bats');
    expect(result).toBe('I like bats and bats');
});

test('Replace all string with Regex (2)', () => {
    const result = 'I like cats and dogs'.replaceAll(/\w{3}s/g, 'bats');
    expect(result).toBe('I like bats and bats');
});

test('Split string with regex', () => {
    const result = 'one-two,three'.split(/[\-,]/);
    expect(result).toEqual(['one', 'two', 'three']);
});