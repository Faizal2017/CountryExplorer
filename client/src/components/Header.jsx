import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaTimes, FaHeart, FaGlobeAmericas, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


/// Header component with navigation and user authentication
function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  console.log(user);

  // Animation variants
  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg backdrop-blur-sm bg-opacity-90 border-b border-indigo-400"
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo/Brand */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 group"
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-white bg-opacity-10 backdrop-blur-sm"
          >
            <FaGlobeAmericas className="text-white text-2xl" />
          </motion.div>
          <motion.span 
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-100"
            whileHover={{ scale: 1.02 }}
          >
            Suahina
          </motion.span>
        </Link>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white p-2 rounded-full bg-white bg-opacity-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/"
              className="px-4 py-2 text-white hover:text-amber-200 font-medium flex items-center space-x-2"
            >
              <span>Home</span>
            </Link>
          </motion.div>
          
          {user && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/favorites"
                className="px-4 py-2 text-white hover:text-amber-200 font-medium flex items-center space-x-2"
              >
                <FaHeart className="text-amber-200" />
                <span>Favorites</span>
              </Link>
            </motion.div>
          )}

          {user ? (
            <motion.div className="flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-white"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <span className="font-medium">{user.username}</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-6 py-2 bg-white text-indigo-700 font-semibold rounded-full hover:bg-opacity-90 transition-all"
              >
                Logout
              </motion.button>
            </motion.div>
          ) : (
            <motion.div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className="px-6 py-2 text-white font-medium hover:text-amber-200"
                >
                  Login
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="px-6 py-2 bg-amber-400 text-indigo-900 font-semibold rounded-full hover:bg-amber-300 transition-all"
                >
                  Register
                </Link>
              </motion.button>
            </motion.div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-indigo-700 to-purple-800 shadow-xl p-6 space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Link
                  to="/"
                  className="flex items-center space-x-3 text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10"
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
                    className="flex items-center space-x-3 text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaHeart className="text-amber-200" />
                    <span>Favorites</span>
                  </Link>
                </motion.div>
              )}

              {user ? (
                <>
                  <motion.div variants={itemVariants} className="pt-4 border-t border-white border-opacity-20">
                    <div className="flex items-center space-x-3 text-white py-3 px-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center">
                        <FaUser className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold">{user.username}</p>
                        <p className="text-sm opacity-80">Member</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-opacity-90"
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/login"
                      className="block text-center py-3 text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/register"
                      className="block text-center py-3 bg-amber-400 text-indigo-900 font-semibold rounded-lg hover:bg-amber-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;