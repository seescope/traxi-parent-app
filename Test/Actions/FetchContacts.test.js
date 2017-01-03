import fetchContacts from '../../App/Actions/FetchContacts';

describe('fetchContacts', () => {
  it('loads the contacts and dispatches a GOT_CONTACTS event', () => {
    const TEST_DISPATCH = jest.fn();

    // Exercise
    const action = fetchContacts();
    const promise = action(TEST_DISPATCH);

    return promise.then(() => {
      expect(TEST_DISPATCH.mock.calls).toMatchSnapshot();
    });
  });
});

