import OneSignal from 'react-native-onesignal';

const createDataJsonFromProfile = profile => {
  const { kids } = profile;

  const kidsInformations = kids.map(kid => ({
    name: kid.name,
    uuid: kid.UUID,
  }));

  const data = {
    kids: kidsInformations,
    timezone: 'US',
  };

  const dataJson = JSON.stringify(data);

  return dataJson;
};

const configureNotificationEndpoint = profile => {
  OneSignal.sendTag('kids', createDataJsonFromProfile(profile));
};

exports.configureNotificationEndpoint = configureNotificationEndpoint;
