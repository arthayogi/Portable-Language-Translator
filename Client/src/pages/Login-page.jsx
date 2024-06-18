import axios from "axios";
import Swal from "sweetalert2"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login_page() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleCredentialResponse(response) {
      try {
        const { data } = await axios({
          method: "POST",
          url: "http://18.141.138.126/google-login",
          headers:{
            google_token: response.credential
          }
        })
        localStorage.access_token = data.access_token;
        console.log(data.access_token);
        navigate("/menu");
      } catch (error) {
        console.log(error);
      }
    }


    function googleLogin () {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }

    useEffect(()=>{
      googleLogin()
    })
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
        const { data } = await axios({
          method: "POST",
          url: "http://18.141.138.126/login",
          data: {
            email,
            password
          }
        })
        Swal.fire({
          title: "Sukses login",
          icon: "success"
      })
      localStorage.access_token = data.access_token;
      console.log(data.access_token);
      navigate("/menu");
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
            <h3>Portable Travel Translator</h3>
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
                Sign in
              </button>
            </div>
          </div>
          {/* Register buttons */}
          <div className="text-center">
            <p>
              Belum terdaftar?
              <Link
                to={"/register"}
              >Daftar Sekarang</Link>
            </p>
            <p>atau daftar dengan:</p>
          </div>
            <div id="buttonDiv"></div>
        </form>
      </div>
    </>
  );
}
