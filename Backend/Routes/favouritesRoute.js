import express from "express";  
import { getFavorites,addFavorite,removeFavorite} from "../controller/favouriteController.js"
import {auth} from "../middleware/auth.js"
 const router = express.Router();

   // Routes for managing favorites (protected by auth middleware)
   router.get("/", auth, getFavorites);
   router.post("/add", auth, addFavorite);
   router.post("/remove", auth, removeFavorite);

export default router;