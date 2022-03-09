import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class EmailForm extends React.Component {
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
    console.log("Email: " + this.state.value);
    if (this.onSubmit) {
      this.onSubmit(this.state.value);
    }
  }

  render() {
    return (
      <div>
        <h1>Enter email address</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="email" placeholder="Email Address"
           onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
};

class OTPForm extends React.Component {
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
    console.log("OTP: " + this.state.value);
    if (this.onSubmit) {
      this.onSubmit(this.state.value);
    }
  }

  render() {
    return (
      <div>
        <h1>Enter one-time password</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="otp" placeholder="One Time Password"
           onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      otp: null,
    };

    this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
    this.handleSubmitOTP = this.handleSubmitOTP.bind(this);
  }

  handleSubmitEmail(email) {
    this.setState({email: email});
  }

  handleSubmitOTP(otp) {
    this.setState({otp: otp});
  }

  render() {
    let form = <HomePage />;
    if (this.state.email === null) {
      form = <EmailForm onSubmit={this.handleSubmitEmail} />;
    } else if (this.state.otp === null) {
      form = <OTPForm onSubmit={this.handleSubmitOTP} />;
    }

    return (
      <div>
        <div>
          <div>Email: {this.state.email}</div>
          <div>OTP: {this.state.otp}</div>
        </div>
        <hr />
        {form}
        <hr />
        <div>
          <ToDoList />
        </div>
      </div>
    );
  }
};

function Prototype(props) {
  return (
    <div>
      <EmailForm />
      <hr />
      <OTPForm />
      <hr />
      <HomePage />
    </div>
  );
}

function ToDoList(props) {
  return (
    <ul>
      <li>Login session</li>
      <li>Consolidate input forms into one component</li>
      <li>CSS Styling</li>
    </ul>
  );
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

