import { NativeModules, AsyncStorage } from 'react-native';

const startVPN = (UUID) =>
  NativeModules.VPNClient.startVPN(UUID).then(() => {
    // TODO: Set name, photo, etc.
    AsyncStorage.setItem('profile', JSON.stringify({ UUID }));
  });

export default startVPN;
