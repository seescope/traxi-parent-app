import actions from '../../__mocks__/parentAppActions.json';
import replayActions from '../../App/Middleware/ReplayActions';
import { Actions } from 'react-native-router-flux';

test('It replays actions observing the time differences between them', () => {
  const dispatch = jest.fn();
  jest.useFakeTimers();

  replayActions('013e6354-ea7f-4826-bfb8-4ed09125c291', actions, dispatch);

  expect(dispatch).toHaveBeenCalledTimes(2);

  jest.runAllTimers();

  expect(dispatch).toHaveBeenCalledTimes(4);
  expect(Actions.splashScreen).toHaveBeenCalled();
});
