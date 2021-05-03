const sum = require('./sum');
//const sumHours = require('./src/Company/CompanyDetails');

const timeLogList = [{"hours":1},{"hours":1}]

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('return 6 hours 1 + 6', () => {
   expect(sum(2,4)).toBe(6) 
});

/*test('return 5 hours 1 + 6', () => {
  expect(sumHours([timeLogList]).toBe(2)) 
});*/