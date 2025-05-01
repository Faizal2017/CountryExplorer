import { useState, useEffect, useContext, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import CountryCard from "../components/CountryCard";
import Header from "../components/Header";
import useFetchCountries from "../Hooks/useFetchCountries";
import { AuthContext } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaGlobeAmericas, FaSearch, FaSpinner } from "react-icons/fa";

/// Main Home component
function Home() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const { countries, loading, error } = useFetchCountries(search, region, language);
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  // Fetch user favorites if logged in
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:5000/api/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorites(response.data);
        } catch (err) {
          console.error("Failed to fetch favorites:", err);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  // Memoize country list to prevent unnecessary re-renders
  const countryList = useMemo(() => countries, [countries]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <Header />
      <Toaster position="top-right" toastOptions={{
        style: {
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          color: '#1f2937',
        },
      }} />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-2">
            <FaGlobeAmericas className="text-indigo-600 text-5xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Discover Our World
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore countries, cultures, and fascinating facts from around the globe
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-stretch"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <SearchBar search={search} setSearch={setSearch} />
          <Filter
            label="Region"
            options={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
            value={region}
            onChange={setRegion}
          />
          <Filter
            label="Language"
            options={["English", "Spanish", "French", "German"]}
            value={language}
            onChange={setLanguage}
          />
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="text-indigo-600 mb-4"
            >
              <FaSpinner className="text-4xl" />
            </motion.div>
            <p className="text-gray-600 text-lg">Discovering countries...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
              <p className="font-medium">Error loading countries</p>
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        {/* Country Grid */}
        <AnimatePresence>
          {!loading && !error && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {countryList.map((country) => (
                <motion.div
                  key={country.cca3}
                  variants={item}
                  whileHover={{ 
                    y: -5,
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CountryCard
                    country={country}
                    isFavorite={favorites.includes(country.cca3)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && !error && countryList.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md">
              <FaSearch className="text-5xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No countries found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to discover more countries
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Home;