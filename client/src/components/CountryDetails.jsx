import FavoriteButton from "../components/FavouriteButton";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaGlobeAmericas, FaUsers, FaLanguage } from "react-icons/fa";


// CountryDetails component to display detailed information about a country
function CountryDetails({ country, isFavorite }) {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row gap-0 md:gap-8">
        {/* Flag Image */}
        <motion.div 
          className="relative w-full md:w-1/2 h-64 md:h-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={country.flags.svg || country.flags.png}
            alt={`${country.name.common} flag`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Details */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                {country.name.common}
              </h1>
              {country.name.official !== country.name.common && (
                <p className="text-gray-500 italic">{country.name.official}</p>
              )}
            </div>
            <FavoriteButton 
              countryCode={country.cca3} 
              isFavorite={isFavorite} 
              className="text-2xl"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Capital</h3>
                <p className="text-gray-700">{country.capital?.[0] || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaGlobeAmericas className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Region</h3>
                <p className="text-gray-700">{country.region} {country.subregion && `(${country.subregion})`}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaUsers className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Population</h3>
                <p className="text-gray-700">{country.population.toLocaleString()}</p>
              </div>
            </div>

            {country.languages && (
              <div className="flex items-start">
                <FaLanguage className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Languages</h3>
                  <p className="text-gray-700">{Object.values(country.languages).join(", ")}</p>
                </div>
              </div>
            )}

            {country.currencies && (
              <div className="flex items-start">
                <svg className="text-yellow-500 mt-1 mr-3 flex-shrink-0 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Currency</h3>
                  <p className="text-gray-700">
                    {Object.values(country.currencies).map(c => `${c.name} (${c.symbol || '—'})`).join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CountryDetails;