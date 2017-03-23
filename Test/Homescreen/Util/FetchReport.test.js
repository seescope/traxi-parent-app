import fetchReport from '../../../App/Homescreen/Util/FetchReport';
import base64 from 'base-64';

describe('#FetchReport', () => {
  it('fetches a report', done => {
    const testContext = { UUID: 'test-uuid' };
    const callback = data => {
      expect(data.payload).toEqual(testContext);
      done();
    };

    const context = base64.encode(JSON.stringify(testContext));

    console.log(context);

    fetchReport(context, callback);
  });
});
