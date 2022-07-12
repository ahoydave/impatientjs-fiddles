// ** This depends on where it is run o_O
// test('Timezone of new Date', () => {
//     const date = new Date()
//     expect(date.getTimezoneOffset()).toBe(-60);
// });

test('Create date from ISO string', () => {
    const isoStr = '2077-01-26T23:00:00.000Z';
    const date = new Date(isoStr);
    expect(date.getTimezoneOffset()).toBe(0);
    expect(date.toISOString()).toBe('2077-01-26T23:00:00.000Z');
});

test('Time values are millis since epoch', () => {
    const timeValue = 5;
    const date = new Date(timeValue);
    expect(date.toISOString()).toBe('1970-01-01T00:00:00.00' + timeValue + 'Z');
    expect(Number(date)).toBe(timeValue);
});

test('Getting pieces of a date', () => {
    const isoStr = '2077-01-26T23:12:15.005';
    const date = new Date(isoStr);
    expect(date.getFullYear()).toBe(2077);
    expect(date.getMonth()).toBe(0); // months count from 0
    expect(date.getDate()).toBe(26);
    expect(date.getDay()).toBe(2); // this is day of week
    expect(date.getHours()).toBe(23);
    expect(date.getMinutes()).toBe(12);
    expect(date.getSeconds()).toBe(15);
    expect(date.getMilliseconds()).toBe(5);
});