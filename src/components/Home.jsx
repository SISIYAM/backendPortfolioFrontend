import React, { useEffect, useState } from "react";
import { useAuth } from "../contex/AuthContex";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../assets/style.css";
import axios from "axios";
import { fetchProjects } from "../myConst";
import Modal from "./Modal";

function Home() {
  const { verifyLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await verifyLoggedIn();
        if (!isLoggedIn) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error.message);
      }
    };

    checkLoginStatus();
  }, [navigate, verifyLoggedIn]);

  useEffect(() => {
    handleApi();
  }, [projects]);

  const handleApi = async () => {
    try {
      const response = await axios.get(fetchProjects, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      if (response.data) {
        setProjects(response.data.allProjects);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // handle btn click
  const handleClick = (project) => {
    setSelectedProject(project);
    // bootstrap modal
    const modal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    modal.show();
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
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col" colSpan={2}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((res, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{res.title}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleClick(res)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger btn-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <Modal
          id={selectedProject._id}
          title={selectedProject.title}
          description={selectedProject.description}
          frontEnd={selectedProject.frontEnd}
          backEnd={selectedProject.backEnd}
        />
      )}
    </>
  );
}

export default Home;
