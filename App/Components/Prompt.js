import React from 'react';

const Prompt = ({ step, parentName, kidName, nextStep }) => null;

Prompt.propTypes = {
  step: React.PropTypes.number.isRequired,
  parentName: React.PropTypes.string.isRequired,
  kidName: React.PropTypes.string.isRequired,
  nextStep: React.PropTypes.func.isRequired,
};

export default Prompt;
