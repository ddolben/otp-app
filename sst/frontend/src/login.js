import React from 'react';
import './login.css';

class SingleInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

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
        <div class="flex-row">
          <input type="text" class="flex-fill"
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            onChange={this.handleChange} />
          <button type="submit" disabled={this.props.disabled}>Submit</button>
        </div>
      </form>
    );
  }
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      otp: null,
      flash: null,
      freezeInput: false,
    };

    this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
    this.handleSubmitOTP = this.handleSubmitOTP.bind(this);
    this.onLogin = this.props.onLogin;
  }

  handleSubmitEmail(email) {
    this.setState({freezeInput: true});

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
          this.setState({
            email: email,
            freezeInput: false,
          });
        } else {
          this.setState({
            flash: "Failed to send email",
            freezeInput: false,
          });
        }
      });
  }

  handleSubmitOTP(otp) {
    this.setState({freezeInput: true});

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
          this.setState({
            otp: otp,
            freezeInput: false,
          });
          this.onLogin(this.state.email);
        } else {
          this.setState({
            flash: "Incorrect OTP",
            freezeInput: false,
          })
        }
      });
  }

  render() {
    let form = null;
    if (this.state.email === null) {
      form = (
        <div>
          <div class="flash">{this.state.flash}</div>
          <div>Enter email address: </div>
          <SingleInputForm
            placeholder="email"
            disabled={this.state.freezeInput}
            onSubmit={this.handleSubmitEmail} />
        </div>
      );
    } else {
      form = (
        <div>
          <div>An email was sent to {this.state.email} with a one-time password.</div>
          <br />
          <div class="flash">{this.state.flash}</div>
          <div>Enter one-time password: </div>
          <SingleInputForm
            placeholder="one-time password"
            disabled={this.state.freezeInput}
            onSubmit={this.handleSubmitOTP} />
        </div>
      );
    }

    return (
      <div class="container flex-row">
        <div class="flex-fill"></div>
        <div class="login-container">
          <h1>Log in</h1>
          {form}
        </div>
        <div class="flex-fill"></div>
      </div>
    );
  }
};

export { LoginForm };
