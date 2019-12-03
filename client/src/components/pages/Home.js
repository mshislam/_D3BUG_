import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Combobox from "react-widgets/lib/Combobox";
import AddCatModal from '../../components/AddCatModal'
class Home extends Component {
  constructor() {

  
    super();
    this.state = {
      Word: "",
      Translation: "",
      target: "en",
      supportedlanguages: [],
      addModalshow:false,
      isShowing: false

    };
    this.onChangeWord = this.onChangeWord.bind(this);
  }
  openModalHandler = () => {
    this.setState({
        isShowing: true
    });
}

closeModalHandler = () => {
    this.setState({
        isShowing: false
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
        console.log(res);
        this.setState({ Translation: res.data.translation });
      });
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
  }

  render() {
    let addModalClose =() =>this.setState({addModalShow:false}); 
    if (this.state.supportedlanguages == null)
      return <div className="loader center"></div>;
    return (
      <div>
        <label>Word</label>
        <p></p>
        <textarea name="Word" rows="3" onChange={this.onChangeWord}></textarea>
        <textarea
          name="Translation"
          readOnly
          rows="3"
          value={this.state.Translation}
        ></textarea>
        <p></p>
        <Combobox
          data={this.state.supportedlanguages}
          valueField="code"
          textField="name"
        />
        <div>
                { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                <button className="open-modal-btn" onClick={this.openModalHandler}>Add category</button>

                <AddCatModal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
                </AddCatModal>
            </div>
      
      </div>
    );
  }
}

export default Home;
