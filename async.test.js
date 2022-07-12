test('An async function returns a Promise', () => {
    const f = async () => true;
    const p = f();
    expect(Promise.prototype.isPrototypeOf(p)).toBe(true);
    expect(Object.getPrototypeOf(p)).toBe(Promise.prototype);
});

test('Use async functions as a Promise', () => {
    const f = async () => 'result';
    return f().then(res => expect(res).toBe('result'));
});

test('Async function that returns nothing returns undefined', () => {
    const f = async function () { };
    return f().then(res => expect(res).toBeUndefined());
});

test('Errors thrown in an async function are Promise rejections', () => {
    const f = async () => {
        throw new Error('nope');
    };
    expect.assertions(1);
    f().catch(e => expect(e.message).toMatch('nope'));
});

test('Returning a promise from an async fn returns that promise (pretty much)', () => {
    const f = async () => {
        return Promise.resolve(1);
    };
    return f().then(r => expect(r).toBe(1));
});

test('The async fn is executed synchronously up till an await', async () => {
    let output = '';
    const f = async () => {
        output += 'f';
    };
    const g = async () => {
        output += 'g1';
        await f();
        output += 'g2';
        await f();
        output += 'g3';
    };
    await g();
    expect(output).toBe('g1fg2fg3');
});

test('You can await a promise in an async fn', () => {
    const f = async (p) => {
        const pRes = await p;
        return pRes + ' finished';
    };
    return f(Promise.resolve('Promise')).then(res => expect(res).toBe('Promise finished'));
});

test('Start then await result of async fn when needed', async () => {
    let output = '';
    const f = async () => 'f';
    const g = async () => {
        output += 'g1';
        const fRes = f();
        output += 'g2';
        output += await fRes;
    };
    await g();
    expect(output).toBe('g1g2f');
});

test('Awaiting a promise that rejects throws the result', async () => {
    try {
        await Promise.reject(new Error('nope'));
    } catch (e) {
        expect(e.message).toBe('nope');
    };
});

test('Using Promise.all to run async functions (potentially) concurrently', async () => {
    const f = async (i) => 'R' + i;
    const result = await Promise.all([
        f(1), f(2), f(3)
    ]);
    expect(result).toEqual(['R1', 'R2', 'R3']);
});

test('For-await-of over array of promises', async () => {
    let output = '';
    const arr = [Promise.resolve('a'), Promise.resolve('b')];
    for await (const p of arr) {
        output += p;
    }
    expect(output).toBe('ab');
});

test('Async gen', async () => {
    const arr = [Promise.resolve('a'), Promise.resolve('b')];
    async function* asyncGen() {
        for await (const v of arr) {
            yield v + 'c';
        }
    };
    const it = asyncGen();
    // Equivalent to
    // const it = asyncGen()[Symbol.asyncIterator]();
    const first = await it.next();
    const second = await it.next();
    expect(first.value).toBe('ac');
    expect(second.value).toBe('bc');
});

test('Mapping one async generator to another', async () => {
    async function* aRange(upTo) {
        for (let i = 0; i < upTo; i++) {
            yield i;
        }
    }
    async function* addPairs(it) {
        let prev = undefined;
        for await (const item of it) {
            if (prev != undefined) {
                const result = item + prev;
                prev = undefined;
                yield result;
            } else {
                prev = item;
            }
        }
    }
    const result1 = [];
    for await (const item of aRange(4)) {
        result1.push(item);
    }
    const result2 = [];
    for await (const item of addPairs(aRange(4))) {
        result2.push(item);
    }
    expect(result1).toEqual([0, 1, 2, 3]);
    expect(result2).toEqual([1, 5]);
});