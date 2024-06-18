import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function Register_page() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleEmailInput(event) {
    setEmail(event.target.value)
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value)
  }

  

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      email,
      password
    }

    try {
            await axios({
            method: "POST",
            url: "http://18.141.138.126/register",
            data: {
              email,
              password
            }
        })
        Swal.fire({
            title: "Sukses registrasi",
            icon: "success"
        })
        navigate("/login")
    } catch (error) {
        console.log(error);
        Swal.fire({
            text: error.response.data.message,
            icon: "error"
        })
    }
  }

  return (
    <>
      <div className="container py-5 ">
        <div className="container">
          <div className="row d-flex justify-content-center text-center mb-6">
            <h3>Register</h3>
          </div>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div data-mdb-input-init="" className="form-outline mb-6">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <input
                  type="email"
                  id="form2Example1"
                  className="form-control"
                  onChange={handleEmailInput}
                />
                <label className="form-label" htmlFor="form2Example1">
                  Email address
                </label>
              </div>
            </div>
          </div>
          {/* Password input */}
          <div data-mdb-input-init="" className="form-outline mb-4">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <input
                  type="password"
                  id="form2Example1"
                  className="form-control"
                  onChange={handlePasswordInput}
                />
                <label className="form-label" htmlFor="form2Example1">
                  Password
                </label>
              </div>
            </div>
          </div>
          {/* Submit button */}
          <div className="container">
            <div className="row d-flex justify-content-center col-5 mx-auto">
              <button
                type="submit"
                data-mdb-button-init=""
                data-mdb-ripple-init=""
                className="btn btn-danger btn-block mb-4"
              >
                Sign Up
              </button>
              <Link
                to={"/login"}
              >Kembali ke login</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
