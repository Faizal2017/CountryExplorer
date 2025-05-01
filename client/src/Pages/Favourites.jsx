import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import CountryCard from "../components/CountryCard";
import { AuthContext } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
import { getCountryByCode } from "../utils/api";
import { motion } from "framer-motion";

// Page to display user's favorite countries
function Favorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch favorite countries
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setError("Please login to view favorites");
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
        const countryData = await Promise.all(
          response.data.map((code) => getCountryByCode(code))
        );
        setCountries(countryData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch favorites");
        setLoading(false);
      }
    };
    fetchFavorites(); // Fetch favorites on mount
  }, [user]);

  if (loading) return (
    <div className="spinner">
      <img src="/spinner.gif" alt="Loading" className="h-16" />
    </div>
  );
  if (error) return (
    <p className="text-center text-red-600 bg-red-100 p-4 rounded-2xl">{error}</p>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100"
    >
      <Header />
      <Toaster position="top-right" />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Your Favorite Countries
        </h1>
        {countries.length === 0 ? (
          <p className="text-center text-gray-600">No favorite countries yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                isFavorite={favorites.includes(country.cca3)}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Favorites;