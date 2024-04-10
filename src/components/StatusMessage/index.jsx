import React from 'react';
import PropTypes from 'prop-types';

const StatusMessage = ({ message }) => {
  return (
    <h2>
      {message}
    </h2>
  );
};

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default StatusMessage;
