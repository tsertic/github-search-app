import React, { useContext } from 'react';
import GithubContext from './../../context/github/githubContext';
const Alert = () => {
  const githubContext = useContext(GithubContext);
  const { alert } = githubContext;
  if (alert === null) return null;
  return (
    <div className={`alert alert-${alert.type}`}>
      <i className="fas fa-info-circe" /> {alert.msg}
    </div>
  );
};

export default Alert;
