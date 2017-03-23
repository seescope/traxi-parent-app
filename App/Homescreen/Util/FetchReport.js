import AWS from 'aws-sdk';
const FUNCTION_NAME = 'TestFunction';

export default (uuid, callback) => {
  const lambda = new AWS.Lambda({
    region: 'ap-southeast-2',
    accessKeyId: 'AKIAIG3LQD7SGZSJ75WQ',
    secretAccessKey: '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',
  });

  const params = {
    FunctionName: FUNCTION_NAME,
    ClientContext: uuid,
    InvocationType: 'RequestResponse',
  };

  lambda.invoke(params, (err, data) => {
    if (err) { console.log(err, err.stack); }
    else callback(data);
  });
}
