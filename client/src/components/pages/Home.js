import React, { Component } from "react";
import "./Home.css";

import axios from "axios";
import Combobox from "react-widgets/lib/Combobox";
import { connect } from "react-redux";
import Modal from "react-modal";



function mapStateToProps(state) {
    console.log(state.authentication.loggedUser)
    
    const { isLoggedIn,loggedUser } = state.authentication;
   const {users} = state.users
    return { isLoggedIn,loggedUser,users };
  }
  
class Home extends Component {
  constructor() {
    super();
    this.state = {
      Word: "",
      Translation: "",
      target: "en",
      source: "",
      supportedlanguages: null,
      modalIsOpen: false,
      newcategoryname: "",
      currentcategory: "Add new Category",
      Categories: ["a", "b", "c", "d"]
    };
    this.onChangeWord = this.onChangeWord.bind(this);
    this.onSelecttarget = this.onSelecttarget.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addcategory = this.addcategory.bind(this);
    this.addword = this.addword.bind(this);
    this.deletecategory = this.deletecategory.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ newcategoryname: "" });
    this.setState({ modalIsOpen: false });
  }
  async addcategory(e) {
    e.preventDefault();
    await this.setState({ currentcategory: this.state.newcategoryname });
    this.state.Categories.push(this.state.currentcategory);
    await this.closeModal();
  }
  deletecategory() {
    console.log("deleteCategory");
  }
  addword() {
    console.log("addword");
  }
  async onChangeWord(e) {
    await this.setState({ [e.target.name]: e.target.value });
    axios
      .post(`http://localhost:3001/api/translate/quicktranslate`, {
        text: this.state.Word,
        target: this.state.target
      })
      .then(res => {
        this.setState({ Translation: res.data.translation });
      });
    axios
      .post(`http://localhost:3001/api/translate/detectLanguage`, {
        text: this.state.Word
      })
      .then(res => {
        this.setState({ source: res.data.detections[0].language });
      });
  }
  async onSelecttarget(value) {
    await this.setState({ target: value.code });
    this.onChangeWord({
      target: {
        name: "Word",
        value: this.state.Word
      }
    });
  }
  async onSelectCategory(value) {
    if (value === "Add new Category") {
      this.openModal();
    } else {
      await this.setState({ currentcategory: value });
    }
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3001/api/translate/listLanguages`, {
        text: this.state.Word,
        target: this.state.target
      })
      .then(res => {
        this.setState({ supportedlanguages: res.data.Languages });
      });
    this.state.Categories.unshift("Add new Category");
  }

  render() {
    if (this.state.supportedlanguages == null)
      return <div className="loader"></div>;
    return (
      <div>
        <Combobox
          className="combo1"
          filter
          autoFocus
          data={this.state.supportedlanguages}
          valueField="name"
          textField="name"
          defaultValue={"English"}
          onSelect={this.onSelecttarget}
        />
        <textarea
          className="TA1"
          name="Word"
          rows="10"
          cols="50"
          onChange={this.onChangeWord}
        ></textarea>
        <span className="span1"> </span>

        <textarea
          className="TA2"
          name="Translation"
          readOnly
          rows="10"
          cols="50"
          value={this.state.Translation}
        ></textarea>
        <p></p>
        <button onClick={this.deletecategory}>Delete Category</button>

      
        <Modal
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="Adding new Category"
        >
          <form onSubmit={this.addcategory}>
            <h2 className="modaltittle">Category Name:</h2>
            <input
              className="newcategoryName"
              type="text"
              required={true}
              onChange={e => {
                this.setState({ newcategoryname: e.target.value });
              }}
            />
            <p></p>

            <button className="modaladdbutton">Add</button>

            <button className="modalclosebutton" onClick={this.closeModal}>
              cancel
            </button>
          </form>
        </Modal>
        <p></p>
        <button onClick={this.addword}>Add Word</button>
        <Combobox
          className="combo2"
          filter
          autoFocus
          data={this.state.Categories}
          defaultValue={this.state.currentcategory}
          onSelect={this.onSelectCategory}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
