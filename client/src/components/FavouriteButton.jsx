import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

// Button to toggle favorite status
function FavoriteButton({ countryCode, isFavorite }) {
  const { user } = useContext(AuthContext);
  const [favorited, setFavorited] = useState(isFavorite);

  // Get the backend URL from environment variables
  const backUrul = import.meta.env.VITE_AUTH_API_URL;

  // Function to toggle favorite status
  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please login to favorite countries");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (favorited) {
        await axios.post(
          `${backUrul}/api/favorites/remove`,
          { countryCode },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Removed from favorites");
      } else {
        await axios.post(
          `${backUrul}/api/favorites/add`,
          { countryCode },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Added to favorites");
      }
      setFavorited(!favorited);
    } catch (err) {
      toast.error("Failed to update favorites");
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full ${
        favorited ? "text-red-500" : "text-gray-400"
      } hover:text-red-600 transition-colors duration-200`}
    >
      <FaHeart size={24} />
    </button>
  );
}

export default FavoriteButton;
