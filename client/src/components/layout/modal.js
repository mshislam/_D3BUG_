import React, { Component } from "react";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.editword = this.editword.bind(this);
    this.state = {
      Word: this.props,
      newtranslation: this.props
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      Word: nextProps.Word,
      newtranslation: nextProps.Word.Translation
    });
  }

  newtranslationHandler(e) {
    this.setState({ newtranslation: e.target.value });
  }

  editword() {
    this.props.editword(this.state.newtranslation);
  }

  render() {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Translation
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <span className="modal-lable">Word:</span>
                <input value={this.state.Word.Word} readOnly />
              </p>
              <p>
                <span className="modal-lable">Translation:</span>
                <input
                  value={this.state.newtranslation}
                  onChange={e => this.newtranslationHandler(e)}
                />
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  this.editword();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
