import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  if (alert === null) return null;
  return (
    <div className={`alert alert-${alert.type}`}>
      <i className="fas fa-info-circe" /> {alert.msg}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.object
};

export default Alert;
