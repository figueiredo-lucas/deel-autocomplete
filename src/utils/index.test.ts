import { hashCode } from '.';

test('should generate a hashCode', () => {
  expect(hashCode("TEST")).toEqual(320);
});