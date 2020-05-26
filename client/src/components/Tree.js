import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function Tree() {
  let { id } = useParams();
  let [person, setPerson] = useState({});

  useEffect(() => {
    api.getFamily(id).then((response) => {
      setPerson(response);
      console.log(response);
      console.log(person);
    });
  }, [id]);

  return (
    <div className=" container d-flex justify-content-center align-items-center my-4">
      <div>
        {person && (
          <div>
            <p>
              <i className="fas fa-user text-warning mx-2"></i>
              Me: {person.firstName} {person.lastName}
            </p>
            {person.parents && (
              <div>
                <p>
                  <i className="fas fa-user text-warning mx-2"></i>
                  Progenitor 1:
                  {person.parents[0].firstName}
                  {person.parents[0].lastName}
                </p>
                <p>
                  <i className="fas fa-user text-warning mx-2"></i>
                  Progenitor 2:
                  {person.parents[1].firstName}
                  {person.parents[1].lastName}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* <div className="row col-12 my-4">
        <i className="fas fa-user fa-5x text-warning"></i>
        <div className="row my-4"></div>
        <div className="row col-6">
          <i className="fas fa-user fa-5x text-warning"></i>
        </div>
        <div className="row col-6">
          <i className="fas fa-user fa-5x text-warning"></i>
        </div>
      </div> */}
    </div>
  );
}
