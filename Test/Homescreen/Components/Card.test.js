import { getContainerStyle } from '../../../App/Homescreen/Components/Card';

it('only sets the height property when passed false', () => {
  const falseStyle = getContainerStyle(false);
  expect(falseStyle.height).toBeTruthy();

  const trueStyle = getContainerStyle(true);
  expect(trueStyle).not.toBeTruthy();
});
