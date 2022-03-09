import React from 'react';
import ReactDOM from 'react-dom';
import { LoginForm } from './login.js';
import './index.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="centered">
        <h1>Welcome, {this.props.user}!</h1>
      </div>
    );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  handleLoggedIn(user) {
    this.setState({user: user});
  }

  render() {
    if (this.state.user === null) {
      return (
        <LoginForm onLogin={this.handleLoggedIn} />
      );
    }
    return (
      <HomePage user={this.state.user} />
    );
  }
};

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
