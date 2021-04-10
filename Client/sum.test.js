const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('return 5 hours 1 + 4', () => {
   expect(sumHours(2,4).toBe(5)) 
});