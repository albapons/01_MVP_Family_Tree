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
    });
  }, [id]);

  return (
    <div className=" container d-flex justify-content-center align-items-center my-4">
      <div>
        {person && (
          <div>
            <div className="row d-flex justify-content-center">
              <div className="col">
                <i className="fas fa-user text-warning my-2 fa-5x"></i>
                <p className="my-2">
                  {" "}
                  {person.firstName} {person.lastName}
                </p>
              </div>
            </div>

            {person.parents?.length && (
              <div className="row d-flex justify-content-center">
                {person.parents[0] && (
                  <div className="col">
                    <i className="fas fa-user text-warning my-2 fa-5x "></i>
                    <p className="my-2">
                      {person.parents[0].firstName} {person.parents[0].lastName}
                    </p>
                  </div>
                )}
                {person.parents[1] && (
                  <div className="col">
                    <i className="fas fa-user text-warning my-2 fa-5x"></i>
                    <p className="my-2">
                      {person.parents[1]?.firstName}{" "}
                      {person.parents[1]?.lastName}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {person && (
          <div className="card my-4 my-4">
            <div className="card-body my-2 my-2">
              <p>
                <i className="fas fa-user text-warning mx-2"></i>
                Me: {person.firstName} {person.lastName}
              </p>
              {person.parents?.length && (
                <div>
                  {person.parents[0] && (
                    <p>
                      <i className="fas fa-user text-warning mx-2"></i>
                      Progenitor 1: {person.parents[0].firstName}{" "}
                      {person.parents[0].lastName}
                    </p>
                  )}
                  {person.parents[1] && (
                    <p>
                      <i className="fas fa-user text-warning mx-2"></i>
                      Progenitor 2: {person.parents[1]?.firstName}{" "}
                      {person.parents[1]?.lastName}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
