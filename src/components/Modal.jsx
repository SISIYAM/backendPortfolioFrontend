import React, { useState, useEffect } from "react";
import { assetsBaseUrl, fetchImageUrl, updateProject } from "../myConst";
import { toast } from "react-toastify";
import axios from "axios";

function Modal({ id, title, description, frontEnd, backEnd }) {
  const [backendFields, setBackendFields] = useState(backEnd);
  const [frontendFields, setFrontendFields] = useState(frontEnd);
  const [titleState, setTitle] = useState(title);
  const [descriptionState, setDescription] = useState(description);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState(null);

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    setFrontendFields(frontEnd);
    setBackendFields(backEnd);
  }, [title, description, frontEnd, backEnd]);

  // handle file upload
  const handleFileChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const addFrontend = () => {
    setFrontendFields([...frontendFields, ""]);
  };

  const addBackend = () => {
    setBackendFields([...backendFields, ""]);
  };

  const removeFrontend = (index) => {
    setFrontendFields(frontendFields.filter((_, i) => i !== index));
  };

  const removeBackend = (index) => {
    setBackendFields(backendFields.filter((_, i) => i !== index));
  };

  const handleFrontEndChange = (index, event) => {
    const newFields = [...frontendFields];
    newFields[index] = event.target.value;
    setFrontendFields(newFields);
  };

  const handleBackendChange = (index, event) => {
    const newFields = [...backendFields];
    newFields[index] = event.target.value;
    setBackendFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", titleState);
    formData.append("description", descriptionState);
    formData.append("frontEnd", JSON.stringify(frontendFields));
    formData.append("backEnd", JSON.stringify(backendFields));
    formData.append("status", true);

    newImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.put(`${updateProject}/${id}`, formData, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.errors);
      error.response.data.errors.forEach((element) => {
        toast.warn(element.msg);
      });
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [id]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${fetchImageUrl}/${id}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      if (response.data.success) {
        setImages(response.data.images);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Update
            </h5>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Close
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={id} />
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  value={titleState}
                  className="form-control"
                  placeholder="Project title"
                  onChange={handleTitle}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  className="form-control"
                  rows={4}
                  placeholder="Description"
                  value={descriptionState}
                  onChange={handleDescription}
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Front end languages</label>
                <br />
                <input
                  type="button"
                  value="Add more"
                  className="btn btn-primary btn-sm mb-2"
                  onClick={addFrontend}
                />
                {frontendFields.map((field, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter"
                      value={field}
                      onChange={(e) => handleFrontEndChange(index, e)}
                    />
                    <span
                      className="badge bg-danger m-2"
                      style={{ cursor: "pointer", color: "#fff" }}
                      onClick={() => removeFrontend(index)}
                    >
                      Remove
                    </span>
                    <br />
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label className="text-dark">Back end languages</label>
                <br />
                <input
                  type="button"
                  value="Add more"
                  className="btn btn-primary btn-sm mb-2"
                  onClick={addBackend}
                />
                {backendFields.map((field, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter"
                      value={field}
                      onChange={(e) => handleBackendChange(index, e)}
                    />
                    <span
                      className="badge bg-danger m-2"
                      style={{ cursor: "pointer", color: "#fff" }}
                      onClick={() => removeBackend(index)}
                    >
                      Remove
                    </span>
                    <br />
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label className="text-dark">Upload Images</label>
                <input
                  type="file"
                  multiple
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                {images.length > 0 ? (
                  images.map((res, i) => {
                    return (
                      <>
                        <img
                          style={{
                            height: "70px",
                            width: "175px",
                            border: "1px solid #000000",
                          }}
                          key={i}
                          src={`${assetsBaseUrl}/${res.path}`}
                          alt={`....${i}`}
                        />{" "}
                        <br />
                        <br />
                      </>
                    );
                  })
                ) : (
                  <p className="text-dark">No images found</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
