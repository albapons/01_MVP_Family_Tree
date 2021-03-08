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
    <div className="d-flex justify-content-center align-items-center my-4">
      <div>
        {person && (
          <div>
            {!!person.parents?.length && (
              <div className="d-flex flex-row justify-content-between my-4">
                {person.parents[0] && (
                  <div className="d-flex flex-column text-center my-4">
                    <i className="fas fa-user text-warning my-2 fa-5x "></i>
                    <p className="my-2">
                      {person.parents[0].firstName} {person.parents[0].lastName}
                    </p>
                  </div>
                )}
                {person.parents[1] && (
                  <div className="d-flex flex-column text-center my-4">
                    <i className="fas fa-user text-warning text-center my-2 fa-5x"></i>
                    <p className="my-2">
                      {person.parents[1]?.firstName}{" "}
                      {person.parents[1]?.lastName}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="d-flex flex-row d-flex justify-content-center my-4">
              <div className="d-flex flex-column text-center">
                <i className="fas fa-user text-danger my-2 fa-5x"></i>
                <p className="my-2  text-center">
                  {" "}
                  {person.firstName} {person.lastName}
                </p>
              </div>
            </div>
          </div>
        )}

        {person && (
          <div className="card my-4 my-4">
            <div className="card-body my-2 my-2">
              {!!person.parents?.length && (
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
                      <i className="fas fa-user text-warning mx-2 "></i>
                      Progenitor 2: {person.parents[1]?.firstName}{" "}
                      {person.parents[1]?.lastName}
                    </p>
                  )}
                </div>
              )}
              <p>
                <i className="fas fa-user text-danger mx-2"></i>
                Me: {person.firstName} {person.lastName}
              </p>
              {!person.parents?.length && (
                <p>
                  <i className="fas fa-exclamation text-warning mx-2"></i>
                  No progenitors assigned
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
