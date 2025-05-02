import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./AdminDashboard.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

const AdminDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [tenders, setTenders] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch all tenders
  const fetchTenders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tenders/", {
        headers: { Authorization: `Bearer ${(token)}` },
      });
      setTenders(response.data);
    } catch (error) {
      console.error("Error fetching tenders:", error.response?.data?.error || error);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/", {
        headers: { Authorization: `Bearer ${(token)}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data?.error || error);
    }
  };

  // Delete User
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${(token)}` },
      });

      // Update UI after deletion
      setUsers(users.filter((user) => user.id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error.response?.data?.error || error);
      alert("Failed to delete user.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchTenders();
      fetchUsers();
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        {/* Manage Tenders Section */}
        <div className="tenders-section">
          <h2>All Tenders</h2>
          <ul>
            {tenders.map((tender) => (
              <li key={tender.id} className="tender-item">
                <h3>{tender.title}</h3>
                <p>{tender.description}</p>
                <span>Status: {tender.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Manage Users Section */}
        <div className="users-section">
          <h2>Users Management</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
