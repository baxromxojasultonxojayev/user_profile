import React from "react";

import UserProfile from "./Pages/UserProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProfile />
    </QueryClientProvider>
  );
}

export default App;
