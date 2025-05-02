import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getCountryByCode } from "../utils/api";
import Header from "../components/Header";
import CountryDetails from "../components/CountryDetails";
import { AuthContext } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
import { FaArrowLeft, FaGlobeAmericas, FaMapMarkerAlt, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// CountryPage component to display country details and favorite status
function CountryPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  // Fetching the backend URL from environment variables
  const backUrul = import.meta.env.VITE_AUTH_API_URL


  // Fetch country details and favorite status
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        setCountry(data);
        if (user) {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${backUrul}/api/favorites`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsFavorite(response.data.includes(code));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry(); // Fetch country details
  }, [code, user]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="inline-block mb-6"
        >
          <FaGlobeAmericas className="h-20 w-20 text-emerald-400" />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-slate-300 font-medium text-lg tracking-wider"
        >
          DISCOVERING {code.toUpperCase()}...
        </motion.p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 border border-slate-700 shadow-2xl rounded-2xl p-8 max-w-md w-full"
      >
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-red-900/50">
          <span className="text-red-400 text-4xl">!</span>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-3">Exploration Halted</h2>
        <p className="text-center text-red-300 bg-slate-700/50 p-4 rounded-xl border border-slate-600 mb-6">{error}</p>
        <Link 
          to="/" 
          className="flex items-center justify-center py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-all duration-300 group"
        >
          <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
          Return to Safety
        </Link>
      </motion.div>
    </div>
  );

  const toggleFavorite = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/favorites/${code}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(
          "http://localhost:5000/api/favorites",
          { countryCode: code },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Failed to update favorite:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-slate-900 text-white"
    >
      <Header />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            padding: '16px 24px',
          },
        }}
      />
      
      {country && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[60vh] min-h-[500px] overflow-hidden"
        >
          {/* Flag background with parallax effect */}
          {country.flags && (
            <motion.div 
              className="absolute inset-0 z-0"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <img 
                src={country.flags.svg || country.flags.png} 
                alt={`${country.name.common} flag`}
                className="w-full h-full object-cover"
                onLoad={() => setIsHeroLoaded(true)}
                style={{
                  filter: 'brightness(0.4) saturate(1.5) contrast(1.1)',
                  opacity: isHeroLoaded ? 1 : 0,
                  transition: 'opacity 1s ease'
                }}
              />
            </motion.div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30"></div>
          
          {/* Content */}
          <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-end pb-40">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight">
                    {country.name.common}
                  </h1>
                  {country.name.official !== country.name.common && (
                    <p className="text-slate-300 text-xl md:text-2xl font-light mb-6">
                      {country.name.official}
                    </p>
                  )}
                </div>
                
                {user && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFavorite}
                    className="p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:bg-emerald-600/30 hover:border-emerald-400 transition-all"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? (
                      <FaBookmark className="text-emerald-400 text-2xl" />
                    ) : (
                      <FaRegBookmark className="text-slate-300 text-2xl hover:text-emerald-400" />
                    )}
                  </motion.button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                {country.capital && (
                  <div className="flex items-center bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700">
                    <FaMapMarkerAlt className="text-emerald-400 mr-2" />
                    <span>{country.capital[0]}</span>
                  </div>
                )}
                {country.region && (
                  <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700">
                    {country.region}
                  </div>
                )}
                {country.population && (
                  <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700">
                    {new Intl.NumberFormat().format(country.population)} people
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      <div className="container mx-auto px-6 -mt-20 relative z-30 ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 mb-1"
        >
          <CountryDetails country={country} isFavorite={isFavorite} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center"
        >
          <Link 
            to="/" 
            className="inline-flex items-center mt-5 mb-5 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-600 hover:to-purple-800 text-white font-medium transition-all duration-300 group shadow-lg hover:shadow-xl"
          >
            <FaArrowLeft className="mr-3 transition-transform group-hover:-translate-x-1" />
            <span>Back to Exploration</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CountryPage;