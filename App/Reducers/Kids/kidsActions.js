// @flow
import type { KidsAction, Kid } from './index';

export function setKidName(name: string, UUID: string): KidsAction {
  return {
    type: 'SET_KID_NAME',
    name,
    UUID,
  };
}

export function kidUpdated(kid: Kid, UUID: string): KidsAction {
  return {
    type: 'KID_UPDATED',
    UUID,
    kid,
  };
}

export function setKidImage(avatarURL: string, UUID: string): KidsAction {
  return {
    type: 'SET_KID_IMAGE',
    UUID,
    avatarURL,
  };
}
