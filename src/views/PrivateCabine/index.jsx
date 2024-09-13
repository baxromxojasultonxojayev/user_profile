import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfile from "src/Pages/UserProfile";
import MenuList from "src/components/navbar";

const queryClient = new QueryClient();

const PrivateCabine = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MenuList />
      <UserProfile />
    </QueryClientProvider>
  );
};

export default PrivateCabine;
