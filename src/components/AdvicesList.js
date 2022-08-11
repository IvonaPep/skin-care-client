import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function AdvicesList() {
  const [advices, setAdvices] = useState([]);

  useEffect(() => {
    fetchAdvices();
  }, []);

  const fetchAdvices = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `/advices`)
      .then((response) => {
        setAdvices(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>List of Advices</h1>
      <button className="btn btn-light my-4">
        <Link className="link" to={`/advices/create`}>
          Add new advice
        </Link>
      </button>
      <div className="container">
        <div className="row justify-content-center">
          {advices.map((advice) => {
            return (
              <div className="card-deck col-10 col-md-6 lg-5 d-flex">
                <div className="card text-center shadow-lg p-4 m-4 w-100">
                  <div key={advice._id} className="advices">
                    <div className="card-header">
                      <h3>{advice.title}</h3>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{advice.problemDescription}</p>
                      <Link
                        to={`/advices/${advice._id}`}
                        className="btn btn-light btn-sm"
                      >
                        See advice
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdvicesList;
