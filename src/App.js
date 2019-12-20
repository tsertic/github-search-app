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
//assets
class App extends Component {
  state = {
    users: [],
    loading: false,
    showClear: false,
    alert: null
  };

  /*   async componentDidMount() {
    this.setState({ loading: true });
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    console.log(clientSecret, clientId);
    const response = await axios.get(
      `https://api.github.com/users?client_id=${clientId}&client_secret=${clientSecret}`
    );
    this.setState({ users: response.data, loading: false });
  } */

  searchUsers = async user => {
    this.setState({ loading: true });
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${clientId}&client_secret=${clientSecret}`
    );
    this.setState({
      users: response.data.items,
      loading: false,
      showClear: true
    });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false, showClear: false });
  };
  //set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 4000);
  };

  render() {
    const { loading, users, showClear, alert } = this.state;
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
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
