import { FaSearch, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/// SearchBar component for searching countries
function SearchBar({ search, setSearch }) {
  const handleClear = () => {
    setSearch("");
  };

  return (
    <motion.div 
      className="relative w-full md:w-96"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative mt-5">
        <input
          type="text"
          placeholder="Search countries by name, region, or language..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 text-gray-700 font-medium"
        />
        
        <motion.div 
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSearch className="text-gray-500 text-lg" />
        </motion.div>
        
        <AnimatePresence>
          {search && (
            <motion.button
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <div className="p-1 rounded-full">
                <FaTimes className="text-gray-500 hover:text-gray-700" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      {/* Micro-interaction for search state */}
      {search && (
        <motion.p 
          className="text-sm text-gray-500 mt-2 ml-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Searching for: <span className="font-medium text-purple-600">{search}</span>
        </motion.p>
      )}
    </motion.div>
  );
}

export default SearchBar;