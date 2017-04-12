import { firstName } from '../Utils';
import Analytics from 'react-native-analytics';
import Intercom from 'react-native-intercom';

const ParentAppReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'PREVIOUS_STEP': {
      const previousStep = state.step > 0 ? state.step - 1 : state.step;
      Analytics.track('Went Back in Walkthrough', {
        value: previousStep,
      });
      return { ...state, step: previousStep };
    }
    case 'NEXT_STEP': {
      const nextStep = state.step + 1;
      Analytics.track('Advanced Through Walkthrough', {
        value: nextStep,
      });
      return { ...state, step: nextStep };
    }
    case 'LOGGED_IN': {
      const { profile } = action;
      const parentName = firstName(profile.name);

      Analytics.identify(profile.UUID, {
        email: profile.email,
        name: profile.name,
        avatar: profile.picture,
        id: profile.UUID,
      });
      Intercom.registerIdentifiedUser({ userId: profile.UUID });

      return { ...state, parentName, profile };
    }
    case 'ERROR_LOGGING_IN': {
      return state;
    }
    case 'FETCHING_REPORT': {
      return { ...state, loading: true };
    }
    case 'FETCHED_REPORT': {
      const { reports } = action;
      if (reports === null) return { ...state, loading: false };

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
      const newKid = {
        ...selectedKid,
        UUID,
        setupID,
        deviceType: 'unknown',
        status: 'WAITING',
      };

      return {
        ...state,
        selectedKid: newKid,
      };
    }
    case 'DEVICE_UPDATED': {
      const { selectedKid } = action;
      const { step } = state;

      // Only advance through the walkthrough if we know the deviceType.
      const newStep = selectedKid.deviceType === 'unknown' ? step : step + 1;

      if (selectedKid.deviceType === 'unknown') {
        Analytics.track('Started Setup', selectedKid);
      }

      if (selectedKid.deviceType !== 'unknown') {
        Analytics.track('Verified Device', selectedKid);
      }

      return {
        ...state,
        step: newStep,
        selectedKid,
      };
    }
    case 'REACT_NATIVE_ROUTER_FLUX_FOCUS': {
      const { scene } = action;
      return {
        ...state,
        sceneName: scene.name,
      };
    }
    case 'UPDATE_PROFILE': {
      const { field, value } = action;
      const { profile } = state;

      const newProfile = {
        ...profile,
        [field]: value,
      };

      return { ...state, profile: newProfile };
    }
    default: {
      return state;
    }
  }
};

export default ParentAppReducer;
