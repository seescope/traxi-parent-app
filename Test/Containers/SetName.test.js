import React from "react";
import renderer from "react-test-renderer";
import { Keyboard } from "react-native";
import { Actions } from "react-native-router-flux";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import SetName, { mergeProps, nextStep } from "../../App/Containers/SetName";

const mockStore = configureStore([thunk]);
const testStore = mockStore({
  kidsState: {
    "abc-123": {
      name: "John Bobson"
    }
  },
  setupState: {
    kidUUID: "abc-123"
  }
});

const SetNameComponent = () => (
  <Provider store={testStore}>
    <SetName />
  </Provider>
);

it("renders the <SetName> component", () => {
  const tree = renderer.create(<SetNameComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("handles setting the kid's name", () => {
  const mockDispatch = jest.fn();

  const { onNameChanged } = mergeProps(
    { kidUUID: "abc-123" },
    { dispatch: mockDispatch }
  );
  onNameChanged("TEST_NAME");
  expect(mockDispatch).toHaveBeenCalledWith({
    name: "TEST_NAME",
    UUID: "abc-123",
    type: "SET_KID_NAME"
  });
});

it("handles going to the nextStep", () => {
  Keyboard.dismiss = jest.fn();

  nextStep("hey");

  expect(Keyboard.dismiss).toHaveBeenCalled();
  expect(Actions.deviceSetup).toHaveBeenCalled();
});
