import React, { Component } from "react";
import VlogDataService from "../../Services/Vlog.service";
import './VlogCreate.css'; // Import the CSS file for styling

export default class VlogCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      errors: {},
      titleCharCount: 100, // Max title characters
      descriptionCharCount: 2500 // Max description characters
    };
  }

  onChangeTitle = (e) => {
    const title = e.target.value;
    this.setState({ 
      title,
      titleCharCount: 100 - title.length // Update remaining characters
    });
  };

  onChangeDescription = (e) => {
    const description = e.target.value;
    this.setState({ 
      description,
      descriptionCharCount: 2500 - description.length // Update remaining characters
    });
  };

  onChangeVideoUrl = (e) => {
    this.setState({ videoUrl: e.target.value });
  };

  onChangeThumbnailUrl = (e) => {
    this.setState({ thumbnailUrl: e.target.value });
  };

  validateInputs = () => {
    const { title, description, videoUrl } = this.state;
    const errors = {};
    let isValid = true;

    // Validate title
    if (!title || title.length > 100) {
      errors.title = "Title is required and must not exceed 100 characters.";
      isValid = false;
    }

    // Validate description
    if (!description || description.length > 2500) {
      errors.description = "Description is required and must not exceed 2500 characters.";
      isValid = false;
    }

    // Validate video URL
    if (!videoUrl || !/^https?:\/\//.test(videoUrl)) {
      errors.videoUrl = "A valid video URL is required.";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  saveVlog = () => {
    if (!this.validateInputs()) {
      return; // Stop execution if validation fails
    }

    const { title, description, videoUrl, thumbnailUrl } = this.state;

    VlogDataService.create(title, description, videoUrl, thumbnailUrl)
      .then((response) => {
        console.log("Vlog created successfully:", response.data);
        this.newVlog(); // Reset form after successful creation
      })
      .catch((e) => {
        console.error("Upload failed:", e);
      });
  };

  newVlog = () => {
    this.setState({
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      errors: {}, // Reset errors after submitting
      titleCharCount: 100,
      descriptionCharCount: 2500
    });
  };

  render() {
    const { title, description, videoUrl, thumbnailUrl, errors, titleCharCount, descriptionCharCount } = this.state;

    const isSubmitDisabled = title.length > 100 || description.length > 2500; // Disable submit button if limits exceeded

    return (
      <div className="submit-form">
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={this.onChangeTitle}
              name="title"
            />
            {errors.title && <small className="text-danger">{errors.title}</small>}
            <small 
              className={`char-count ${titleCharCount < 10 ? 'low' : ''}`}
            >
              {titleCharCount} characters remaining
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              required
              value={description}
              onChange={this.onChangeDescription}
              name="description"
            />
            {errors.description && <small className="text-danger">{errors.description}</small>}
            <small 
              className={`char-count ${descriptionCharCount < 100 ? 'low' : ''}`}
            >
              {descriptionCharCount} characters remaining
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="videoUrl">Video URL</label>
            <input
              type="text"
              className="form-control"
              id="videoUrl"
              required
              value={videoUrl}
              onChange={this.onChangeVideoUrl}
              name="videoUrl"
            />
            {errors.videoUrl && <small className="text-danger">{errors.videoUrl}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="thumbnailUrl">Thumbnail URL</label>
            <input
              type="text"
              className="form-control"
              id="thumbnailUrl"
              value={thumbnailUrl}
              onChange={this.onChangeThumbnailUrl}
              name="thumbnailUrl"
            />
          </div>

          <button 
            onClick={this.saveVlog} 
            className="btn btn-success" 
            disabled={isSubmitDisabled} // Disable button when limits exceeded
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
