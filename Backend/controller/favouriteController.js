import { User } from "../model/user.js";   


   // Get user's favorite countries
   export const getFavorites = async (req, res) => {
     try {
       const user = await User.findById(req.user.id);
       res.json(user.favorites);
     } catch (err) {
       res.status(500).json({ error: "Failed to fetch favorites" });
     }
   };

   // Add a country to favorites
   export const addFavorite = async (req, res) => {
     const { countryCode } = req.body;
     try {
        console.log("sss",countryCode)

       const user = await User.findById(req.user.id);
       if (!user.favorites.includes(countryCode)) {
         user.favorites.push(countryCode);
         await user.save();
       }
       res.json(user.favorites);
     } catch (err) {
       res.status(500).json({ error: "Failed to add favorite" });
     }
   };

   // Remove a country from favorites
   export const removeFavorite = async (req, res) => {
     const { countryCode } = req.body;
     try {
       const user = await User.findById(req.user.id);
       user.favorites = user.favorites.filter((code) => code !== countryCode);
       await user.save();
       res.json(user.favorites);
     } catch (err) {
       res.status(500).json({ error: "Failed to remove favorite" });
     }
   };