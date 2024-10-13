import React, { useState, useEffect } from "react";
import VlogDataService from "../../Services/Vlog.service";
import { Link } from "react-router-dom";

// Separate component for rendering the search bar
const SearchBar = ({ searchTitle, onChangeSearchTitle, onSearch }) => (
  <div className="input-group mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="Search by title"
      value={searchTitle}
      onChange={onChangeSearchTitle}
    />
    <div className="input-group-append">
      <button className="btn btn-outline-secondary" type="button" onClick={onSearch}>
        Search
      </button>
    </div>
  </div>
);

// Separate component for rendering the list of vlogs
const VlogList = ({ vlogs, currentIndex, setActiveVlog, removeAllVlogs }) => (
  <div className="col-md-6">
    <h4>Vlogs List</h4>
    <ul className="list-group">
      {vlogs && vlogs.map((vlog, index) => (
        <li
          key={index}
          className={`list-group-item ${index === currentIndex ? "active" : ""}`}
          onClick={() => setActiveVlog(vlog, index)}
        >
          {vlog.title}
        </li>
      ))}
    </ul>
    <button className="m-3 btn btn-sm btn-danger" onClick={removeAllVlogs}>
      Remove All
    </button>
  </div>
);

// Separate component for rendering the vlog details
const VlogDetails = ({ currentVlog }) => {
  if (!currentVlog) {
    return (
      <div>
        <br />
        <p>Please click on a Vlog...</p>
      </div>
    );
  }

  return (
    <div>
      <h4>Vlog</h4>
      <div><strong>Title:</strong> {currentVlog.title}</div>
      <div><strong>Description:</strong> {currentVlog.description}</div>
      <div><strong>Status:</strong> {currentVlog.status ? "Active" : "Pending"}</div>
      {/* Display file content */}
      {renderFileContent(currentVlog.file)}
      <Link to={`/vlogs/${currentVlog.id}`} className="badge badge-warning">
        Edit
      </Link>
    </div>
  );
};

// Function to render file content based on type
const renderFileContent = (file) => {
  if (!file) return null;

  const { fileFormat, data } = file;

  if (fileFormat && fileFormat.startsWith("image/")) {
    const imageUrl = `data:${fileFormat};base64,${Buffer.from(data).toString("base64")}`;
    return <img src={imageUrl} alt="Thumbnail" style={{ maxWidth: "100%", maxHeight: "150px", marginBottom: "10px" }} />;
  }

  return (
    <a href={`data:${fileFormat};base64,${Buffer.from(data).toString("base64")}`} download="file">
      Download File
    </a>
  );
};

const VlogsList = () => {
  const [vlogs, setVlogs] = useState([]);
  const [currentVlog, setCurrentVlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const retrieveVlogs = async () => {
      try {
        const response = await VlogDataService.getAll();
        setVlogs(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    retrieveVlogs();
  }, []);

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const refreshList = () => {
    retrieveVlogs();
    setCurrentVlog(null);
    setCurrentIndex(-1);
  };

  const setActiveVlog = (vlog, index) => {
    setCurrentVlog(vlog);
    setCurrentIndex(index);
  };

  const removeAllVlogs = async () => {
    try {
      await VlogDataService.deleteAll();
      refreshList();
    } catch (error) {
      console.log(error);
    }
  };

  const performSearch = async () => {
    setCurrentVlog(null);
    setCurrentIndex(-1);

    try {
      const response = await VlogDataService.findByTitle(searchTitle);
      setVlogs(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <SearchBar
          searchTitle={searchTitle}
          onChangeSearchTitle={onChangeSearchTitle}
          onSearch={performSearch}
        />
      </div>
      <VlogList
        vlogs={vlogs}
        currentIndex={currentIndex}
        setActiveVlog={setActiveVlog}
        removeAllVlogs={removeAllVlogs}
      />
      <div className="col-md-6">
        <VlogDetails currentVlog={currentVlog} />
      </div>
    </div>
  );
};

export default VlogsList;
