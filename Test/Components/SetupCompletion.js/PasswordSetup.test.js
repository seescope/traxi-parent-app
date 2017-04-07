import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PasswordSetup
  from '../../../App/Components/SetupCompletion/PasswordSetup';

const createUser = jest.fn();
const setEmail = jest.fn();
const setPassword = jest.fn();
const name = 'Name';
const email = 'test@email.com';

it('Renders with loading', () => {
  const loading = true;

  const tree = renderer.create(
    <PasswordSetup
      name={name}
      email={email}
      loading={loading}
      createUser={createUser}
      setEmail={setEmail}
      setPassword={setPassword}
    />,
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

it('Renders without loading', () => {
  const loading = false;

  const tree = renderer.create(
    <PasswordSetup
      name={name}
      email={email}
      loading={loading}
      createUser={createUser}
      setEmail={setEmail}
      setPassword={setPassword}
    />,
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
