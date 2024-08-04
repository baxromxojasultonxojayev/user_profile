import { rest } from "msw";

// Function to get user data from local storage or default data
const getUserData = () => {
  const storedData = localStorage.getItem("mockUserData");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return {
    id: 1,
    name: "Sardor Jo'rayev",
    email: "sardor@gmail.com",
    bio: "Never back down :-)",
    location: "Tashkent",
  };
};

// Function to set user data in local storage
const setUserData = (data) => {
  localStorage.setItem("mockUserData", JSON.stringify(data));
};

// Initialize with either stored data or default data
let mockUserData = getUserData();

export const handlers = [
  rest.get("/api/user", (req, res, ctx) => {
    mockUserData = getUserData(); // Get the latest data from storage
    return res(ctx.status(200), ctx.json(mockUserData));
  }),

  rest.put("/api/user/:id", (req, res, ctx) => {
    const { id } = req.params;
    const updatedUser = req.body;

    if (parseInt(id, 10) === mockUserData.id) {
      mockUserData = { ...mockUserData, ...updatedUser };
      setUserData(mockUserData); // Update the local storage
    }

    return res(ctx.status(200), ctx.json(mockUserData));
  }),
];
