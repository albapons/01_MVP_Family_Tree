export default {
  addPerson: async (person) => {
    let response = await fetch(`/family`, {
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
    let response = await fetch(`/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
};
