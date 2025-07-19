import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/api";

const ProfilePage = () => {
  const { user, token, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleEdit = () => {
    setEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEditing(false);
    setName(user.name);
    setPhone(user.phone);
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await updateProfile({ name, phone, token });
      updateUser(data.user);
      setSuccess("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200 text-center">
        <h2 className="text-2xl font-bold mb-2">Profile</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        {editing ? (
          <form onSubmit={handleSave} className="mb-6 space-y-4">
            <div>
              <label className="block text-left mb-1 font-semibold">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-left mb-1 font-semibold">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-2 justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition font-semibold disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-6">
            <p className="text-gray-700 font-semibold">Name: <span className="font-normal">{user.name}</span></p>
            <p className="text-gray-700 font-semibold">Email: <span className="font-normal">{user.email}</span></p>
            <p className="text-gray-700 font-semibold">Phone: <span className="font-normal">{user.phone}</span></p>
          </div>
        )}
        <button
          onClick={logout}
          className="mb-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>
        {!editing && (
          <button
            onClick={handleEdit}
            className="mb-8 px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
          >
            Edit Profile
          </button>
        )}
        <h3 className="text-lg font-semibold mb-2">Order History</h3>
        <div className="bg-gray-50 p-4 rounded-lg text-gray-500">No orders yet.</div>
      </div>
    </div>
  );
};

export default ProfilePage;
