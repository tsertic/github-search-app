import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SET_ALERT
} from '../types';

let clientId;
let clientSecret;
if (process.env.NODE_ENV !== 'production') {
  clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  clientId = process.env.GITHUB_CLIENT_ID;
  clientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    alert: null,
    loading: false,
    showClear: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Users
  const searchUsers = async user => {
    setLoading();

    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${clientId}&client_secret=${clientSecret}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items
    });
  };
  //Get User
  const getUser = async username => {
    setLoading();
    const response = await axios.get(`https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}
    `);
    dispatch({
      type: GET_USER,
      payload: response.data
    });
  };
  //Get Repos
  const getUserRepos = async username => {
    setLoading();
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}
    `);
    dispatch({
      type: GET_REPOS,
      payload: response.data
    });
  };

  //Clear Users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    });
  };
  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  //set alert
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    });
    setTimeout(
      () =>
        dispatch({
          type: SET_ALERT,
          payload: null
        }),
      4000
    );
  };
  return (
    <GithubContext.Provider
      value={{
        alert: state.alert,
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        showClear: state.showClear,
        searchUsers,
        setAlert,
        clearUsers,
        getUserRepos,
        getUser
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
