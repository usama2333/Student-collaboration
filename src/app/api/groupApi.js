import axios from "axios";

export async function createGroup(name) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://localhost:5000/api/groups",
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function getGroups() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:5000/api/groups", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// groupApi.js
export const deleteGroup = async (groupId,toast) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error('No token found');
      // You can redirect the user to the login page or show an error message
      return;
    }
  try {
    const response = await axios.delete(`http://localhost:5000/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // Return response data
  } catch (error) {
    console.error('Error deleting group:', error);
    toast.success(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
    // throw new Error('Failed to delete group');
  }
};