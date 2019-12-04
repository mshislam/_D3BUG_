import React, { Component } from "react";
import Modal from "./modal.js";

class Vocabulary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedword: "",
      Vocabulary: this.props.V
    };
    this.editword = this.editword.bind(this);
    this.deleteword = this.deleteword.bind(this);
    this.selectedword = this.selectedword.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      Vocabulary: nextProps.V
    });
  }
  deleteword(word) {
    this.props.deleteword(word);
  }
  editword(newtranslation) {
    this.props.editword(newtranslation, this.state.selectedword);
  }
  selectedword(word) {
    this.setState({
      selectedword: word
    });
  }
  render() {
    const Table = this.state.Vocabulary.map(word => {
      return (
        <tr key={word._id}>
          <td>{word.Word}</td>
          <td> - </td>
          <td>{word.Translation}</td>
          <td> - </td>
          <td>{word.From}</td>
          <td> - </td>
          <td>{word.To}</td>
          <td>
            <button
              className="btn btn-secondary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => this.selectedword(word)}
            >
              edit
            </button>{" "}
            <button
              className="btn btn-secondary"
              onClick={() => this.deleteword(word)}
            >
              remove
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <table className="table table-dark">
          <tbody>{Table}</tbody>
        </table>
        <Modal Word={this.state.selectedword} editword={this.editword} />
      </div>
    );
  }
}
export default Vocabulary;
