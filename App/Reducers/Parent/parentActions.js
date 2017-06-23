// @flow
import type { ParentAction, ParentState } from './index';
import type { Kid, KidsState } from '../Kids';
import uuid from 'uuid';

export function beginSetup(UUID: ?string): ParentAction {
  return {
    type: 'BEGIN_SETUP',
    parentUUID: UUID || uuid.v4(),
    kidUUID: uuid.v4(),
    setupID: Math.round(Math.random() * 10000), // 4 digit number
  };
}

export function beginDeeplinkSetup(parent: ParentState, kid: Kid) {
  return {
    type: 'BEGIN_DEEPLINK_SETUP',
    parent,
    kid,
  };
}

export function setName(name: string): ParentAction {
  return {
    type: 'SET_PARENT_NAME',
    name,
  };
}

export function setPassword(password: string): ParentAction {
  return {
    type: 'SET_PASSWORD',
    password,
  };
}

export function setEmail(email: string): ParentAction {
  return {
    type: 'SET_EMAIL',
    email,
  };
}

export function profileMigrated(
  parent: ParentState,
  kids: KidsState
): ParentAction {
  return {
    type: 'PROFILE_MIGRATED',
    parent,
    kids,
  };
}

export function impersonatedParent(parent: ParentState, kids: KidsState) {
  return {
    type: 'IMPERSONATED_PARENT',
    parent,
    kids,
  };
}

export function accountUpgraded(upgradedAt: string) {
  return {
    type: 'ACCOUNT_UPGRADED',
    upgradedAt,
  };
}

export function addedAdditionalChild(UUID: string) {
  return {
    type: 'ADDED_ADDITIONAL_CHILD',
    UUID,
  };
}
