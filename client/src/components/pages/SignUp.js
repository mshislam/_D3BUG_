import React, { Component } from "react";
import "tachyons";
import axios from "axios";
import "./Form.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      Password2: ""
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }
  onSubmit = event => {
    console.log(this.state.Email);
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3001/api/users/register",
      data: {
        Email: this.state.Email,
        Password: this.state.Password
      }
    })
      .then(res => {
        alert("your Account has been successfully created");
      })
      .catch(err => {
        console.log(err);
        alert(err.response.data.error);
      });
  };
  render() {
    return (
      <div>
        {/* <div className="header">
          <a href="#" className="logo">LirtenHub</a>
          <div className="header-right">
            <a className="active" href="/">SignIn</a>
            <a href="/SignUp">SignUp</a>
            <a href="/About">About</a>
            <Router>
                      <Link  to={"/Profile/"+x.id} >My profile</Link>
                        <div className="dropdown-content bg-light-green ">
                          
                          <h3>{console.log("hello "+x.id)}</h3>
                          
                        
                      </div>
                      </Router>
          
          </div>
        
        </div> */}
        <div>
          <link rel="shortcut icon" href="" />
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title className="Dark-blue">Registration Form</title>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css"
          />
          <link rel="stylesheet" href="../pages/Form.css" />

          <div className="container">
            <h1 className="brand">
              <span>Registration Form</span>
            </h1>
            <div className="wrapper animated bounceInLeft">
              <div className="company-info">
                <h3>Registration</h3>
              </div>
              <div className="contact">
                <h3>Create New Account</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <p>
                    <label>Email Address</label>
                    <input
                      type="email"
                      onChange={this.onChange.bind(this)}
                      value={this.state.Email}
                      name="Email"
                      required
                    />
                  </p>
                  <p>
                    <label>Password</label>
                    <input
                      type="password"
                      onChange={this.onChange.bind(this)}
                      value={this.state.Password}
                      name="Password"
                      required
                    />
                  </p>

                  <p classNameName="full">
                    <span className="reg">
                      {" "}
                      <button type="submit" required>
                        Register{" "}
                      </button>{" "}
                    </span>
                  </p>
                  <p></p>
                  <div className="shift">
                    <p className="full">
                      <button
                        onClick={() => {
                          this.props.history.push("/");
                        }}
                      >
                        SignIn
                      </button>
                    </p>
                    <br />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
