import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../UI/Spinner';
import GithubContext from './../../context/github/githubContext';
const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users } = githubContext;
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

export default Users;
