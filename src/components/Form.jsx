import React, { useEffect } from "react";
import { useAuth } from "../contex/AuthContex";
import { useNavigate } from "react-router-dom";

function Form() {
  const { verifyLoggedIn } = useAuth();
  const navigate = useNavigate();
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
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          {/* row */}
          <div className="row">
            <div className="col-xl-9">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Add new project</h4>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control input-rounded"
                          placeholder="Project title"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
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
                        <input
                          type="text"
                          className="form-control input-rounded"
                          placeholder="Enter"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="" className="text-dark">
                          Back end languages
                        </label>
                        <input
                          type="text"
                          className="form-control input-rounded"
                          placeholder="Enter"
                        />
                      </div>
                      <button className="btn btn-primary">Save</button>
                    </form>
                  </div>
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
