import { searchState } from "@/pages/SearchPage";
import { RestaurantSearchresponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchResturants = (
  searchState: searchState,
  city?: string
) => {
  const createSearchRestaurant =
    async (): Promise<RestaurantSearchresponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.join(","));
      params.set("sortOption", searchState.sortOption);
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed To get Restaurant");
      }

      return response.json();
    };

  const { data: resturantResult, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRestaurant,
    { enabled: !!city }
  );

  return { resturantResult, isLoading };
};

export default { useSearchResturants };
