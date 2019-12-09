import React, { Component } from 'react'
import { connect } from "react-redux";


import axios from 'axios'
  class Profile extends Component {

state={
  id:"",
  Email:"" ,
  Password:"",
  Vocabulary:"",
  Categories:"",
}
componentDidMount() {

  const sendtoaxios='http://localhost:3001/api/users/finduser/'+(this.props.match.params.id)

  //const asdas='localhost:3000/api/projects/'+(this.props.match.params.id)

  console.log(sendtoaxios) 

  axios.get(sendtoaxios)

    .then(res => {       

      const user = res.data.data;
      console.log(user)
  this.setState({
    id:user._id,
    Email:user.Email,
    Password:user.Hashed_password,
    Vocabulary:user.Vocabulary,
    Categories:user.Categories,
  
  })
  






});

  }

  render() {
  

  
    return(
      <div id="page-content-wrapper">
      <link rel="shortcut icon" href=""/>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
      <link rel="stylesheet" href="../layout/Form.css"/>
    <body>
      <div className="container">
        <h1 className="brand"><span>User</span>Profile</h1>
        <div className="wrapper animated bounceInLeft">
          <div className="company-info">
   
          </div>
          <div className="contact">
            <h3>Profile</h3>
            <form method="POST" action="send">
             
              <p>
                
                <label>Email Address</label>
                <input type="email" value={this.state.Email}/>
              </p>

              <p>
                <label>Vocabulary</label>
                <input type="text" value={this.state.Vocabulary}/>
              </p> 
              <p>
                <label>Categories</label>
                <input type="text" value={this.state.Categories}/>
              </p> 
             
            </form>
          </div>
        </div>
      </div>
    
    </body>
      </div>
  )

   
  
 

}
}

function mapStateToProps(state) {
  // console.log(state.authentication.loggedUser)
   
   const { isLoggedIn,loggedUser } = state.authentication;
  const {users} = state.users
   return { isLoggedIn,loggedUser,users };
 }
 export default connect(mapStateToProps)(Profile);