import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // add options
    },
    mutations: {
      // add options
    },
  },
});

export default queryClient;
