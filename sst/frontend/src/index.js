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
      <div>
        Welcome, {this.props.user}!
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
    let container = null;
    if (this.state.user === null) {
      container = <LoginForm onLogin={this.handleLoggedIn} dryRun={true} />;
    } else {
      container = <HomePage user={this.state.user} />;
    }

    return (
      <div>
        {container}
        <hr />
        <div>
          <ToDoList />
        </div>
      </div>
    );
  }
};

function ToDoList(props) {
  return (
    <ul>
      <li>Login session</li>
      <li>Freeze inputs while waiting for response</li>
      <li>Input format validation (e.g. emails)</li>
      <li>Failure dialogs</li>
      <li>CSS Styling</li>
    </ul>
  );
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
