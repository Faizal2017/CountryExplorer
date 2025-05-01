import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaGlobeAmericas, FaHeart, FaUser, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Sidebar component with navigation links
function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useContext(AuthContext);

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-indigo-700 to-purple-800 shadow-2xl z-50 md:block ${
          isOpen ? "block" : "hidden md:block"
        }`} // Always visible on desktop, toggleable on mobile
      >
        <div className="p-6">
          {/* Sidebar Header */}
          <div className="flex items-center space-x-3 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"
            >
              <FaGlobeAmericas className="text-white text-2xl" />
            </motion.div>
            <span className="text-xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-100">
              CountryExplorer
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <motion.div variants={itemVariants}>
              <Link
                to="/"
                className="flex items-center space-x-3 text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <FaGlobeAmericas />
                <span>Home</span>
              </Link>
            </motion.div>
            {user && (
              <motion.div variants={itemVariants}>
                <Link
                  to="/favorites"
                  className="flex items-center space-x-3 text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FaHeart className="text-amber-200" />
                  <span>Favorites</span>
                </Link>
              </motion.div>
            )}
          </nav>

          {/* User Section */}
          <div className="absolute bottom-6 left-6 right-6">
            {user ? (
              <>
                <motion.div
                  className="flex items-center space-x-3 text-white py-3 px-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold">{user.username}</p>
                    <p className="text-sm opacity-80">Member</p>
                  </div>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full mt-4 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </div>
                </motion.button>
              </>
            ) : (
              <>
                <motion.div variants={itemVariants}>
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link
                    to="/register"
                    className="flex items-center space-x-3 text-white text-lg font-medium py-3 px-4 rounded-lg bg-amber-400 text-indigo-900 hover:bg-amber-300 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUserPlus />
                    <span>Register</span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;