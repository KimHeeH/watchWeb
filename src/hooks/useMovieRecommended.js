import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
const fetchMovieRecommended = (id) => {
  return api.get(`movie/${id}/recommendations`);
};
export const useMovieRecommendedQuery = (id) => {
  return useQuery({
    queryKey: ["movie-recommend", id],
    queryFn: () => fetchMovieRecommended(id),
    select: (result) => result.data.results,
  });
};
