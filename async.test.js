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