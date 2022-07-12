test('Callback executes', (done) => {
    setTimeout(() => {
        done();
    });
});

// ** fails as expected
// test('Callback is never done', (done) => {
//     setTimeout(() => {
//         // done();
//     });
// });

test('A resolving promise', () => {
    const p = new Promise((resolve, _reject) => {
        resolve('tick');
    });

    p.then(val => expect(val).toBe('tick'));
    return p; // important so that the test knows it must wait for this promise to return
});

// ** Fails as expected
// test('A promise that never resolves', () => {
//     const p = new Promise((_resolve, _reject) => {
//         // don't resolve or reject
//     });

//     return p; // important so that the test knows it must wait for this promise to return
// });

test('A rejecting promise', () => {
    const p = new Promise((_resolve, reject) => {
        reject('error');
    });

    expect.assertions(1); // otherwise a fulfilment won't make the test fail
    // Note that it is important to return the fresh promise that .catch creates
    return p.catch(e => expect(e).toMatch('error'));
});

// // ** Fails as expected
// test('A promise that should reject but doesn\'t', () => {
//     const p = new Promise((resolve, _reject) => {
//         resolve('ok');
//     });

//     expect.assertions(1);
//     return p.catch(e => expect(e).toMatch('error'));
// });

test('Promise.resolve produces a promise that resolves to value', () => {
    return Promise.resolve('hi')
        .then(res => expect(res).toBe('hi'));
});

test('Promise.reject produces a promise that rejects with value', () => {
    expect.assertions(1);
    return Promise.reject('error')
        .catch(e => expect(e).toMatch('error'));
});

test('.then returns a fresh promise', () => {
    expect(Promise.prototype.isPrototypeOf(Promise.resolve('hi').then(() => { }))).toBe(true);
    // in fact, Promise.prototype is the direct prototype
    expect(Object.getPrototypeOf(Promise.resolve('hi').then(() => { }))).toBe(Promise.prototype);
});

test('If .then block returns a non-promise then returned promise resolves to that value', () => {
    return Promise.resolve(123)
        .then(val => val)
        .then(val => expect(val).toBe(123));
});

test('If .then block returns a promise then the returned promise is (effectively) that promise', () => {
    const myPromise = Promise.resolve('Test value');
    return Promise.resolve('irrelevant')
        .then(val => myPromise)
        .then(val => expect(val).toBe('Test value'));
});

test('If .then block throws expection then returned promise rejects with that exception', () => {
    const myError = new Error('Test Error');
    expect.assertions(1);
    return new Promise((_resolve, _reject) => {
        throw myError;
    }).catch(e => expect(e.message).toMatch('Test Error'));
});

test('.catch also returns a normal promise', () => {
    expect.assertions(1);
    Promise.reject('nope')
        .catch(e => 'catch result')
        .then(val => expect(val).toBe('catch result'));
});

test('.finally is always called (a)', () => {
    expect.assertions(2);
    return Promise.resolve('value')
        .then(val => expect(val).toBe('value'))
        .finally(() => expect(true).toBe(true));
});

test('.finally is always called (b)', () => {
    expect.assertions(2);
    return Promise.reject('value')
        .catch(val => expect(val).toBe('value'))
        .finally(() => expect(true).toBe(true));
});

test('finally is called in order', async () => {
    let acc = '';
    await Promise.resolve('value')
        .finally(() => acc += 'f1')
        .then(val => {
            acc += 't1';
            throw new Error('error');
        })
        .catch(e => acc += 'c1')
        .finally(() => acc += 'f2');
    expect(acc).toBe('f1t1c1f2');
});

test('.catch are skipped if no error', async () => {
    let acc = '';
    await Promise.resolve('')
        .catch(e => acc += 'c1')
        .catch(e => acc += 'c2')
        .then(val => acc += 't1');
    expect(acc).toBe('t1');
});

test('then are skipped when there is an error', async () => {
    let acc = '';
    await Promise.reject('')
        .then(val => acc += 't1')
        .then(val => acc += 't2')
        .catch(e => acc += 'c1');
    expect(acc).toBe('c1');
})

test('finally passes on the settlement value from before it', () => {
    expect.assertions(2);
    return Promise.reject('nope')
        .finally(() => expect(true).toBe(true))
        .catch(e => expect(e).toMatch('nope'));
});

test('An expection thrown in the finally handler settles with that error', () => {
    expect.assertions(1);
    return Promise.resolve(123)
        .finally(() => {
            throw new Error('nope');
        })
        .then(val => expect(true.toBe(false)))
        .catch(e => expect(e.message).toMatch('nope'));
});

const fs = require('fs');
test('Using callbacks with reading text file', (done) => {
    fs.readFile('example.json', (error, data) => {
        if (error) {
            throw new Error('Couldn\'t read file');
        }
        try {
            const json = JSON.parse(data);
            expect(json).toEqual({
                firstname: 'John',
                lastname: 'Doe'
            });
            done();
        } catch (e) {
            throw new Error('Couldn\'t parse JSON');
        }
    });
});

test('Promisify readfile', () => {
    const readFileAsync = (path) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            })
        })
    };
    return readFileAsync('example.json')
        .then(content => {
            expect(JSON.parse(content)).toEqual({
                firstname: 'John',
                lastname: 'Doe'
            });
        });
});

// TODO is there a fetch API for nodejs?
// test('Read file using promise-based Fetch', () => {
//     return fetch('file://example.json')
//         .then(content => {
//             expect(JSON.parse(content)).toEqual({
//                 firstname: 'John',
//                 lastname: 'Doe'
//             });
//         });
// });

test('Promise.all when all resolve', () => {
    const promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
    ];
    return Promise.all(promises)
        .then(res => {
            expect(res).toEqual([1, 2, 3]);
        });
});

test('Promise.all when one of them rejects', () => {
    const promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.reject('nope')
    ];
    expect.assertions(1);
    return Promise.all(promises)
        .catch(err => {
            expect(err).toBe('nope');
        });
});

test('Async map using Promise.all', () => {
    const asyncMap = (iterable, f) => {
        return Promise.all(Array.from(iterable, x => Promise.resolve().then(_ => f(x))));
    };

    return asyncMap([1, 2, 3, 4], x => x + 2).then(result => {
        expect(result).toEqual([3, 4, 5, 6]);
    });
})

test('Basic behaviour of Promise.race', () => {
    const promises = [
        Promise.resolve('yes'),
        Promise.reject('no')
    ];
    return Promise.race(promises)
        .then(result => expect(result).toBe('yes'));
});

test('Basic behaviour of Promise.race 2', () => {
    const promises = [
        new Promise((resolve, _reject) => {
            setTimeout(() => resolve('yes'), 200);
        }),
        new Promise((_resolve, reject) => {
            setTimeout(() => reject('nope'), 100);
        })
    ];
    expect.assertions(1);
    return Promise.race(promises)
        .catch(result => expect(result).toBe('nope'));
});

test('Basic behaviour of Promise.any', () => {
    const promises = [
        new Promise((resolve, _reject) => {
            setTimeout(() => resolve('yes'), 200);
        }),
        new Promise((_resolve, reject) => {
            setTimeout(() => reject('nope'), 100);
        })
    ];
    return Promise.any(promises)
        .catch(result => expect(result).toBe('yes'));
});

test('Aggregate error when all promises for Promise.any are rejected', () => {
    const promises = [
        Promise.reject('no1'),
        Promise.reject('no2')
    ];
    expect.assertions(1);
    return Promise.any(promises)
        .catch(e => {
            expect(e.errors).toEqual(['no1', 'no2']);
        });
});