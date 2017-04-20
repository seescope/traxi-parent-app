// @flow
import type { ParentAction, ParentState } from "./index";
import type { Kid } from "../Kids";
import uuid from "uuid";

export function beginSetup(): ParentAction {
  return {
    type: "BEGIN_SETUP",
    parentUUID: uuid.v4(),
    kidUUID: uuid.v4(),
    setupID: Math.round(Math.random() * 10000) // 4 digit number
  };
}

export function beginDeeplinkSetup(parent: ParentState, kid: Kid) {
  return {
    type: "BEGIN_DEEPLINK_SETUP",
    parent,
    kid
  };
}

export function setName(name: string): ParentAction {
  return {
    type: "SET_PARENT_NAME",
    name
  };
}

export function setPassword(password: string): ParentAction {
  return {
    type: "SET_PASSWORD",
    password
  };
}

export function setEmail(email: string): ParentAction {
  return {
    type: "SET_EMAIL",
    email
  };
}
