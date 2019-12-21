import React, { Component, Fragment } from 'react';
import './App.css';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
//components
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/UI/Alert';
import About from './pages/About';
import User from './components/users/User';
//assets

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    showClear: false,
    alert: null
  };

  //search github users

  searchUsers = async user => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${clientId}&client_secret=${clientSecret}`
    );
    this.setState({
      users: response.data.items,
      loading: false,
      showClear: true
    });
  };

  //get single github user
  getUser = async username => {
    this.setState({ loading: true });
    const response = await axios.get(`https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}
    `);

    this.setState({ user: response.data, loading: false });
  };
  //clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false, showClear: false });
  };
  //set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 4000);
  };

  //Get users repos

  getUserRepos = async username => {
    this.setState({ loading: true });
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}
    `);

    this.setState({ repos: response.data, loading: false });
  };

  render() {
    const { loading, users, showClear, alert, user, repos } = this.state;
    return (
      <div className="App">
        <Navbar />

        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Alert alert={alert} />
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={showClear}
                    setAlert={this.setAlert}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
