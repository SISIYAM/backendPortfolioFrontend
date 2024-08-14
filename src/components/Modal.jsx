import React, { useState } from "react";
import { updateProject } from "../myConst";
import { toast } from "react-toastify";
import axios from "axios";

function Modal(props) {
  const [backendFields, setBackendFields] = useState(props.backEnd);
  const [frontendFields, setFrontendFields] = useState(props.frontEnd);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  // handle title
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  // handle description
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // handle add frontend function
  const addFrontend = () => {
    setFrontendFields([...frontendFields, ""]);
  };

  // handle add backend function
  const addBackend = () => {
    setBackendFields([...backendFields, ""]);
  };

  // handle remove front end button
  const removeFrontend = (index) => {
    const newFields = frontendFields.filter((_, i) => i != index);
    setFrontendFields(newFields);
  };
  // handle remove back end button
  const removeBackend = (index) => {
    const newFields = backendFields.filter((_, i) => i != index);
    setBackendFields(newFields);
  };

  // handle front end value
  const handleFrontEndChange = (index, event) => {
    const newFields = [...frontendFields];
    newFields[index] = event.target.value;
    setFrontendFields(newFields);
  };

  // handle backend value
  const handleBackendChange = (index, event) => {
    const newFields = [...backendFields];
    newFields[index] = event.target.value;
    setBackendFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      frontEnd: frontendFields,
      backEnd: backendFields,
    };

    try {
      const response = await axios.put(
        `${updateProject}/${e.target.id.value}`,
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      }

      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.errors);
      error.response.data.errors.forEach((element) => {
        toast.warn(element.msg);
      });
    }
  };

  return (
    <>
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
                className="btn-close border-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                x
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="id" value={props.id} />
              <div className="modal-body">
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    className="form-control input-rounded"
                    placeholder="Project title"
                    onChange={handleTitle}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    className="form-control"
                    rows={4}
                    id="comment"
                    value={description}
                    onChange={handleDescription}
                    placeholder="Description"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="" className="text-dark">
                    Front end languages
                  </label>
                  <br />
                  <input
                    type="button"
                    value="Add more"
                    className="btn btn-primary btn-sm mb-2"
                    onClick={addFrontend}
                  />
                  {frontendFields.map((field, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="text"
                          className="form-control input-rounded"
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
                    );
                  })}
                </div>

                <div className="form-group">
                  <label htmlFor="" className="text-dark">
                    Back end languages
                  </label>
                  <br />
                  <input
                    type="button"
                    value="Add more"
                    className="btn btn-primary btn-sm mb-2"
                    onClick={addBackend}
                  />
                  {backendFields.map((field, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="text"
                          className="form-control input-rounded"
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
                    );
                  })}
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

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Edit
      </button>
    </>
  );
}

export default Modal;
