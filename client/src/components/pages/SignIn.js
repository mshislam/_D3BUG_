
import React, { Component } from "react";



import "tachyons";

import { login } from "../../actions/authactions";



import { connect } from "react-redux";




class SignIn extends Component {

  constructor(props) {

    super(props);

    this.state = {

      name: "",

      pwd: "",

      users:""

    };

  }

  onSubmit = e => {

  
    e.preventDefault();

    const { dispatch } = this.props;

    const { name, pwd } = this.state;

    const data = { Email: name, Password: pwd };

    dispatch(login(data));

  }
  onChange(e) {

    this.setState({ [e.target.name]: e.target.value });

    console.log(e.target.value);

  }

  handleClick(e){

  

   

  }

  render() {  



    const {isLoggedIn,loggedUser} = this.props;

    if(isLoggedIn) {

      return <div>

      <h3>{console.log(loggedUser)}</h3>


     <h4>{this.props.history.push("/home")}</h4>

     

  

      </div>

    }


    return (

      <div >

      { <div className="header">

 

      <div className="header-right">

        <a className="active" href="/">SignIn</a>
       <div></div>
       

        <a href="/SignUp">SignUp</a>



      

      </div>

    

    </div> }

      <div>

        <link rel="shortcut icon" href="" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Registration Form</title>

       

        <link

          rel="stylesheet"
https
          href="://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css"

        />

        <link rel="stylesheet" href="/SignUp.css" />

          <div className="container">

            <div className="wrapper animated bounceInLeft">

              <div className="contact">

                <form onSubmit={this.onSubmit.bind(this)}>

                  <span className="tc">

                    <div className="shift">

                      <p>

                        <label>Email</label>

                        <input

                          type="text"

                          name="name"

                          onChange={this.onChange.bind(this)}

                        />

                      </p>

                      <br />

                      <br />



                      <p>

                        <label>Password</label>

                        <input

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

                        <button onSubmit = {this.send }type="submit">Sign In</button>

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

  console.log(state.authentication.loggedUser)

  

  const { isLoggedIn,loggedUser } = state.authentication;

 const {users} = state.users

  return { isLoggedIn,loggedUser,users };

}



export default connect(mapStateToProps)(SignIn);

