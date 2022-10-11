//tests the addition of of likes in the answers 
//markup for likes
const markdown = require('./markdown');
//-1 is dislike 
test('makes sure a dislike subtracts from likes', () => {
  expect(markdown(-1, 2)).toBe(1);
});