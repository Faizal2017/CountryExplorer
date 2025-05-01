import { useState } from "react";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


// Filter component for selecting options
function Filter({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="w-full md:w-60 relative "
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile toggle button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="md:hidden w-full p-4 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 shadow-sm hover:shadow-md mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-700">
          {value || `Select ${label}`}
        </span>
        {isOpen ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </motion.button>

      {/* Filter dropdown */}
      <AnimatePresence>
        {(isOpen || !isOpen) && (
          <motion.div
            className={`${isOpen ? "block" : "hidden"} md:block`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: { duration: 0.3 }
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label className="hidden md:block mb-2 text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="relative">
              <select
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  setIsOpen(false);
                }}
                className="w-full p-3 pl-4 pr-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300 bg-white appearance-none cursor-pointer text-gray-700 font-medium"
              >
                <option value="">All {label}s</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <FaChevronDown className="text-gray-500 text-sm" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected value indicator for desktop */}
      {value && (
        <motion.div 
          className="hidden md:flex items-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            {value}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Filter;