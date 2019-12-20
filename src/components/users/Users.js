import React from 'react';
import UserItem from './UserItem';
import Spinner from '../UI/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
  const renderUsers = users.map(user => {
    return <UserItem user={user} key={user.id} />;
  });
  return (
    <React.Fragment>
      {loading ? <Spinner /> : <div style={userStyle}> {renderUsers}</div>}
    </React.Fragment>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem'
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Users;
