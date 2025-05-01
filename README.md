[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

## Student information

name - M F Amaan
regNo - IT22353498

# 🌍 Country Explorer

Country Explorer is a web application allows users to explore detailed information about countries around the world, including geographical, cultural, economic, and political data. It features user authentication (login and registration), a search functionality to find countries, interactive maps, and various informational sections. The project is built using React, Tailwind CSS, and integrates with a backend API for data retrieval and user authentication.

---

## ✨ Features

- 🔎 View a list of countries with name, capital, region, population, and flag.
- 🔍 Search countries by name.
- 🌎 Filter countries by region or language.
- 📄 View detailed country information.
- ❤️ (Optional) Login/register to save favorite countries.

---

## 🛠 Tech Stack

| Layer    | Tech                        |
| -------- | --------------------------- |
| Frontend | React, Vite, Tailwind CSS   |
| Backend  | Node.js, Express, MongoDB   |
| API      | REST Countries API          |
| Testing  | Jest, React Testing Library |

---

## 📦Setup Instructions

### 🖥️Frontend

1. Navigate to the `client` directory:

   ```bash
   cd client

   ```

2. Install dependecnies(Build):
   npm install

3. Start the development server:
   npm run dev

### 🔧Backend

1. Navigate to the `backend` directory:
   cd backend

2. Install dependencies:
   npm install

3. Create a .env file with:

   MONGO_URI=mongodb://localhost:27017/country-explorer
   JWT_SECRET=your-secret-key
   PORT=5000

4. Start the Server
   npm start / npm run dev

## ✅Testing

1. Navigate to the `client` directory:
   cd client

2. Run Unit Testing
   npm run test:unit

3. Run Intergration Test
   npm run test:integration

## API and Usage

🌍 Country API

| Endpoint               | Method | Description                               |
| ---------------------- | ------ | ----------------------------------------- |
| `/api/countries`       | `GET`  | Fetch all countries                       |
| `/api/countries/:code` | `GET`  | Get details of a specific country by code |

🔐 Auth API

| Endpoint             | Method | Body                                              | Description   |
| -------------------- | ------ | ------------------------------------------------- | ------------- |
| `/api/auth/login`    | `POST` | `{ "email": "", "password": "" }`                 | Login user    |
| `/api/auth/register` | `POST` | `{ "email": "", "password": "", "username": "" }` | Register user |

❤️ Favorites API

| Endpoint               | Method   | Description                          |
| ---------------------- | -------- | ------------------------------------ |
| `/api/favorites`       | `GET`    | Get all favorites for logged-in user |
| `/api/favorites/:code` | `POST`   | Add country to favorites             |
| `/api/favorites/:code` | `DELETE` | Remove country from favorites        |

## 📥 Rest Countries APIs Used

REST Countries API:

1. /all

2. /name/{name}

3. /region/{region}

4. /alpha/{code}

## Implementation:

useFetchCountries hook handles fetching and filtering.

/alpha/{code} used for detailed country views.

## ⚙️Challenges and Solutions

- **Challenge**: Filtering countries by language required client-side processing.

  - **Solution**: Filtered API results in the custom hook using JavaScript.

- **Challenge**: Ensuring responsive design for mobile devices.

  - **Solution**: Used Tailwind’s responsive utilities (e.g., `sm:`, `md:`) and tested on multiple screen sizes.

- **Challenge**: Secure session management.
  - **Solution**: Implemented JWT-based authentication with secure storage in local storage.

## ✅Conclusion

The project successfully integrates the REST Countries API with a responsive, user-friendly React frontend and optional backend for user management. Comprehensive testing and documentation ensure maintainability.
