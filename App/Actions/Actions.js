export const selectKid = selectedKid => (
  { type: 'SELECT_KID', selectedKid }
);

export const enterKidName = kidName => (
  { type: 'ENTER_KID_NAME', kidName }
);

export const selectKidImage = avatarURL => (
  { type: 'SELECT_KID_IMAGE', avatarURL }
);

export const selectPrice = price => (
  { type: 'SELECT_PRICE', price }
);

export const addKid = (UUID, setupID) => (
  { type: 'ADD_KID', UUID, setupID }
);

export const deviceUpdated = selectedKid => (
  { type: 'DEVICE_UPDATED', selectedKid }
);

export const NEXT_STEP = ({ type: 'NEXT_STEP' });

export const RESET_STATE = ({ type: 'RESET_STATE' });
