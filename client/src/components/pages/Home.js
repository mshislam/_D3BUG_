import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import Combobox from "react-widgets/lib/Combobox";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      Word: "",
      Translation: "",
      target: "en",
      supportedlanguages: null
    };
    this.onChangeWord = this.onChangeWord.bind(this);
    this.onSelecttarget = this.onSelecttarget.bind(this);
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
    if (this.state.supportedlanguages == null)
      return <div className="loader"></div>;
    return (
      <div>
        <Combobox
          className="combo"
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
      </div>
    );
  }
}

export default Home;
