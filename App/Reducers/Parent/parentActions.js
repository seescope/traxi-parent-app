// @flow
import type { ParentAction } from "./index";
import uuid from "uuid";

export function beginSetup(): ParentAction {
  return {
    type: "BEGIN_SETUP",
    parentUUID: uuid.v4(),
    kidUUID: uuid.v4()
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
