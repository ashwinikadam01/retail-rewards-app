import { calculatePoints } from '../utils/rewardUtils';

test('Calculates correct reward points', () => {
  expect(calculatePoints(120)).toBe(90);
  expect(calculatePoints(100.4)).toBe(50);
  expect(calculatePoints(99.9)).toBe(49);
});
