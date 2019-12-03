import React, { Component } from 'react';
import axios from "axios";

import './Modal.css';
import { NEG_ONE } from 'long';

class  AddCatModal extends Component 
    {constructor() {
        super();
    this.state={
        category:""
    };
    
}
    handlechange = event =>{
        this.setState({category:document.getElementById('cat_name').value})
    }

       makeRequest=()=>{
        axios
      .post(`http://localhost:3001/api/user/addcategory`, {
        category:this.state.category
      })
      .then(res => {
        console.log(res);
      }).catch(err=>{
        console.log(err)
    })
  }

       
        render(){
    return (
        
            <div className="modal-wrapper"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>Add Category</h3>
                    <span className="close-modal-btn" onClick={this.props.close}>×</span>
                </div>
                <div className="modal-body">
                <input
            id='cat_name'
              name="category"
              type="text"
              onChange={this.handlechange}
            />

                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={this.props.close}>CLOSE</button>
                    <button className="btn-continue" onClick={this.makeRequest}>Submit category</button>
                </div>
            </div>
        
    )
}

}
export default AddCatModal;