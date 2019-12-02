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
      supportedlanguages: []
    };
    this.onChangeWord = this.onChangeWord.bind(this);
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
      </div>
    );
  }
}

export default Home;
