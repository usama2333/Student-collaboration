import axios from "axios";

// API to fetch users data
export default async function getUsersApi({ setUsers }) {
  try {
    const response = await axios.get("http://'+process.env.NEXT_PUBLIC_API_URL+':5000/api/users"); // Use GET method

    if (response.status === 200) {
      setUsers(response.data.users); // Update the state with fetched users
    }
  } catch (error) {
    console.error("Error fetching users:", error.message); // Error handling
  }
}
