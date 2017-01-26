import { firstName, isIOS } from '../Utils';
import Analytics from 'react-native-analytics';

const ParentAppReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'PREVIOUS_STEP': {
      const previousStep = state.step - 1;
      return { ...state, step: previousStep };
    }
    case 'NEXT_STEP': {
      const nextStep = state.step + 1;
      return { ...state, step: nextStep };
    }
    case 'LOGGED_IN': {
      const { profile } = action;
      const parentName = firstName(profile.name);

      if (!isIOS) {
        Analytics.identify(profile.UUID, {
          email: profile.email,
          name: profile.name,
          avatar: profile.picture,
          id: profile.UUID,
        });
      }

      return { ...state, parentName, profile };
    }
    case 'ERROR_LOGGING_IN': {
      return state;
    }
    case 'FETCHING_REPORT': {
      return { ...state, loading: true };
    }
    case 'FETCHED_REPORT': {
      const { report, UUID } = action;
      if (report === null) return { ...state, loading: false };
      const reports = { ...state.reports, [UUID]: report };

      return { ...state, reports, loading: false };
    }
    case 'RESET_STATE': {
      return {
        ...state,
        kidSuggestions: [],
        step: 0,
      };
    }
    case 'ENTER_KID_NAME': {
      const { kidName } = action;
      const { selectedKid } = state;
      const newKid = { ...selectedKid, name: kidName };

      return {
        ...state,
        selectedKid: newKid,
      };
    }
    case 'SELECT_KID': {
      const { selectedKid } = action;
      const selectedKidWithDevice = {
        ...selectedKid,
        deviceType: 'unknown',
      };

      return { ...state, selectedKid: selectedKidWithDevice };
    }
    case 'SELECT_KID_IMAGE': {
      const { avatarURL } = action;
      const { selectedKid } = state;
      const newKid = { ...selectedKid, avatarURL };

      return {
        ...state,
        selectedKid: newKid,
      };
    }
    case 'SELECT_PRICE': {
      const { price } = action;

      return {
        ...state,
        price,
      };
    }
    case 'ADD_KID': {
      const { UUID, setupID } = action;
      const { selectedKid } = state;
      const newKid = { ...selectedKid, UUID, setupID, deviceType: 'unknown', status: 'WAITING' };

      return {
        ...state,
        selectedKid: newKid,
      };
    }
    case 'DEVICE_UPDATED': {
      const { selectedKid } = action;
      console.log('DEVICE_UPDATED', state.step);
      const step = state.step > 3 ?
        state.step + 1 :
        state.step;

      return {
        ...state,
        step,
        selectedKid,
      };
    }
    case 'focus': {
      const { scene } = action;
      return {
        ...state,
        sceneName: scene.name,
      };
    }
    default: {
      return state;
    }
  }
};

export default ParentAppReducer;
