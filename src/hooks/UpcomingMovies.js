import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming`);
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movies-upcoming"],
    queryFn: fetchUpcomingMovies,
  });
};
