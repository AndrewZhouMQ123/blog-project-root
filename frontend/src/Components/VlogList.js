import React, { useState, useEffect } from "react";
import VlogDataService from "../Services/Vlog.service";
import { Link } from "react-router-dom";

const VlogsList = () => {
  const [vlogs, setVlogs] = useState([]);
  const [currentVlog, setCurrentVlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveVlogs();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const retrieveVlogs = () => {
    VlogDataService.getAll()
      .then((response) => {
        setVlogs(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
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

  const removeAllVlog = () => {
    VlogDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const performSearch = () => {
    setCurrentVlog(null);
    setCurrentIndex(-1);

    VlogDataService.findByTitle(searchTitle)
      .then((response) => {
        setVlogs(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderFileContent = () => {
    if (!currentVlog || !currentVlog.file) {
      return null;
    }

    const { fileFormat, data } = currentVlog.file;

    if (fileFormat && fileFormat.startsWith("image/")) {
      // Display image if it's an image type
      const imageUrl = `data:${fileFormat};base64,${Buffer.from(data).toString("base64")}`;
      return <img src={imageUrl} alt="Thumbnail" style={{ maxWidth: "100%", maxHeight: "150px", marginBottom: "10px" }} />;
    } else {
      // Display download link for other file types
      return (
        <a href={`data:${fileFormat};base64,${Buffer.from(data).toString("base64")}`} download="file">
          Download File
        </a>
      );
    }
  };

  return (
    <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={performSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Vlogs List</h4>

          <ul className="list-group">
            {vlogs &&
              vlogs.map((vlog, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveVlog(vlog, index)}
                  key={index}
                >
                  {vlog.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllVlog}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentVlog ? (
            <div>
              <h4>Vlog</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentVlog.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentVlog.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentVlog.status ? "Active" : "Pending"}
              </div>

              {/* Display file content */}
              {renderFileContent()}

              <Link
                to={"/vlogs/" + currentVlog.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Vlog...</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default VlogsList;