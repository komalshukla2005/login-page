import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://login-backend-mu.vercel.app/api/auth/dashboard", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) {
          setMessage(data.message);
        } else {
          toast.error("Unauthorized! Please login."); 
          navigate("/login", { replace: true });
        }
      } catch (error) {
        toast.error("Error fetching data!");
        navigate("/login", { replace: true });
      }
    };

    fetchData();
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch("https://login-backend-mu.vercel.app/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Logout successful!");
        navigate("/login", { replace: true });
        window.onpopstate = null; 
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      toast.error("Error logging out!");
    }
  };

  return (
    <div className="home-container">
      <h1>{message}</h1>
      <button
        onClick={handleLogout} className="logout-button ">
        Logout
      </button>
    </div>
  );
}

export default Home;