import React, { Component } from "react";
import "./Home.css";
import { connect } from "react-redux";
import axios from "axios";
import Combobox from "react-widgets/lib/Combobox";
import Modal from "react-modal";
import Vocabulary from "../layout/Vocabulary";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Word: "",
      Translation: "",
      target: "en",
      source: "",
      supportedlanguages: null,
      Categories: null,
      modalIsOpen: false,
      newcategoryname: "",
      currentcategory: "",
      Vocabulary: []
    };
    this.onChangeWord = this.onChangeWord.bind(this);
    this.onSelecttarget = this.onSelecttarget.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addcategory = this.addcategory.bind(this);
    this.addword = this.addword.bind(this);
    this.deletecategory = this.deletecategory.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.deleteword = this.deleteword.bind(this);
    this.editword = this.editword.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ newcategoryname: "" });
    this.setState({ modalIsOpen: false });
  }
  async deleteword(word) {
    await axios.post(`http://localhost:3001/api/users/removeword`, {
      Wid: word._id
    });
    await axios
      .post(`http://localhost:3001/api/users/Words`, {
        Category: this.state.currentcategory
      })
      .then(res => {
        this.setState({ Vocabulary: res.data.data });
      });
  }
  async editword(newtranslation, Word) {
    await axios.put(`http://localhost:3001/api/users/updateword`, {
      Wid: Word._id,
      Category: this.state.currentcategory,
      Translation: newtranslation
    });
    await axios
      .post(`http://localhost:3001/api/users/Words`, {
        Category: this.state.currentcategory
      })
      .then(res => {
        this.setState({ Vocabulary: res.data.data });
      });
  }

  async addword() {
    if (
      this.state.currentcategory == "" ||
      this.state.currentcategory == "New Category"
    )
      return;
    axios.post(`http://localhost:3001/api/users/addword`, {
      Word: this.state.Word,
      Translation: this.state.Translation,
      From: this.state.source,
      To: this.state.target,
      Category: this.state.currentcategory
    });

    var joined = this.state.Vocabulary.concat({
      Word: this.state.Word,
      Translation: this.state.Translation,
      From: this.state.source,
      To: this.state.target,
      Category: this.state.currentcategory
    });
    this.setState({ Vocabulary: joined });
  }
  deletecategory() {
    axios
      .post(`http://localhost:3001/api/users/removecategory`, {
        Category: this.state.currentcategory
      })
      .then(res => {
        this.setState({ Vocabulary: [], currentcategory: "" });
        this.state.Categories.splice(
          this.state.Categories.indexOf(this.state.currentcategory),
          1
        );
      });
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
  async addcategory(e) {
    e.preventDefault();

    var joined = this.state.Categories.concat(this.state.newcategoryname);
    await this.setState({ Categories: joined });
    await this.setState({ currentcategory: this.state.newcategoryname });
    await axios.post(`http://localhost:3001/api/users/addcategory`, {
      Category: this.state.currentcategory
    });
    await this.setState({ Vocabulary: [] });
    await this.closeModal();
  }
  async onSelectCategory(value) {
    if (value === "New Category") {
      await this.openModal();
    } else {
      await this.setState({ currentcategory: value });
      axios
        .post(`http://localhost:3001/api/users/Words`, {
          Category: this.state.currentcategory
        })
        .then(res => {
          this.setState({ Vocabulary: res.data.data });
        });
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
    axios.get(`http://localhost:3001/api/users/usercategories`, {}).then(
      res => {
        this.setState({ Categories: res.data.data });
        this.state.Categories.unshift("New Category");
      },
      err => {
        console.log(err);
      }
    );
  }

  render() {
    if (this.state.supportedlanguages == null || this.state.Categories == null)
      return <div className="loader"></div>;
    return (
      <div>
        <div className="test">
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
        </div>
        <p></p>
        <div className="test">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.addword}
          >
            Add Word To
          </button>

          <Combobox
            className="combo2"
            filter
            autoFocus
            data={this.state.Categories}
            value={this.state.currentcategory}
            onSelect={this.onSelectCategory}
          />
        </div>
        <p></p>
        <div className="test2">
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.deletecategory}
          >
            Delete Category
          </button>
        </div>
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

        <div>
          <Vocabulary
            V={this.state.Vocabulary}
            editword={this.editword}
            deleteword={this.deleteword}
          />
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

export default connect(mapStateToProps)(Home);
