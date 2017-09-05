import replayActions from '../../App/Middleware/ReplayActions';
import { Actions } from 'react-native-router-flux';
import { setMockVal } from 'firebase';

const MOCK_ACTIONS = {
  '-Ks2QaHKb12tvSuQLqjl': {
    action: '{"key":"splashScreen","type":"REACT_NATIVE_ROUTER_FLUX_REPLACE"}',
    currentState: '{"parentState":{"UUID":"013e6354-ea7f-4826-bfb8-4ed09125c291","createdAt":"2017-08-21T06:15:19.873Z","kids":["16494823-1e41-4249-9f82-c29ac046e7df"]},"kidsState":{"16494823-1e41-4249-9f82-c29ac046e7df":{"UUID":"16494823-1e41-4249-9f82-c29ac046e7df","deviceType":"unknown","installed":false,"avatarURL":""}},"setupState":{"step":0,"kidUUID":"16494823-1e41-4249-9f82-c29ac046e7df","setupID":5833,"deviceType":"unknown","loading":false,"sceneName":"loading"},"reportsState":{"loading":false}}',
    timestamp: '2017-08-21T06:15:19.958Z',
  },
  '-Ks2QaIGHPXbvUfuEEEI': {
    action: '{"scene":{"hideNavBar":true,"key":"splashScreen_0_splashScreen","name":"splashScreen","sceneKey":"splashScreen","parent":"__root","type":"REACT_NATIVE_ROUTER_FLUX_REPLACE","index":0},"type":"REACT_NATIVE_ROUTER_FLUX_FOCUS"}',
    currentState: '{"parentState":{"UUID":"013e6354-ea7f-4826-bfb8-4ed09125c291","createdAt":"2017-08-21T06:15:19.873Z","kids":["16494823-1e41-4249-9f82-c29ac046e7df"]},"kidsState":{"16494823-1e41-4249-9f82-c29ac046e7df":{"UUID":"16494823-1e41-4249-9f82-c29ac046e7df","deviceType":"unknown","installed":false,"avatarURL":""}},"setupState":{"step":0,"kidUUID":"16494823-1e41-4249-9f82-c29ac046e7df","setupID":5833,"deviceType":"unknown","loading":false,"sceneName":"loading"},"reportsState":{"loading":false}}',
    timestamp: '2017-08-21T06:15:20.018Z',
  },
  '-Ks2QaLDyyazCEUlymhd': {
    action: '{"type":"USER_LOGGED_IN","parent":{"UUID":"013e6354-ea7f-4826-bfb8-4ed09125c291","createdAt":"2017-08-21T06:15:19.873Z","kids":["16494823-1e41-4249-9f82-c29ac046e7df"]}}',
    currentState: '{"parentState":{"UUID":"013e6354-ea7f-4826-bfb8-4ed09125c291","createdAt":"2017-08-21T06:15:19.873Z","kids":["16494823-1e41-4249-9f82-c29ac046e7df"]},"kidsState":{"16494823-1e41-4249-9f82-c29ac046e7df":{"UUID":"16494823-1e41-4249-9f82-c29ac046e7df","deviceType":"unknown","installed":false,"avatarURL":""}},"setupState":{"step":0,"kidUUID":"16494823-1e41-4249-9f82-c29ac046e7df","setupID":5833,"deviceType":"unknown","loading":false,"sceneName":"splashScreen"},"reportsState":{"loading":false}}',
    timestamp: '2017-08-21T06:15:20.207Z',
  },
};

test('It replays actions observing the time differences between them', async () => {
  setMockVal(MOCK_ACTIONS);
  const dispatch = jest.fn();
  jest.useFakeTimers();

  await replayActions('013e6354-ea7f-4826-bfb8-4ed09125c291', dispatch);

  expect(dispatch).toHaveBeenCalledTimes(2);

  jest.runAllTimers();

  expect(dispatch).toHaveBeenCalledTimes(4);
  expect(Actions.splashScreen).toHaveBeenCalled();
});
