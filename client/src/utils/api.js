const apiRoot = "/family";

export default {
  addPerson: async (person) => {
    let response = await fetch(apiRoot, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: person.firstName,
        lastName: person.lastName,
        progenitor_1: person.progenitor_1,
        progenitor_2: person.progenitor_2,
      }),
    });
    return response.json();
  },

  deletePerson: async (id) => {
    let response = await fetch(`${apiRoot}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },

  getFamily: async (id) => {
    let response = await fetch(`${apiRoot}/${id}`);

    return response.json();
  },
};
