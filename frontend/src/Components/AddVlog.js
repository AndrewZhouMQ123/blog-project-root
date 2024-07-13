import React, { Component } from "react";
import VlogDataService from "../Services/Vlog.service";

export default class AddVlog extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveVlog = this.saveVlog.bind(this);
    this.newVlog = this.newVlog.bind(this);
    this.selectFile = this.selectFile.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      selectedFiles: undefined,
      currentFile: undefined,
      uploaded: false,
      message: "",
      submitted: false
    };
  }

  // a vlog has title, description, file

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  selectFile(e) {
    this.setState({
      selectedFiles: e.target.files,
    },
    () => console.log(this.state.selectedFiles));
  }

  saveVlog() {

    const { selectedFiles } = this.state;

    // Check if there are selected files, and use the first one if available
    const file = selectedFiles && selectedFiles.length > 0 ? selectedFiles[0] : null;

    VlogDataService.create(this.state.title, this.state.description, file)
      .then(response => {
        this.setState({
          submitted: response.data.submitted,
          uploaded: response.data.uploaded, // Adjust according to your response structure
          message: response.data.message // Adjust according to your response structure
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        //console.log(e.response.data)
        this.setState({
          uploaded: false,
          message: "Upload failed. Please try again."
        });
      });
  }

  messageClass(uploaded) {
    if (uploaded === true) {
        return "successMessage";          
    } else {
        return "errorMessage"
    }
  }

  newVlog() {
    this.setState({
      id: null,
      title: "",
      description: "",
      selectedFiles: undefined,
      currentFile: undefined,
      uploaded: false,
      message: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newVlog}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div>
              <h4 className = {`${this.messageClass(this.state.uploaded)}`}> {this.state.message} </h4>
              <input
              type="file"
              name="file"
              onChange={this.selectFile}
              />
            </div>

            <button onClick={this.saveVlog} className="btn btn-success">
                Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}