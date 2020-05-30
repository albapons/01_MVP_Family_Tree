import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function Tree() {
  //coming from the family list
  let { id } = useParams();
  let [person, setPerson] = useState({});

  useEffect(() => {
    api.getFamily(id).then((response) => {
      //This line sets the person to whatever comes through the api call
      setPerson(response);
      console.log(response);
    });
  }, [id]);

  return (
    <div className="d-flex justify-content-center align-items-center my-4"></div>
  );
}
