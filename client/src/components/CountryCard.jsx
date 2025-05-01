import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FavoriteButton from "../components/FavouriteButton";
import { memo } from "react";
import { FaMapMarkerAlt, FaGlobeAmericas, FaUsers } from "react-icons/fa";

// CountryCard component to display country information
function CountryCard({ country, isFavorite }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-indigo-100 transition-all duration-300"
    >
      {/* Flag Image with Overlay */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={country.flags.svg || country.flags.png}
          alt={`${country.name.common} flag`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
            {country.name.common}
          </h2>
          <FavoriteButton 
            countryCode={country.cca3} 
            isFavorite={isFavorite}
            className="text-xl text-indigo-600 hover:text-indigo-800"
          />
        </div>

        {/* Country Details */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-indigo-500 mr-2 flex-shrink-0" />
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Capital:</span> {country.capital?.[0] || "N/A"}
            </p>
          </div>

          <div className="flex items-center">
            <FaGlobeAmericas className="text-indigo-500 mr-2 flex-shrink-0" />
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Region:</span> {country.region}
            </p>
          </div>

          <div className="flex items-center">
            <FaUsers className="text-indigo-500 mr-2 flex-shrink-0" />
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Population:</span> {country.population.toLocaleString()}
            </p>
          </div>
        </div>

        {/* View Details Button */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link 
            to={`/country/${country.cca3}`}
            className="block w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium text-center rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Explore Country
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default memo(CountryCard);