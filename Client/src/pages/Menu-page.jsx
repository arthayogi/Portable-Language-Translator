import { Link, useNavigate } from "react-router-dom";

export default function Menu_Page() {

  const navigate = useNavigate()

  return (
    <>
      <div className="container py-5 ">
        <div className="container">
          <div className="row d-flex justify-content-center text-center mb-6">
            <h3>Pilih menu translasi</h3>
          </div>
        </div>
        <br />
        {/* Submit button */}
        <div className="container">
          <div className="row d-flex justify-content-center col-5 mx-auto">
            <Link to={"/translate-jp"}>
            <button
              type="button"
              data-mdb-button-init=""
              data-mdb-ripple-init=""
              className="btn btn-danger btn-block mb-4"
            >
              Terjemahan ke Jepang
            </button>
            </Link>
          </div>
          <div className="row d-flex justify-content-center col-5 mx-auto">
          <Link to={"/translate-en"}>
            <button
              type="button"
              data-mdb-button-init=""
              data-mdb-ripple-init=""
              className="btn btn-danger btn-block mb-4"
            >
              Terjemahan ke English
            </button>
            </Link>
          </div>
          <div className="row d-flex justify-content-center col-5 mx-auto">
          <Link to={"/translate-kr"}>
            <button
              type="button"
              data-mdb-button-init=""
              data-mdb-ripple-init=""
              className="btn btn-danger btn-block mb-4"
            >
              Terjemahan ke Korea
            </button>
            </Link>

            <br />
            <br />

            {/* <Link
              to={"/login"}
              onClick={() => {
                localStorage.clear(),
              }}
              className="btn btn-primary btn-block mb-4"
            >
              Logout
            </Link> */}

          </div>
        </div>
      </div>
    </>
  );
}
