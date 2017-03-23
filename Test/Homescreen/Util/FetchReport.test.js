import fetchReport from '../../../App/Homescreen/Util/FetchReport';
import base64 from 'base-64';

describe('#FetchReport', () => {
  it('fetches a report', done => {
    const callback = data => {
      expect(data).toBeTruthy();
      done();
    };

    const context = base64.encode(JSON.stringify({ UUID: 'test-uuid' }));

    fetchReport(context, callback);
  });
});
