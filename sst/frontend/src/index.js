import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SingleInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.props.onSubmit;
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.onSubmit) {
      this.onSubmit(this.state.value);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span>{this.props.prompt}: </span>
        <input type="text" placeholder={this.props.placeholder}
          onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: "user"};
  }

  render() {
    return (
      <div>
        Welcome, {this.state.user}!
      </div>
    );
  }
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      otp: null,
    };

    this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
    this.handleSubmitOTP = this.handleSubmitOTP.bind(this);
    this.onLogin = this.props.onLogin;
  }

  handleSubmitEmail(email) {
    if (this.props.dryRun) {
      this.setState({email: email});
      return;
    }

    fetch(process.env.REACT_APP_API_URL + "/otp/send_email", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then(response => response.json())
      .then(response => {
        if (response.success) {
          this.setState({email: email});
        }
      });
  }

  handleSubmitOTP(otp) {
    if (this.props.dryRun) {
      this.setState({otp: otp});
      this.onLogin(this.state.email);
      return;
    }

    fetch(process.env.REACT_APP_API_URL + "/otp/validate_otp", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        token: otp,
      }),
    }).then(response => response.json())
      .then(response => {
        if (response.is_valid) {
          this.setState({otp: otp});
          this.onLogin(this.state.email);
        }
      });
  }

  render() {
    let emailForm = null;
    let otpForm = null;
    if (this.state.email === null) {
      emailForm = (
        <SingleInputForm
          prompt="Enter email address"
          placeholder="email"
          onSubmit={this.handleSubmitEmail} />
      );
    } else {
      emailForm = <span>{this.state.email}</span>
      otpForm = (
        <SingleInputForm
          prompt="Enter one-time password"
          placeholder="one-time password"
          onSubmit={this.handleSubmitOTP} />
      );
    }

    return (
      <div>
        <h1>Log in</h1>
        <div>
          {emailForm}
        </div>
        <div>
          {otpForm}
        </div>
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
    let container = <HomePage />;
    if (this.state.user === null) {
      container = <LoginForm onLogin={this.handleLoggedIn} dryRun={true} />;
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

