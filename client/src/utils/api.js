export default {
  getStudents: async () => {
    let response = await fetch(`/students`);

    return response.json();
  },

  deleteStudent: async (id) => {
    let response = await fetch(`/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    return response.json();
  },

  getStudent: async (id) => {
    let response = await fetch(`/students/${id}`);

    return response.json();
  },

  addStudent: async (student) => {
    let response = await fetch(`/students`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(student),
    });

    return response.json();
  },
};
