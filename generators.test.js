test('Generator functions return in iterable', () => {
    const f = function* () {
        yield 'a';
        yield 'b';
    };
    expect([...f()]).toEqual(['a', 'b']);
});

test('yield stops the generator function till next value needed', () => {
    let testFlag = true;
    const f = function* () {
        yield 1;
        testFlag = false;
        yield 2;
    };
    const myIterable = f();
    expect(myIterable.next()).toEqual({done: false, value: 1});
    expect(testFlag).toBe(true);
    expect(myIterable.next()).toEqual({done: false, value: 2});
    expect(testFlag).toBe(false);
    expect(myIterable.next()).toEqual({done: true});
});

test('Using yield* to yield from another iterable (or generator)', () => {
    const baseGenerator = function* () {
        for (const x of [1, 2, 3]) {
            yield x;
        }
    };
    expect([...baseGenerator()]).toEqual([1, 2, 3]);

    const crapWay = function* () {
        const it = baseGenerator();
        for (const x of it) {
            yield x;
        }
    };
    expect([...crapWay()]).toEqual([1, 2, 3]);
    
    const betterWay = function* () {
        yield* baseGenerator();
    };
    expect([...betterWay()]).toEqual([1, 2, 3]);
    
    const alsoWorks = function* () {
        yield* [1, 2, 3];
    }
    expect([...alsoWorks()]).toEqual([1, 2, 3]);
});

class BinaryTree {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    // generator method def
    * [Symbol.iterator]() {
        yield this.value;
        if (this.left) {
            // use the recursive iterator
            yield* this.left;
        }
        if (this.right) {
            // use the recursive iterator
            yield* this.right;
        }
    }
}

test('BinaryTree example', () => {
    // a
    // | \
    // b   e
    // | \
    // c  d
    const binaryTree = new BinaryTree('a', new BinaryTree('b', new BinaryTree('c'), new BinaryTree('d')), new BinaryTree('e'));
    expect(Array.from(binaryTree)).toEqual(['a', 'b', 'c', 'd', 'e']);
})