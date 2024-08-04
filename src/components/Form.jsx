import React, { useEffect, useState } from "react";
import { useAuth } from "../contex/AuthContex";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addProjectUrl } from "../myConst";
import Navbar from "../components/Navbar/Navbar";
import { toast } from "react-toastify";

function Form() {
  const { verifyLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [backendFields, setBackendFields] = useState([]);
  const [frontendFields, setFrontendFields] = useState([]);
  const [images, setImages] = useState([]);

  // verify user login
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await verifyLoggedIn();
        console.log("Is logged in:", isLoggedIn);
        if (!isLoggedIn) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error.message);
      }
    };

    checkLoginStatus();
  }, []);

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

  // handle file upload
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  // handle from submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = {
    //   title: e.target.title.value,
    //   description: e.target.description.value,
    //   frontEnd: frontendFields,
    //   backEnd: backendFields,
    // };

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("frontEnd", JSON.stringify(frontendFields));
    formData.append("backEnd", JSON.stringify(backendFields));

    // Append each image file to formData
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      const response = await axios.post(addProjectUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      }
      // Reset form fields
      e.target.reset();
      setFrontendFields([]);
      setBackendFields([]);
      setImages([]);

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
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Add new project</h4>
              </div>
              <div className="card-body">
                <div className="basic-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        className="form-control input-rounded"
                        placeholder="Project title"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="description"
                        className="form-control"
                        rows={4}
                        id="comment"
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
                    <div className="form-group">
                      <label htmlFor="" className="text-dark">
                        Upload Images
                      </label>
                      <input
                        type="file"
                        multiple
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
