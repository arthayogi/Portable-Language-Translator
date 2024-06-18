import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import talkifyServiceJP from "../components/talkifyService_JP";

export default function TLJP_Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const TextToSpeech = () => {
    const [text, setText] = useState("");
    const [audioUrl, setAudioUrl] = useState(null);

    const handleTextChange = (event) => {
      setText(event.target.value);
    };

    const handleSpeak = async () => {
      const url = await talkifyServiceJP.getSpeechUrl(text);
      setAudioUrl(url);
    };
  };

  function handleTextInput(event) {
    setInput(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      input,
    };

    try {
      const { data } = await axios({
        method: "POST",
        url: "http://18.141.138.126/translate-jp",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
        data: {
          input,
        },
      });
      setOutput(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(output);

  useEffect(() => {
    setOutput;
  }, []);

  return (
    <>
      <div className="container py-5 ">
        <div className="container">
          <div className="row d-flex justify-content-center text-center mb-6">
            <h3>Japanese Translator</h3>
          </div>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          {/* Text input */}
          <div data-mdb-input-init="" className="form-outline mb-6">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <input
                  type="text"
                  id="form2Example1"
                  className="form-control"
                  onChange={handleTextInput}
                />
                <label className="form-label" htmlFor="form2Example1">
                  Masukkan teks yang ingin anda translasi
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
                Terjemahkan
              </button>
              <br />

              {/* Text output */}
              <div data-mdb-input-init="" className="form-outline mb-6">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <h5>{output}</h5>
                  </div>
                </div>
              </div>
              <br />
              {/* <TextToSpeech text={output} /> */}
              <button
                type="submit"
                data-mdb-button-init=""
                data-mdb-ripple-init=""
                className="btn btn-danger btn-block mb-4"
                // onClick={handleSpeak}
              >
                Teks suara
              </button>
              {/* {audioUrl && (
                <div>
                  <h2>Audio:</h2>
                  <audio controls src={audioUrl} />
                </div> */}
              {/* )} */}

              <Link to={"/menu"}>Kembali ke menu</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
