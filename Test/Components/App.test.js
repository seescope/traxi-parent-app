import React from 'react';
import App from '../../App';
import renderer from 'react-test-renderer';

jest.mock('../../App/AsyncActions/ImpersonateParent', () =>
  jest.fn(() => ({
    type: 'TEST_IMPERSONATE',
  })));
jest.mock('../../App/AsyncActions/BootApp', () =>
  jest.fn(() => ({
    type: 'TEST_BOOT_APP',
  })));

import bootApp from '../../App/AsyncActions/BootApp';
import impersonateParent from '../../App/AsyncActions/ImpersonateParent';

it('renders the root compontent correctly', () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
  expect(bootApp).toHaveBeenCalled();
  expect(impersonateParent).not.toHaveBeenCalled();
});
