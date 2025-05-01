import { useEffect, useState, useCallback } from "react";
import { getAllCountries, searchCountriesByName, getCountriesByRegion } from "../utils/api";
import debounce from "lodash.debounce";

// Custom hook to fetch and filter countries with debounced search
function useFetchCountries(search, region, language) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounced fetch function
  const fetchCountries = useCallback(
    debounce(async (searchVal, regionVal, languageVal) => {
      setLoading(true);
      try {
        let data;
        if (searchVal) {
          data = await searchCountriesByName(searchVal);
        } else if (regionVal) {
          data = await getCountriesByRegion(regionVal);
        } else {
          data = await getAllCountries();
        }

        // Filter by language (client-side)
        if (languageVal) {
          data = data.filter((country) =>
            Object.values(country.languages || {}).includes(languageVal)
          );
        }

        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, 500), // 500ms debounce delay
    []
  );

  // Effect to fetch countries when search, region, or language changes
  useEffect(() => {
    fetchCountries(search, region, language);
    return () => fetchCountries.cancel(); // Cleanup debounce on unmount
  }, [search, region, language, fetchCountries]);

  return { countries, loading, error };
}

export default useFetchCountries;