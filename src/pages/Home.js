import React, { Fragment } from 'react';
import Search from '../components/users/Search';
import Users from '../components/users/Users';
import Alert from '../components/UI/Alert';

const Home = () => {
  return (
    <Fragment>
      <Alert />
      <Search />
      <Users />
    </Fragment>
  );
};

export default Home;
