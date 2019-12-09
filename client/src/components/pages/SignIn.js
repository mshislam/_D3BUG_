import React, { Component } from "react";
import { connect } from "react-redux";
import "tachyons";

import { login } from "../../actions/authactions";


import "./Form.css";
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",

      pwd: "",

      users: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;

    const { name, pwd } = this.state;

    const data = { Email: name, Password: pwd };

    dispatch(login(data));
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    console.log(e.target.value);
  }

  

  render() {  



    const {isLoggedIn,loggedUser} = this.props;

    if(isLoggedIn) {

      return (<div>

      <h3>{console.log(loggedUser)}</h3>


     

     

  

          <h4>{this.props.history.push("/home")}</h4>

          <h5> </h5>
        </div>
      );
    }

    return (
      <div>
        <div>
          <link rel="shortcut icon" href="" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Registration Form</title>

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css"
          />
          <link rel="stylesheet" href="./Form.css" />
          <div className="container">
            <div className="wrapper animated bounceInLeft">
              <div className="company-info">
                <h3 className="black">InYourVocab</h3>
                <p1>The best Studying App</p1>
              </div>
              <div className="contact">
                <form onSubmit={this.onSubmit.bind(this)}>
                  <span className="tc">
                    <div className="shift">
                      <p>
                        <label>Email</label>
                        <input
                          required={true}
                          type="email"
                          name="name"
                          onChange={this.onChange.bind(this)}
                        />
                      </p>
                      <br />
                      <br />

                      <p>
                        <label>Password</label>
                        <input
                          required={true}
                          type="password"
                          name="pwd"
                          onChange={this.onChange.bind(this)}
                        />
                      </p>
                    </div>
                    <br />
                    <br />
                    <div className="shift">
                      <p className="full">
                        <button onSubmit={this.send} type="submit">
                          Sign In
                        </button>
                      </p>
                      <br />
                      <br />
                    </div>
                    <div className="shift">
                      <p className="full">
                        <button
                          onClick={() => {
                            this.props.history.push("/Signup");
                          }}
                        >
                          Register Now
                        </button>
                      </p>
                      <br />
                    </div>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.authentication.loggedUser);

  const { isLoggedIn, loggedUser } = state.authentication;

  const { users } = state.users;

  return { isLoggedIn, loggedUser, users };
}

export default connect(mapStateToProps)(SignIn);

