import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else setusername(localStorage.getItem("username"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-brown-700 mb-4">
          Welcome, {username}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-brown-600 text-white px-6 py-2 rounded-md hover:bg-brown-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
