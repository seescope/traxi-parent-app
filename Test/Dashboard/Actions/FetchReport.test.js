import fetchReport from '../../../App/Dashboard/Util/FetchReport';

const TEST_UUID = '2f566920-f598-46d2-8bf2-7bcae115bf0a';

describe('#FetchReport', () => {
  it('fetches a report', () => {
    fetchReport(TEST_UUID).then(data => {
      expect(data).toBeTruthy();
    });
  });
});
