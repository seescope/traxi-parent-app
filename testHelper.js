require('babel-core/register')({
  ignore: 'node_modules/react-native-vector-icons/'
}); 

var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var chaiEnzyme = require('chai-enzyme');
chai.use(chaiEnzyme());
chai.use(sinonChai);
